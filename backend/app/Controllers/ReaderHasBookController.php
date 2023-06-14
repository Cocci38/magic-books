<?php

namespace App\Controllers;

use App\Models\Books;
use Config\Database;
use App\Models\ReaderHasBook;

class ReaderHasBookController extends Controller
{
    public function readAllByReaderId()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: GET");
        // if ($this->Authorization() == "[ROLE_READER]") {
        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $readerHasBook = new ReaderHasBook($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            //print_r($book);
            $url = $_GET['url'];
            $id = basename(parse_url($url, PHP_URL_PATH));
            //var_dump($data);
            $readerHasBook->setReaderId($data->readerId);
            // On récupère les données
            $stmt = $readerHasBook->readAllByReaderId($readerHasBook->getReaderId());

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
        // } else {
        //     echo json_encode(["result" => "ERROR", "message" => "Autorisation refusée"]);
        // }
    }

    public function create()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: POST");
        // if ($this->Authorization() == "[ROLE_READER]") {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet ReaderHasBook
            $readerHasBook = new ReaderHasBook($db);
            $book = new ReaderHasBook($db);
            $bookExists = new Books($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->readerId) && !empty($data->bookId)) {

                // On vérifie que le livre existe
                $bookExists->setId($data->bookId);
                $exist = $bookExists->readById();
                if ($exist->rowCount() > 0) {

                    // On vérifie que le livre n'est pas présent dans la bibliothèque du lecteur
                    $book->setReaderId($data->readerId);
                    $book->setBookId($data->bookId);
                    $bookResult = $book->readByBookId($book->getReaderId(), $book->getBookId());
                    if ($bookResult->rowCount() > 0) {
                        http_response_code(503);
                        echo json_encode(["message" => "Ce livre est déjà présent dans la bibliothèque"]);
                    } else {
                        $readerHasBook->setReaderId($data->readerId);
                        $readerHasBook->setBookId($data->bookId);

                        $result = $readerHasBook->create();
                        if ($result) {
                            http_response_code(201);
                            echo json_encode(["result" => "Ok", "message" => "Le livre a été ajouté à la bibliothèque"]);
                        } else {
                            http_response_code(503);
                            echo json_encode(["message" => "L'ajout du livre dans la bibliothèque a échoué"]);
                        }
                    }
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Le livre n'existe pas"]);
                }
            } else {
                //http_response_code(503);
                echo json_encode(["message" => "Les données ne sont pas complètes"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
        // } else {
        //     http_response_code(401);
        //     echo json_encode(["result" => "ERROR", "message" => "Autorisation refusée"]);
        // }
    }

    public function delete()
    {
        // Méthode autorisée
        header("Access-Control-Allow-Methods: DELETE");
        // if ($this->Authorization() == "[ROLE_READER]") {
        if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $readerHasBook = new ReaderHasBook($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            //var_dump($data->id);

            if (!empty($data)) {

                $readerHasBook->setId($data->id);

                $result = $readerHasBook->delete();

                if ($result) {
                    http_response_code(200);
                    echo json_encode(["result" => "Ok", "message" => "La suppression du livre de la bibliothèque a été effectué avec succès"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "La suppression du livre de la bibliothèque a échoué"]);
                }
            } else {
                echo json_encode(["message" => "Vous devez précisé l'identifiant du livre"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
        // } else {
        //     http_response_code(401);
        //     echo json_encode(["result" => "ERROR", "message" => "Autorisation refusée"]);
        // }
    }
}
