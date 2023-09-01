<?php

namespace App\Controllers\Api;


use App\Core\Validator;
use App\Core\Controller;
use App\Models\Fournisseur;
use App\Models\FourniArticle;
use App\Models\ArticleConfection;



class ArticleConfectionController extends Controller
{

    /** 
     *
     *@return mixed[]
     */

    public function index()
    {
        // die('tioukh');
        $this->JsonEncode(ArticleConfection::all());
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
        // dd($data);
        $response = ['success' => false, 'message' => '', 'article' => [], 'fournisseurs' => []];
        define('ROUTE', 'C:\Users\MAMADOU DIOUF\Desktop\Fil_Rouge_Semestre_2/public/ressources/images/');

        Validator::isVide($data['libelle'], 'libelle');
        Validator::isVide($data['prix'], 'prix');
        Validator::isVide($data['quantite'], 'quantite');

        if (Validator::validate()) {
            try {
                $uploadPath = ROUTE . $data['cheminImage'];
                file_put_contents($uploadPath, $data['cheminImage']);
                $valeurQuantite = $data['quantite']*$data['conversion'];
                $article = ArticleConfection::create([
                    'libelle' => $data['libelle'],
                    'prix' => $data['prix'],
                    'quantite' => $valeurQuantite,
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
                    'conversion' => $data['conversion'],    
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
        echo json_encode($response);
    }
}
