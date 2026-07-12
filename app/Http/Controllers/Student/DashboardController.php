<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\Devoir;
use App\Models\CoursVue;
use App\Models\SoumissionDevoir;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            // ============================================
            // INFORMATIONS ÉTUDIANT
            // ============================================
            $studentInfo = [
                'id' => $student->id,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'full_name' => $student->full_name,
                'matricule' => $student->matricule,
                'phone' => $student->phone,
                'student_type' => $student->student_type_label,
                'vague' => $student->vague ? [
                    'id' => $student->vague->id,
                    'name' => $student->vague->name,
                    'formation' => $student->vague->formation?->name,
                ] : null,
                'certification' => $student->certification ? [
                    'id' => $student->certification->id,
                    'titre' => $student->certification->titre,
                    'formation' => $student->certification->formation?->name,
                ] : null,
            ];

            // ============================================
            // STATISTIQUES
            // ============================================
            // Récupérer les cours accessibles
            $coursQuery = Cours::where('is_active', true)
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
                });

            $totalCours = $coursQuery->count();

            // Cours vus
            $coursVus = CoursVue::where('student_id', $student->id)
                ->whereIn('cours_id', $coursQuery->pluck('id'))
                ->count();

            // Devoirs
            $devoirsQuery = Devoir::where('is_active', true)
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
                });

            $totalDevoirs = $devoirsQuery->count();

            // Devoirs soumis
            $devoirsSoumis = SoumissionDevoir::where('student_id', $student->id)
                ->whereIn('devoir_id', $devoirsQuery->pluck('id'))
                ->where('statut', 'soumis')
                ->count();

            // Devoirs corrigés
            $devoirsCorriges = SoumissionDevoir::where('student_id', $student->id)
                ->whereIn('devoir_id', $devoirsQuery->pluck('id'))
                ->where('statut', 'corrige')
                ->count();

            // Note moyenne
            $moyenne = SoumissionDevoir::where('student_id', $student->id)
                ->whereIn('devoir_id', $devoirsQuery->pluck('id'))
                ->where('statut', 'corrige')
                ->avg('note');

            $stats = [
                'total_cours' => $totalCours,
                'cours_vus' => $coursVus,
                'total_devoirs' => $totalDevoirs,
                'devoirs_soumis' => $devoirsSoumis,
                'devoirs_corriges' => $devoirsCorriges,
                'moyenne' => $moyenne ? round($moyenne, 2) : null,
                'progression' => $totalCours > 0 ? round(($coursVus / $totalCours) * 100) : 0,
            ];

            // ============================================
            // DERNIERS COURS
            // ============================================
            $derniersCours = $coursQuery
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($cours) use ($student) {
                    $vue = CoursVue::where('cours_id', $cours->id)
                        ->where('student_id', $student->id)
                        ->first();

                    return [
                        'id' => $cours->id,
                        'titre' => $cours->titre,
                        'description' => $cours->description,
                        'has_video' => !empty($cours->video_url),
                        'has_files' => !empty($cours->contenu),
                        'vu' => $vue !== null,
                        'created_at' => $cours->created_at->diffForHumans(),
                        'link' => "/student/cours/{$cours->id}",
                    ];
                });

            // ============================================
            // DEVOIRS À RENDRE
            // ============================================
            $devoirsARendre = $devoirsQuery
                ->whereDoesntHave('soumissions', function ($query) use ($student) {
                    $query->where('student_id', $student->id);
                })
                ->orderBy('date_limite', 'asc')
                ->limit(5)
                ->get()
                ->map(function ($devoir) {
                    return [
                        'id' => $devoir->id,
                        'titre' => $devoir->titre,
                        'date_limite' => $devoir->date_limite?->format('d/m/Y H:i'),
                        'est_depasse' => $devoir->est_depasse,
                        'jours_restants' => $devoir->jours_restants,
                        'has_files' => !empty($devoir->contenu),
                        'link' => "/student/devoirs/{$devoir->id}",
                    ];
                });

            // ============================================
            // DERNIÈRES NOTES
            // ============================================
            $dernieresNotes = SoumissionDevoir::where('student_id', $student->id)
                ->where('statut', 'corrige')
                ->whereIn('devoir_id', $devoirsQuery->pluck('id'))
                ->with(['devoir' => function ($query) {
                    $query->select('id', 'titre');
                }])
                ->orderBy('corrected_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($soumission) {
                    return [
                        'id' => $soumission->id,
                        'devoir_titre' => $soumission->devoir?->titre ?? 'Devoir',
                        'note' => $soumission->note,
                        'commentaire' => $soumission->commentaire,
                        'corrected_at' => $soumission->corrected_at?->diffForHumans(),
                        'link' => "/student/devoirs/{$soumission->devoir_id}",
                    ];
                });

            return Inertia::render('Student/Dashboard', [
                'student' => $studentInfo,
                'stats' => $stats,
                'derniersCours' => $derniersCours,
                'devoirsARendre' => $devoirsARendre,
                'dernieresNotes' => $dernieresNotes,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement dashboard étudiant', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }
}
