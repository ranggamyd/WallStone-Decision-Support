<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Criteria;
use App\Models\SubCriteria;
use Illuminate\Http\Request;
use App\Http\Requests\SubCriteriaRequest;

class SubCriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $criterias = Criteria::with('subcriterias')->orderBy('code')->get();

        return Inertia::render('SubCriterias/Index', [
            'criterias' => $criterias,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubCriteriaRequest $request)
    {
        $subcriteria = new SubCriteria;
        $subcriteria->fill($request->validated())->save();

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubCriteriaRequest $request, SubCriteria $subcriteria)
    {
        $subcriteria->fill($request->validated())->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCriteria $subcriteria)
    {
        $subcriteria->delete();

        return redirect()->back();
    }
}
