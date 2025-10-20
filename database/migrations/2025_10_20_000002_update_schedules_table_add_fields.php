<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            if (! Schema::hasColumn('schedules', 'title')) {
                $table->string('title')->nullable();
            }
            if (! Schema::hasColumn('schedules', 'description')) {
                $table->text('description')->nullable();
            }
            if (! Schema::hasColumn('schedules', 'date')) {
                $table->date('date')->nullable();
            }
            if (! Schema::hasColumn('schedules', 'time')) {
                $table->time('time')->nullable();
            }
            if (! Schema::hasColumn('schedules', 'user_id')) {
                $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            }
        });
    }

    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropColumn(['title', 'description', 'date', 'time']);
            // dropping foreign key and column may require raw SQL depending on driver
            if (Schema::hasColumn('schedules', 'user_id')) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            }
        });
    }
};
