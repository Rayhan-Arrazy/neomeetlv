<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $isAdmin = $user->roles()->where('name', 'admin')->exists();

        return Inertia::render('Dashboard', [
            'meetings' => $isAdmin 
                ? \App\Models\Meeting::latest()->take(5)->get() 
                : $user->meetings()->latest()->take(5)->get(),
            'classes' => $isAdmin 
                ? \App\Models\Course::latest()->take(5)->get() 
                : $user->classes()->latest()->take(5)->get(),
            'schedules' => $isAdmin 
                ? \App\Models\Schedule::latest()->take(5)->get() 
                : $user->schedules()->latest()->take(5)->get(),
            'canCreateMeeting' => $user->can('create-meeting'),
            'canManageClasses' => $user->can('manage-classes'),
        ]);
    }
}
