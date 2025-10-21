<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('meeting_link')->nullable();
            $table->boolean('is_virtual')->default(true);
            $table->string('password');
            $table->integer('max_participants')->default(10);
            $table->boolean('enable_chat')->default(true);
            $table->boolean('enable_video')->default(true);
            $table->boolean('enable_audio')->default(true);
            $table->boolean('enable_screenshare')->default(true);
            $table->boolean('ai_assistant_enabled')->default(false);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};