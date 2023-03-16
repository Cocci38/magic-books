<?php

namespace App\Controllers;

use Config\Database;
use App\Models\Categories;

class CategoriesController
{

    public function readAll()
    {
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


        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Categories
            $category = new Categories($db);

            // On récupère les données
            $stmt = $category->readAll();

            if ($stmt->rowCount() > 0) {
                //$data = [];
                $data = $stmt->fetchAll();

                // On renvoie les données au format JSON
                http_response_code(200);
                echo json_encode($data);
            } else {
                echo json_encode(["message" => "Aucune données à renvoyer"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function readById()
    {
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

        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Categories
            $category = new Categories($db);
            // file_get_contents => c'est le fichier d'entrée php
            $data = json_decode(file_get_contents("php://input"));

            // $url = $_GET['url'];
            // $id = basename(parse_url($url, PHP_URL_PATH));
            if (isset($data->id) && $data->id !== null) {

                $category->setId($data->id);
                // On récupère les données
                $result = $category->readById();

                if ($result->rowCount() > 0) {
                    //$data = [];
                    $donnees = $result->fetch();

                    // On renvoie les données au format JSON
                    http_response_code(200);
                    echo json_encode($donnees);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Aucune données à renvoyer"]);
                }
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Aucune catégorie ne correspond"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }
}
