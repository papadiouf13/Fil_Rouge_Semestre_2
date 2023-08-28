<?php 
namespace App\Models;
use App\Core\Model;
use App\Models\Unite;


 class UniCategorie extends Model{
         public int $id;
         public int $unite;
         public int $categorie;
         protected  static function tableName(){
          return "unicategorie";
         }

       public Unite $uniteModel;

       public function __construct(){
        $this ->uniteModel = new Unite;
      }

      public function unite(){
        return $this ->uniteModel->find($this->unite);
      }

      public static function findDetailByCategorie($categorie){
        return parent::find("SELECT * FROM ". self::tableName() . " WHERE categorie=:categorie",["categorie" => $categorie]);
      }
//       public static function findDetailByCategorie(int $idCategorie){
//         return parent::query("select * from ".  self::tableName() ." where idCategorie=:idCategorie  ",["idCategorie"=>$idCategorie]);
//       }
        
 }