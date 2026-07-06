<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserController extends Controller
{
    // Liste des utilisateurs
    public function index()
    {
        try {
            $users = User::with('student')
                ->when(!auth()->user()->isSuperAdmin(), function ($query) {
                    $query->where('role', '!=', 'super_admin');
                })
                ->latest()
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'is_active' => $user->is_active,
                        'last_login_at' => $user->last_login_at?->diffForHumans(),
                        'student' => $user->student ? [
                            'first_name' => $user->student->first_name,
                            'last_name' => $user->student->last_name,
                            'matricule' => $user->student->matricule,
                        ] : null,
                    ];
                });

            return Inertia::render('Admin/Users/Index', [
                'users' => $users,
                'canCreate' => auth()->user()->isAdmin(),
                'canCreateAdminCentre' => auth()->user()->isSuperAdmin(),
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors du chargement des utilisateurs', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue lors du chargement des utilisateurs.');
        }
    }

    // Formulaire de création
    public function create()
    {
        try {
            if (!auth()->user()->isAdmin()) {
                abort(403, '❌ Vous n\'avez pas les droits pour créer un utilisateur.');
            }

            $roles = $this->getCreatableRoles();

            return Inertia::render('Admin/Users/Create', [
                'roles' => $roles,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors du chargement du formulaire de création', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('admin.users.index')
                ->with('error', '❌ Une erreur est survenue. Veuillez réessayer.');
        }
    }

    // Créer un utilisateur (avec transaction)
    public function store(Request $request)
    {
        try {
            // Vérifier les permissions
            if (!auth()->user()->isAdmin()) {
                abort(403, '❌ Vous n\'avez pas les droits pour créer un utilisateur.');
            }

            $roles = $this->getCreatableRoles();

            // Validation
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:users,name',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'role' => ['required', Rule::in($roles)],
                'is_active' => 'boolean',
            ]);

            // Transaction pour la création
            $user = DB::transaction(function () use ($validated) {
                return User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'role' => $validated['role'],
                    'is_active' => $validated['is_active'] ?? true,
                ]);
            });

            // Log de succès
            Log::info('Utilisateur créé avec succès', [
                'user_id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.users.index')
                ->with('success', "✅ Utilisateur {$user->name} créé avec succès !");

        } catch (ValidationException $e) {
            // Les erreurs de validation sont gérées automatiquement par Laravel
            throw $e;

        } catch (\Exception $e) {
            // Log de l'erreur
            Log::error('Erreur lors de la création de l\'utilisateur', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->except(['password', 'password_confirmation']),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création de l\'utilisateur. Veuillez réessayer.');
        }
    }

    // Activer/Désactiver un utilisateur
    public function toggleActive(User $user)
    {
        try {
            // Vérifier les permissions
            if (!auth()->user()->isAdmin()) {
                abort(403, '❌ Vous n\'avez pas les droits pour modifier cet utilisateur.');
            }

            // Empêcher de désactiver son propre compte
            if ($user->id === auth()->id()) {
                return redirect()->back()->with('error', '❌ Vous ne pouvez pas désactiver votre propre compte.');
            }

            // admin_centre ne peut pas modifier super_admin
            if (!auth()->user()->isSuperAdmin() && $user->isSuperAdmin()) {
                abort(403, '❌ Vous ne pouvez pas modifier un super administrateur.');
            }

            $newStatus = !$user->is_active;
            $user->update(['is_active' => $newStatus]);

            $statusText = $newStatus ? 'activé' : 'désactivé';

            Log::info('Statut utilisateur modifié', [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'new_status' => $newStatus,
                'modified_by' => auth()->id(),
            ]);

            return redirect()->back()->with('success', "✅ Utilisateur {$user->name} {$statusText} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur lors du changement de statut', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue lors du changement de statut.');
        }
    }

    // Supprimer un utilisateur (avec transaction)
    public function destroy(User $user)
    {
        try {
            // Vérifier les permissions
            if (!auth()->user()->isAdmin()) {
                abort(403, '❌ Vous n\'avez pas les droits pour supprimer cet utilisateur.');
            }

            // Empêcher de supprimer son propre compte
            if ($user->id === auth()->id()) {
                return redirect()->back()->with('error', '❌ Vous ne pouvez pas supprimer votre propre compte.');
            }

            // admin_centre ne peut pas supprimer super_admin
            if (!auth()->user()->isSuperAdmin() && $user->isSuperAdmin()) {
                abort(403, '❌ Vous ne pouvez pas supprimer un super administrateur.');
            }

            $name = $user->name;

            // Transaction pour la suppression
            DB::transaction(function () use ($user) {
                // Supprimer d'abord le student si existe
                if ($user->student) {
                    $user->student->delete();
                }
                // Puis supprimer l'utilisateur
                $user->delete();
            });

            Log::info('Utilisateur supprimé', [
                'deleted_user_id' => $user->id,
                'deleted_user_name' => $name,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()->with('success', "✅ Utilisateur {$name} supprimé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue lors de la suppression de l\'utilisateur.');
        }
    }

    // Rôles créables selon l'utilisateur connecté
    private function getCreatableRoles(): array
    {
        try {
            $user = auth()->user();

            if ($user->isSuperAdmin()) {
                return ['super_admin', 'admin_centre', 'admin'];
            }

            if ($user->isAdminCentre()) {
                return ['admin'];
            }

            return [];
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des rôles', [
                'message' => $e->getMessage(),
            ]);
            return [];
        }
    }
}
