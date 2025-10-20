<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::firstOrCreate(['name' => 'admin']);

        // Attach admin to user id 1 if that user exists
        $user = User::find(1);
        if ($user && ! $user->roles()->where('role_id', $admin->id)->exists()) {
            $user->roles()->attach($admin->id);
        }
    }
}
