<?php

namespace App\Controllers\Api;

use App\Models\Unite;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\UniCategorie;



class UniteController extends Controller
{
    
    /** UniteController
     *
     *@return mixed
     */


    public function index()
    {
        // die('SALAM');
        $this->JsonEncode(Unite::all());
    }


    public function unite()
    {
        $model = new Unite();
        $selectColumns = ['unite.libelle']; // Colonne(s) que vous souhaitez sélectionner
    
        $joinConditions = [
            ['table' => 'UniCategorie', 'on' => 'Unite.id = UniCategorie.Unite'],
            ['table' => 'Categorie', 'on' => 'UniCategorie.Categorie = Categorie.id']
        ];
        $whereConditions = [
            'Categorie.id =' => $_SESSION['id'],
            // 'unite.etat =' => 1
        ];
        
        $results = $model->findByJoinAndConditions($selectColumns, 'unite', $joinConditions, $whereConditions);
        $this->JsonEncode($results);
    }
    
public function categoryID()
{
    $data = json_decode(file_get_contents('php://input'), true);
   $id = $data['categorieID'];
   $_SESSION['id'] = $id;
//    dd($_SESSION['id']);
}

    

    /** 
     *
     *@return mixed
     */

    public function create()
    {
    }

    /** 
     *
     *@return mixed
     */

    public function store()
    {
        // dd($_POST);
        $data = json_decode(file_get_contents('php://input'), true);
        // dd($data);
        foreach ($data as  $value) {


            Validator::isVide($value['libelle'], 'libelle');
            $response = [];
            $categorie = $value['idCategorie'];
            if (Validator::validate()) {
                try {
                    $unite = Unite::create([
                        'libelle' => $value['libelle'],
                        'conversion' => $value['conversion']
                    ]);

                    UniCategorie::create([
                        'unite' => $unite,
                        'categorie' => $categorie
                    ]);



                    $response['success'] = true;
                    $response['message'] = "Unite ajoutée avec succès";
                } catch (\PDOException $th) {
                    $response['success'] = false;
                    $response['message'] = "Une erreur s'est produite lors de l'ajout de l'unite";
                }
            }

            // Envoyer la réponse JSON
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }
}
