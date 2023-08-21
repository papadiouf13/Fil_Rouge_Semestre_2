<?php
namespace App\Core;
class Session {
    public static function openSession(){
        if (session_status()== PHP_SESSION_NONE) {
           
            session_start();
        }
    }
    public static function destroySession(){
        session_destroy();
    }
    public static function isset(string $key){
        return isset($_SESSION[$key]);
    }
    public static function unset(string $key){
        unset($_SESSION[$key]);
    }
    public static function set(string $key, $data){
        $_SESSION[$key] = $data;
    }
    public static function get(string $key){
        return self::isset($key) ? $_SESSION[$key] : null;
    }
}