<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course as ClassModel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class ClassController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $query = ClassModel::with('user')->orderBy('created_at', 'desc');
        
        // Admin sees all classes, regular users see only their own
        if (!$user->roles->contains('name', 'admin')) {
            $query->where('user_id', $user->id);
        }
        
        return $query->get();
    }

    public function store(Request $request)
    {
        // Only admin can create classes
        if (!$request->user()->roles->contains('name', 'admin')) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructor' => 'required|string|max:255',
            'schedule' => 'required|string|max:255',
            'is_virtual' => 'boolean',
            'location' => 'nullable|string|max:255',
            'max_students' => 'integer|min:1|nullable',
            'start_date' => 'date|nullable',
            'end_date' => 'date|nullable|after:start_date',
        ]);

        $class = $request->user()->classes()->create($request->all());

        return response()->json($class->load('user'), Response::HTTP_CREATED);
    }

    public function show(ClassModel $class)
    {
        return $class->load('user');
    }

    public function update(Request $request, ClassModel $class)
    {
        // Check if user owns the class or is admin
        if ($request->user()->id !== $class->user_id && !$request->user()->roles->contains('name', 'admin')) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'instructor' => 'sometimes|required|string|max:255',
            'schedule' => 'sometimes|required|string|max:255',
            'is_virtual' => 'boolean',
            'location' => 'nullable|string|max:255',
            'max_students' => 'integer|min:1|nullable',
            'start_date' => 'date|nullable',
            'end_date' => 'date|nullable|after:start_date',
        ]);

        $class->update($request->all());

        return response()->json($class->load('user'));
    }

    public function destroy(Request $request, ClassModel $class)
    {
        // Check if user owns the class or is admin
        if ($request->user()->id !== $class->user_id && !$request->user()->roles->contains('name', 'admin')) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $class->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
