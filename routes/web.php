<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MeetingRoomController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/classes/{course}', [CourseController::class, 'show'])->name('classes.show');
    
    Route::post('/meetings', [MeetingRoomController::class, 'store'])->name('meetings.store');
    Route::get('/meetings/room/{meeting}', [MeetingRoomController::class, 'show'])->name('meetings.room');
    Route::delete('/meetings/{meeting}', [MeetingRoomController::class, 'destroy'])->name('meetings.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
