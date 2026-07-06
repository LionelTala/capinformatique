<?php

use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\FormationController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VagueController;
use App\Http\Controllers\Public\CandidatureController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;

 Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/formations', [App\Http\Controllers\Public\FormationController::class, 'index'])->name('formations.public');
Route::get('/certification', [App\Http\Controllers\Public\CertificationController::class, 'index'])->name('certification.public');
Route::get('/preinscription', [CandidatureController::class, 'create'])->name('candidature.create');
Route::post('/candidatures', [CandidatureController::class, 'store'])->name('candidature.store');
Route::get('/candidature/success', [CandidatureController::class, 'success'])->name('candidature.success');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});


// Route for admin dashboard
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::post('/users/{user}/toggle-active', [UserController::class, 'toggleActive'])->name('users.toggle-active');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
     Route::resource('/formations', FormationController::class);
    Route::post('/formations/{formation}/toggle-active', [FormationController::class, 'toggleActive'])->name('formations.toggle-active');
    // routes/web.php - Ajouter dans le groupe admin
    Route::resource('/certifications', CertificationController::class);
    Route::post('/certifications/{certification}/toggle-active', [CertificationController::class, 'toggleActive'])->name('certifications.toggle-active');
    Route::resource('/vagues', VagueController::class);
    Route::post('/vagues/{vague}/toggle-active', [VagueController::class, 'toggleActive'])->name('vagues.toggle-active');

    // <-------- Candidature routes for admin

    // Candidatures
    Route::get('/candidatures', [App\Http\Controllers\Admin\CandidatureController::class, 'index'])->name('candidatures.index');
    Route::get('/candidatures/{candidature}', [App\Http\Controllers\Admin\CandidatureController::class, 'show'])->name('candidatures.show');
    Route::post('/candidatures/{candidature}/accepter', [App\Http\Controllers\Admin\CandidatureController::class, 'accepter'])->name('candidatures.accepter');
    Route::post('/candidatures/{candidature}/refuser', [App\Http\Controllers\Admin\CandidatureController::class, 'refuser'])->name('candidatures.refuser');
    Route::post('/candidatures/{candidature}/en-cours', [App\Http\Controllers\Admin\CandidatureController::class, 'mettreEnCours'])->name('candidatures.en-cours');
    Route::post('/candidatures/{candidature}/attribuer-vague', [App\Http\Controllers\Admin\CandidatureController::class, 'attribuerVague'])->name('candidatures.attribuer-vague');

    /// Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');

    // hero slides
    Route::resource('/hero-slides', HeroSlideController::class);
    Route::post('/hero-slides/{heroSlide}/toggle-active', [HeroSlideController::class, 'toggleActive'])->name('hero-slides.toggle-active');
});
