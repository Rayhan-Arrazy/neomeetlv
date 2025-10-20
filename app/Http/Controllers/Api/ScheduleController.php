<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Schedule::with('user')->orderBy('date')->orderBy('time');
        
        // Admin sees all schedules, regular users see only their own
        if (!$user->roles->contains('name', 'admin')) {
            $query->where('user_id', $user->id);
        }
        
        return $query->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string|max:50',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'location' => 'nullable|string|max:255',
            'is_virtual' => 'boolean',
            'meeting_link' => 'nullable|string|max:255',
            'attendees' => 'nullable|string',
            'is_recurring' => 'boolean',
            'recurrence_pattern' => 'nullable|string|in:daily,weekly,monthly',
            'recurrence_end' => 'nullable|date|after:date',
            'reminder' => 'nullable|string',
            'is_private' => 'boolean',
        ]);

        $schedule = $request->user()->schedules()->create($request->all());

        return response()->json($schedule, Response::HTTP_CREATED);
    }

    public function show(Schedule $schedule)
    {
        return $schedule->load('user');
    }

    public function update(Request $request, Schedule $schedule)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'time' => 'sometimes|required|date_format:H:i',
        ]);

        $schedule->update($request->all());

        return response()->json($schedule);
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
