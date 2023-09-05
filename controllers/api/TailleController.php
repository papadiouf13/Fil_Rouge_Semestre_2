<?php

namespace App\Controllers\Api;

use App\Models\Taille;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\CategorieTaille;



class TailleController extends Controller
{

    /** TailleController
     *
     *@return mixed
     */


    public function index()
    {
        // die('SALAM');
        $this->JsonEncode(Taille::all());
    }


    public function Taille()
    {
        $model = new taille();
        $selectColumns = ['Categorie.libelle AS categorie_libelle', 'Taille.libelle AS taille_libelle', 'Taille.id AS id'];
        
        $joinConditions = [
            ['table' => 'CategorieTaille', 'on' => 'Categorie.id = CategorieTaille.idCategorie'],
            ['table' => 'Taille', 'on' => 'CategorieTaille.idTaille = Taille.id']
        ];

        $whereConditions = [
            'Categorie.id =' => $_SESSION['id']
        ];

        $results = $model->findByJoinAndConditions($selectColumns, 'Categorie', $joinConditions, $whereConditions);
        $this->JsonEncode($results);
    }

    public function categoryID()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['categorieID'];
        $_SESSION['id'] = $id;
        $this->JsonEncode(["id " => $id]);
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
        $data = json_decode(file_get_contents('php://input'), true);
        // dd($data);
        $responseData = []; // Tableau pour stocker les données de la réponse

        foreach ($data as $value) {
            $response = [];
            $categorie = $value['idCategorie'];

            Validator::isVide($value['libelle'], 'libelle');

            if (Validator::validate()) {
                try {
                    $taille = Taille::create([
                        'libelle' => $value['libelle'],
                    ]);

                    CategorieTaille::create([
                        'idtaille' => $taille,
                        'idcategorie' => $categorie
                    ]);

                    // Ajouter les données de l'unité au tableau de données de la réponse
                    $responseData[] = [
                        'libelle' => $value['libelle'],
                        'idCategorie' => $categorie
                    ];
                } catch (\PDOException $th) {
                    $response['success'] = false;
                    $response['message'] = "Une erreur s'est produite lors de l'ajout de la Taille";
                }
            }
        }

        // Ajouter la réponse au tableau de données de la réponse
        $response['success'] = true;
        $response['message'] = "Taille ajoutée avec succès";
        $response['data'] = $responseData;

        // Envoyer la réponse JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}
