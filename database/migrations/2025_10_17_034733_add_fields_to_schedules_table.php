<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // If the table already exists, alter it and only add missing columns.
        if (Schema::hasTable('schedules')) {
            Schema::table('schedules', function (Blueprint $table) {
                if (! Schema::hasColumn('schedules', 'description')) {
                    $table->text('description')->nullable();
                }
                if (! Schema::hasColumn('schedules', 'type')) {
                    $table->string('type')->nullable();
                }
                if (! Schema::hasColumn('schedules', 'is_virtual')) {
                    $table->boolean('is_virtual')->default(true);
                }
                if (! Schema::hasColumn('schedules', 'meeting_link')) {
                    $table->string('meeting_link')->nullable();
                }
                if (! Schema::hasColumn('schedules', 'attendees')) {
                    $table->text('attendees')->nullable();
                }
                if (! Schema::hasColumn('schedules', 'is_recurring')) {
                    $table->boolean('is_recurring')->default(false);
                }
                if (! Schema::hasColumn('schedules', 'recurrence_pattern')) {
                    $table->string('recurrence_pattern')->nullable();
                }
                if (! Schema::hasColumn('schedules', 'recurrence_end')) {
                    $table->date('recurrence_end')->nullable();
                }
                if (! Schema::hasColumn('schedules', 'reminder')) {
                    $table->string('reminder')->default('15');
                }
                if (! Schema::hasColumn('schedules', 'is_private')) {
                    $table->boolean('is_private')->default(false);
                }
            });
            return;
        }

        // Otherwise create the table with the desired columns.
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->text('description')->nullable();
            $table->string('type')->nullable();
            $table->boolean('is_virtual')->default(true);
            $table->string('meeting_link')->nullable();
            $table->text('attendees')->nullable();
            $table->boolean('is_recurring')->default(false);
            $table->string('recurrence_pattern')->nullable();
            $table->date('recurrence_end')->nullable();
            $table->string('reminder')->default('15');
            $table->boolean('is_private')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('schedules')) {
            Schema::table('schedules', function (Blueprint $table) {
                $cols = [
                    'description', 'type', 'is_virtual', 'meeting_link', 'attendees',
                    'is_recurring', 'recurrence_pattern', 'recurrence_end', 'reminder', 'is_private'
                ];

                foreach ($cols as $col) {
                    if (Schema::hasColumn('schedules', $col)) {
                        try {
                            $table->dropColumn($col);
                        } catch (\Throwable $e) {
                            // ignore if driver doesn't support drop in this context during tests
                        }
                    }
                }
            });
        }
    }
};
