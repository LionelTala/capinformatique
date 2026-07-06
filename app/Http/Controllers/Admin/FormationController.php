<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FormationController extends Controller
{
    public function index()
    {
        try {
            $formations = Formation::orderBy('order')
                ->orderBy('name')
                ->get()
                ->map(function ($formation) {
                    return [
                        'id' => $formation->id,
                        'name' => $formation->name,
                        'abbreviation' => $formation->abbreviation,
                        'slug' => $formation->slug,
                        'description' => $formation->description,
                        'debouches' => $formation->debouches,
                        'duration' => $formation->duration,
                        'diplome' => $formation->diplome,
                        'frais' => $formation->frais,
                        'frais_formatted' => $formation->formatted_frais ?? '0 FCFA',
                        'image' => $formation->image,
                        'image_url' => $formation->image_url ?? '/assets/images/placeholder.jpg',
                        'lien_externe' => $formation->lien_externe,
                        'lien_label' => $formation->lien_label,
                        'is_active' => $formation->is_active,
                        'order' => $formation->order,
                    ];
                });

            // Ajouter un log pour déboguer
            \Log::info('Formations chargées', ['count' => $formations->count()]);

            return Inertia::render('Admin/Formations/Index', [
                'formations' => $formations,
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur chargement formations', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        return Inertia::render('Admin/Formations/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:formations,name',
                'abbreviation' => 'required|string|max:10|unique:formations,abbreviation',
                'description' => 'required|string',
                'debouches' => 'required|string',
                'duration' => 'required|string|max:255',
                'diplome' => 'required|string|max:255',
                'frais' => 'required|numeric|min:0',
                'image' => 'nullable|image|max:2048',
                'lien_externe' => 'nullable|url|max:255',
                'lien_label' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
            ]);

            $formation = DB::transaction(function () use ($request, $validated) {
                // Gérer l'image
                $imagePath = null;
                if ($request->hasFile('image')) {
                    $imagePath = $request->file('image')->store('formations', 'public');
                    $imagePath = basename($imagePath);
                }

                return Formation::create([
                    'name' => $validated['name'],
                    'abbreviation' => $validated['abbreviation'],
                    'description' => $validated['description'],
                    'debouches' => $validated['debouches'],
                    'duration' => $validated['duration'],
                    'diplome' => $validated['diplome'],
                    'frais' => $validated['frais'],
                    'image' => $imagePath,
                    'lien_externe' => $validated['lien_externe'] ?? null,
                    'lien_label' => $validated['lien_label'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);
            });

            Log::info('Formation créée', [
                'formation_id' => $formation->id,
                'name' => $formation->name,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.formations.index')
                ->with('success', "✅ Formation {$formation->name} créée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur création formation', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->except(['_token']),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    public function edit(Formation $formation)
    {
        return Inertia::render('Admin/Formations/Edit', [
            'formation' => [
                'id' => $formation->id,
                'name' => $formation->name,
                'abbreviation' => $formation->abbreviation,
                'description' => $formation->description,
                'debouches' => $formation->debouches,
                'duration' => $formation->duration,
                'diplome' => $formation->diplome,
                'frais' => $formation->frais,
                'image' => $formation->image,
                'image_url' => $formation->image_url,
                'lien_externe' => $formation->lien_externe,
                'lien_label' => $formation->lien_label,
                'is_active' => $formation->is_active,
                'order' => $formation->order,
            ],
        ]);
    }

    public function update(Request $request, Formation $formation)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:formations,name,' . $formation->id,
                'abbreviation' => 'required|string|max:10|unique:formations,abbreviation,' . $formation->id,
                'description' => 'required|string',
                'debouches' => 'required|string',
                'duration' => 'required|string|max:255',
                'diplome' => 'required|string|max:255',
                'frais' => 'required|numeric|min:0',
                'image' => 'nullable|image|max:2048',
                'lien_externe' => 'nullable|url|max:255',
                'lien_label' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
            ]);

            DB::transaction(function () use ($request, $formation, $validated) {
                // Gérer l'image
                if ($request->hasFile('image')) {
                    // Supprimer l'ancienne image
                    if ($formation->image) {
                        Storage::disk('public')->delete('formations/' . $formation->image);
                    }
                    $imagePath = $request->file('image')->store('formations', 'public');
                    $formation->image = basename($imagePath);
                }

                $formation->update([
                    'name' => $validated['name'],
                    'abbreviation' => $validated['abbreviation'],
                    'description' => $validated['description'],
                    'debouches' => $validated['debouches'],
                    'duration' => $validated['duration'],
                    'diplome' => $validated['diplome'],
                    'frais' => $validated['frais'],
                    'lien_externe' => $validated['lien_externe'] ?? null,
                    'lien_label' => $validated['lien_label'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);
            });

            Log::info('Formation mise à jour', [
                'formation_id' => $formation->id,
                'name' => $formation->name,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.formations.index')
                ->with('success', "✅ Formation {$formation->name} mise à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour formation', [
                'formation_id' => $formation->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Formation $formation)
    {
        try {
            $name = $formation->name;

            DB::transaction(function () use ($formation) {
                // Supprimer l'image
                if ($formation->image) {
                    Storage::disk('public')->delete('formations/' . $formation->image);
                }
                $formation->delete();
            });

            Log::info('Formation supprimée', [
                'formation_id' => $formation->id,
                'name' => $name,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Formation {$name} supprimée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression formation', [
                'formation_id' => $formation->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Formation $formation)
    {
        try {
            $formation->update(['is_active' => !$formation->is_active]);

            $status = $formation->is_active ? 'activée' : 'désactivée';

            Log::info('Formation ' . $status, [
                'formation_id' => $formation->id,
                'name' => $formation->name,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Formation {$formation->name} {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut formation', [
                'formation_id' => $formation->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }
}
