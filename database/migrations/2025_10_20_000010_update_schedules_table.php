<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            // First ensure required columns exist
            if (!Schema::hasColumn('schedules', 'event_title')) {
                $table->string('event_title');
            }
            if (!Schema::hasColumn('schedules', 'description')) {
                $table->text('description')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'type')) {
                $table->string('type')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'date')) {
                $table->date('date');
            }
            if (!Schema::hasColumn('schedules', 'start_time')) {
                $table->time('start_time');
            }
            if (!Schema::hasColumn('schedules', 'end_time')) {
                $table->time('end_time');
            }
            if (!Schema::hasColumn('schedules', 'location')) {
                $table->string('location')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'is_virtual')) {
                $table->boolean('is_virtual')->default(false);
            }
            if (!Schema::hasColumn('schedules', 'meeting_link')) {
                $table->string('meeting_link')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'attendees')) {
                $table->text('attendees')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'is_recurring')) {
                $table->boolean('is_recurring')->default(false);
            }
            if (!Schema::hasColumn('schedules', 'recurrence_pattern')) {
                $table->string('recurrence_pattern')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'recurrence_end')) {
                $table->date('recurrence_end')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'reminder')) {
                $table->string('reminder')->nullable();
            }
            if (!Schema::hasColumn('schedules', 'is_private')) {
                $table->boolean('is_private')->default(false);
            }
            if (!Schema::hasColumn('schedules', 'user_id')) {
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            }
        });
    }

    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $columns = [
                'event_title', 'description', 'type', 'date', 'start_time', 'end_time',
                'location', 'is_virtual', 'meeting_link', 'attendees', 'is_recurring',
                'recurrence_pattern', 'recurrence_end', 'reminder', 'is_private', 'user_id'
            ];
            foreach ($columns as $column) {
                if (Schema::hasColumn('schedules', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};