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
        Schema::dropIfExists('schedules');
        
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('event_title');
            $table->text('description')->nullable();
            $table->string('type')->default('meeting');
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('location')->nullable();
            $table->boolean('is_virtual')->default(false);
            $table->string('meeting_link')->nullable();
            $table->text('attendees')->nullable();
            $table->boolean('is_recurring')->default(false);
            $table->string('recurrence_pattern')->nullable();
            $table->date('recurrence_end')->nullable();
            $table->string('reminder')->nullable();
            $table->boolean('is_private')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};