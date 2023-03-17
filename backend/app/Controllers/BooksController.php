<?php

namespace App\Controllers;

use Config\Database;
use App\Models\Books;

class BooksController
{

    public function readAll()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: GET");

        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $book = new Books($db);

            // On récupère les données
            $stmt = $book->readAll();

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

    public function readById(int $id)
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: GET");

        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $book = new Books($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            //print_r($book);
            $url = $_GET['url'];
            $id = basename(parse_url($url, PHP_URL_PATH));
            if (!empty($id)) {
                //var_dump("coucou");
                // On récupère les données

                $book->setId($id);
                //$book->id = $data->id;
                //print_r($book->setId($data->id));
                $result = $book->readById($book->getId());
                //var_dump($result);
                if ($result->rowCount() > 0) {
                    //$data = [];
                    $donnees = $result->fetch();
                    // On vérifie si le livre existe
                    //if ($book->getId() != null) {

                    //$data = $book->fetch();
                    // On envoie le code réponse 200 OK
                    http_response_code(200);

                    // On encode en json et on envoie
                    echo json_encode($donnees);
                } else {
                    // 404 Not found
                    http_response_code(404);
                    echo json_encode(array("message" => "Le livre n'existe pas."));
                }
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

            // On instancie l'objet Books
            $book = new Books($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->id)) {
                $book->setId($data->id);

                $result = $book->delete();
                if ($result) {
                    http_response_code(200);
                    echo json_encode(["message" => "La suppression du livre a été effectué avec succès"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "La suppression du livre a échoué"]);
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
