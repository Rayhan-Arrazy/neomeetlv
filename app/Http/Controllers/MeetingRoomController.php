<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Inertia\Inertia;

class MeetingRoomController extends Controller
{
    public function show(Meeting $meeting)
    {
        return Inertia::render('MeetingRoom', [
            'meeting' => $meeting
        ]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'password' => 'required|string|min:4',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['meeting_link'] = 'https://meet.jit.si/NeoMeet_' . uniqid();

        Meeting::create($validated);

        return redirect()->back();
    }

    public function destroy(Meeting $meeting)
    {
        if (auth()->id() === $meeting->user_id || auth()->user()->roles()->where('name', 'admin')->exists()) {
            $meeting->delete();
        }
        return redirect()->back();
    }
}
