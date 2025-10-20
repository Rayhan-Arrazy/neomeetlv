<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\MeetingController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/login', function () {
    return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/login');
})->name('login');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/me/export', [AuthController::class, 'exportMyData']);

    // --- CLASSES ROUTES ---
    Route::get('/classes', [ClassController::class, 'index']);
    Route::get('/classes/{class}', [ClassController::class, 'show']);
    Route::middleware('role:admin')->group(function () {
        Route::post('/classes', [ClassController::class, 'store']);
        Route::put('/classes/{class}', [ClassController::class, 'update']);
        Route::delete('/classes/{class}', [ClassController::class, 'destroy']);
    });

    // --- SCHEDULES ROUTES ---
    Route::get('/schedules', [ScheduleController::class, 'index']);
    Route::get('/schedules/{schedule}', [ScheduleController::class, 'show']);
    Route::post('/schedules', [ScheduleController::class, 'store']); // Allow any authenticated user to create schedules
    Route::put('/schedules/{schedule}', [ScheduleController::class, 'update'])->middleware('can:update,schedule');
    Route::delete('/schedules/{schedule}', [ScheduleController::class, 'destroy'])->middleware('can:delete,schedule');

    // --- MEETINGS ROUTES ---
    Route::get('/meetings', [MeetingController::class, 'index']);
    Route::get('/meetings/{meeting}', [MeetingController::class, 'show']);
    Route::middleware('role:admin')->group(function () {
        Route::post('/meetings', [MeetingController::class, 'store']);
        Route::put('/meetings/{meeting}', [MeetingController::class, 'update']);
        Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy']);
    });
});