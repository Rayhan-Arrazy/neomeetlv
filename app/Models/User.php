<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Schedule;
use App\Models\Course;
use App\Models\Role;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        // 'password' => 'hashed' can be used to auto-hash on set in newer Laravel versions,
        // but we hash explicitly in controllers to avoid surprises when migrating legacy hashes.
    ];

    // Relationship: user has many schedules
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    // Relationship: user has many classes (courses)
    public function classes()
    {
        return $this->hasMany(Course::class);
    }

    // Roles relationship (optional - if you use a roles table)
    public function roles()
    {
        // If your project uses a roles table, adjust accordingly. For now return empty relation to avoid errors.
        return $this->belongsToMany(Role::class);
    }
}
