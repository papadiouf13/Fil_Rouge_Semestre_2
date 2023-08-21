<?php 

use App\Core\Router;
// // Autoriser toutes les origines (attention en production)
// header("Access-Control-Allow-Origin: *");

// // Autoriser les méthodes HTTP spécifiques
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// // Autoriser les en-têtes HTTP spécifiques
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// // Permettre l'envoi de cookies et d'en-têtes d'autorisation
// header("Access-Control-Allow-Credentials: true");

require_once "../vendor/autoload.php";
require_once "../core/bootstrap.php";
Router::resolve();












/**
 * Manipulation une Classe 
 *  1.Creer Objet   $objet =new NomClasse()
 *  2.Hydrater Objet ==> Donner un etat ==> Donner une valeur a ses attributs
 *     Methode 1 : Lorsque les attributs ont une visibilite a public
 *      -> : operateur de portee sur un objet 
 *      $objet->  : interface de la classe ==> correspond au attributs et methodes publiques de la classe
 *        $objet->attributPublic
 *        $objet->methodePublic()
 * 
 *   
 */
// dd(ArticleConfection::all('article_confection'));die;
// dd(Categorie::all('article_confection'));die;

// $artt = new ArticleConfection();

// PARTIE CATEGORIE


// $categorie = Categorie::all();
// $data = [
//     'libelle' => 'Mansour'
// ];
// $yarr =false;
// foreach ($categorie as $key => $value) {
//     if($value->getlibelle() == $data['libelle']){
//         $yarr = true;
//     }
// }
// if($yarr){
//     echo 'Ce libelle existe deja ';
// }else{
//     dd(Categorie::create($data));die();
// }

// PARTIE UPDATE
// $data =[
//     'libelle' => 'Cette'
// ];

// dd(CategorieVente::update(3 , $data));