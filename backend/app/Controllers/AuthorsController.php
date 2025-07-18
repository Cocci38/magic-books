<?php

namespace App\Controllers;

use Config\Database;
use App\Models\Authors;

class AuthorsController extends Controller
{
    public function readAll()
    {
        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Authors
            $author = new Authors($db);

            // On récupère les données
            $stmt = $author->readAll();

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
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Authors
            $author = new Authors($db);
            // file_get_contents => c'est le fichier d'entrée php
            $data = json_decode(file_get_contents("php://input"));
            $id = $data->id;
            // $url = $_GET['url'];
            // $id = basename(parse_url($url, PHP_URL_PATH));
            //$author->setId($data->id);
            $author->setId($id);
            // On récupère les données
            $result = $author->readById();
            
            /** @var object $result */
            if ($result->rowCount() > 0) {
                //$data = [];
                $donnees = $result->fetch();
                // On renvoie les données au format JSON
                http_response_code(200);
                echo json_encode($donnees);
            } else {
                echo json_encode(["message" => "Aucune données à renvoyer"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function searchAuthor()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet authors
            $author = new Authors($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            
            $search = $data->search;
            if (!empty($search)) {
                // On récupère les données
                $author->setSearch($search);
                
                $result = $author->searchAuthor($author->getSearch());

                /** @var object $result */
                if ($result->rowCount() > 0) {
                    //$data = [];
                    $donnees = $result->fetchAll();
                    // On envoie le code réponse 200 OK
                    http_response_code(200);

                    // On encode en json et on envoie
                    echo json_encode($donnees);
                } else {
                    // 404 Not found
                    http_response_code(404);
                    echo json_encode(array("message" => "Aucun auteur n'a été trouvé."));
                }
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

                // On instancie l'objet Authors
                $author = new Authors($db);

                // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                $data = json_decode(file_get_contents("php://input"));

                if (!empty($data->name)) {
                    // On hydrate l'objet author
                    $author->setName($data->name);
                    $author->setNationality($data->nationality);
                    $author->setBiography($data->biography);

                    $result = $author->create();
                    if ($result) {
                        http_response_code(201);
                        echo json_encode(["result" => "Ok", "message" => "L'auteur' a été ajouté avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(["message" => "L'ajout de l'auteur' a échoué"]);
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

    public function update()
    {
        if ($this->Authorization() == "[ROLE_ADMIN]") {
            if ($_SERVER["REQUEST_METHOD"] === "PUT") {
                // On instancie la base de données
                $database = new Database();
                $db = $database->getConnexion();
                // On instancie l'objet Authors
                $author = new Authors($db);

                // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                $data = json_decode(file_get_contents("php://input"));

                if (!empty($data->id)) {
                    $author->setId($data->id);
                    $author->setName($data->name);
                    $author->setNationality($data->nationality);
                    $author->setBiography($data->biography);

                    $result = $author->update();
                    if ($result) {
                        http_response_code(201);
                        echo json_encode(["result" => "Ok", "message" => "L'auteur a été modifié avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(["message" => "La modification de l'auteur a échoué"]);
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

                // On instancie l'objet AUthors
                $author = new AUthors($db);

                // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                $data = json_decode(file_get_contents("php://input"));

                if (!empty($data)) {
                    $author->setId($data);

                    $result = $author->delete();
                    if ($result) {
                        http_response_code(200);
                        echo json_encode(["result" => "Ok", "message" => "La suppression de l'auteur a été effectué avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(["message" => "La suppression de l'auteur a échoué"]);
                    }
                } else {
                    echo json_encode(["message" => "Vous devez précisé l'identifiant de l'auteur"]);
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
