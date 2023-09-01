<?php 
namespace App\Models;
use App\Core\Model;
use App\Models\Unite;


 class CategorieTaille extends Model{
         public int $id;
         public int $taille;
         public int $categorie;
         protected  static function tableName(){
          return "categorietaille";
         }

       public Taille $tailleModel;

       public function __construct(){
        $this ->tailleModel = new Unite;
      }

      public function taille(){
        return $this ->tailleModel->find($this->taille);
      }

      public static function findDetailByCategorie($categorie){
        return parent::find("SELECT * FROM ". self::tableName() . " WHERE categorie=:categorie",["categorie" => $categorie] AND ["etat" => 1]);
      }
//       public static function findDetailByCategorie(int $idCategorie){
//         return parent::query("select * from ".  self::tableName() ." where idCategorie=:idCategorie  ",["idCategorie"=>$idCategorie]);
//       }
        
 }