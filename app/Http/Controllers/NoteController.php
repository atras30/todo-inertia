<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateNoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        return Inertia::render('Note/Note');
    }

    public function paginateNotes(Request $request)
    {
        //Define the pagination limit
        $paginationLimit = 5;

        // Define the query and filter
        $notesQuery = Note::select('title', 'body', 'id', 'created_at')->orderBy('created_at', 'desc');

        // Get total data of the filtered query
        $totalData = $notesQuery->count();
        // Set offset and limit
        $notesQuery = $notesQuery->offset($paginationLimit * ($request->currentPage - 1))->limit($paginationLimit);
        // Get data
        $data = $notesQuery->get();
        // Total data length
        $count = $data->count();

        $pagination = [
            "totalData" => $totalData,
            "count" => $count,
            "data" => $data,
        ];

        return response()->json($pagination, Response::HTTP_OK);
    }

    public function showCreatNoteForm()
    {
        return Inertia::render("Note/Form/AddNote");
    }

    public function create(CreateNoteRequest $request)
    {
        if ($request->title === null) $request['title'] = "";
        $note = Note::create([
            "title" => $request->title,
            "body" => $request->body
        ]);

        return redirect()->route("notes");
    }
}
