<?php

namespace App\Controllers;

use App\Models\Books;
use Config\Database;
use App\Models\Categories;

class CategoriesController extends Controller
{

    public function readAll()
    {
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

    public function readCategoriesCoverBooks()
    {
        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Categories
            $category = new Categories($db);
            $books = new Books($db);

            // On récupère les données
            $stmt = $category->readAll();

            if ($stmt->rowCount() > 0) {
                //$data = [];
                $data = $stmt->fetchAll();
                $dataBook = [];
                foreach ($data as $idCategory) {
                    // var_dump($value["id"]);
                    $books->setCategoryId($idCategory["id"]);
                    // var_dump($books);
                    $book = $books->readBookByCategory($books->getCategoryId());
                    // var_dump($book);
                    $bookData = $book->fetchAll();
                    foreach ($bookData as $keyBook) {
                        $dataBook[] = $keyBook;
                        // var_dump($keyBook);
                    }
                    // print_r($dataBook);
                    
                }
                // On renvoie les données au format JSON
                http_response_code(200);
                echo json_encode(["category" => $data, "book" => $dataBook]);
                
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
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Categories
            $category = new Categories($db);

            // file_get_contents => c'est le fichier d'entrée php
            $data = json_decode(file_get_contents("php://input"));
            $id = $data->id;

            if (isset($id) && $id !== null) {
                $count = 0;
                $category->setId($id);
                // On récupère les données
                $result = $category->readById();

                if ($result->rowCount() > 0) {
                    $data = $result->fetchAll();
                    // Je compte pour déterminer le nombre de livres présent dans la catégorie sélectionnée
                    if ($data > 0) {
                        $count = count($data);
                    }
                    $categoryName = $data[0]["categorie_name"];

                    // On renvoie les données au format JSON
                    http_response_code(200);
                    echo json_encode(["result" => "Ok", "data" => $data, "count" => $count, "categoryName" => $categoryName]);
                } else {
                    $data = $result->fetch();
                    if ($data["book_id"] == null) {
                        http_response_code(200);
                        echo json_encode(["result" => "Ok", "categoryName" => $data["categorie_name"], "count" => $count]);
                    } else {
                        http_response_code(404);
                        echo json_encode(["message" => "Aucune données à renvoyer"]);
                    }
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
        if ($this->Authorization() == "[ROLE_ADMIN]") {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {

                // On instancie la base de données
                $database = new Database();
                $db = $database->getConnexion();

                // On instancie l'objet Categories
                $category = new Categories($db);
                // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                $data = json_decode(file_get_contents("php://input"));
                // error_log(print_r($data)); //file_get_contents("php://input"),1));
                if (!empty($data->name)) {
                    // On hydrate l'objet category
                    $category->setName($data->name);

                    $result = $category->create();
                    if ($result) {
                        http_response_code(201);
                        echo json_encode(["result" => "Ok", "message" => "La catégorie a été ajouté avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(["message" => "L'ajout de la catégorie a échoué"]);
                    }
                } else {
                    //http_response_code(409);
                    echo json_encode(["message" => "Les données ne sont pas complètes"]);
                }
            } else {
                http_response_code(405);
                echo json_encode(["message" => "La méthode n'est pas autorisée"]);
            }
        } else {
            http_response_code(401);
            echo json_encode(["result" => "ERROR", "message" => "Autorisation refusée"]);
        }
    }

    public function update()
    {
        if ($this->Authorization() == "[ROLE_ADMIN]") {
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
                        echo json_encode(["result" => "Ok", "message" => "La catégorie a été modifié avec succès"]);
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
        } else {
            http_response_code(401);
            echo json_encode(["result" => "ERROR", "message" => "Autorisation refusée"]);
        }
    }

    public function delete()
    {
        if ($this->Authorization() == "[ROLE_ADMIN]") {
            if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
                // On instancie la base de données
                $database = new Database();
                $db = $database->getConnexion();

                // On instancie l'objet Categories
                $category = new Categories($db);

                // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                $data = json_decode(file_get_contents("php://input"));
                
                if (!empty($data)) {
                    $category->setId($data);
                    $result = $category->delete();
                    if ($result) {
                        http_response_code(200);
                        echo json_encode(["result" => "Ok", "message" => "La suppression de la catégorie a été effectué avec succès"]);
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
        } else {
            http_response_code(401);
            echo json_encode(["result" => "ERROR", "message" => "Autorisation refusée"]);
        }
    }
}
