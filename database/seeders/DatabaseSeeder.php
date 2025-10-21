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

        // 4. Seed schedules and meetings
        $this->call([
            ScheduleSeeder::class,
            MeetingSeeder::class,
        ]);
    }
}
