<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $classNames = [
            'Introduction to Programming' => 'Learn programming fundamentals with Python and JavaScript',
            'Advanced Web Development' => 'Master modern web technologies including React and Node.js',
            'Data Structures' => 'Understanding fundamental data structures and algorithms',
            'Machine Learning Basics' => 'Introduction to machine learning concepts and applications',
            'Digital Marketing' => 'Comprehensive overview of digital marketing strategies',
            'Business Analytics' => 'Learn to make data-driven business decisions',
            'UI/UX Design' => 'Principles of user interface and experience design',
            'Project Management' => 'Agile project management methodologies',
            'Cloud Computing' => 'AWS and Azure cloud services fundamentals',
            'Mobile Development' => 'Cross-platform mobile app development'
        ];

        $instructors = [
            'Dr. John Smith' => 'Computer Science Professor with 15 years experience',
            'Prof. Sarah Wilson' => 'Expert in Web Technologies and Software Engineering',
            'Dr. Michael Chen' => 'AI and Machine Learning Specialist',
            'Prof. Emily Brown' => 'Business and Marketing Analytics Professional',
            'Dr. David Miller' => 'Mobile Development and UX Design Expert'
        ];

        $schedulePatterns = [
            'Mon/Wed 10:00-11:30',
            'Tue/Thu 14:00-15:30',
            'Wed/Fri 09:00-10:30',
            'Mon/Thu 13:00-14:30',
            'Tue/Fri 11:00-12:30'
        ];

        // Get admin user
        $admin = User::whereHas('roles', function($q) {
            $q->where('name', 'admin');
        })->first();

        if (!$admin) {
            return;
        }

        // Create classes
        $index = 0;
        foreach ($classNames as $name => $description) {
            $instructorNames = array_keys($instructors);
            $instructorName = $instructorNames[$index % count($instructorNames)];
            
            Course::create([
                'name' => $name,
                'description' => $description,
                'instructor' => $instructorName,
                'schedule' => $schedulePatterns[$index % count($schedulePatterns)],
                'user_id' => $admin->id,
            ]);
            
            $index++;
        }
    }
}