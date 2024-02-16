<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RequestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $this->checkRefreshToken($request);

        return $next($request);
    }

    private function checkRefreshToken(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');
        $user = $request->user();

        if (!empty($refreshToken) && empty($user)) { //
            $user = User::where("refresh_token", $refreshToken)->first();
            if (!empty($user)) {
                Auth::login($user, true);
                $request->session()->regenerate();
            }
        }
    }
}
