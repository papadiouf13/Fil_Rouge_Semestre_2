<?php
namespace App\Core;
 abstract class Model extends BaseDeDonnees {
    protected  abstract static function tableName();
    

    public static function query(string $sqll, array $data=[], bool $single=false) {
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare($sqll);
        $sql->execute($data);
        $sql->setFetchMode(\PDO::FETCH_CLASS, get_called_class());

        if ($single) {
           
            $data = $sql->fetch();
        }else {
           $data = $sql->fetchAll();
        }
        $sql ->closeCursor();
        return $data;
    }

         public static function all(){
        return self::query('SELECT * FROM '.static::tableName());
    }


        public static function find($id){
        return self::query('SELECT * FROM '.static::tableName().' WHERE id = :id' , ["id"=>$id], true);
}

 
    public static function create($data){
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare('INSERT INTO '.static::tableName().' ('.implode(',', array_keys($data)).') VALUES (:'.implode(',:', array_keys($data)).')');
        $sql->execute($data);
        $sql ->closeCursor();
        return $connect->lastInsertId();
    }

    public static function update($id, $data){
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare('UPDATE '.static::tableName().' SET '.implode(',', array_keys($data)).' = :'.implode(',', array_keys($data)).' WHERE id = :id');
        $sql->bindValue(':id', $id);
        $sql->execute($data);
        $sql ->closeCursor();
    }

    public static function delete($id){
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare('DELETE FROM '.static::tableName().' WHERE id = :id');
        $sql->bindValue(':id', $id);
        $sql->execute();
        $sql ->closeCursor();
    }

    public static function executeUpdate(string $sqll, array $data=[]){
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare($sqll);
        $sql->execute($data);
        if (str_starts_with(strtolower($sqll), "insert")) {
            $data=$connect->lastInsertId();
        }else{
            $sql->rowCount();
        }
        $sql ->closeCursor();
        return $data;
    }

    
}