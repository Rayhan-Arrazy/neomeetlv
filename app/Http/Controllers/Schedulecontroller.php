<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use Illuminate\Http\Request;


class ScheduleController extends Controller
{
    public function index()
    {
        return ScheduleResource::collection(Schedule::where('user_id', 1)->get());
    }

    public function store(Request $request)
    {
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

        // Untuk sementara, hardcode user_id
        $validated['user_id'] = 1;

        $schedule = Schedule::create($validated);
        return new ScheduleResource($schedule);
    }

    public function update(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'event_title' => 'sometimes|required|string|max:255',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date|after:start_time',
            'location' => 'sometimes|required|string|max:255',
            // ... tambahkan validasi untuk kolom lainnya
        ]);

        $schedule->update($validated);
        return new ScheduleResource($schedule);
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response()->json(null, 204);
    }
}