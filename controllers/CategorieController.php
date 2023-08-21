<?php
namespace App\Controllers;

use App\Core\Session;
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
    $datas = Categorie::all();
    // dd($datas);
    $this -> view('categorie/liste',["datas" => $datas]);
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

public function store(){
   
    Validator::isVide($_POST['libelle'], 'libelle');
    if (Validator::validate()) {
        try {
            Categorie::create([
                'libelle' => $_POST['libelle']
            ]);
            
        } catch (\PDOException $th) {
            Validator::$errors['libelle'] ="le libelle existe deja";
        }
        
    }
        Session::set("errors", Validator::$errors);
    
    $this -> redirect('categorie');
}
}