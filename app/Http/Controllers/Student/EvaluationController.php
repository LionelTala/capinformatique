<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Models\SoumissionEvaluation;
use App\Models\Notification;
use App\Models\Student;
use App\Models\User;
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
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            $evaluations = Evaluation::where('is_active', true)
                ->where(function ($query) use ($student) {
                    if ($student->vague_id) {
                        $query->orWhere(function ($q) use ($student) {
                            $q->where('type', 'vague')
                                ->where('vague_id', $student->vague_id);
                        });
                    }

                    if ($student->certification_id) {
                        $query->orWhere(function ($q) use ($student) {
                            $q->where('type', 'certification')
                                ->where('certification_id', $student->certification_id);
                        });
                    }
                })
                ->orderBy('date', 'asc')
                ->get()
                ->map(function ($e) use ($student) {
                    $soumission = SoumissionEvaluation::where('evaluation_id', $e->id)
                        ->where('student_id', $student->id)
                        ->first();

                    return [
                        'id' => $e->id,
                        'titre' => $e->titre,
                        'description' => $e->description,
                        'date' => $e->date?->format('d/m/Y H:i'),
                        'coefficient' => $e->coefficient,
                        'est_depasse' => $e->est_depasse,
                        'jours_restants' => $e->jours_restants,
                        'has_files' => !empty($e->contenu),
                        'soumis' => $soumission !== null,
                        'soumission_statut' => $soumission?->statut,
                        'note' => $soumission?->note,
                        'formation' => [
                            'id' => $e->formation_id,
                            'name' => $e->formation?->name,
                        ],
                    ];
                });

            $stats = [
                'total' => $evaluations->count(),
                'soumis' => $evaluations->filter(fn($e) => $e['soumis'])->count(),
                'en_attente' => $evaluations->filter(fn($e) => !$e['soumis'])->count(),
                'corriges' => $evaluations->filter(fn($e) => $e['soumission_statut'] === 'corrige')->count(),
            ];

            return Inertia::render('Student/Evaluations/Index', [
                'evaluations' => $evaluations,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement évaluations', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function show(Evaluation $evaluation)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            $hasAccess = false;
            if ($evaluation->type === 'vague' && $student->vague_id === $evaluation->vague_id) {
                $hasAccess = true;
            }
            if ($evaluation->type === 'certification' && $student->certification_id === $evaluation->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                abort(403, '❌ Vous n\'avez pas accès à cette évaluation.');
            }

            $soumission = SoumissionEvaluation::where('evaluation_id', $evaluation->id)
                ->where('student_id', $student->id)
                ->first();

            return Inertia::render('Student/Evaluations/Show', [
                'evaluation' => [
                    'id' => $evaluation->id,
                    'titre' => $evaluation->titre,
                    'description' => $evaluation->description,
                    'contenu' => $evaluation->contenu,
                    'date' => $evaluation->date?->format('d/m/Y H:i'),
                    'coefficient' => $evaluation->coefficient,
                    'est_depasse' => $evaluation->est_depasse,
                    'jours_restants' => $evaluation->jours_restants,
                    'formation' => [
                        'id' => $evaluation->formation_id,
                        'name' => $evaluation->formation?->name,
                    ],
                ],
                'soumission' => $soumission ? [
                    'id' => $soumission->id,
                    'fichier' => $soumission->fichier,
                    'commentaire' => $soumission->commentaire,
                    'note' => $soumission->note,
                    'statut' => $soumission->statut,
                    'statut_label' => $soumission->statut_label,
                    'submitted_at' => $soumission->submitted_at?->format('d/m/Y H:i'),
                    'corrected_at' => $soumission->corrected_at?->format('d/m/Y H:i'),
                    'est_en_retard' => $soumission->est_en_retard,
                ] : null,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur affichage évaluation', [
                'evaluation_id' => $evaluation->id,
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('student.evaluations')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function soumettre(Request $request, Evaluation $evaluation)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            $hasAccess = false;
            if ($evaluation->type === 'vague' && $student->vague_id === $evaluation->vague_id) {
                $hasAccess = true;
            }
            if ($evaluation->type === 'certification' && $student->certification_id === $evaluation->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            $existing = SoumissionEvaluation::where('evaluation_id', $evaluation->id)
                ->where('student_id', $student->id)
                ->first();

            if ($existing) {
                return response()->json(['error' => 'Vous avez déjà soumis cette évaluation.'], 400);
            }

            $validated = $request->validate([
                'fichier' => 'required|file|max:20480',
                'commentaire' => 'nullable|string',
            ]);

            $soumission = DB::transaction(function () use ($request, $evaluation, $student, $validated) {
                $path = $request->file('fichier')->store('soumissions_evaluations', 'public');

                $soumission = SoumissionEvaluation::create([
                    'evaluation_id' => $evaluation->id,
                    'student_id' => $student->id,
                    'fichier' => [
                        'url' => asset('storage/' . $path),
                        'name' => $request->file('fichier')->getClientOriginalName(),
                        'size' => $request->file('fichier')->getSize(),
                        'extension' => $request->file('fichier')->getClientOriginalExtension(),
                    ],
                    'commentaire' => $validated['commentaire'] ?? null,
                    'statut' => 'soumis',
                    'submitted_at' => now(),
                ]);

                $this->notifyAdminSoumission($evaluation, $student);

                return $soumission;
            });

            Log::info('Évaluation soumise', [
                'evaluation_id' => $evaluation->id,
                'student_id' => $student->id,
                'soumission_id' => $soumission->id,
            ]);

            return redirect()->route('student.evaluations.show', $evaluation->id)
                ->with('success', '✅ Évaluation soumise avec succès !');

        } catch (\Exception $e) {
            Log::error('Erreur soumission évaluation', [
                'evaluation_id' => $evaluation->id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la soumission.');
        }
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
                Log::warning('Erreur broadcast admin', [
                    'user_id' => $admin->id,
                    'message' => $e->getMessage(),
                ]);
            }
        }
    }
}
