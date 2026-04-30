<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
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
    })->name('dashboard');

    Route::get('/classes/{course}', function (\App\Models\Course $course) {
        return Inertia::render('ClassDetail', [
            'course' => $course,
            'materials' => [], // Placeholder for now
            'meetings' => \App\Models\Meeting::latest()->take(2)->get(), // Related meetings
        ]);
    })->name('classes.show');

    Route::get('/meetings/room/{meeting}', function (\App\Models\Meeting $meeting) {
        return Inertia::render('MeetingRoom', [
            'meeting' => $meeting
        ]);
    })->name('meetings.room');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
