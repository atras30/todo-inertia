<?php

use App\Http\Controllers\CookieController;
use App\Http\Controllers\Helper\AssetController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(["request"])->group(function () {
    Route::get('/', function (Request $request) {
        return to_route("notes.public");
    });

    Route::get('/cv', function () {
        $driveCvUrl = "https://drive.google.com/file/d/1kkSyU3mFmRmpQZyYu1FGWNg6-wrFIpq7/view";
        return redirect($driveCvUrl);
    });

    Route::get('/portfolio', function () {
        $drivePortfolioUrl = "https://drive.google.com/file/d/1AvVL6DeZRMIUayg5k5RIWokCohXWeJ23/view?usp=drive_link";
        return redirect($drivePortfolioUrl);
    });

    Route::get("/asset/image", [AssetController::class, 'getImageFromUrl']);
    Route::get("/cookies", [CookieController::class, 'getCookies']);

    // Notes
    Route::prefix("notes")->group(function () {
        // Public
        Route::get('/', [NoteController::class, 'showPublicNotes'])->name('notes.public');
        Route::get('/public/paginate', [NoteController::class, 'paginatePublicNotes'])->name('notes.public.paginate');
        Route::get('/form', [NoteController::class, 'showCreateNoteForm'])->name('notes.form');
        Route::get('/form/{id}', [NoteController::class, 'showEditNoteForm'])->middleware(['auth', 'verified']);

        // My
        Route::get('/my', [NoteController::class, 'myNotes'])->middleware(['auth', 'verified'])->name('notes.my');
        Route::get('/my/paginate', [NoteController::class, 'paginatePrivateNotes'])->name('notes.my.paginate');

        // Recycle Bin
        Route::get('/my/bin', [NoteController::class, 'showRecycleBin'])->middleware(['auth', 'verified'])->name('notes.bin');
        Route::put('/my/bin/restore', [NoteController::class, 'restoreRecycleBinNotes'])->middleware(['auth', 'verified'])->name('notes.my.bin.restore');
        Route::get('/my/bin/paginate', [NoteController::class, 'paginateRecycleBinNotes'])->name('notes.my.bin.paginate');

        // Create
        Route::post('/', [NoteController::class, 'create'])->name('notes.create');
        Route::put('/', [NoteController::class, 'edit'])->name('notes.edit');

        // Delete
        Route::delete('/{id}', [NoteController::class, 'delete'])->middleware(['auth', 'verified'])->name('notes.delete');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    require __DIR__ . '/auth.php';
});
