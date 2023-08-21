<?php

use App\Core\Router;
use App\Controllers\CategorieController;
use App\Controllers\ArticleConfectionController;



Router::route("/",[CategorieController::class,'index']);
Router::route("/categorie",[CategorieController::class,'index']);
Router::route("/store-categorie",[CategorieController::class,'store']);
Router::route("/article",[ArticleConfectionController::class,'index']);
Router::route("/form-article",[ArticleConfectionController::class,'form']);
// Router::route("/store-article",[ArticleConfectionController::class,'store']);



// Router::resolve();              