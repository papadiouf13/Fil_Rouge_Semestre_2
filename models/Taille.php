<?php 
namespace App\Models;
use App\Core\Model;
/**
 * A-Convention sur les Classe
 * 1-Nom Classe PascalCase   Exemple : MaClasse  uniteModel
 * 2-Les classes portent le meme nom que le fichier
 * 
 *    
 */

 class Taille extends Model{
         public int $id;
         public string $libelle;
         protected  static function tableName(){
          return "taille";
         }
 
       

        

  
 }