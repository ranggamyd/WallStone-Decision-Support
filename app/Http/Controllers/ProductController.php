<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Alternative;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keywords = $request->input('keywords');

        $lastProduct = Product::orderBy('code', 'desc')->first();
        $nextCode = $lastProduct ? 'P' . str_pad(substr($lastProduct->code, 1) + 1, 3, '0', STR_PAD_LEFT) : 'P001';

        return Inertia::render('Products/Index', [
            'products' => Product::with('alternatives')->where('code', 'like', "%{$keywords}%")
                ->orWhere('name', 'like', "%{$keywords}%")
                ->orWhere('description', 'like', "%{$keywords}%")
                ->orderBy('code')
                ->paginate(5),
            'keywords' => $keywords,
            'alternatives' => Alternative::orderBy('code')->get(),
            'nextCode' => $nextCode,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = new Product;
        $product->fill($request->validated())->save();

        if ($request->alternatives) $product->alternatives()->sync($request->alternatives);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->validated())->save();

        if ($request->alternatives) $product->alternatives()->sync($request->alternatives);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->alternatives()->detach();
        $product->delete();

        return redirect()->back();
    }
}
