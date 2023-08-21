<?php
function dd($data){
    dump($data);
    die();
}
function dump($data){
    echo "<pre>";
        var_dump($data);
    echo "</pre>";
}

function DateEnFrancais($dateAppro) {
    $timestamp = strtotime($dateAppro);
    return date('d/m/Y', $timestamp);
}
function DateEnAnglais($dateAppro) {
    $timestamp = strtotime($dateAppro);
    return date('Y/m/d', $timestamp);
}

function asset(string $path) {
    echo WEB_URL."ressources/$path";
}