<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'user_id',
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
        'date' => 'date',
        'time' => 'string',
        'is_virtual' => 'boolean',
        'is_recurring' => 'boolean',
        'is_private' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
