<?php 
namespace App\Core;
class BaseDeDonnees {
    protected static \PDO|null $connect=null;
    public static function ouvrirConnexion(){
        try {
            if (self::$connect==null) {
                self::$connect = new \PDO('mysql:host=localhost;dbname=semestre4_221;charset=utf8', 'root', '');
            }
            return self::$connect;
        } catch (\Exception $th) {
           dd($th->getMessage());
        }
           
        }
    public static function fermerConnexion(){
        self::$connect=null;
    }
}

