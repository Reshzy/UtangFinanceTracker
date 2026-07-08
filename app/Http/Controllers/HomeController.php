<?php

namespace App\Http\Controllers;

use App\Http\Resources\ContactResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     */
    public function index(Request $request): Response
    {
        $contacts = $request->user()
            ->personalWorkspace()
            ->contacts()
            ->active()
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('home', [
            'recentContacts' => ContactResource::collection($contacts)->resolve(),
        ]);
    }
}
