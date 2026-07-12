<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Models\Formation;
use App\Models\Vague;
use App\Models\Certification;
use App\Models\Student;
use App\Models\Notification;
use App\Models\User;
use App\Models\SoumissionEvaluation;
use App\Events\NotificationCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    public function index()
    {
        try {
            $evaluations = Evaluation::with(['formation', 'vague', 'certification'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($e) {
                    return [
                        'id' => $e->id,
                        'titre' => $e->titre,
                        'description' => $e->description,
                        'date' => $e->date?->format('d/m/Y H:i'),
                        'coefficient' => $e->coefficient,
                        'type' => $e->type,
                        'est_depasse' => $e->est_depasse,
                        'jours_restants' => $e->jours_restants,
                        'total_etudiants' => $e->students->count(),
                        'soumissions_count' => $e->soumissions_count,
                        'soumis_count' => $e->soumis_count,
                        'corrige_count' => $e->corrige_count,
                        'taux_soumission' => $e->taux_soumission,
                        'is_active' => $e->is_active,
                        'has_notification_sent' => $e->has_notification_sent,
                        'formation' => $e->formation ? [
                            'id' => $e->formation->id,
                            'name' => $e->formation->name,
                        ] : null,
                        'vague' => $e->vague ? [
                            'id' => $e->vague->id,
                            'name' => $e->vague->name,
                        ] : null,
                        'certification' => $e->certification ? [
                            'id' => $e->certification->id,
                            'titre' => $e->certification->titre,
                        ] : null,
                        'created_at' => $e->created_at->format('d/m/Y H:i'),
                    ];
                });

            return Inertia::render('Admin/Evaluations/Index', [
                'evaluations' => $evaluations,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement évaluations', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($f) {
                return [
                    'id' => $f->id,
                    'name' => $f->name,
                    'abbreviation' => $f->abbreviation,
                ];
            });

        return Inertia::render('Admin/Evaluations/Create', [
            'formations' => $formations,
        ]);
    }

    public function getVaguesByFormation($formationId)
    {
        $vagues = Vague::where('formation_id', $formationId)
            ->where('is_active', true)
            ->orderBy('date_debut')
            ->get()
            ->map(function ($v) {
                return [
                    'id' => $v->id,
                    'name' => $v->name,
                    'date_debut' => $v->date_debut->format('d/m/Y'),
                ];
            });

        return response()->json($vagues);
    }

    public function getCertificationsByFormation($formationId)
    {
        $certifications = Certification::where('formation_id', $formationId)
            ->where('is_active', true)
            ->orderBy('titre')
            ->get()
            ->map(function ($c) {
                return [
                    'id' => $c->id,
                    'titre' => $c->titre,
                ];
            });

        return response()->json($certifications);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'formation_id' => 'required|exists:formations,id',
                'type' => 'required|in:vague,certification',
                'vague_id' => 'required_if:type,vague|nullable|exists:vagues,id',
                'certification_id' => 'required_if:type,certification|nullable|exists:certifications,id',
                'date' => 'nullable|date|after:now',
                'coefficient' => 'nullable|numeric|min:0|max:20',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            $evaluation = DB::transaction(function () use ($request, $validated) {
                $contenu = [];
                if ($request->hasFile('files')) {
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('evaluations', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                }

                $evaluation = Evaluation::create([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'contenu' => $contenu,
                    'date' => $validated['date'] ?? null,
                    'coefficient' => $validated['coefficient'] ?? 1,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['vague_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'type' => $validated['type'],
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                if ($validated['send_notification'] ?? true) {
                    $this->sendNotifications($evaluation);
                }

                return $evaluation;
            });

            Log::info('Évaluation créée', [
                'evaluation_id' => $evaluation->id,
                'titre' => $evaluation->titre,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.evaluations.index')
                ->with('success', "✅ Évaluation '{$evaluation->titre}' créée avec succès !" .
                    (($validated['send_notification'] ?? true) ? ' 🔔 Les étudiants ont été notifiés.' : ''));

        } catch (\Exception $e) {
            Log::error('Erreur création évaluation', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->except(['files']),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    private function sendNotifications(Evaluation $evaluation)
    {
        $students = $evaluation->students;

        foreach ($students as $student) {
            $notification = Notification::create([
                'user_id' => $student->user_id,
                'user_creator_id' => auth()->id(),
                'type' => 'evaluation',
                'notifiable_type' => Evaluation::class,
                'notifiable_id' => $evaluation->id,
                'title' => "📝 Nouvelle évaluation : {$evaluation->titre}",
                'message' => "Une nouvelle évaluation vous a été assignée. Coefficient : {$evaluation->coefficient}" . ($evaluation->date ? " (Date : " . $evaluation->date->format('d/m/Y H:i') . ")" : ''),
                'link' => "/student/evaluations/{$evaluation->id}",
                'data' => [
                    'action' => 'nouveau',
                    'evaluation_id' => $evaluation->id,
                    'titre' => $evaluation->titre,
                    'coefficient' => $evaluation->coefficient,
                    'date' => $evaluation->date?->format('d/m/Y H:i'),
                ],
                'read_at' => null,
            ]);

            try {
                event(new NotificationCreated($notification));
            } catch (\Exception $e) {
                Log::warning('Erreur broadcast évaluation', [
                    'user_id' => $student->user_id,
                    'notification_id' => $notification->id,
                    'message' => $e->getMessage(),
                ]);
            }
        }

        $evaluation->update([
            'has_notification_sent' => true,
            'notification_sent_at' => now(),
        ]);

        Log::info('Notifications évaluation envoyées', [
            'evaluation_id' => $evaluation->id,
            'students_count' => $students->count(),
        ]);
    }

    private function notifyAdminSoumission(Evaluation $evaluation, Student $student)
    {
        $admins = User::whereIn('role', ['super_admin', 'admin_centre', 'admin'])->get();

        foreach ($admins as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'user_creator_id' => $student->user_id,
                'type' => 'evaluation',
                'notifiable_type' => Evaluation::class,
                'notifiable_id' => $evaluation->id,
                'title' => "📤 Évaluation soumise",
                'message' => "{$student->full_name} a soumis l'évaluation '{$evaluation->titre}'.",
                'link' => "/admin/evaluations/{$evaluation->id}",
                'data' => [
                    'action' => 'soumis',
                    'evaluation_id' => $evaluation->id,
                    'student_id' => $student->id,
                    'student_name' => $student->full_name,
                ],
                'read_at' => null,
            ]);

            try {
                event(new NotificationCreated($notification));
            } catch (\Exception $e) {
                Log::warning('Erreur broadcast admin évaluation', [
                    'user_id' => $admin->id,
                    'message' => $e->getMessage(),
                ]);
            }
        }
    }

    private function notifyStudentCorrection(SoumissionEvaluation $soumission)
    {
        $notification = Notification::create([
            'user_id' => $soumission->student->user_id,
            'user_creator_id' => auth()->id(),
            'type' => 'evaluation',
            'notifiable_type' => Evaluation::class,
            'notifiable_id' => $soumission->evaluation_id,
            'title' => "✅ Évaluation corrigée",
            'message' => "Votre évaluation '{$soumission->evaluation->titre}' a été corrigée. Note : {$soumission->note}/20",
            'link' => "/student/evaluations/{$soumission->evaluation_id}",
            'data' => [
                'action' => 'corrige',
                'evaluation_id' => $soumission->evaluation_id,
                'titre' => $soumission->evaluation->titre,
                'note' => $soumission->note,
            ],
            'read_at' => null,
        ]);

        try {
            event(new NotificationCreated($notification));
        } catch (\Exception $e) {
            Log::warning('Erreur broadcast correction évaluation', [
                'user_id' => $soumission->student->user_id,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function show(Evaluation $evaluation)
    {
        $evaluation->load(['formation', 'vague', 'certification']);

        $soumissions = $evaluation->soumissions()->with('student')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'student_id' => $s->student_id,
                'student_name' => $s->student->full_name,
                'matricule' => $s->student->matricule,
                'fichier' => $s->fichier,
                'commentaire' => $s->commentaire,
                'note' => $s->note,
                'statut' => $s->statut,
                'statut_label' => $s->statut_label,
                'statut_color' => $s->statut_color,
                'est_en_retard' => $s->est_en_retard,
                'submitted_at' => $s->submitted_at?->format('d/m/Y H:i'),
                'corrected_at' => $s->corrected_at?->format('d/m/Y H:i'),
            ];
        });

        $totalStudents = $evaluation->students->count();

        return Inertia::render('Admin/Evaluations/Show', [
            'evaluation' => [
                'id' => $evaluation->id,
                'titre' => $evaluation->titre,
                'description' => $evaluation->description,
                'contenu' => $evaluation->contenu,
                'date' => $evaluation->date?->format('d/m/Y H:i'),
                'coefficient' => $evaluation->coefficient,
                'est_depasse' => $evaluation->est_depasse,
                'jours_restants' => $evaluation->jours_restants,
                'type' => $evaluation->type,
                'total_etudiants' => $totalStudents,
                'soumissions_count' => $evaluation->soumissions_count,
                'soumis_count' => $evaluation->soumis_count,
                'corrige_count' => $evaluation->corrige_count,
                'taux_soumission' => $evaluation->taux_soumission,
                'has_notification_sent' => $evaluation->has_notification_sent,
                'notification_sent_at' => $evaluation->notification_sent_at?->format('d/m/Y H:i'),
                'formation' => $evaluation->formation ? [
                    'id' => $evaluation->formation->id,
                    'name' => $evaluation->formation->name,
                ] : null,
                'vague' => $evaluation->vague ? [
                    'id' => $evaluation->vague->id,
                    'name' => $evaluation->vague->name,
                ] : null,
                'certification' => $evaluation->certification ? [
                    'id' => $evaluation->certification->id,
                    'titre' => $evaluation->certification->titre,
                ] : null,
            ],
            'soumissions' => $soumissions,
            'nonSoumis' => $evaluation->students->reject(function ($student) use ($soumissions) {
                return $soumissions->contains('student_id', $student->id);
            })->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->full_name,
                    'matricule' => $student->matricule,
                ];
            }),
        ]);
    }

    public function edit(Evaluation $evaluation)
    {
        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($f) {
                return [
                    'id' => $f->id,
                    'name' => $f->name,
                    'abbreviation' => $f->abbreviation,
                ];
            });

        return Inertia::render('Admin/Evaluations/Edit', [
            'evaluation' => [
                'id' => $evaluation->id,
                'titre' => $evaluation->titre,
                'description' => $evaluation->description,
                'contenu' => $evaluation->contenu,
                'date' => $evaluation->date?->format('Y-m-d\TH:i'),
                'coefficient' => $evaluation->coefficient,
                'formation_id' => $evaluation->formation_id,
                'type' => $evaluation->type,
                'vague_id' => $evaluation->vague_id,
                'certification_id' => $evaluation->certification_id,
                'is_active' => $evaluation->is_active,
                'order' => $evaluation->order,
            ],
            'formations' => $formations,
        ]);
    }

    public function update(Request $request, Evaluation $evaluation)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'formation_id' => 'required|exists:formations,id',
                'type' => 'required|in:vague,certification',
                'vague_id' => 'required_if:type,vague|nullable|exists:vagues,id',
                'certification_id' => 'required_if:type,certification|nullable|exists:certifications,id',
                'date' => 'nullable|date',
                'coefficient' => 'nullable|numeric|min:0|max:20',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            DB::transaction(function () use ($request, $evaluation, $validated) {
                if ($request->hasFile('files')) {
                    $contenu = $evaluation->contenu ?? [];
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('evaluations', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                    $evaluation->contenu = $contenu;
                }

                $evaluation->update([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'date' => $validated['date'] ?? null,
                    'coefficient' => $validated['coefficient'] ?? 1,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['vague_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'type' => $validated['type'],
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                if (($validated['send_notification'] ?? false) && !$evaluation->has_notification_sent) {
                    $this->sendNotifications($evaluation);
                }
            });

            return redirect()->route('admin.evaluations.index')
                ->with('success', "✅ Évaluation '{$evaluation->titre}' mise à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour évaluation', [
                'evaluation_id' => $evaluation->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Evaluation $evaluation)
    {
        try {
            $titre = $evaluation->titre;

            DB::transaction(function () use ($evaluation) {
                if ($evaluation->contenu) {
                    foreach ($evaluation->contenu as $file) {
                        $path = str_replace(asset('storage/'), '', $file['url']);
                        Storage::disk('public')->delete($path);
                    }
                }
                $evaluation->soumissions()->delete();
                $evaluation->delete();
            });

            return redirect()->back()
                ->with('success', "✅ Évaluation '{$titre}' supprimée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression évaluation', [
                'evaluation_id' => $evaluation->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Evaluation $evaluation)
    {
        try {
            $evaluation->update(['is_active' => !$evaluation->is_active]);

            $status = $evaluation->is_active ? 'activée' : 'désactivée';

            return redirect()->back()
                ->with('success', "✅ Évaluation '{$evaluation->titre}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut évaluation', [
                'evaluation_id' => $evaluation->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function resendNotifications(Evaluation $evaluation)
    {
        try {
            if ($evaluation->has_notification_sent) {
                return redirect()->back()
                    ->with('warning', "⚠️ Les notifications pour '{$evaluation->titre}' ont déjà été envoyées.");
            }

            $this->sendNotifications($evaluation);

            return redirect()->back()
                ->with('success', "✅ Notifications envoyées pour '{$evaluation->titre}' !");

        } catch (\Exception $e) {
            Log::error('Erreur envoi notifications', [
                'evaluation_id' => $evaluation->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de l\'envoi des notifications.');
        }
    }

    public function corriger(Request $request, SoumissionEvaluation $soumission)
    {
        try {
            $validated = $request->validate([
                'note' => 'required|numeric|min:0|max:20',
                'commentaire' => 'nullable|string',
            ]);

            DB::transaction(function () use ($request, $soumission, $validated) {
                $soumission->update([
                    'note' => $validated['note'],
                    'commentaire' => $validated['commentaire'] ?? null,
                    'statut' => 'corrige',
                    'corrected_at' => now(),
                ]);

                $this->notifyStudentCorrection($soumission);
            });

            Log::info('Évaluation corrigée', [
                'soumission_id' => $soumission->id,
                'student_id' => $soumission->student_id,
                'note' => $validated['note'],
                'corrected_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Évaluation corrigée avec succès ! Note : {$validated['note']}/20");

        } catch (\Exception $e) {
            Log::error('Erreur correction évaluation', [
                'soumission_id' => $soumission->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la correction.');
        }
    }
}
