<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Role;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create roles
        $roles = [
            ['name' => 'admin'],
            ['name' => 'instructor'],
            ['name' => 'student'],
            ['name' => 'manager'],
            ['name' => 'assistant']
        ];

        foreach ($roles as $roleData) {
            Role::firstOrCreate($roleData);
        }

        // 2. Create users with various roles
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'roles' => ['admin', 'instructor']
            ],
            [
                'name' => 'Dr. John Smith',
                'email' => 'john.smith@example.com',
                'password' => Hash::make('instructor123'),
                'roles' => ['instructor']
            ],
            [
                'name' => 'Prof. Sarah Wilson',
                'email' => 'sarah.wilson@example.com',
                'password' => Hash::make('instructor123'),
                'roles' => ['instructor']
            ],
            [
                'name' => 'Dr. Michael Chen',
                'email' => 'michael.chen@example.com',
                'password' => Hash::make('instructor123'),
                'roles' => ['instructor']
            ],
            [
                'name' => 'Prof. Emily Brown',
                'email' => 'emily.brown@example.com',
                'password' => Hash::make('instructor123'),
                'roles' => ['instructor']
            ],
            [
                'name' => 'Alice Student',
                'email' => 'alice@example.com',
                'password' => Hash::make('student123'),
                'roles' => ['student']
            ],
            [
                'name' => 'Bob Student',
                'email' => 'bob@example.com',
                'password' => Hash::make('student123'),
                'roles' => ['student']
            ],
            [
                'name' => 'Carol Manager',
                'email' => 'carol@example.com',
                'password' => Hash::make('manager123'),
                'roles' => ['manager']
            ],
            [
                'name' => 'David Assistant',
                'email' => 'david@example.com',
                'password' => Hash::make('assistant123'),
                'roles' => ['assistant']
            ]
        ];

        foreach ($users as $userData) {
            $roles = $userData['roles'];
            unset($userData['roles']);
            
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            // Attach roles
            foreach ($roles as $roleName) {
                $role = Role::where('name', $roleName)->first();
                if ($role && !$user->roles()->where('role_id', $role->id)->exists()) {
                    $user->roles()->attach($role->id);
                }
            }
        }

        // 3. Create classes with detailed data
        if (Course::count() === 0) {
            $classes = [
                [
                    'name' => 'Introduction to Programming',
                    'description' => 'A comprehensive introduction to programming concepts using Python. Learn variables, control structures, functions, and basic algorithms.',
                    'instructor' => 'Dr. John Smith',
                    'schedule' => 'Mon/Wed 10:00-11:30',
                    'user_email' => 'john.smith@example.com'
                ],
                [
                    'name' => 'Advanced Web Development',
                    'description' => 'Master modern web development with React, Node.js, and MongoDB. Build full-stack applications from scratch.',
                    'instructor' => 'Prof. Sarah Wilson',
                    'schedule' => 'Tue/Thu 14:00-15:30',
                    'user_email' => 'sarah.wilson@example.com'
                ],
                [
                    'name' => 'Data Structures and Algorithms',
                    'description' => 'Deep dive into fundamental data structures and algorithms. Includes practical implementations and complexity analysis.',
                    'instructor' => 'Dr. Michael Chen',
                    'schedule' => 'Wed/Fri 09:00-10:30',
                    'user_email' => 'michael.chen@example.com'
                ],
                [
                    'name' => 'Machine Learning Fundamentals',
                    'description' => 'Introduction to machine learning concepts, supervised and unsupervised learning, using Python and scikit-learn.',
                    'instructor' => 'Dr. John Smith',
                    'schedule' => 'Mon/Thu 13:00-14:30',
                    'user_email' => 'john.smith@example.com'
                ],
                [
                    'name' => 'Digital Marketing Strategies',
                    'description' => 'Learn modern digital marketing techniques, SEO, social media marketing, and analytics.',
                    'instructor' => 'Prof. Emily Brown',
                    'schedule' => 'Tue/Fri 11:00-12:30',
                    'user_email' => 'emily.brown@example.com'
                ],
                [
                    'name' => 'Business Analytics',
                    'description' => 'Master data-driven decision making, statistical analysis, and business intelligence tools.',
                    'instructor' => 'Prof. Emily Brown',
                    'schedule' => 'Mon/Wed 13:00-14:30',
                    'user_email' => 'emily.brown@example.com'
                ],
                [
                    'name' => 'UI/UX Design Principles',
                    'description' => 'Comprehensive course on user interface and experience design, prototyping, and user research.',
                    'instructor' => 'Prof. Sarah Wilson',
                    'schedule' => 'Thu/Fri 10:00-11:30',
                    'user_email' => 'sarah.wilson@example.com'
                ]
            ];

            foreach ($classes as $classData) {
                $user = User::where('email', $classData['user_email'])->first();
                unset($classData['user_email']);
                
                Course::firstOrCreate(
                    ['name' => $classData['name']],
                    array_merge($classData, ['user_id' => $user->id])
                );
            }
        }

        // 4. Create schedules for each user
        $users = User::all();
        $eventTypes = ['meeting', 'class', 'workshop', 'presentation', 'interview', 'consultation'];
        $locations = [
            'Main Conference Room',
            'Room A101',
            'Room B202',
            'Auditorium',
            'Online',
            'Study Hall',
            'Library'
        ];

        foreach ($users as $user) {
            // Create 5 different schedules for each user
            for ($i = 0; $i < 5; $i++) {
                $startDate = now()->addDays(rand(1, 30));
                $startHour = rand(9, 16);
                $duration = rand(1, 3);
                $startTime = sprintf("%02d:00:00", $startHour);
                $endTime = sprintf("%02d:00:00", $startHour + $duration);
                
                $isVirtual = (bool)rand(0, 1);
                $location = $isVirtual ? 'Online' : $locations[array_rand(array_filter($locations, fn($loc) => $loc !== 'Online'))];

                Schedule::firstOrCreate(
                    [
                        'event_title' => fake()->sentence(3),
                        'date' => $startDate->format('Y-m-d'),
                        'start_time' => $startTime,
                        'user_id' => $user->id
                    ],
                    [
                        'description' => fake()->paragraph(2),
                        'type' => $eventTypes[array_rand($eventTypes)],
                        'end_time' => $endTime,
                        'location' => $location,
                        'is_virtual' => $isVirtual,
                        'meeting_link' => $isVirtual ? 'https://meet.example.com/' . \Str::random(10) : null,
                        'attendees' => json_encode(fake()->randomElements(['alice@example.com', 'bob@example.com', 'carol@example.com', 'david@example.com', 'john.smith@example.com', 'sarah.wilson@example.com'], rand(2, 4))),
                        'is_recurring' => (bool)rand(0, 1),
                        'recurrence_pattern' => fake()->randomElement(['daily', 'weekly', 'monthly']),
                        'recurrence_end' => $startDate->copy()->addMonths(rand(1, 3))->format('Y-m-d'),
                        'reminder' => fake()->randomElement(['5', '15', '30', '60']),
                        'is_private' => (bool)rand(0, 1)
                    ]
                );
            }
        }
    }
}
