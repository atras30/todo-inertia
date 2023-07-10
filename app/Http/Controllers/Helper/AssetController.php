<?php

namespace App\Http\Controllers\Helper;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AssetController extends Controller
{
    public function getImageFromUrl(Request $request)
    {
        $path = $request->path ?? "";
        if ($path === "") return $this->throwInternalServerError("Path cannot be empty.");

        return asset($path);
    }

    public function throwInternalServerError($message)
    {
        return response()->json([
            "message" => $message
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
