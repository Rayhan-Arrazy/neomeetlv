<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meeting;
use App\Models\User;
use Carbon\Carbon;

class MeetingSeeder extends Seeder
{
    public function run(): void
    {
        // Get all users except admin
        $users = User::whereDoesntHave('roles', function($query) {
            $query->where('name', 'admin');
        })->get();

        $meetingTypes = [
            [
                'title' => 'Weekly Team Sync',
                'description' => 'Regular team sync meeting to discuss progress and challenges',
                'is_virtual' => true,
                'enable_chat' => true,
                'enable_video' => true,
                'enable_audio' => true,
                'enable_screenshare' => true,
                'ai_assistant_enabled' => true,
                'max_participants' => 15
            ],
            [
                'title' => 'Project Planning Session',
                'description' => 'Planning session for upcoming project milestones',
                'is_virtual' => true,
                'enable_chat' => true,
                'enable_video' => true,
                'enable_audio' => true,
                'enable_screenshare' => true,
                'ai_assistant_enabled' => false,
                'max_participants' => 10
            ],
            [
                'title' => 'One-on-One Mentoring',
                'description' => 'Individual mentoring session',
                'is_virtual' => true,
                'enable_chat' => true,
                'enable_video' => true,
                'enable_audio' => true,
                'enable_screenshare' => true,
                'ai_assistant_enabled' => false,
                'max_participants' => 2
            ],
            [
                'title' => 'Technical Workshop',
                'description' => 'Hands-on workshop for technical skills development',
                'is_virtual' => true,
                'enable_chat' => true,
                'enable_video' => true,
                'enable_audio' => true,
                'enable_screenshare' => true,
                'ai_assistant_enabled' => true,
                'max_participants' => 20
            ],
            [
                'title' => 'Code Review Session',
                'description' => 'Team code review and discussion',
                'is_virtual' => true,
                'enable_chat' => true,
                'enable_video' => true,
                'enable_audio' => true,
                'enable_screenshare' => true,
                'ai_assistant_enabled' => true,
                'max_participants' => 8
            ]
        ];

        foreach ($users as $user) {
            // Create 3-5 meetings per user
            $numMeetings = rand(3, 5);
            
            for ($i = 0; $i < $numMeetings; $i++) {
                $meetingType = $meetingTypes[array_rand($meetingTypes)];
                $startTime = Carbon::now()->addDays(rand(0, 14))->setHour(rand(9, 16))->setMinute(0)->setSecond(0);
                
                Meeting::create([
                    'title' => $meetingType['title'],
                    'description' => $meetingType['description'],
                    'start_time' => $startTime,
                    'end_time' => $startTime->copy()->addHours(rand(1, 2)),
                    'meeting_link' => 'https://meet.neomeet.app/' . \Str::random(10),
                    'is_virtual' => $meetingType['is_virtual'],
                    'password' => \Str::random(8),
                    'max_participants' => $meetingType['max_participants'],
                    'enable_chat' => $meetingType['enable_chat'],
                    'enable_video' => $meetingType['enable_video'],
                    'enable_audio' => $meetingType['enable_audio'],
                    'enable_screenshare' => $meetingType['enable_screenshare'],
                    'ai_assistant_enabled' => $meetingType['ai_assistant_enabled'],
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}