<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateNoteRequest;
use App\Http\Requests\DeleteNoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class NoteController extends Controller
{
    // GET
    public function showPublicNotes()
    {
        return Inertia::render('Note/Note');
    }

    public function myNotes()
    {
        return Inertia::render('Note/My/Note');
    }

    public function showCreatNoteForm()
    {
        return Inertia::render("Note/Form/AddNote");
    }

    // POST
    public function create(CreateNoteRequest $request)
    {
        if ($request->title === null) $request['title'] = "";

        try {
            $note = Note::create([
                "title" => $request->title,
                "body" => $request->body,
                "visibility" => $request->visibility,
                "user_id" => $request->user_id
            ]);
        } catch(\Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            "message" => "A new note created!"
        ], Response::HTTP_CREATED);
    }

    // DELETE
    public function delete(DeleteNoteRequest $request) {
        dd($request->all());
    }

    // PAGINATION

    public function paginateNotes(Request $request)
    {
        //Define the pagination limit
        $paginationLimit = 20;

        // Define the query and filter
        $notesQuery = Note::where("user_id", auth()->user()->id)->with('user:id,name')->select('id', 'title', 'body', 'created_at', "user_id", "visibility")->orderBy('created_at', 'desc');

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

    public function paginatePublicNotes(Request $request)
    {
        //Define the pagination limit
        $paginationLimit = 20;

        // Define the query and filter
        $notesQuery = Note::where("visibility", "public")->with('user:id,name')->select('id', 'title', 'body', 'created_at', "user_id", "visibility")->orderBy('created_at', 'desc');

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
}
