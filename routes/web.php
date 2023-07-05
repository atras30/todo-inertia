<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return to_route("notes.public");
});

// Notes
Route::prefix("notes")->group(function() {
    // Public
    Route::get('/', [NoteController::class, 'showPublicNotes'])->name('notes.public');
    Route::get('/public/paginate', [NoteController::class, 'paginatePublicNotes'])->name('notes.public.paginate');
    Route::get('/form', [NoteController::class, 'showCreatNoteForm'])->name('notes.form');

    // My
    Route::get('/my', [NoteController::class, 'myNotes'])->middleware(['auth', 'verified'])->name('notes.my');
    Route::get('/my/paginate', [NoteController::class, 'paginateNotes'])->name('notes.my.paginate');

    // Create
    Route::post('/create', [NoteController::class, 'create'])->name('notes.create');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
