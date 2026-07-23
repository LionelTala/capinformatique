<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Activite;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {


        $activites = Activite::where('is_active', true)
            ->orderBy('date')
            ->get()
            ->map(function ($activite) {
                return [
                    'id' => $activite->id,
                    'title' => $activite->title,
                    'excerpt' => $activite->excerpt,
                    'image_url' => $activite->image_url,
                    'tag' => $activite->tag,
                    'formatted_date' => $activite->formatted_date,
                    'lien' => $activite->lien,
                ];
            });

        return Inertia::render('public/Home', [
             'activites' => $activites,
        ]);
    }
}
