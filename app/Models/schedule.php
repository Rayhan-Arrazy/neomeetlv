<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_title',
        'description',
        'date',
        'start_time',
        'end_time',
        'user_id',
        'type',
        'location',
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
        'date' => 'date',
        'start_time' => 'string',
        'end_time' => 'string',
        'is_virtual' => 'boolean',
        'is_recurring' => 'boolean',
        'is_private' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
