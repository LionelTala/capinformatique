<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Devoir;
use App\Models\SoumissionDevoir;
use App\Models\Notification;
use App\Models\Student;
use App\Models\User;
use App\Events\NotificationCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DevoirController extends Controller
{
    public function index()
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            $devoirs = Devoir::where('is_active', true)
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
                ->orderBy('date_limite', 'asc')
                ->get()
                ->map(function ($d) use ($student) {
                    $soumission = SoumissionDevoir::where('devoir_id', $d->id)
                        ->where('student_id', $student->id)
                        ->first();

                    return [
                        'id' => $d->id,
                        'titre' => $d->titre,
                        'description' => $d->description,
                        'date_limite' => $d->date_limite?->format('d/m/Y H:i'),
                        'est_depasse' => $d->est_depasse,
                        'jours_restants' => $d->jours_restants,
                        'has_files' => !empty($d->contenu),
                        'soumis' => $soumission !== null,
                        'soumission_statut' => $soumission?->statut,
                        'note' => $soumission?->note,
                        'formation' => [
                            'id' => $d->formation_id,
                            'name' => $d->formation?->name,
                        ],
                    ];
                });

            $stats = [
                'total' => $devoirs->count(),
                'soumis' => $devoirs->filter(fn($d) => $d['soumis'])->count(),
                'en_attente' => $devoirs->filter(fn($d) => !$d['soumis'])->count(),
                'corriges' => $devoirs->filter(fn($d) => $d['soumission_statut'] === 'corrige')->count(),
            ];

            return Inertia::render('Student/Devoirs/Index', [
                'devoirs' => $devoirs,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement devoirs', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function show(Devoir $devoir)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            // Vérifier l'accès
            $hasAccess = false;
            if ($devoir->type === 'vague' && $student->vague_id === $devoir->vague_id) {
                $hasAccess = true;
            }
            if ($devoir->type === 'certification' && $student->certification_id === $devoir->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                abort(403, '❌ Vous n\'avez pas accès à ce devoir.');
            }

            $soumission = SoumissionDevoir::where('devoir_id', $devoir->id)
                ->where('student_id', $student->id)
                ->first();

            return Inertia::render('Student/Devoirs/Show', [
                'devoir' => [
                    'id' => $devoir->id,
                    'titre' => $devoir->titre,
                    'description' => $devoir->description,
                    'contenu' => $devoir->contenu,
                    'date_limite' => $devoir->date_limite?->format('d/m/Y H:i'),
                    'est_depasse' => $devoir->est_depasse,
                    'jours_restants' => $devoir->jours_restants,
                    'formation' => [
                        'id' => $devoir->formation_id,
                        'name' => $devoir->formation?->name,
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
            Log::error('Erreur affichage devoir', [
                'devoir_id' => $devoir->id,
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('student.devoirs')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ SOUMISSION D'UN DEVOIR (Étudiant)
    public function soumettre(Request $request, Devoir $devoir)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            // Vérifier l'accès
            $hasAccess = false;
            if ($devoir->type === 'vague' && $student->vague_id === $devoir->vague_id) {
                $hasAccess = true;
            }
            if ($devoir->type === 'certification' && $student->certification_id === $devoir->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            // Vérifier si déjà soumis
            $existing = SoumissionDevoir::where('devoir_id', $devoir->id)
                ->where('student_id', $student->id)
                ->first();

            if ($existing) {
                return response()->json(['error' => 'Vous avez déjà soumis ce devoir.'], 400);
            }

            $validated = $request->validate([
                'fichier' => 'required|file|max:20480',
                'commentaire' => 'nullable|string',
            ]);

            $soumission = DB::transaction(function () use ($request, $devoir, $student, $validated) {
                $path = $request->file('fichier')->store('soumissions', 'public');

                $soumission = SoumissionDevoir::create([
                    'devoir_id' => $devoir->id,
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

                // ✅ NOTIFICATION À L'ADMIN
                $this->notifyAdminSoumission($devoir, $student);

                return $soumission;
            });

            Log::info('Devoir soumis', [
                'devoir_id' => $devoir->id,
                'student_id' => $student->id,
                'soumission_id' => $soumission->id,
            ]);

            return redirect()->route('student.devoirs.show', $devoir->id)
                ->with('success', '✅ Devoir soumis avec succès !');

        } catch (\Exception $e) {
            Log::error('Erreur soumission devoir', [
                'devoir_id' => $devoir->id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la soumission.');
        }
    }

    // ✅ NOTIFICATION À L'ADMIN (Soumission) - CORRIGÉ
    private function notifyAdminSoumission(Devoir $devoir, Student $student)
    {
        $admins = User::whereIn('role', ['super_admin', 'admin_centre', 'admin'])->get();

        foreach ($admins as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'user_creator_id' => $student->user_id,
                'type' => 'devoir',
                'notifiable_type' => Devoir::class,
                'notifiable_id' => $devoir->id,
                'title' => "📄 Devoir soumis",
                'message' => "{$student->full_name} a soumis le devoir '{$devoir->titre}'.",
                'link' => "/admin/devoirs/{$devoir->id}",
                'data' => [
                    'action' => 'soumis',
                    'devoir_id' => $devoir->id,
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
