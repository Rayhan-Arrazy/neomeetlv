<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('admin123'),
            ]
        );

        // Create test user
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('test123'),
            ]
        );

        // Create additional users
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'name' => fake()->name(),
                'email' => "user{$i}@example.com",
                'password' => Hash::make('password123'),
            ]);
        }

        // Ensure admin has admin role
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole && !$admin->roles()->where('role_id', $adminRole->id)->exists()) {
            $admin->roles()->attach($adminRole->id);
        }
    }
}