<?php
namespace App\Core;
abstract class Controller {
    public abstract function index();
    public abstract function create();
    public abstract function store();

    public function __construct()
    {
        Session::openSession();
    }


    public function view(string $file , array $data= []){
        extract($data); 
        ob_start();
    require "../public/ressources/views/".$file.".html.php";
    $content_for_view = ob_get_clean();
    require "../public/ressources/views/base.layout.html.php";
    }
    
    public function redirect(string $path){
        header("Location:".WEB_URL."?path=$path");
    }

    public function JsonEncode(array $data){
       echo json_encode($data);
    }

    // public function JsonDecode(){
    //     $json = file_get_contents("php://input");
    //     return json_decode($json, true);
    //  }

    public function JsonDecode(){
        $json = file_get_contents("php://input");
        $decoded = json_decode($json);
    
        if ($decoded === true) {
            return []; // Retourne un tableau vide si le JSON est true
        } else {
            return $decoded; // Retourner un objet JSON décodé s'il n'est pas true
        }
    }
}