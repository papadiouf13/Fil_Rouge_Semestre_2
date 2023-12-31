<?php

namespace App\Controllers\Api;

use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;
use App\Models\ArticleVente;
use App\Models\ArticleVenteTaille;

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

    public function categorie()
    {
        // die('SALAM');
        $this->JsonEncode(Categorie::allcategorieVente());
    }

    /** 
     *
     *@return mixed
     */

    public function create()
    {
    }
    public function DetailsArticleVente()
    {
        $this->JsonEncode(ArticleVenteTaille::all());
    }

    public function detail()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        // dd($data);
        $Article = ArticleVente::find($data['id']);
        echo json_encode($Article);
    }


    /** 
     *
     *@return mixed
     */

    public function store()
    {
        $response = [];
        $data = json_decode(file_get_contents('php://input'), true);
        // dd($data);
        define('ROUTE', 'C:\Users\MAMADOU DIOUF\Desktop\Fil_Rouge_Semestre_2/public/ressources/images/articleVente/');



        Validator::isVide($data['libelle'], 'libelle');
        $QuantiteArticle = $data['ArticleQuantite'];
        if (Validator::validate()) {
            try {
                $uploadPath = ROUTE . $data['cheminImage'];
                file_put_contents($uploadPath, $data['cheminImage']);
                $article = ArticleVente::create([
                    'libelle' => $data['libelle'],
                    'prixVente' =>  $data['prixvente'],
                    'idtaille' => $data['idtaille'],
                    'reference' => $data['references'],
                    'idcategorie' =>  $data['idcategorie'],
                    'photo' => $data['photo'],
                ]);
                // dd($QuantiteArticle);
                foreach ($QuantiteArticle as $value) {
                    ArticleVenteTaille::create([
                        'idarticle' => $article,
                        'idarticleConfection' => $value['id'],
                        'quantite' => $value['quantite'],
                        'marge' => $data['marge'],
                    ]);
                }
                $response['success'] = true;
                $response['message'] = "L'article a été ajouté avec succès.";
                $response['article'][] = [
                    'id' => $article,
                    'libelle' => $data['libelle'],
                    'prixVente' => $data['prixvente'],
                    'idtaille' => $data['idtaille'],
                    'reference' => $data['references'],
                    'idcategorie' => $data['idcategorie'],
                    'photo' => $data['photo'],
                ];
            } catch (\PDOException $th) {
                $response['success'] = false;
                $response['message'] = "Une erreur s'est produite lors de l'ajout de l'article.";
            }
        }


        echo json_encode($response);
    }
}
