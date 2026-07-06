<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Inertia\Inertia;

class FormationController extends Controller
{
    public function index()
    {
        // Récupérer les formations en ligne actives
        $formationsEnLigne = Formation::where('is_active', true)
            ->orderBy('order')
            ->orderBy('name')
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'name' => $formation->name ?? 'Formation sans nom',
                    'abbreviation' => $formation->abbreviation ?? 'N/A',
                    'description' => $formation->description ?? '',
                    'debouches' => $formation->debouches ?? '',
                    'duration' => $formation->duration ?? 'Non définie',
                    'diplome' => $formation->diplome ?? 'Non défini',
                    'frais' => $formation->frais ?? 0,
                    'frais_formatted' => $formation->formatted_frais ?? '0 FCFA',
                    'image_url' => $formation->image_url ?? '/assets/images/placeholder.jpg',
                    'lien_externe' => $formation->lien_externe,
                    'lien_label' => $formation->lien_label,
                ];
            });
 
        return Inertia::render('public/Formations', [
            'formationsEnLigne' => $formationsEnLigne,
        ]);
    }
}
