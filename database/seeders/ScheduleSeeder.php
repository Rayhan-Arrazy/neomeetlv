<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            // Create 3-5 schedules per user
            $numSchedules = rand(3, 5);
            for ($i = 0; $i < $numSchedules; $i++) {
                $startDate = now()->addDays(rand(1, 30));
                $startTime = sprintf('%02d:00', rand(8, 17));
                $endTime = date('H:i', strtotime($startTime . ' +1 hour'));

                Schedule::create([
                    'user_id' => $user->id,
                    'event_title' => fake()->sentence(3),
                    'description' => fake()->paragraph(2),
                    'type' => fake()->randomElement(['meeting', 'class', 'workshop', 'presentation']),
                    'date' => $startDate->format('Y-m-d'),
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'location' => fake()->randomElement(['Room A101', 'Room B202', 'Conference Room 1', 'Online']),
                    'is_virtual' => fake()->boolean(70),
                    'meeting_link' => fake()->url(),
                    'attendees' => rand(2, 15),
                    'is_recurring' => fake()->boolean(30),
                    'recurrence_pattern' => fake()->randomElement(['daily', 'weekly', 'monthly']),
                    'reminder' => fake()->randomElement(['15', '30', '60']),
                    'is_private' => fake()->boolean(20),
                ]);
            }
        }
    }
}