<?php 
namespace App\Models;
use App\Core\Model;


 class FourniArticle extends Model{
         public int $id;
         public string $idfournisseur;
         public string $idarticleconf;
         protected  static function tableName(){
          return "fourni_article";
         }

        
 }