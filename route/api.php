<?php

use App\Core\Router;
use App\Controllers\Api\UniteController;
use App\Controllers\Api\FournisseurController;
use App\Controllers\Api\ArticleVenteController;
use App\Controllers\Api\UniCategorieController;
use App\Controllers\Api\CategorieController;    
use App\Controllers\Api\ArticleConfectionController;
use App\Controllers\Api\TailleController;

Router::route("/api/categorie",[CategorieController::class,'index']);
Router::route("/api/unite",[UniteController::class,'index']);
Router::route("/api/uniteCategorie",[UniteController::class,'unite']);
Router::route("/api/categorieID",[UniteController::class,'categoryID']);
Router::route("/api/unite/add",[UniteController::class,'store']);
Router::route("/api/taille/add",[TailleController::class,'store']);
Router::route("/api/categorie/add",[CategorieController::class,'store']);
Router::route("/api/categorie/addAV",[CategorieController::class,'storeCategorieVente']);
Router::route("/api/categorieVente",[CategorieController::class,'categorieVente']);
Router::route("/api/article",[ArticleConfectionController::class,'index']);
Router::route("/api/articlevente",[ArticleVenteController::class,'index']);
Router::route("/api/article/add",[ArticleConfectionController::class,'store']);
Router::route("/api/fournisseur",[FournisseurController::class,'index']);
Router::route("/api/fournisseur/add",[FournisseurController::class,'store']);
Router::route("/api/unitepardefautCategorie",[UniteController::class,'unitepardefaut']);
Router::route("/api/conversion",[UniCategorieController::class,'Conversion']);
Router::route("/api/CategorieTaille",[TailleController::class,'Taille']);
Router::route("/api/articleVente/add",[ArticleVenteController::class,'store']);
Router::route("/api/articleInput",[ArticleConfectionController::class,'indexArticle']);
Router::route("/api/articlevente",[ArticleVenteController::class,'index']);
Router::route("/api/article/detail",[ArticleVenteController::class,'detail']);
Router::route("/api/article/detailArticleVente",[ArticleVenteController::class,'DetailsArticleVente']);





