<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Alternative;
use Illuminate\Http\Request;
use App\Http\Requests\AlternativeRequest;
use App\Models\Product;

class AlternativeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keywords = $request->input('keywords');

        $lastAlternative = Alternative::orderBy('code', 'desc')->first();
        $nextCode = $lastAlternative ? 'A' . str_pad(substr($lastAlternative->code, 1) + 1, 3, '0', STR_PAD_LEFT) : 'A001';

        return Inertia::render('Alternatives/Index', [
            'alternatives' => Alternative::with('products')->where('code', 'like', "%{$keywords}%")
                ->orWhere('name', 'like', "%{$keywords}%")
                ->orWhere('description', 'like', "%{$keywords}%")
                ->orderBy('code')
                ->paginate(5),
            'keywords' => $keywords,
            'products' => Product::orderBy('code')->get(),
            'nextCode' => $nextCode,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AlternativeRequest $request)
    {
        $alternative = new Alternative;
        $alternative->fill($request->validated())->save();

        if ($request->products) $alternative->products()->sync($request->products);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AlternativeRequest $request, Alternative $alternative)
    {
        $alternative->fill($request->validated())->save();

        if ($request->products) $alternative->products()->sync($request->products);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alternative $alternative)
    {
        $alternative->products()->detach();
        $alternative->delete();

        return redirect()->back();
    }
}
