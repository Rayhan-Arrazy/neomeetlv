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
        // Eager load the user (owner) relationship
        return ClassModel::with('user')->get();
    }


    public function store(Request $request)
    {


        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructor' => 'required|string|max:255',
            'schedule' => 'required|string|max:255',
        ]);

        $class = $request->user()->classes()->create($request->all());

        return response()->json($class, Response::HTTP_CREATED);
    }

    public function show(ClassModel $class)
    {
        return $class->load('user');
    }

    public function update(Request $request, ClassModel $class)
    {

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'instructor' => 'sometimes|required|string|max:255',
            'schedule' => 'sometimes|required|string|max:255',
        ]);

        $class->update($request->all());

        return response()->json($class);
    }

    public function destroy(ClassModel $class)
    {
        $class->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
