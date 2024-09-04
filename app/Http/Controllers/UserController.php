<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keywords = $request->input('keywords');

        $users = User::where('name', 'like', "%{$keywords}%")
            ->orWhere('username', 'like', "%{$keywords}%")
            ->orWhere('email', 'like', "%{$keywords}%")
            ->latest()
            ->paginate(5);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'keywords' => $keywords,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = new User;
        $user->fill($request->validated())->save();

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->validated());

        if ($user->isDirty('password')) $user->password = Hash::make($request->password);

        $user->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back();
    }
}
