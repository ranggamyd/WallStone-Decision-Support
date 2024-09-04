<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('products', \App\Http\Controllers\ProductController::class)->names(['index' => 'products']);
    Route::resource('alternatives', \App\Http\Controllers\AlternativeController::class)->names(['index' => 'alternatives']);

    Route::get('/criterias/comparison', [App\Http\Controllers\CriteriaController::class, 'comparison'])->name('criterias.comparison');
    Route::post('/criterias/saveComparison', [App\Http\Controllers\CriteriaController::class, 'saveComparison'])->name('criterias.saveComparison');
    Route::resource('criterias', \App\Http\Controllers\CriteriaController::class)->names(['index' => 'criterias']);

    Route::resource('subcriterias', \App\Http\Controllers\SubCriteriaController::class)->names(['index' => 'subcriterias']);
    Route::resource('users', \App\Http\Controllers\UserController::class)->names(['index' => 'users']);

    Route::get('/scores/calculation', [App\Http\Controllers\ScoreController::class, 'calculation'])->name('scores.calculation');
    Route::get('/scores/final', [App\Http\Controllers\ScoreController::class, 'final'])->name('scores.final');
    Route::resource('scores', \App\Http\Controllers\ScoreController::class)->names(['index' => 'scores']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
