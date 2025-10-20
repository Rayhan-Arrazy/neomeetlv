<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller
{
    public function index()
    {
        return ScheduleResource::collection(Schedule::where('user_id', 1)->get());
    }

    public function store(Request $request)
    {
            dd($request->all());

        $validated = $request->validate([
            'event_title' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string',
            'is_virtual' => 'boolean',
            'meeting_link' => 'nullable|string',
            'attendees' => 'nullable|string',
            'is_recurring' => 'boolean',
            'recurrence_pattern' => 'nullable|string',
            'recurrence_end' => 'nullable|date',
            'reminder' => 'nullable|string',
            'is_private' => 'boolean',
        ]);

        try {
            $validated['user_id'] = 1;
            $schedule = Schedule::create($validated);
            return new ScheduleResource($schedule);
        } catch (\Exception $e) {
            Log::error('Error creating schedule: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create schedule.'], 500);
        }
    }

    public function update(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'event_title' => 'sometimes|required|string|max:255',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date|after:start_time',
            'location' => 'sometimes|required|string|max:255',
        ]);

        try {
            $schedule->update($validated);
            return new ScheduleResource($schedule);
        } catch (\Exception $e) {
            Log::error('Error updating schedule: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update schedule.'], 500);
        }
    }

    public function destroy(Schedule $schedule)
    {
        try {
            $schedule->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting schedule: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete schedule.'], 500);
        }
    }
}