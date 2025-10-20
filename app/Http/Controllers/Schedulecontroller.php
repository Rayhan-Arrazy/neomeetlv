<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     * Any authenticated user can view all schedules.
     */
    public function index(Request $request)
    {
        // Let's order them by date and time for a better user experience
        return Schedule::with('user')->orderBy('date')->orderBy('time')->get();
    }

    /**
     * Store a newly created resource in storage.
     * Only admin users can create schedules.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i', // Expecting HH:MM format
        ]);

        // The schedule is created by the currently authenticated admin
        $schedule = $request->user()->schedules()->create($request->all());

        return response()->json($schedule, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     * Any authenticated user can view a single schedule.
     */
    public function show(Schedule $schedule)
    {
        return $schedule->load('user');
    }

    /**
     * Update the specified resource in storage.
     * Only admin users can update schedules.
     */
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

    /**
     * Remove the specified resource from storage.
     * Only admin users can delete schedules.
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}