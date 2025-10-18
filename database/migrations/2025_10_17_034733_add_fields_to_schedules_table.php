<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::table('schedules', function (Blueprint $table) {
    //         //
    //     });
    // }

    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            //
        });
    }
};
