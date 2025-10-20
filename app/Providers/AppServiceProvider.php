<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        // Register middleware aliases to ensure strings like 'role' resolve to classes
        if ($this->app->resolved('router')) {
            $this->app['router']->aliasMiddleware('role', \App\Http\Middleware\RoleMiddleware::class);
        } else {
            // On some test boot sequences the router may not be resolved yet; defer registration
            $this->app->booted(function () {
                $this->app['router']->aliasMiddleware('role', \App\Http\Middleware\RoleMiddleware::class);
            });
        }
    }
}
