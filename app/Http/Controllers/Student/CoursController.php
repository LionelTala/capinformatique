<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\CoursVue;
use App\Models\CoursNotification;
use App\Models\Student;
use App\Models\Tranche;
use App\Models\PaiementTranche;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CoursController extends Controller
{
    // ✅ Liste des cours pour l'étudiant connecté
    public function index()
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            Log::info('📚 [Student] Liste des cours', [
                'student_id' => $student->id,
                'student_name' => $student->full_name,
                'vague_id' => $student->vague_id,
                'certification_id' => $student->certification_id,
            ]);

            // ✅ Récupérer tous les cours de la formation/certification
            $allCours = Cours::where('is_active', true)
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
                ->orderBy('created_at', 'desc')
                ->get();

            Log::info('📚 [Student] Cours trouvés', [
                'total' => $allCours->count()
            ]);

            // ✅ Transformer les cours avec statut d'accès
            $coursList = $allCours->map(function ($c) use ($student) {
                $vue = CoursVue::where('cours_id', $c->id)
                    ->where('student_id', $student->id)
                    ->first();

                // ✅ Vérifier si l'étudiant peut accéder au contenu
                $peutAcceder = $student->peutAccederContenu($c->tranche_requise_id);

                // ✅ Récupérer les infos de la tranche requise si elle existe
                $trancheInfo = null;
                if ($c->tranche_requise_id) {
                    $tranche = Tranche::find($c->tranche_requise_id);
                    if ($tranche) {
                        $trancheInfo = [
                            'id' => $tranche->id,
                            'numero' => $tranche->numero,
                            'montant' => $tranche->montant,
                            'lien'=> $tranche->lien_paiement,
                        ];
                    }
                }

                return [
                    'id' => $c->id,
                    'titre' => $c->titre,
                    'description' => $c->description,
                    'has_video' => !empty($c->video_url),
                    'has_files' => !empty($c->contenu),
                    'viewed' => $vue !== null,
                    'viewed_at' => $vue ? $vue->viewed_at->format('d/m/Y H:i') : null,
                    'created_at' => $c->created_at->format('d/m/Y'),
                    'formation' => [
                        'id' => $c->formation_id,
                        'name' => $c->formation?->name,
                    ],
                    // ✅ Nouveaux champs pour le blocage
                    'est_accessible' => $peutAcceder,
                    'tranche_requise' => $trancheInfo,
                    'est_verrouille' => !$peutAcceder && $trancheInfo !== null,
                ];
            });

            // ✅ Statistiques
            $stats = [
                'total' => $coursList->count(),
                'viewed' => $coursList->filter(fn($c) => $c['viewed'])->count(),
                'not_viewed' => $coursList->filter(fn($c) => !$c['viewed'])->count(),
                'accessibles' => $coursList->filter(fn($c) => $c['est_accessible'])->count(),
                'verrouilles' => $coursList->filter(fn($c) => $c['est_verrouille'])->count(),
            ];

            Log::info('📚 [Student] Statistiques cours', $stats);

            return Inertia::render('Student/Cours/Index', [
                'cours' => $coursList,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur chargement cours', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ Détail d'un cours avec vérification d'accès
    public function show(Cours $cours)
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            Log::info('👁️ [Student] Affichage cours', [
                'student_id' => $student->id,
                'cours_id' => $cours->id,
                'cours_titre' => $cours->titre,
            ]);

            // ✅ Vérifier que l'étudiant a accès à ce cours
            $hasAccess = false;
            if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
                $hasAccess = true;
            }
            if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                Log::warning('⚠️ [Student] Accès refusé au cours', [
                    'student_id' => $student->id,
                    'cours_id' => $cours->id,
                    'type' => $cours->type,
                    'vague_id' => $cours->vague_id,
                    'student_vague_id' => $student->vague_id,
                ]);
                abort(403, '❌ Vous n\'avez pas accès à ce cours.');
            }

            // ✅ Vérifier l'accès par tranche
            $peutAcceder = $student->peutAccederContenu($cours->tranche_requise_id);

            // ✅ Récupérer les infos de la tranche requise
            $trancheInfo = null;
            if ($cours->tranche_requise_id) {
                $tranche = Tranche::find($cours->tranche_requise_id);
                if ($tranche) {
                    $trancheInfo = [
                        'id' => $tranche->id,
                        'numero' => $tranche->numero,
                        'montant' => $tranche->montant,
                        'lien' => $tranche->lien_paiement,
                    ];
                }
            }

            // ✅ Vérifier si déjà vu
            $vue = CoursVue::where('cours_id', $cours->id)
                ->where('student_id', $student->id)
                ->first();

            Log::info('✅ [Student] Cours affiché', [
                'cours_id' => $cours->id,
                'est_accessible' => $peutAcceder,
                'deja_vu' => $vue !== null,
            ]);

            return Inertia::render('Student/Cours/Show', [
                'cours' => [
                    'id' => $cours->id,
                    'titre' => $cours->titre,
                    'description' => $cours->description,
                    'contenu' => $cours->contenu,
                    'video_url' => $cours->video_url,
                    'video_title' => $cours->video_title,
                    'video_embed_url' => $cours->embed_video_url,
                    'video_thumbnail' => $cours->video_thumbnail,
                    'viewed' => $vue !== null,
                    'viewed_at' => $vue ? $vue->viewed_at->format('d/m/Y H:i') : null,
                    'created_at' => $cours->created_at->format('d/m/Y'),
                    'formation' => [
                        'id' => $cours->formation_id,
                        'name' => $cours->formation?->name,
                    ],
                    // ✅ Nouveaux champs
                    'est_accessible' => $peutAcceder,
                    'tranche_requise' => $trancheInfo,
                    'est_verrouille' => !$peutAcceder && $trancheInfo !== null,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur affichage cours', [
                'cours_id' => $cours->id,
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('student.cours')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ Marquer un cours comme vu
    public function markAsViewed(Cours $cours)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            Log::info('👁️ [Student] Marquer cours comme vu', [
                'student_id' => $student->id,
                'cours_id' => $cours->id,
            ]);

            // ✅ Vérifier l'accès
            $hasAccess = false;
            if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
                $hasAccess = true;
            }
            if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
                $hasAccess = true;
            }

            // ✅ Vérifier l'accès par tranche
            if ($hasAccess) {
                $hasAccess = $student->peutAccederContenu($cours->tranche_requise_id);
            }

            if (!$hasAccess) {
                Log::warning('⚠️ [Student] Tentative de marquage sans accès', [
                    'student_id' => $student->id,
                    'cours_id' => $cours->id,
                ]);
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            // ✅ Marquer comme vu
            $vue = CoursVue::firstOrCreate([
                'cours_id' => $cours->id,
                'student_id' => $student->id,
            ], [
                'viewed_at' => now(),
            ]);

            // ✅ Incrémenter le compteur
            $cours->increment('viewed_count');

            Log::info('✅ [Student] Cours marqué comme vu', [
                'cours_id' => $cours->id,
                'student_id' => $student->id,
                'student_name' => $student->full_name,
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur marquage cours vu', [
                'cours_id' => $cours->id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // ✅ Récupérer les notifications de cours pour l'étudiant
    public function getNotifications()
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json([]);
            }

            Log::info('🔔 [Student] Récupération notifications', [
                'student_id' => $student->id,
            ]);

            $notifications = CoursNotification::with('cours')
                ->where('student_id', $student->id)
                ->orderBy('created_at', 'desc')
                ->limit(50)
                ->get()
                ->map(function ($n) {
                    return [
                        'id' => $n->id,
                        'cours_id' => $n->cours_id,
                        'titre' => $n->cours->titre,
                        'description' => $n->cours->description,
                        'video_url' => $n->cours->video_url,
                        'video_title' => $n->cours->video_title,
                        'has_video' => !empty($n->cours->video_url),
                        'has_files' => !empty($n->cours->contenu),
                        'is_read' => $n->is_read,
                        'created_at' => $n->created_at->diffForHumans(),
                    ];
                });

            $unreadCount = $notifications->filter(fn($n) => !$n['is_read'])->count();

            Log::info('✅ [Student] Notifications récupérées', [
                'total' => $notifications->count(),
                'unread' => $unreadCount,
            ]);

            return response()->json([
                'notifications' => $notifications,
                'unread_count' => $unreadCount,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur récupération notifications', [
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['notifications' => [], 'unread_count' => 0]);
        }
    }

    // ✅ Marquer une notification comme lue
    public function markNotificationAsRead($id)
    {
        try {
            $notification = CoursNotification::findOrFail($id);
            $student = auth()->user()->student;

            // Vérifier que la notification appartient à l'étudiant
            if ($notification->student_id !== $student->id) {
                Log::warning('⚠️ [Student] Tentative de marquage notification non autorisé', [
                    'notification_id' => $id,
                    'student_id' => $student->id,
                ]);
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            $notification->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

            Log::info('✅ [Student] Notification marquée comme lue', [
                'notification_id' => $id,
                'student_id' => $student->id,
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur marquage notification', [
                'notification_id' => $id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['success' => false], 500);
        }
    }

    // ✅ Marquer toutes les notifications comme lues
    public function markAllAsRead()
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            $count = CoursNotification::where('student_id', $student->id)
                ->where('is_read', false)
                ->update([
                    'is_read' => true,
                    'read_at' => now(),
                ]);

            Log::info('✅ [Student] Toutes les notifications marquées comme lues', [
                'student_id' => $student->id,
                'count' => $count,
            ]);

            return response()->json(['success' => true, 'count' => $count]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur marquage tout comme lu', [
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['success' => false], 500);
        }
    }
}
