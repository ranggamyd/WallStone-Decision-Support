<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Criteria;
use Illuminate\Http\Request;
use App\Http\Requests\CriteriaRequest;
use App\Models\Comparison;

class CriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keywords = $request->input('keywords');

        $criterias = Criteria::where('code', 'like', "%{$keywords}%")
            ->orWhere('name', 'like', "%{$keywords}%")
            ->orWhere('type', 'like', "%{$keywords}%")
            ->orWhere('weight', 'like', "%{$keywords}%")
            ->orderBy('code')
            ->paginate(5);

        $lastCriteria = Criteria::orderBy('code', 'desc')->first();
        $nextCode = $lastCriteria ? 'C' . str_pad(substr($lastCriteria->code, 1) + 1, 3, '0', STR_PAD_LEFT) : 'C001';

        return Inertia::render('Criterias/Index', [
            'criterias' => $criterias,
            'nextCode' => $nextCode,
            'keywords' => $keywords,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CriteriaRequest $request)
    {
        $criteria = new Criteria;
        $criteria->fill($request->validated())->save();

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CriteriaRequest $request, Criteria $criteria)
    {
        $criteria->fill($request->validated())->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Criteria $criteria)
    {
        $criteria->delete();

        return redirect()->back();
    }

    public function comparison()
    {
        $comparisons = Comparison::all();

        $formattedComparisons = [];
        foreach ($comparisons as $comparison)
            $formattedComparisons["{$comparison->criteria_id_1}_{$comparison->criteria_id_2}"] = $comparison->value;

        return Inertia::render('Criterias/Comparison', [
            'criterias' => Criteria::orderBy('code')->get(),
            'comparisons' => $formattedComparisons,
        ]);
    }

    public function saveComparison(Request $request)
    {
        foreach ($request->comparisons as $key => $value) {
            [$criteria_id_1, $criteria_id_2] = explode('_', $key);

            Comparison::updateOrCreate(
                ['criteria_id_1' => $criteria_id_1, 'criteria_id_2' => $criteria_id_2],
                ['value' => $value]
            );
        }

        foreach (Criteria::orderBy('code')->get() as $index => $criteria)
            if (isset($request->weights[$index])) $criteria->update(['weight' => $request->weights[$index]]);

        return redirect(route('criterias'));
    }
}
