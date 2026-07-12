<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\CoursNotification;
use App\Models\Formation;
use App\Models\Vague;
use App\Models\Certification;
use App\Models\Student;
use App\Events\NewCoursEvent;
use App\Events\NewCoursStudentEvent;
use App\Events\NotificationCreated;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CoursController extends Controller
{
    public function index(Request $request) // ✅ Ajouter Request
{
    try {
        $cours = Cours::with(['formation', 'vague', 'certification'])
            ->orderBy('created_at', 'desc')
            ->paginate(15) // ✅ pagination ajoutée
            ->withQueryString() // ✅ conserve les filtres
            ->through(function ($c) {
                return [
                    'id' => $c->id,
                    'titre' => $c->titre,
                    'description' => $c->description,
                    'type' => $c->type,
                    'viewed_count' => $c->viewed_count,
                    'is_active' => $c->is_active,
                    'has_video' => $c->is_video,
                    'has_files' => !empty($c->contenu),
                    'total_students' => $c->students->count(),
                    'formation' => $c->formation ? [
                        'id' => $c->formation->id,
                        'name' => $c->formation->name,
                    ] : null,
                    'vague' => $c->vague ? [
                        'id' => $c->vague->id,
                        'name' => $c->vague->name,
                    ] : null,
                    'certification' => $c->certification ? [
                        'id' => $c->certification->id,
                        'titre' => $c->certification->titre,
                    ] : null,
                    'created_at' => $c->created_at->format('d/m/Y H:i'),
                    'notification_sent' => $c->has_notification_sent,
                ];
            });

        return Inertia::render('Admin/Cours/Index', [
            'cours' => $cours,
        ]);
    } catch (\Exception $e) {
        Log::error('Erreur chargement cours', [
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

        return Inertia::render('Admin/Cours/Create', [
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
                'video_url' => 'nullable|url|max:500',
                'video_title' => 'nullable|string|max:255',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            $cours = DB::transaction(function () use ($request, $validated) {
                // Gérer les fichiers
                $contenu = [];
                if ($request->hasFile('files')) {
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('cours', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                }

                // Nettoyer l'URL de la vidéo
                $videoUrl = $validated['video_url'] ?? null;
                if ($videoUrl) {
                    // Convertir les liens YouTube en embed si nécessaire
                    if (strpos($videoUrl, 'watch?v=') !== false) {
                        parse_str(parse_url($videoUrl, PHP_URL_QUERY), $params);
                        if (isset($params['v'])) {
                            $videoUrl = 'https://www.youtube.com/watch?v=' . $params['v'];
                        }
                    }
                }

                $cours = Cours::create([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'contenu' => $contenu,
                    'video_url' => $videoUrl,
                    'video_title' => $validated['video_title'] ?? null,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['vague_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'type' => $validated['type'],
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                // Envoyer les notifications si demandé
                if ($validated['send_notification'] ?? true) {
                    $this->sendNotifications($cours);
                }

                return $cours;
            });

            Log::info('Cours créé', [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'created_by' => auth()->id(),
                'notification_sent' => $validated['send_notification'] ?? true,
            ]);

            return redirect()->route('admin.cours.index')
                ->with('success', "✅ Cours '{$cours->titre}' créé avec succès !" .
                    (($validated['send_notification'] ?? true) ? ' 🔔 Les étudiants ont été notifiés.' : ''));

        } catch (\Exception $e) {
            Log::error('Erreur création cours', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->except(['files']),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }
private function sendNotifications(Cours $cours)
{
    $students = $cours->students;

    foreach ($students as $student) {
        try {
            $notification = Notification::create([
                'user_id' => $student->user_id,
                'user_creator_id' => auth()->id(),
                'type' => 'cours',
                'notifiable_id' => $cours->id,
                'notifiable_type' => Cours::class,
                'title' => "📚 {$cours->titre}",
                'message' => "Nouveau cours '{$cours->titre}' disponible !",
                'link' => "/student/cours/{$cours->id}",
                'data' => [
                    'video_url' => $cours->video_url,
                    'video_title' => $cours->video_title,
                    'has_video' => !empty($cours->video_url),
                    'has_files' => !empty($cours->contenu),
                    'cours_type' => $cours->type,
                ],
            ]);

            broadcast(new NotificationCreated($notification));

        } catch (\Exception $e) {
            Log::warning('Erreur notification étudiant', [
                'student_id' => $student->id,
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
            ]);
        }
    }

    // Confirmation aux admins (optionnel)
    try {
        $admins = User::all()->filter(fn ($u) => $u->isAdmin());
        foreach ($admins as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'user_creator_id' => auth()->id(),
                'type' => 'cours',
                'notifiable_id' => $cours->id,
                'notifiable_type' => Cours::class,
                'title' => "📚 Cours créé : {$cours->titre}",
                'message' => "Le cours '{$cours->titre}' a été créé et notifié aux étudiants.",
                'link' => "/admin/cours/{$cours->id}",
            ]);
            broadcast(new NotificationCreated($notification));
        }
    } catch (\Exception $e) {
        Log::warning('Erreur notification admin', [
            'cours_id' => $cours->id,
            'message' => $e->getMessage(),
        ]);
    }

    $cours->update([
        'has_notification_sent' => true,
        'notification_sent_at' => now(),
    ]);

    Log::info('Notifications cours envoyées', [
        'cours_id' => $cours->id,
        'titre' => $cours->titre,
        'students_count' => $students->count(),
    ]);
}
    public function show(Cours $cours)
    {
        $cours->load(['formation', 'vague', 'certification']);

        $viewedStudents = $cours->vues()->with('student')->get()->map(function ($vue) {
            return [
                'id' => $vue->student->id,
                'name' => $vue->student->full_name,
                'matricule' => $vue->student->matricule,
                'viewed_at' => $vue->viewed_at->format('d/m/Y H:i'),
            ];
        });

        $totalStudents = $cours->students->count();

        return Inertia::render('Admin/Cours/Show', [
            'cours' => [
                'id' => $cours->id,
                'titre' => $cours->titre,
                'description' => $cours->description,
                'contenu' => $cours->contenu,
                'video_url' => $cours->video_url,
                'video_title' => $cours->video_title,
                'video_embed_url' => $cours->embed_video_url,
                'video_thumbnail' => $cours->video_thumbnail,
                'type' => $cours->type,
                'viewed_count' => $cours->viewed_count,
                'total_students' => $totalStudents,
                'has_notification_sent' => $cours->has_notification_sent,
                'notification_sent_at' => $cours->notification_sent_at?->format('d/m/Y H:i'),
                'formation' => $cours->formation ? [
                    'id' => $cours->formation->id,
                    'name' => $cours->formation->name,
                ] : null,
                'vague' => $cours->vague ? [
                    'id' => $cours->vague->id,
                    'name' => $cours->vague->name,
                ] : null,
                'certification' => $cours->certification ? [
                    'id' => $cours->certification->id,
                    'titre' => $cours->certification->titre,
                ] : null,
            ],
            'viewedStudents' => $viewedStudents,
            'notViewedStudents' => $cours->not_viewed_students->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->full_name,
                    'matricule' => $student->matricule,
                ];
            }),
        ]);
    }

    public function edit(Cours $cours)
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

        return Inertia::render('Admin/Cours/Edit', [
            'cours' => [
                'id' => $cours->id,
                'titre' => $cours->titre,
                'description' => $cours->description,
                'contenu' => $cours->contenu,
                'video_url' => $cours->video_url,
                'video_title' => $cours->video_title,
                'formation_id' => $cours->formation_id,
                'type' => $cours->type,
                'vague_id' => $cours->vague_id,
                'certification_id' => $cours->certification_id,
                'is_active' => $cours->is_active,
                'order' => $cours->order,
            ],
            'formations' => $formations,
        ]);
    }

    public function update(Request $request, Cours $cours)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'formation_id' => 'required|exists:formations,id',
                'type' => 'required|in:vague,certification',
                'vague_id' => 'required_if:type,vague|nullable|exists:vagues,id',
                'certification_id' => 'required_if:type,certification|nullable|exists:certifications,id',
                'video_url' => 'nullable|url|max:500',
                'video_title' => 'nullable|string|max:255',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            DB::transaction(function () use ($request, $cours, $validated) {
                // Gérer les nouveaux fichiers
                if ($request->hasFile('files')) {
                    $contenu = $cours->contenu ?? [];
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('cours', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                    $cours->contenu = $contenu;
                }

                // Nettoyer l'URL de la vidéo
                $videoUrl = $validated['video_url'] ?? null;
                if ($videoUrl) {
                    if (strpos($videoUrl, 'watch?v=') !== false) {
                        parse_str(parse_url($videoUrl, PHP_URL_QUERY), $params);
                        if (isset($params['v'])) {
                            $videoUrl = 'https://www.youtube.com/watch?v=' . $params['v'];
                        }
                    }
                }

                $cours->update([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'video_url' => $videoUrl,
                    'video_title' => $validated['video_title'] ?? null,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['vague_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'type' => $validated['type'],
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                // Envoyer les notifications si demandé (et pas déjà envoyé)
                if (($validated['send_notification'] ?? false) && !$cours->has_notification_sent) {
                    $this->sendNotifications($cours);
                }
            });

            Log::info('Cours mis à jour', [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.cours.index')
                ->with('success', "✅ Cours '{$cours->titre}' mis à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour cours', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Cours $cours)
    {
        try {
            $titre = $cours->titre;

            DB::transaction(function () use ($cours) {
                // Supprimer les fichiers
                if ($cours->contenu) {
                    foreach ($cours->contenu as $file) {
                        $path = str_replace(asset('storage/'), '', $file['url']);
                        Storage::disk('public')->delete($path);
                    }
                }

                // Supprimer les vues et notifications
                $cours->vues()->delete();
                $cours->notifications()->delete();
                $cours->delete();
            });

            Log::info('Cours supprimé', [
                'cours_id' => $cours->id,
                'titre' => $titre,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Cours '{$titre}' supprimé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression cours', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Cours $cours)
    {
        try {
            $cours->update(['is_active' => !$cours->is_active]);

            $status = $cours->is_active ? 'activé' : 'désactivé';

            Log::info('Cours ' . $status, [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Cours '{$cours->titre}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut cours', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function resendNotifications(Cours $cours)
    {
        try {
            if ($cours->has_notification_sent) {
                return redirect()->back()
                    ->with('warning', "⚠️ Les notifications pour '{$cours->titre}' ont déjà été envoyées.");
            }

            $this->sendNotifications($cours);

            Log::info('Notifications renvoyées', [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'sent_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Notifications envoyées pour '{$cours->titre}' !");

        } catch (\Exception $e) {
            Log::error('Erreur envoi notifications', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de l\'envoi des notifications.');
        }
    }

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
                        'is_read' => $n->is_read,
                        'created_at' => $n->created_at->diffForHumans(),
                    ];
                });

            return response()->json($notifications);

        } catch (\Exception $e) {
            Log::error('Erreur récupération notifications', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([]);
        }
    }

    public function markNotificationAsRead($id)
    {
        try {
            $notification = CoursNotification::findOrFail($id);
            $notification->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('Erreur marquage notification', [
                'notification_id' => $id,
                'message' => $e->getMessage(),
            ]);

            return response()->json(['success' => false], 500);
        }
    }
}
