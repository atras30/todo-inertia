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

    public function showCreateNoteForm()
    {
        return Inertia::render("Note/Form/AddNote");
    }

    public function showEditNoteForm($id)
    {
        $user = auth()->user();
        $note = Note::where("id", $id)->first();
        if(!$note) return Inertia::render("NotFound");

        //if not super user
        if (!$user->is_super_admin) {
            // cant edit anonymous notes
            if (!$note->user) return Inertia::render("Unauthorized");
            // cant edit other people's note
            if($user->id != $note->user->id) return Inertia::render("Unauthorized");
        }

        //Return add note view
        return Inertia::render("Note/Form/AddNote", [
            "note" => $note
        ]);
    }

    public function showRecycleBin()
    {
        return Inertia::render("Note/My/Bin");
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
        } catch (\Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            "message" => "A new note created!"
        ], Response::HTTP_CREATED);
    }

    //PUT
    public function edit(CreateNoteRequest $request)
    {
        if ($request->title === null) $request['title'] = "";

        try {
            $note = Note::find($request->id);
            $note->title = $request->title;
            $note->body = $request->body;
            $note->visibility = $request->visibility;
            $note->updated_by = $request->user()->id;

            $note->save();
        } catch (\Exception $e) {
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            "message" => "Note has successfully been edited!"
        ], Response::HTTP_OK);
    }

    // DELETE
    public function delete(Request $request, $id)
    {
        if ($id == null)
            return $this->throwInternalServerError("Id must be filled.");

        $note = Note::where("id", $id)->firstOrFail();
        if ($note->user_id !== $request->user()->id && $request->user()->is_super_admin === 0)
            return $this->throwInternalServerError("You can't delete other people notes");

        try {
            $note->deleted_by = $request->user()->name ?? "System";
            $note->save();
            $note->delete();
        } catch (\Exception $e) {
            throw $e;
        }

        return response()->json([
            "message" => "Successfully deleted a note."
        ], Response::HTTP_OK);
    }

    // RESTORE
    public function restoreRecycleBinNotes(Request $request)
    {
        if ($request->id == null)
            return $this->throwInternalServerError("Id must be filled.");

        try {
            $note = Note::onlyTrashed()->where("id", $request->id)->firstOrFail();
            $note->deleted_by = null;
            $note->save();
            $note->restore();
        } catch (\Exception $e) {
            throw $e;
        }

        return response()->json([
            "message" => "Successfully restored a note."
        ], Response::HTTP_OK);
    }

    public function throwInternalServerError($message)
    {
        return response()->json([
            "message" => $message
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    // PAGINATION

    public function paginatePrivateNotes(Request $request)
    {
        //Define the pagination limit
        $paginationLimit = 20;

        // Define the query and filter
        $notesQuery = Note::with('user:id,name')
            ->select('id', 'title', 'body', 'created_at', "user_id", "visibility")
            ->where("user_id", auth()->user()->id)
            ->where(function ($query) use ($request) {
                if (empty($request->visibilities)) return $query;
                return $query->whereIn("visibility", $request->visibilities);
            })
            ->where(function ($query) use ($request) {
                if (empty($request->search)) return $query;
                return $query->where("title", "like", "%{$request->search}%")
                    ->orWhere("body", "like", "%{$request->search}%");
            })
            ->orderBy('created_at', 'desc');

        // Get total data of the filtered query
        $totalData = $notesQuery->count();
        // Set offset and limit
        $notesQuery = $notesQuery->offset($paginationLimit * ($request->currentPage - 1))->limit($paginationLimit);
        // Get data
        $data = $notesQuery->get();
        // Total data length
        $count = $data->count();
        // Check if next page available
        $hasNextPage = $request->currentPage * $paginationLimit < $totalData;

        $pagination = [
            "totalData" => $totalData,
            "count" => $count,
            "data" => $data,
            "hasNextPage" => $hasNextPage
        ];

        return response()->json($pagination, Response::HTTP_OK);
    }

    public function paginateRecycleBinNotes(Request $request)
    {
        //Define the pagination limit
        $paginationLimit = 20;

        // Define the query and filter
        $notesQuery = Note::onlyTrashed()->where("user_id", auth()->user()->id)->with('user:id,name')->select('id', 'title', 'body', 'created_at', "user_id", "visibility")->orderBy('deleted_at', 'desc');
        if (!empty($request->search)) $notesQuery->where("title", "like", "%{$request->search}%")->orWhere("body", "like", "%{$request->search}%");
        // Get total data of the filtered query
        $totalData = $notesQuery->count();
        // Set offset and limit
        $notesQuery = $notesQuery->offset($paginationLimit * ($request->currentPage - 1))->limit($paginationLimit);
        // Get data
        $data = $notesQuery->get();
        // Total data length
        $count = $data->count();
        // Check if next page available
        $hasNextPage = $request->currentPage * $paginationLimit < $totalData;

        $pagination = [
            "totalData" => $totalData,
            "count" => $count,
            "data" => $data,
            "hasNextPage" => $hasNextPage
        ];

        return response()->json($pagination, Response::HTTP_OK);
    }

    public function paginatePublicNotes(Request $request)
    {
        //Define the pagination limit
        $paginationLimit = 20;
        // Define the query and filter
        $notesQuery = Note::with('user:id,name')->select('id', 'title', 'body', 'created_at', "user_id", "visibility")->orderBy('created_at', 'desc');

        if (!empty($request->search)) $notesQuery = $notesQuery->where(function ($query) use ($request) {
            $query->where("title", "like", "%{$request->search}%")->orWhere("body", "like", "%{$request->search}%");
        });

        $notesQuery = $notesQuery->where("visibility", "public");
        // Get total data of the filtered query
        $totalData = $notesQuery->count();
        // Set offset and limit
        $notesQuery = $notesQuery->offset($paginationLimit * ($request->currentPage - 1))->limit($paginationLimit);
        // Get data
        $data = $notesQuery->get();
        // Total data length
        $count = $data->count();

        $hasNextPage = $request->currentPage * $paginationLimit < $totalData;

        $pagination = [
            "totalData" => $totalData,
            "count" => $count,
            "data" => $data,
            "hasNextPage" => $hasNextPage
        ];

        return response()->json($pagination, Response::HTTP_OK);
    }
}
