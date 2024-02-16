<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class CookieController extends Controller
{
    public function getCookies(Request $request) {
        return response()->json([
            "cookies" => $request->cookie()
        ]);
    }
}
