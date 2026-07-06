<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_admins' => User::whereIn('role', ['super_admin', 'admin_centre', 'admin'])->count(),
            'total_students' => User::whereIn('role', ['student_online', 'student_certif'])->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'user' => auth()->user(),
        ]);
    }
}
