<?php
namespace App\Core;
class Router {
    private static $route = [];

    public static function route(string $uri, array $controller){
        self::$route[$uri]= $controller;    
    }

    public static function resolve(){
        $uri = $_SERVER['REQUEST_URI'];
        if(isset(self::$route[$uri])){
            // dd(self::$route[$uri][0]);
            [$ctrlClass,$action]=self::$route[$uri];
            if (class_exists($ctrlClass) && method_exists($ctrlClass,$action)) {
                // dd($action); 
                $ctrl = new $ctrlClass();
                $ctrl->{$action}();
                // dd($ctrlClass); 
            }else{
                dd('BAXOUL');
                
            }
        }else{
          //page 404  
        }
    }
}