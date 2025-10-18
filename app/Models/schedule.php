<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_title',
        'start_time',
        'end_time',
        'location',
        // Kolom baru
        'description',
        'type',
        'is_virtual',
        'meeting_link',
        'attendees',
        'is_recurring',
        'recurrence_pattern',
        'recurrence_end',
        'reminder',
        'is_private',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'recurrence_end' => 'date',
        'is_virtual' => 'boolean',
        'is_recurring' => 'boolean',
        'is_private' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}