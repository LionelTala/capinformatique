<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PreInscription;
use Illuminate\Http\Request;

class PreInscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telephone' => 'required|string|max:50',
            'ville' => 'nullable|string|max:255',
            'formation' => 'required|string|max:255',
            'formation_id' => 'nullable|string',
        ]);

        $preInscription = PreInscription::create([
            'nom_complet' => $validated['nom_complet'],
            'email' => $validated['email'],
            'telephone' => $validated['telephone'],
            'ville' => $validated['ville'],
            'formation' => $validated['formation'],
            'formation_id' => $validated['formation_id'],
            'statut' => 'en_attente',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre pré-inscription a été enregistrée avec succès !',
            'data' => $preInscription,
        ]);
    }
}
