<?php
namespace App\Controllers\Api;


use App\Core\Validator;
use App\Core\Controller;
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
        $this ->JsonEncode(ArticleConfection::all());
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
        $data = json_decode(file_get_contents('php://input'),true);
        // dd($data);
        // dd('create');
        // dd($_POST);
        Validator::isVide($data['libelle'], 'libelle');
        Validator::isVide($data['prix'], 'prix');
        Validator::isVide($data['quantite'], 'quantite');

        // dd(Validator::validate());
        if (Validator::validate()) {
            $photo = "photo";
            try {

                $article = ArticleConfection::create(
                    [
                        'libelle' => $data['libelle'],
                        'prix' => $data['prix'],
                        'quantite' => $data['quantite'],
                        'photo' => $photo,
                        'idcategorie' => $data['idcategorie'],
                        'idunite' => $data['idunite'],
                    ]

                );
                foreach ($data['idfournisseur'] as $value) {
                    
                    FourniArticle::create([
                       'idarticleconf' => $article,
                       'idfournisseur' => $value['id'],
                    ]);
                }
            } catch (\PDOException $th) {
                Validator::$errors;
            }
           
        } else {

            // Session::set("errors", Validator::$errors);
           
        }
    }


   

  

   
}
