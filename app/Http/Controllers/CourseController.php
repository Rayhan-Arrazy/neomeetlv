<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function show(Course $course)
    {
        return Inertia::render('ClassDetail', [
            'course' => $course,
            'materials' => [], // Placeholder for now
            'meetings' => \App\Models\Meeting::latest()->take(2)->get(), // Related meetings
        ]);
    }
}
