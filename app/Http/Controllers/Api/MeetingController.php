<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MeetingController extends Controller
{
    public function index(Request $request)
    {
        return Meeting::with('user')->orderBy('start_time')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
        ]);

        $meeting = $request->user()->meetings()->create($request->all());

        return response()->json($meeting, Response::HTTP_CREATED);
    }

    public function show(Meeting $meeting)
    {
        return $meeting->load('user');
    }

    public function update(Request $request, Meeting $meeting)
    {
        $meeting->update($request->all());
        return response()->json($meeting);
    }

    public function destroy(Meeting $meeting)
    {
        $meeting->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
