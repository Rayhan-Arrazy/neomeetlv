<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

Route::get('/users', action: function (): AnonymousResourceCollection {
    return UserResource::collection(resource: User::all());
});