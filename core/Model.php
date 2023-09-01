<?php

namespace App\Core;

abstract class Model extends BaseDeDonnees
{
    protected  abstract static function tableName();


    public static function query(string $sqll, array $data = [], bool $single = false)
    {
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare($sqll);
        $sql->execute($data);
        $sql->setFetchMode(\PDO::FETCH_CLASS, get_called_class());

        if ($single) {

            $data = $sql->fetch();
        } else {
            $data = $sql->fetchAll();
        }
        $sql->closeCursor();
        return $data;
    }
    // SELECT Unite.id, Unite.libell
    // FROM Unite
    // JOIN UniCategorie ON Unite.id = UniCategorie.idUnite
    // JOIN Categorie ON UniCategorie.idCategorie = Categorie.id
    // WHERE Categorie.libelle = 'nom_de_la_categorie';

    public static function all()
    {
        return self::query('SELECT * FROM ' . static::tableName());
    }

    public static function allcategorie()
    {
        return self::query('SELECT * FROM ' . static::tableName() . ' WHERE etat = 0');
    }

    public static function allcategorieVente()
    {
        return self::query('SELECT * FROM ' . static::tableName() . ' WHERE etat = 1');
    }


    public static function find($id)
    {
        return self::query('SELECT * FROM ' . static::tableName() . ' WHERE id = :id', ["id" => $id], true);
    }
    public static function findUNICONVERSION($id)
    {
        return self::query('SELECT conversion FROM  unicategorie  WHERE id = :id', ["id" => $id], true);
    }

    // SELECT * 
    // FROM unite
    // JOIN UniCategorie ON Unite.id = UniCategorie.Unite
    // JOIN Categorie ON UniCategorie.Categorie = Categorie.id
    // WHERE Categorie.id = 23 AND unite.etat = 1;
    public static function queryWithBindings($sql, $bindings = [], $single = false)
    {
        $connect = parent::ouvrirConnexion();
        $query = $connect->prepare($sql);
        $query->execute($bindings);
    
        if ($single) {
            $data = $query->fetch();
        } else {
            $data = $query->fetchAll();
        }
    
        $query->closeCursor();
        return $data;
    }
    
    public function findByJoinAndConditions($selectColumns, $mainTable, $joinConditions, $whereConditions)
    {
        $query = "SELECT " . implode(", ", $selectColumns) . " FROM $mainTable";
    
        foreach ($joinConditions as $joinCondition) {
            $query .= " JOIN {$joinCondition['table']} ON {$joinCondition['on']}";
        }
    
        if (!empty($whereConditions)) {
            $whereClause = [];
            foreach ($whereConditions as $column => $value) {
                $whereClause[] = "$column ?";
            }
            $query .= " WHERE " . implode(" AND ", $whereClause);
        }
    
        // Extract values from the $whereConditions associative array
        $bindings = array_values($whereConditions);
    
        return self::queryWithBindings($query, $bindings);
    }
    
    
    
    



    public static function create($data)
    {
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare('INSERT INTO ' . static::tableName() . ' (' . implode(',', array_keys($data)) . ') VALUES (:' . implode(',:', array_keys($data)) . ')');
        $sql->execute($data);
        $sql->closeCursor();
        return $connect->lastInsertId();
    }

    public static function update($id, $data)
    {
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare('UPDATE ' . static::tableName() . ' SET ' . implode(',', array_keys($data)) . ' = :' . implode(',', array_keys($data)) . ' WHERE id = :id');
        $sql->bindValue(':id', $id);
        $sql->execute($data);
        $sql->closeCursor();
    }

    public static function delete($id)
    {
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare('DELETE FROM ' . static::tableName() . ' WHERE id = :id');
        $sql->bindValue(':id', $id);
        $sql->execute();
        $sql->closeCursor();
    }

    public static function executeUpdate(string $sqll, array $data = [])
    {
        $connect = parent::ouvrirConnexion();
        $sql = $connect->prepare($sqll);
        $sql->execute($data);
        if (str_starts_with(strtolower($sqll), "insert")) {
            $data = $connect->lastInsertId();
        } else {
            $sql->rowCount();
        }
        $sql->closeCursor();
        return $data;
    }
}
