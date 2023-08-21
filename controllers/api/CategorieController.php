<?php
namespace App\Controllers\Api;

use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;



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
            Categorie::create([
                'libelle' => $data['libelle']
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