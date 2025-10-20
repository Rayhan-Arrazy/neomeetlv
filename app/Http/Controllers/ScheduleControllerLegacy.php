<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ScheduleControllerLegacy extends Controller
{
    public function index()
    {
        return ScheduleResource::collection(Schedule::where('user_id', 1)->get());
    }

    public function store(Request $request)
    {
        // legacy implementation left for reference
        $validated = $request->validate([
            'event_title' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
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

    // other legacy methods omitted
}
