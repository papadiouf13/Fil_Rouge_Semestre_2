<?php

namespace App\Controllers\Api;

use App\Core\Validator;
use App\Core\Controller;
use App\Models\Categorie;
use App\Models\ArticleVente;






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

    public function categorie() {
        // die('SALAM');
        $this ->JsonEncode(Categorie::allcategorieVente());
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
       
    }
}
