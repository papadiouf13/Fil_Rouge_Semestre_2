<?php

namespace App\Controllers\Api;

use App\Core\Validator;
use App\Core\Controller;
use App\Models\Fournisseur;
use App\Models\ArticleVente;
use App\Models\FourniArticle;






class ArticleVenteController extends Controller
{

    /** 
     *
     *@return mixed[]
     */

    public function index()
    {
        // die('tioukh');
        $this->JsonEncode(ArticleVente::all());
        // dd($datas);

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
        $response['article'] = [];
        $data = json_decode(file_get_contents('php://input'), true);
        $response = ['success' => false, 'message' => '', 'article' => [], 'fournisseurs' => []];
        define('ROUTE', 'C:\Users\MAMADOU DIOUF\Desktop\Fil_Rouge_Semestre_2/public/ressources/images/');

        Validator::isVide($data['libelle'], 'libelle');
        Validator::isVide($data['prix'], 'prix');
        Validator::isVide($data['quantite'], 'quantite');

        if (Validator::validate()) {
            try {
                $uploadPath = ROUTE . $data['cheminImage'];
                file_put_contents($uploadPath, $data['cheminImage']);

                $article = ArticleVente::create([
                    'libelle' => $data['libelle'],
                    'prix' => $data['prix'],
                    'quantite' => $data['quantite'],
                    'photo' => $data['photo'],
                    'idunite' => $data['idunite'],
                    'idcategorie' => $data['idcategorie'],
                    'reference' => $data['references']
                ]);

                $fournisseursDetails = [];
                foreach ($data['idfournisseur'] as $value) {
                    FourniArticle::create([
                        'idarticleconf' => $article,
                        'idfournisseur' => $value,
                    ]);

                    $fournisseur = Fournisseur::find($value);
                    if ($fournisseur) {
                        $fournisseursDetails[] = $fournisseur;
                    }
                }

                $response['success'] = true;
                $response['message'] = 'Article ajouté avec succès.';
                $response['article'][] = [
                    'id' => $article,
                    'libelle' => $data['libelle'],
                    'prix' => $data['prix'],
                    'quantite' => $data['quantite'],
                    'idunite' => $data['idunite'],
                    'idcategorie' => $data['idcategorie'],
                    'reference' => $data['references'],
                    'fournisseurs' => $fournisseursDetails,
                    'photo' => $data['photo'],
                ];
            } catch (\PDOException $th) {
                $response['message'] = "Une erreur s'est produite lors de l'ajout de l'article.";
            }
        } else {
            $response['message'] = 'Les données ne sont pas valides.';
        }

        // echo json_encode($response['article'], TRUE);
        $this->renderJson($response['article']);
    }
}
