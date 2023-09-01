<?php 
namespace App\Models;
use App\Core\Model;
use App\Models\taille;
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
            $this->tailleModel = new Taille();
        }
       //Navigation 
       public function categorie(){
        return $this->categorieModel->find($this->idcategorie);
       }
       public int $idtaille;
       public Taille $tailleModel ;

      
      public function taille(){
       return $this->tailleModel->find($this->idtaille);
      }

   
    
}