<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // You can add global middleware here if needed
        \App\Http\Middleware\EnsureEmailIsVerified::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            // default web middleware
        ],

        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array<string, class-string|string>
     */
    // Keep routeMiddleware for older Laravel versions
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class ?? \Illuminate\Auth\Middleware\Authenticate::class,
        'role' => \App\Http\Middleware\RoleMiddleware::class,
    ];

    /**
     * Middleware aliases (Laravel 10+). Ensures string aliases like 'role' are mapped to classes.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        'auth' => \App\Http\Middleware\Authenticate::class ?? \Illuminate\Auth\Middleware\Authenticate::class,
        'role' => \App\Http\Middleware\RoleMiddleware::class,
    ];
}
