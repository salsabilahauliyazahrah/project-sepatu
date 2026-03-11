<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

//halaman utama
Route::get('/', function() {
    return view('index');
})->name('home');

//halman login 
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

//Proses form Login & Logout 
Route::post('/login', [AuthController::class, 'login'])->name('login.proses');
Route::get('/logout', [AuthController::class,'logout'])->name('logout');

//


