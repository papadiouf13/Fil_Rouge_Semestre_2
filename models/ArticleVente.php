<?php 
namespace App\Models;
use App\Core\Model;
use App\Models\Unite;
use App\Models\Categorie;

class ArticleVente extends Model {
    public int $id;
    public string $libelle;
    public float $prix;
    public int $quantite;
    public string $photo;
    public string $reference;
    protected static function tableName(){
        return "article_vente";
       }

   
      //Cle etrangere
        public int $idcategorie;
        public Categorie $categorieModel ;

        public function __construct(){
            $this->categorieModel = new Categorie();
            $this->uniteModel = new Unite();
        }
       //Navigation 
       public function categorie(){
        return $this->categorieModel->find($this->idcategorie);
       }
       public int $idunite;
       public Unite $uniteModel ;

      
      public function unite(){
       return $this->uniteModel->find($this->idunite);
      }

   
    
}