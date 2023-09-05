<?php

namespace App\Models;
use App\Core\Model;

class ArticleVenteTaille extends Model
{
    public int $id;
    public int $idarticle;
    public int $idarticleConfection;
    public int $marge;
    public int $quantite;

    protected static function tableName()
    {
        return "articleventetaille";
    }

    public function articleVente()
    {
        return ArticleVente::find($this->idarticle);
    }

    public function articleConfection()
    {
        return ArticleConfection::find($this->idarticleConfection);
    }
}
