<?php
// app/Http/Controllers/Admin/LessonController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\Lesson;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LessonController extends Controller
{
    /**
     * Afficher les détails d'une leçon
     */
    public function show(Lesson $lesson)
    {
        try {
            $lesson->load(['cours']);

            Log::info('👁️ [Lesson] Show - Début', [
                'lesson_id' => $lesson->id,
                'user' => auth()->id()
            ]);

            // Récupérer les vues de la leçon
            $viewedStudents = $lesson->vues()->with('student')->get()->map(function ($vue) {
                return [
                    'id' => $vue->student->id,
                    'name' => $vue->student->full_name,
                    'matricule' => $vue->student->matricule,
                    'viewed_at' => $vue->viewed_at->format('d/m/Y H:i'),
                ];
            });

            // Récupérer les étudiants qui n'ont pas vu
            $destinataires = $this->getDestinataires($lesson->cours);
            $notViewedStudents = $destinataires->reject(function ($student) use ($viewedStudents) {
                return $viewedStudents->contains('id', $student->id);
            })->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->full_name,
                    'matricule' => $student->matricule,
                ];
            })->values();

            Log::info('✅ [Lesson] Show - Succès', [
                'lesson_id' => $lesson->id,
                'viewed_count' => $viewedStudents->count(),
                'total_students' => $destinataires->count()
            ]);

            return Inertia::render('Admin/Cours/ShowLesson', [
                'lesson' => [
                    'id' => $lesson->id,
                    'titre' => $lesson->titre,
                    'description' => $lesson->description,
                    'contenu' => $lesson->contenu,
                    'video_url' => $lesson->video_url,
                    'video_title' => $lesson->video_title,
                    'video_embed_url' => $lesson->video_embed_url,
                    'has_video' => $lesson->has_video,
                    'has_files' => $lesson->has_files,
                    'files' => $lesson->files,
                    'order' => $lesson->order,
                    'is_active' => $lesson->is_active,
                    'created_at' => $lesson->created_at->format('d/m/Y H:i'),
                    'cours' => [
                        'id' => $lesson->cours->id,
                        'titre' => $lesson->cours->titre,
                        'formation' => [
                            'name' => $lesson->cours->formation?->name,
                        ],
                    ],
                ],
                'viewedStudents' => $viewedStudents,
                'notViewedStudents' => $notViewedStudents,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Lesson] Show - Erreur', [
                'lesson_id' => $lesson->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    /**
     * Afficher le formulaire d'édition d'une leçon
     */
    public function edit(Lesson $lesson)
    {
        try {
            $lesson->load(['cours']);

            Log::info('✏️ [Lesson] Edit - Début', [
                'lesson_id' => $lesson->id,
                'user' => auth()->id()
            ]);

            return Inertia::render('Admin/Cours/EditLesson', [
                'lesson' => $lesson,
                'cours' => $lesson->cours,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Lesson] Edit - Erreur', [
                'lesson_id' => $lesson->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    /**
     * Créer une nouvelle leçon
     */
    public function store(Request $request, Cours $cours)
    {
        try {
            Log::info('💾 [Lesson] Store - Début', [
                'cours_id' => $cours->id,
                'user' => auth()->id()
            ]);

            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'contenu' => 'nullable|string',
                'video_url' => 'nullable|url|max:500',
                'video_title' => 'nullable|string|max:255',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $filesData = [];
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('lessons', 'public');
                    $filesData[] = [
                        'url' => asset('storage/' . $path),
                        'name' => $file->getClientOriginalName(),
                        'size' => $file->getSize(),
                        'extension' => $file->getClientOriginalExtension(),
                    ];
                }
            }

            $lesson = Lesson::create([
                'cours_id' => $cours->id,
                'titre' => $validated['titre'],
                'description' => $validated['description'] ?? null,
                'contenu' => $validated['contenu'] ?? null,
                'video_url' => $validated['video_url'] ?? null,
                'video_title' => $validated['video_title'] ?? null,
                'files' => $filesData,
                'order' => $validated['order'] ?? 0,
                'is_active' => $validated['is_active'] ?? true,
            ]);

            Log::info('✅ [Lesson] Store - Succès', [
                'lesson_id' => $lesson->id,
                'cours_id' => $cours->id,
                'titre' => $lesson->titre,
            ]);

            return redirect()->route('admin.cours.show', $cours->id)
                ->with('success', "✅ Leçon '{$lesson->titre}' créée avec succès !");

        } catch (\Exception $e) {
            Log::error('❌ [Lesson] Store - Erreur', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    /**
     * Mettre à jour une leçon
     */
    public function update(Request $request, Lesson $lesson)
    {
        try {
            Log::info('🔄 [Lesson] Update - Début', [
                'lesson_id' => $lesson->id,
                'user' => auth()->id()
            ]);

            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'contenu' => 'nullable|string',
                'video_url' => 'nullable|url|max:500',
                'video_title' => 'nullable|string|max:255',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            if ($request->hasFile('files')) {
                $filesData = $lesson->files ?? [];
                foreach ($request->file('files') as $file) {
                    $path = $file->store('lessons', 'public');
                    $filesData[] = [
                        'url' => asset('storage/' . $path),
                        'name' => $file->getClientOriginalName(),
                        'size' => $file->getSize(),
                        'extension' => $file->getClientOriginalExtension(),
                    ];
                }
                $validated['files'] = $filesData;
            }

            $lesson->update($validated);

            Log::info('✅ [Lesson] Update - Succès', [
                'lesson_id' => $lesson->id,
                'titre' => $lesson->titre,
            ]);

            return redirect()->route('admin.cours.show', $lesson->cours_id)
                ->with('success', "✅ Leçon '{$lesson->titre}' mise à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('❌ [Lesson] Update - Erreur', [
                'lesson_id' => $lesson->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    /**
     * Supprimer une leçon
     */
    public function destroy(Lesson $lesson)
    {
        try {
            $titre = $lesson->titre;
            $coursId = $lesson->cours_id;

            Log::info('🗑️ [Lesson] Destroy - Début', [
                'lesson_id' => $lesson->id,
                'titre' => $titre,
                'user' => auth()->id()
            ]);

            if ($lesson->files) {
                foreach ($lesson->files as $file) {
                    $path = str_replace(asset('storage/'), '', $file['url']);
                    Storage::disk('public')->delete($path);
                }
            }

            $lesson->delete();

            Log::info('✅ [Lesson] Destroy - Succès', [
                'lesson_id' => $lesson->id,
                'titre' => $titre,
            ]);

            return redirect()->route('admin.cours.show', $coursId)
                ->with('success', "✅ Leçon '{$titre}' supprimée avec succès !");

        } catch (\Exception $e) {
            Log::error('❌ [Lesson] Destroy - Erreur', [
                'lesson_id' => $lesson->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    /**
     * Activer/Désactiver une leçon
     */
    public function toggleActive(Lesson $lesson)
    {
        try {
            $lesson->update(['is_active' => !$lesson->is_active]);
            $status = $lesson->is_active ? 'activée' : 'désactivée';

            Log::info('🔄 [Lesson] toggleActive - Succès', [
                'lesson_id' => $lesson->id,
                'titre' => $lesson->titre,
                'new_status' => $lesson->is_active,
            ]);

            return redirect()->back()
                ->with('success', "✅ Leçon '{$lesson->titre}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('❌ [Lesson] toggleActive - Erreur', [
                'lesson_id' => $lesson->id,
                'message' => $e->getMessage(),
            ]);
            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    /**
     * Récupérer les destinataires d'une leçon (hérité du cours)
     */
    private function getDestinataires(Cours $cours)
    {
        if ($cours->student_id) {
            return Student::where('id', $cours->student_id)->get();
        }

        if ($cours->vague_id) {
            $students = Student::where('vague_id', $cours->vague_id)->get();

            // Filtrer par tranche si nécessaire
            if ($cours->tranche_requise_id) {
                $tranche = Tranche::find($cours->tranche_requise_id);
                if ($tranche) {
                    $students = $students->filter(function ($student) use ($tranche) {
                        return $student->derniereTranchePayeeNumero() >= $tranche->numero;
                    });
                }
            }
            return $students;
        }

        return collect();
    }
}
