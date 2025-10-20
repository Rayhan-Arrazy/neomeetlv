<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

    return response()->json(['access_token' => $token, 'token_type' => 'Bearer', 'user' => $user->load(['roles','classes','schedules'])], Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        // Normal bcrypt check first
        if (Hash::check($request->password, $user->password)) {
            // If the stored password is not using bcrypt (legacy), rehash and save
            if (Hash::needsRehash($user->password)) {
                $user->password = Hash::make($request->password);
                $user->save();
            }
        } else {
            // Fallback: common legacy hashes (MD5, SHA1) - try verifying manually
            $provided = $request->password;
            $stored = $user->password;

            $legacyMatch = false;
            // md5
            if (strlen($stored) === 32 && md5($provided) === $stored) {
                $legacyMatch = true;
            }
            // sha1
            if (! $legacyMatch && strlen($stored) === 40 && sha1($provided) === $stored) {
                $legacyMatch = true;
            }

            if ($legacyMatch) {
                // Rehash with bcrypt and save
                $user->password = Hash::make($provided);
                $user->save();
            } else {
                return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
            }
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer', 'user' => $user->load(['roles','classes','schedules'])]);
    }

    /**
     * Export current authenticated user's data (schedules, classes, roles) as JSON.
     */
    public function exportMyData(Request $request)
    {
        $user = $request->user()->load(['roles', 'classes', 'schedules']);
        return response()->json($user);
    }

    public function me(Request $request)
    {
        $user = $request->user()->load(['roles', 'classes', 'schedules']);
        return response()->json($user);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();
        return response()->noContent();
    }
}
