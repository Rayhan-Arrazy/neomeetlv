<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * Usage: ->middleware('role:admin')
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $hasRole = false;
        if (method_exists($user, 'roles')) {
            $roles = $user->roles()->pluck('name')->toArray();
            $hasRole = in_array($role, $roles);
        }

        if (! $hasRole) {
            return response()->json(['message' => 'Forbidden - missing role: '.$role], 403);
        }

        return $next($request);
    }
}
