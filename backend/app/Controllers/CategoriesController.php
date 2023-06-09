<?php

namespace App\Controllers;

use Config\Database;
use App\Models\Categories;

class CategoriesController
{

    public function readAll()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: GET");

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
        // Méthode autorisée
        header("Access-Control-Allow-Methods: GET");

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

    public function create()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: POST");

        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Categories
            $category = new Categories($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            if (!empty($data->name)) {
                // On hydrate l'objet category
                $category->setName($data->name);

                $result = $category->create();
                if ($result) {
                    http_response_code(201);
                    echo json_encode(["message" => "La catégorie a été ajouté avec succès"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "L'ajout de la catégorie a échoué"]);
                }
            } else {
                //http_response_code(503);
                echo json_encode(["message" => "Les données ne sont pas complètes"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function update()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: PUT");

        if ($_SERVER["REQUEST_METHOD"] === "PUT") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            $category = new Categories($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->id)) {
                $category->setId($data->id);
                $category->setName($data->name);

                $result = $category->update();
                if ($result) {
                    http_response_code(201);
                    echo json_encode(["message" => "La catégorie a été modifié avec succès"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "La modification de la catégorie a échoué"]);
                }
            } else {
                //http_response_code(503);
                echo json_encode(["message" => "Les données ne sont pas complètes"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function delete()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: DELETE");

        if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Categories
            $category = new Categories($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->id)) {
                $category->setId($data->id);

                $result = $category->delete();
                if ($result) {
                    http_response_code(200);
                    echo json_encode(["message" => "La suppression de la catégorie a été effectué avec succès"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "La suppression de la catégorie a échoué"]);
                }
            } else {
                echo json_encode(["message" => "Vous devez précisé l'identifiant de la catégorie"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }
}
