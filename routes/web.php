<?php

use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\CoursController;
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
use App\Http\Controllers\Student\CoursController  as StudentCoursController;
use App\Http\Controllers\Admin\DevoirController as AdminDevoirController;
use App\Http\Controllers\Student\DevoirController as StudentDevoirController;
use App\Http\Controllers\Admin\EvaluationController as AdminEvaluationController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\EvaluationController as StudentEvaluationController;
use App\Http\Controllers\Admin\GalerieController;
use App\Http\Controllers\Public\GalerieController as PublicGalerieController;
use App\Http\Controllers\Admin\ActiviteController;
use App\Http\Controllers\Public\ActiviteController as PublicActiviteController;


 Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/formations', [App\Http\Controllers\Public\FormationController::class, 'index'])->name('formations.public');
Route::get('/certification', [App\Http\Controllers\Public\CertificationController::class, 'index'])->name('certification.public');
Route::get('/preinscription', [CandidatureController::class, 'create'])->name('candidature.create');
Route::post('/candidatures', [CandidatureController::class, 'store'])->name('candidature.store');
Route::get('/candidature/success', [CandidatureController::class, 'success'])->name('candidature.success');
Route::get('/galerie', [PublicGalerieController::class, 'index'])->name('galerie.public');
Route::get('/activites', [PublicActiviteController::class, 'index'])->name('activites.public');


     Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// Route for admin dashboard
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit'); // ⬅️ à ajouter
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update'); // ⬅️ à ajouter
    Route::post('users/{user}/toggle-active', [UserController::class, 'toggleActive'])->name('users.toggle-active');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

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

    // student management
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');
Route::get('/students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
Route::post('/students/{student}/toggle-active', [StudentController::class, 'toggleActive'])->name('students.toggle-active');
Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
Route::get('/students/vagues/{formationId}', [StudentController::class, 'getVaguesByFormation'])->name('students.vagues');
Route::get('/students/certifications/{formationId}', [StudentController::class, 'getCertificationsByFormation'])->name('students.certifications');


    // course management
     Route::get('/cours/vagues/{formationId}', [CoursController::class, 'getVaguesByFormation'])->name('cours.vagues');
    Route::get('/cours/certifications/{formationId}', [CoursController::class, 'getCertificationsByFormation'])->name('cours.certifications');
    Route::resource('/cours', CoursController::class);
    Route::post('/cours/{cours}/toggle-active', [CoursController::class, 'toggleActive'])->name('cours.toggle-active');
    Route::post('/cours/{cours}/resend-notifications', [CoursController::class, 'resendNotifications'])->name('cours.resend-notifications');

    // devoir management
    Route::get('/devoirs/vagues/{formationId}', [AdminDevoirController::class, 'getVaguesByFormation'])->name('devoirs.vagues');
    Route::get('/devoirs/certifications/{formationId}', [AdminDevoirController::class, 'getCertificationsByFormation'])->name('devoirs.certifications');
    Route::resource('/devoirs', AdminDevoirController::class);
    Route::post('/devoirs/{devoir}/toggle-active', [AdminDevoirController::class, 'toggleActive'])->name('devoirs.toggle-active');
    Route::post('/devoirs/{devoir}/resend-notifications', [AdminDevoirController::class, 'resendNotifications'])->name('devoirs.resend-notifications');
    Route::post('/soumissions/{soumission}/corriger', [AdminDevoirController::class, 'corriger'])->name('soumissions.corriger');

    // evaluation management
     Route::get('/evaluations/vagues/{formationId}', [AdminEvaluationController::class, 'getVaguesByFormation'])->name('evaluations.vagues');
    Route::get('/evaluations/certifications/{formationId}', [AdminEvaluationController::class, 'getCertificationsByFormation'])->name('evaluations.certifications');
    Route::resource('/evaluations', AdminEvaluationController::class);
    Route::post('/evaluations/{evaluation}/toggle-active', [AdminEvaluationController::class, 'toggleActive'])->name('evaluations.toggle-active');
    Route::post('/evaluations/{evaluation}/resend-notifications', [AdminEvaluationController::class, 'resendNotifications'])->name('evaluations.resend-notifications');
    Route::post('/soumissions-evaluations/{soumission}/corriger', [AdminEvaluationController::class, 'corriger'])->name('soumissions-evaluations.corriger');

    Route::resource('/galerie', GalerieController::class);
    Route::post('/galerie/{galerie}/toggle-active', [GalerieController::class, 'toggleActive'])->name('galerie.toggle-active');
    

    Route::resource('/activites', ActiviteController::class);
Route::post('/activites/{activite}/toggle-active', [ActiviteController::class, 'toggleActive'])->name('activites.toggle-active');
});



// Route for student dashboard
Route::middleware(['auth', 'student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [StudentDashboardController::class, 'index'])->name('dashboard');
       Route::get('/cours', [StudentCoursController::class, 'index'])->name('cours.index');
       Route::get('/cours/{cours}', [StudentCoursController::class, 'show'])->name('cours.show');

    // Marquer un cours comme vu
    Route::post('/cours/{cours}/view', [StudentCoursController::class, 'markAsViewed'])->name('cours.view');

    // devoir management
    Route::get('/devoirs', [StudentDevoirController::class, 'index'])->name('devoirs');
    Route::get('/devoirs/{devoir}', [StudentDevoirController::class, 'show'])->name('devoirs.show');
    Route::post('/devoirs/{devoir}/soumettre', [StudentDevoirController::class, 'soumettre'])->name('devoirs.soumettre');

    // evaluation management
    Route::get('/evaluations', [StudentEvaluationController::class, 'index'])->name('evaluations');
    Route::get('/evaluations/{evaluation}', [StudentEvaluationController::class, 'show'])->name('evaluations.show');
    Route::post('/evaluations/{evaluation}/soumettre', [StudentEvaluationController::class, 'soumettre'])->name('evaluations.soumettre');


 });

 Route::middleware('auth')->prefix('notifications')->name('notifications.')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('index');
    Route::post('/{id}/read', [NotificationController::class, 'markAsRead'])->name('read');
    Route::post('/read-all', [NotificationController::class, 'markAllAsRead'])->name('read-all');
});
Route::middleware(['auth'])->group(function () {
    Route::get('/profil', [ProfileController::class, 'index'])->name('profil');
    Route::post('/profil', [ProfileController::class, 'update'])->name('profil.update');
});
