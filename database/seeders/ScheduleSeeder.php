<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing schedules
        Schedule::truncate();

        // Get all users except admin
        $users = User::whereDoesntHave('roles', function($query) {
            $query->where('name', 'admin');
        })->get();

        $scheduleTypes = [
            [
                'event_title' => 'Advanced React Development',
                'description' => 'Deep dive into advanced React concepts and patterns including hooks, context, and performance optimization',
                'type' => 'class',
                'is_virtual' => true,
                'location' => 'Virtual Classroom',
            ],
            [
                'event_title' => 'Project Management Workshop',
                'description' => 'Learn essential project management skills, Agile methodologies, and team leadership techniques',
                'type' => 'class',
                'is_virtual' => true,
                'location' => 'Virtual Classroom',
            ],
            [
                'event_title' => 'UI/UX Design Principles',
                'description' => 'Understanding fundamental principles of UI/UX design, wireframing, and prototyping',
                'type' => 'class',
                'is_virtual' => true,
                'location' => 'Virtual Classroom',
            ],
            [
                'event_title' => 'Team Strategy Meeting',
                'description' => 'Monthly team alignment and strategy discussion for upcoming project milestones',
                'type' => 'meeting',
                'is_virtual' => true,
                'location' => 'Virtual Meeting Room',
            ],
            [
                'event_title' => 'Code Review Session',
                'description' => 'Weekly code review and best practices discussion with the development team',
                'type' => 'meeting',
                'is_virtual' => true,
                'location' => 'Virtual Meeting Room',
            ],
            [
                'event_title' => 'Backend Architecture Planning',
                'description' => 'Planning session for backend architecture improvements and scalability considerations',
                'type' => 'meeting',
                'is_virtual' => true,
                'location' => 'Virtual Meeting Room',
            ],
            [
                'event_title' => 'Database Optimization Workshop',
                'description' => 'Hands-on workshop on database performance tuning and query optimization',
                'type' => 'class',
                'is_virtual' => true,
                'location' => 'Virtual Classroom',
            ],
            [
                'event_title' => 'Client Progress Review',
                'description' => 'Monthly progress review with client stakeholders to discuss project status',
                'type' => 'meeting',
                'is_virtual' => true,
                'location' => 'Virtual Meeting Room',
            ]
        ];

        $timeSlots = [
            ['09:00', '10:30'],
            ['11:00', '12:30'],
            ['13:30', '15:00'],
            ['15:30', '17:00'],
        ];

        $recurrencePatterns = ['daily', 'weekly', 'monthly'];
        $reminderOptions = ['15', '30', '60'];

        foreach ($users as $user) {
            // Create 5-8 schedules per user
            $numSchedules = rand(5, 8);
            
            for ($i = 0; $i < $numSchedules; $i++) {
                $scheduleType = $scheduleTypes[array_rand($scheduleTypes)];
                $timeSlot = $timeSlots[array_rand($timeSlots)];
                $date = now()->addDays(rand(-7, 21))->format('Y-m-d');
                $isRecurring = rand(0, 1) == 1;
                
                Schedule::create([
                    'event_title' => $scheduleType['event_title'],
                    'description' => $scheduleType['description'],
                    'type' => $scheduleType['type'],
                    'date' => $date,
                    'start_time' => $timeSlot[0],
                    'end_time' => $timeSlot[1],
                    'location' => $scheduleType['location'],
                    'is_virtual' => $scheduleType['is_virtual'],
                    'meeting_link' => $scheduleType['is_virtual'] ? 'https://meet.neomeet.app/' . \Str::random(10) : null,
                    'attendees' => json_encode([
                        ['name' => 'John Doe', 'email' => 'john@example.com'],
                        ['name' => 'Jane Smith', 'email' => 'jane@example.com']
                    ]),
                    'is_recurring' => $isRecurring,
                    'recurrence_pattern' => $isRecurring ? $recurrencePatterns[array_rand($recurrencePatterns)] : null,
                    'reminder' => $reminderOptions[array_rand($reminderOptions)],
                    'is_private' => false,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}