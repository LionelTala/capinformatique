<?php

namespace App\Http\Controllers\Public;

use App\Events\NewCandidatureEvent;
use App\Http\Controllers\Controller;
use App\Models\Candidature;
use App\Models\Formation;
use App\Models\Certification;
use App\Models\Notification;
use App\Models\Vague;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CandidatureController extends Controller
{
    // ✅ Page de pré-inscription (unique)
    public function create(Request $request)
    {
        $formationId = $request->query('formation');
        $certificationId = $request->query('certification');
        $type = $request->query('type', 'formation');

        $formation = null;
        $certification = null;
        $vagues = [];

        // Si formation
        if ($formationId) {
            $formation = Formation::find($formationId);
            if ($formation) {
                $vagues = Vague::where('formation_id', $formationId)
                    ->where('is_active', true)
                    ->where('date_debut', '>=', now())
                    ->orderBy('date_debut')
                    ->get()
                    ->map(function ($vague) {
                        return [
                            'id' => $vague->id,
                            'name' => $vague->name,
                            'date_debut' => $vague->date_debut->format('d/m/Y'),
                            'places' => $vague->capacite ? $vague->places_restantes : 'Illimité',
                        ];
                    });
            }
        }

        // Si certification (pas de vagues)
        if ($certificationId) {
            $certification = Certification::with('formation')->find($certificationId);
        }

        // Vérifier qu'il y a au moins une formation ou certification
        if (!$formation && !$certification) {
            return redirect()->route('formations.public')
                ->with('error', '❌ Formation ou certification non trouvée.');
        }

        return Inertia::render('public/Preinscription', [
            'type' => $type,
            'formation' => $formation ? [
                'id' => $formation->id,
                'name' => $formation->name,
                'abbreviation' => $formation->abbreviation,
            ] : null,
            'certification' => $certification ? [
                'id' => $certification->id,
                'titre' => $certification->titre,
                'formation' => $certification->formation?->name,
            ] : null,
            'vagues' => $vagues,
            // ✅ Indicateur pour savoir si on doit afficher les vagues
            'showVagues' => $type === 'formation' && $vagues->count() > 0,
        ]);
    }

    // Soumettre la candidature
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|in:formation,certification',
                'formation_id' => 'nullable|exists:formations,id',
                'certification_id' => 'nullable|exists:certifications,id',
                'vague_id' => 'nullable|exists:vagues,id',
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'telephone' => 'required|string|max:20',
                'niveau_scolaire' => 'nullable|string|max:255',
                'message' => 'nullable|string',
            ]);

            // Valider le numéro WhatsApp
            $phone = preg_replace('/[^0-9]/', '', $validated['telephone']);
            if (!preg_match('/^(237|6)/', $phone)) {
                return redirect()->back()
                    ->withInput()
                    ->with('error', '❌ Le numéro doit être un numéro WhatsApp valide (+237 ou 6...).');
            }

            $candidature = DB::transaction(function () use ($validated) {
                return Candidature::create([
                    'type' => $validated['type'],
                    'formation_id' => $validated['formation_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'vague_id' => $validated['vague_id'] ?? null,
                    'nom' => $validated['nom'],
                    'prenom' => $validated['prenom'],
                    'email' => $validated['email'],
                    'telephone' => $validated['telephone'],
                    'niveau_scolaire' => $validated['niveau_scolaire'] ?? null,
                    'message' => $validated['message'] ?? null,
                    'statut' => 'en_attente',
                ]);
            });
            $notification = Notification::create([
                'user_id' => null, // notification globale, visible par tous les admins
                'candidature_id' => $candidature->id,
                'type' => 'nouvelle_candidature',
                'title' => 'Nouvelle candidature',
                'message' => "{$candidature->prenom} {$candidature->nom} a soumis une candidature.",
                'link' => "/admin/candidatures/{$candidature->id}",
            ]);

            broadcast(new NewCandidatureEvent($notification));

            Log::info('Nouvelle candidature', [
                'candidature_id' => $candidature->id,
                'nom' => $candidature->nom_complet,
                'type' => $candidature->type,
            ]);

            // 🔔 Événement broadcast (à implémenter)

            return redirect()->route('candidature.success')
                ->with('success', '✅ Votre candidature a été envoyée avec succès ! Nous vous contacterons sous 48h.');

        } catch (\Exception $e) {
            Log::error('Erreur soumission candidature', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
        }
    }

    public function success()
    {
        return Inertia::render('public/CandidatureSuccess');
    }
}
