<?php

namespace App\Controllers;

use Config\Database;
use App\Models\Categories;

class CategoriesController{

    public function readAll(){
        // Les entêtes requis
// Accès depuis n'importe quel site ou appareil (*)
header("Access-Control-Allow-Origin: *");

// Format des données envoyées
header("Content-Type: application/json; charset=UTF-8");

// Méthode autorisée
header("Access-Control-Allow-Methods: GET");

// Durée de vie de la requête
header("Access-Control-Max-Age: 3600");

// Entêtes autorisées
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER["REQUEST_METHOD"] === "GET"){
    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnexion();

    // On instancie l'objet Categories
    $category = new Categories($db);

    // On récupère les données
    $stmt = $category->readAll();

    if ($stmt->rowCount() > 0){
        //$data = [];
        $data = $stmt->fetchAll();

        // On renvoie les données au format JSON
        http_response_code(200);
        echo json_encode($data);
    }else{
        echo json_encode(["message"=>"Aucune données à renvoyer"]);
    }
}else{
    http_response_code(405);
    echo json_encode(["message"=>"La méthode n'est pas autorisée"]);
}
    }
}

?>