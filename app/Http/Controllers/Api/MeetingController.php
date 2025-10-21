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
        $user = $request->user();
        $query = Meeting::with('user')->orderBy('start_time');
        
        // Admin sees all meetings, regular users see only their own
        if (!$user->roles->contains('name', 'admin')) {
            $query->where('user_id', $user->id);
        }
        
        return $query->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date_format:Y-m-d H:i:s',
            'end_time' => 'required|date_format:Y-m-d H:i:s|after:start_time',
            'meeting_link' => 'nullable|string|max:255',
            'is_virtual' => 'boolean|nullable',
            'password' => 'nullable|string|min:6',
            'max_participants' => 'integer|min:2|max:100|nullable',
            'enable_chat' => 'boolean|nullable',
            'enable_video' => 'boolean|nullable',
            'enable_audio' => 'boolean|nullable',
            'enable_screenshare' => 'boolean|nullable',
            'ai_assistant_enabled' => 'boolean|nullable'
        ]);

        $data = array_merge([
            'is_virtual' => true,
            'password' => \Str::random(8),
            'max_participants' => 10,
            'enable_chat' => true,
            'enable_video' => true,
            'enable_audio' => true,
            'enable_screenshare' => true,
            'ai_assistant_enabled' => false
        ], $request->all());

        // Hash the meeting password if provided or use the default one
        $data['password'] = bcrypt($data['password']);
        $data['meeting_link'] = 'https://meet.neomeet.app/' . \Str::random(10); // Generate meeting link

        $meeting = $request->user()->meetings()->create($data);

        return response()->json($meeting, Response::HTTP_CREATED);
    }

    public function show(Meeting $meeting)
    {
        return $meeting->load('user');
    }

    public function update(Request $request, Meeting $meeting)
    {
        // Check if user owns the meeting or is admin
        if ($request->user()->id !== $meeting->user_id && !$request->user()->roles->contains('name', 'admin')) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'sometimes|date_format:Y-m-d H:i:s',
            'end_time' => 'sometimes|date_format:Y-m-d H:i:s|after:start_time',
            'meeting_link' => 'nullable|string|max:255',
            'is_virtual' => 'boolean',
            'password' => 'sometimes|string|min:6',
            'max_participants' => 'integer|min:2|max:100',
            'enable_chat' => 'boolean',
            'enable_video' => 'boolean',
            'enable_audio' => 'boolean',
            'enable_screenshare' => 'boolean',
            'ai_assistant_enabled' => 'boolean'
        ]);

        $data = $request->all();
        if ($request->has('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $meeting->update($data);

        return response()->json($meeting->load('user'));
    }

    public function destroy(Request $request, Meeting $meeting)
    {
        // Check if user owns the meeting or is admin
        if ($request->user()->id !== $meeting->user_id && !$request->user()->roles->contains('name', 'admin')) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $meeting->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function join(Request $request, Meeting $meeting)
    {
        $request->validate([
            'password' => 'required|string'
        ]);

        // Verify meeting password
        if (!password_verify($request->password, $meeting->password)) {
            return response()->json(['message' => 'Invalid meeting password'], Response::HTTP_UNAUTHORIZED);
        }

        // Check if meeting has started
        if (now() < $meeting->start_time) {
            return response()->json(['message' => 'Meeting has not started yet'], Response::HTTP_BAD_REQUEST);
        }

        // Check if meeting is over
        if (now() > $meeting->end_time) {
            return response()->json(['message' => 'Meeting has ended'], Response::HTTP_BAD_REQUEST);
        }

        // Return meeting details with connection info
        return response()->json([
            'meeting' => $meeting->load('user'),
            'connection_info' => [
                'url' => $meeting->meeting_link,
                'enable_video' => $meeting->enable_video,
                'enable_audio' => $meeting->enable_audio,
                'enable_chat' => $meeting->enable_chat,
                'enable_screenshare' => $meeting->enable_screenshare,
                'ai_assistant_enabled' => $meeting->ai_assistant_enabled,
            ]
        ]);
    }
}
