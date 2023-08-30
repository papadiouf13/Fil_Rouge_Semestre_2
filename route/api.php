<?php

use App\Core\Router;
use App\Controllers\Api\UniteController;
use App\Controllers\Api\FournisseurController;
use App\Controllers\Api\UniCategorieController;
use App\Controllers\Api\CategorieController;    
use App\Controllers\Api\ArticleConfectionController;

Router::route("/api/categorie",[CategorieController::class,'index']);
Router::route("/api/unite",[UniteController::class,'index']);
Router::route("/api/uniteCategorie",[UniteController::class,'unite']);
Router::route("/api/categorieID",[UniteController::class,'categoryID']);
Router::route("/api/unite/add",[UniteController::class,'store']);
Router::route("/api/categorie/add",[CategorieController::class,'store']);
Router::route("/api/article",[ArticleConfectionController::class,'index']);
Router::route("/api/article/add",[ArticleConfectionController::class,'store']);
Router::route("/api/fournisseur",[FournisseurController::class,'index']);
Router::route("/api/fournisseur/add",[FournisseurController::class,'store']);
Router::route("/api/unitepardefautCategorie",[UniteController::class,'unitepardefaut']);
Router::route("/api/conversion",[UniCategorieController::class,'Conversion']);

