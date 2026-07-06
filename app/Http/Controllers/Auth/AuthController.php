<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Afficher la page de login
    public function showLoginForm()
    {
        if (auth()->check()) {
            if (auth()->user()->isAdmin()) {
                return redirect()->route('admin.dashboard');
            }
            if (auth()->user()->isStudent()) {
                return redirect()->route('student.dashboard');
            }
            return redirect('/');
        }
        return Inertia::render('Auth/Login');
    }

    // Traiter la connexion
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        // Vérifier si le compte existe
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['❌ Aucun compte trouvé avec cet email.'],
            ]);
        }

        // Vérifier si le compte est actif
        if (!$user->is_active) {
            throw ValidationException::withMessages([
                'email' => ['❌ Votre compte est désactivé. Contactez l\'administrateur.'],
            ]);
        }

        // Tenter la connexion
        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => ['❌ Email ou mot de passe incorrect.'],
            ]);
        }

        // Mettre à jour la dernière connexion
        $user->update(['last_login_at' => now()]);

        // Rediriger selon le rôle
        $request->session()->regenerate();

        return $this->redirectBasedOnRole($user);
    }

    // Déconnexion
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    // Redirection selon le rôle
    protected function redirectBasedOnRole(User $user)
    {
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->isStudent()) {
            return redirect()->route('student.dashboard');
        }

        return redirect('/');
    }
}
