<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Score;
use App\Models\Criteria;
use App\Models\Alternative;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keywords = $request->input('keywords');

        return Inertia::render('Scores/Index', [
            'alternatives' => Alternative::with(['products', 'scores.criteria'])->where('code', 'like', "%{$keywords}%")
                ->orWhere('name', 'like', "%{$keywords}%")
                ->orWhere('description', 'like', "%{$keywords}%")
                ->orderBy('code')
                ->paginate(5),
            'criterias' => Criteria::with(['subcriterias', 'scores'])->orderBy('code')->get(),
            'keywords' => $keywords,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        foreach ($request->criterias as $criteria_id => $value) {
            Score::updateOrCreate(
                ['alternative_id' => $request->alternative_id, 'criteria_id' => $criteria_id,],
                ['value' => $value]
            );
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Score $score)
    {
        dd('update');
        $score->fill($request->validated())->save();

        if ($request->products) $score->products()->sync($request->products);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Score $score)
    {
        $score->products()->detach();
        $score->delete();

        return redirect()->back();
    }

    public function calculation()
    {
        return Inertia::render('Scores/Calculation', [
            'alternatives' => Alternative::orderBy('code')->get(),
            'criterias' => Criteria::orderBy('code')->get(),
            'scores' => Score::all(),
        ]);
    }

    public function final()
    {
        //
    }
}
