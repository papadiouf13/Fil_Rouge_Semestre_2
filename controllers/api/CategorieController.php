<?php
namespace App\Controllers\Api;

use App\Models\Unite;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;
use App\Models\UniCategorie;



class CategorieController extends Controller {
/** CategorieController
*
*@return mixed
*/


public function index() {
    // die('SALAM');
    $this ->JsonEncode(Categorie::all());
}
public function unite() {
    // die('SALAM');
    $this ->JsonEncode(Categorie::all());
}

/** 
*
*@return mixed
*/

public function create(){

}

/** 
*
*@return mixed
*/

public function store() {
    // dd($_POST);
    $data = json_decode(file_get_contents('php://input'),true);
    Validator::isVide($data['libelle'], 'libelle');
    $response = []; // Initialiser une réponse JSON

    if (Validator::validate()) {
        try {
            $categorie = Categorie::create([
                'libelle' => $data['libelle']
            ]);

            $unite = Unite::create([
                'libelle' => $data['unite'],
                'conversion' => $data['conversion'],
                'etat' => 1
            ]);
            UniCategorie::create([
                'unite' => $unite,
                'categorie' => $categorie
            ]);
            $response['success'] = true;
            $response['message'] = "Catégorie ajoutée avec succès";
        } catch (\PDOException $th) {
            $response['success'] = false;
            $response['message'] = "Une erreur s'est produite lors de l'ajout de la catégorie";
        }
    }

    // Envoyer la réponse JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    
}


}