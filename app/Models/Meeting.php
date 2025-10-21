<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Meeting extends Model
{
    protected $fillable = [
        'title',
        'description',
        'start_time',
        'end_time',
        'meeting_link',
        'is_virtual',
        'password',
        'max_participants',
        'enable_chat',
        'enable_video',
        'enable_audio',
        'enable_screenshare',
        'ai_assistant_enabled'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_virtual' => 'boolean',
        'enable_chat' => 'boolean',
        'enable_video' => 'boolean',
        'enable_audio' => 'boolean',
        'enable_screenshare' => 'boolean',
        'ai_assistant_enabled' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}