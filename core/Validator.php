<?php
namespace App\Core;
class Validator {
    public   static array $errors = [];
    public static function isVide ($field, $key, $message= "Champ aubligatoire"){
    
        if(empty($field)){
            self::$errors[$key] = $message;
        }
    }

    public static function isPositive ($field, $key, $message= "Nombre Positive"){
    
        if($field<= 0){
            self::$errors[$key] = $message;
        }
    }

    public static function validate(): bool {
        return count(self::$errors) == 0;
    }



    public static function isInt($valeur) {
        return is_numeric($valeur);
    }

 

   
    // public static function isNum() {
    //     if(!is_numeric($_POST['num'])){
    //         self::$errors['num'] = "Le champ doit être un nombre";
    //         return false;
    //     }
    //     return true;
    // }

    

    
}