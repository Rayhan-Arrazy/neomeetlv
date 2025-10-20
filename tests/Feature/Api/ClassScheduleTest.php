<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;

beforeEach(function () {
    // Ensure roles table exists and is clean for each test
    Role::query()->delete();
});

it('allows admin to create a class', function () {
    $adminRole = Role::create(['name' => 'admin']);
    $admin = User::factory()->create();
    $admin->roles()->attach($adminRole->id);

    $payload = [
        'name' => 'Physics 101',
        'description' => 'Intro to physics',
        'instructor' => 'Dr. Who',
        'schedule' => 'Mon 9AM',
    ];

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/classes', $payload)
        ->assertStatus(201)
        ->assertJsonFragment(['name' => 'Physics 101']);
});

it('forbids regular user from creating a class', function () {
    $user = User::factory()->create();

    $payload = [
        'name' => 'Chemistry 101',
        'description' => 'Intro to chemistry',
        'instructor' => 'Dr. Strange',
        'schedule' => 'Tue 10AM',
    ];

    $this->actingAs($user, 'sanctum')
        ->postJson('/api/classes', $payload)
        ->assertStatus(403);
});

it('allows admin to create a schedule', function () {
    $adminRole = Role::create(['name' => 'admin']);
    $admin = User::factory()->create();
    $admin->roles()->attach($adminRole->id);

    $payload = [
        'title' => 'Meeting',
        'description' => 'Team sync',
        'date' => now()->toDateString(),
        'time' => now()->format('H:i'),
    ];

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/schedules', $payload)
        ->assertStatus(201)
        ->assertJsonFragment(['title' => 'Meeting']);
});

it('forbids regular user from creating a schedule', function () {
    $user = User::factory()->create();

    $payload = [
        'title' => 'Private Meeting',
        'description' => 'Do not enter',
        'date' => now()->toDateString(),
        'time' => now()->format('H:i'),
    ];

    $this->actingAs($user, 'sanctum')
        ->postJson('/api/schedules', $payload)
        ->assertStatus(403);
});
