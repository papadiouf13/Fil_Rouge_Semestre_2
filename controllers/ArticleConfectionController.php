<?php
namespace App\Controllers;

use App\Core\Session;
use App\Core\Validator;
use App\Core\Controller;
use App\Models\ArticleConfection;





class ArticleConfectionController extends Controller
{

    /** 
     *
     *@return mixed[]
     */

    public function index()
    {
        $datas = ArticleConfection::all();
        // dd($datas);
        $this->view('article/liste', ["datas" => $datas]);
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
        Validator::isVide($_POST['libelle'], 'libelle');
        // Validator::isVide($_POST['prixAchat'], 'prixAchat');
        // Validator::isVide($_POST['qteStock'], 'qteStock');

        // Validator::isPositive($_POST['prixAchat'], 'prixAchat');
        // Validator::isPositive($_POST['qteStock'], 'qteStock');

        // dd(Validator::validate());
        if (Validator::validate()) {
            $photo = "photo";
            try {

                ArticleConfection::create(
                    [
                        'libelle' => $_POST['libelle'],
                        'prixAchat' => $_POST['prixAchat'],
                        'qteStock' => $_POST['qteStock'],
                        'photo' => $photo,
                        'categorieId' => $_POST['categorieId'],
                    ]

                );
            } catch (\PDOException $th) {
                Validator::$errors;
            }
            $this->redirect('article');
        } else {

            Session::set("errors", Validator::$errors);
            $this->redirect('form-article');
        }
    }


    public function form()
    {
        $this->view('article/form');
    }

    
}
