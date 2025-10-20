<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

Route::get('/users', action: function (): AnonymousResourceCollection {
    return UserResource::collection(resource: User::all());
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/classes', [ClassController::class, 'index']);
    Route::get('/classes/{class}', [ClassController::class, 'show']);

    Route::middleware('role:admin')->group(function () {
        Route::post('/classes', [ClassController::class, 'store']);
        Route::put('/classes/{class}', [ClassController::class, 'update']);
        Route::delete('/classes/{class}', [ClassController::class, 'destroy']);
    });

});


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/schedules', [ScheduleController::class, 'index']);
    Route::get('/schedules/{schedule}', [ScheduleController::class, 'show']);

    Route::middleware('role:admin')->group(function () {
        Route::post('/schedules', [ScheduleController::class, 'store']);
        Route::put('/schedules/{schedule}', [ScheduleController::class, 'update']);
        Route::delete('/schedules/{schedule}', [ScheduleController::class, 'destroy']);
    });

});