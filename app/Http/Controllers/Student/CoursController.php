<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\CoursVue;
use App\Models\CoursNotification;
use App\Models\Student;
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

            // ✅ Récupérer les cours selon le type d'étudiant
            $cours = Cours::where('is_active', true)
                ->where(function ($query) use ($student) {
                    // Si l'étudiant a une vague
                    if ($student->vague_id) {
                        $query->orWhere(function ($q) use ($student) {
                            $q->where('type', 'vague')
                                ->where('vague_id', $student->vague_id);
                        });
                    }

                    // Si l'étudiant a une certification
                    if ($student->certification_id) {
                        $query->orWhere(function ($q) use ($student) {
                            $q->where('type', 'certification')
                                ->where('certification_id', $student->certification_id);
                        });
                    }
                })
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($c) use ($student) {
                    // Vérifier si l'étudiant a déjà vu ce cours
                    $vue = CoursVue::where('cours_id', $c->id)
                        ->where('student_id', $student->id)
                        ->first();

                    return [
                        'id' => $c->id,
                        'titre' => $c->titre,
                        'description' => $c->description,
                        'contenu' => $c->contenu,
                        'video_url' => $c->video_url,
                        'video_title' => $c->video_title,
                        'has_video' => !empty($c->video_url),
                        'has_files' => !empty($c->contenu),
                        'viewed' => $vue !== null,
                        'viewed_at' => $vue ? $vue->viewed_at->format('d/m/Y H:i') : null,
                        'created_at' => $c->created_at->format('d/m/Y'),
                        'formation' => [
                            'id' => $c->formation_id,
                            'name' => $c->formation?->name,
                        ],
                    ];
                });

            // ✅ Statistiques
            $stats = [
                'total' => $cours->count(),
                'viewed' => $cours->filter(fn($c) => $c['viewed'])->count(),
                'not_viewed' => $cours->filter(fn($c) => !$c['viewed'])->count(),
            ];

            return Inertia::render('Student/Cours/Index', [
                'cours' => $cours,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement cours étudiant', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ Détail d'un cours
    public function show(Cours $cours)
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            // ✅ Vérifier que l'étudiant a accès à ce cours
            $hasAccess = false;

            if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
                $hasAccess = true;
            }

            if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                abort(403, '❌ Vous n\'avez pas accès à ce cours.');
            }

            // ✅ Vérifier si déjà vu
            $vue = CoursVue::where('cours_id', $cours->id)
                ->where('student_id', $student->id)
                ->first();

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
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur affichage cours', [
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

            // ✅ Vérifier l'accès
            $hasAccess = false;
            if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
                $hasAccess = true;
            }
            if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            // ✅ Marquer comme vu
            CoursVue::firstOrCreate([
                'cours_id' => $cours->id,
                'student_id' => $student->id,
            ], [
                'viewed_at' => now(),
            ]);

            // ✅ Incrémenter le compteur
            $cours->increment('viewed_count');

            Log::info('Cours marqué comme vu', [
                'cours_id' => $cours->id,
                'student_id' => $student->id,
                'student_name' => $student->full_name,
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('Erreur marquage cours vu', [
                'cours_id' => $cours->id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
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

            return response()->json([
                'notifications' => $notifications,
                'unread_count' => $unreadCount,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur récupération notifications', [
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
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
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            $notification->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('Erreur marquage notification', [
                'notification_id' => $id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
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

            CoursNotification::where('student_id', $student->id)
                ->where('is_read', false)
                ->update([
                    'is_read' => true,
                    'read_at' => now(),
                ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('Erreur marquage tout comme lu', [
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
            ]);

            return response()->json(['success' => false], 500);
        }
    }
    
}
