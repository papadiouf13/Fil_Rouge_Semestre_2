<?php
namespace App\Controllers\Api;


use App\Core\Validator;
use App\Core\Controller;
use App\Models\Fournisseur;



class FournisseurController extends Controller {



public function index() {
    // die('SALAM');
    $this ->JsonEncode(Fournisseur::all());
}


public function create(){

}

/** 
*
*@return mixed
*/

public function store() {
    // dd($_POST);
    $data = json_decode(file_get_contents('php://input'),true);
    // dd($data);
    Validator::isVide($data['prenom'], 'prenom');
    $response = []; 
    if (Validator::validate()) {
        try {
            Fournisseur::create([
                'prenom' => $data['prenom'],
                'nom' => $data['nom'],
                'telephone' => $data['telephone'],
            ]);

            

            $response['success'] = true;
            $response['message'] = "fournisseur ajoutée avec succès";
        } catch (\PDOException $th) {
            $response['success'] = false;
            $response['message'] = "Une erreur s'est produite lors de l'ajout de l'fournisseur";
        }
    }

    // Envoyer la réponse JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    
}
}