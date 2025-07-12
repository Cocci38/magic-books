<?php

namespace App\Controllers;

use Config\Database;
use App\Models\Books;

class BooksController extends Controller
{

    public function readAll()
    {
        // if ($this->Authorization() == "[ROLE_ADMIN]") {
        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $book = new Books($db);

            // On récupère les données
            $stmt = $book->readAll();
            
            /** @var object $stmt */
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

    public function readById(int $id)
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $book = new Books($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            
            $id = $data->id;
            //print_r($book);
            // $url = $_GET['url'];
            // $id = basename(parse_url($url, PHP_URL_PATH));
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

    public function readOrderByDate()
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
            $stmt = $book->readOrderByDate();

            /** @var object $stmt */
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

    public function readBookByAuthor()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $book = new Books($db);

            $data = json_decode(file_get_contents("php://input"));
            $id = $data->id;
            // $url = $_GET['url'];
            // $id = basename(parse_url($url, PHP_URL_PATH));

            if (!empty($id)) {
                $book->setId($id);
                // On récupère les données
                $stmt = $book->readBookByAuthor($book->getId());

                /** @var object $stmt */ 
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
                echo json_encode(["message" => "Aucune données à renvoyer"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    
    public function searchBook()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $book = new Books($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            
            $search = $data->title;
            if (!empty($search)) {
                // On récupère les données
                $book->setSearch($search);
                
                $result = $book->searchBook($book->getSearch());
                //var_dump($result);
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
                    echo json_encode(array("message" => "Le livre n'existe pas."));
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

                // On instancie l'objet Books
                $book = new Books($db);

                // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                $data = json_decode(file_get_contents("php://input"));
                // var_dump($data);
                // var_dump($_REQUEST);
                $cover = $book->uploadImage();
                //var_dump($cover);
                if (!empty($_REQUEST['title']) && !empty($_REQUEST['authorId']) && !empty($_REQUEST['editor']) && !empty($_REQUEST['summary'])) {
                    // On hydrate l'objet book
                    $book->setTitle($_REQUEST['title']);
                    $book->setAuthorId($_REQUEST['authorId']);
                    $book->setEditor($_REQUEST['editor']);
                    $book->setSummary($_REQUEST['summary']);
                    $book->setReleaseDate($_REQUEST['releaseDate']);
                    $book->setCover($cover);
                    $book->setCategoryId($_REQUEST['categoryId']);
                    //var_dump($book);
                    $result = $book->create();
                    if ($result) {
                        http_response_code(201);
                        echo json_encode(["result" => "Ok", "message" => "Le livre a été ajouté avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(["message" => "L'ajout du livre a échoué"]);
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
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                // On instancie la base de données
                $database = new Database();
                $db = $database->getConnexion();

                // On instancie l'objet Books
                $book = new Books($db);

                //On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                // $data = json_decode(file_get_contents("php://input"));

                // print_r($data);
                //var_dump($_REQUEST['categoryId']);

                // On procède à la modification du livre
                if (!empty($_REQUEST['id']) && !empty($_REQUEST['title']) && !empty($_REQUEST['authorId']) && !empty($_REQUEST['editor']) && !empty($_REQUEST['summary'])) {

                    // Solution temporaire pour l'image :
                    // Si l'ancienne image existe et $_FILES est vide on stocke l'ancienne image pour ne pas la perdre
                    if ($_REQUEST["cover"] !== "" && empty($_FILES["image"]["name"])) {
                        //var_dump("if");
                        $cover = $_REQUEST["cover"];
                        // Sinon on stocke la nouvelle image
                    } else {
                        //var_dump('else');
                        $cover = $book->uploadImage();
                    }
                    // Pour supprimer l'ancienne image si elle existe et si on renvoie une nouvelle image
                    if (isset($_REQUEST["cover"]) && $_REQUEST["cover"] !== "" && isset($_FILES["image"]) && $_FILES["image"]["error"] === 0) {
                        //var_dump('image');
                        unlink("C:\laragon\www\magic-books\backend\public\pictures" . DIRECTORY_SEPARATOR . $_REQUEST["cover"]);
                    }

                    //On hydrate l'objet book
                    $book->setId($_REQUEST['id']);
                    $book->setTitle($_REQUEST['title']);
                    $book->setAuthorId($_REQUEST['authorId']);
                    $book->setEditor($_REQUEST['editor']);
                    $book->setSummary($_REQUEST['summary']);
                    $book->setReleaseDate($_REQUEST['releaseDate']);
                    $book->setCover($cover);
                    $book->setCategoryId($_REQUEST['categoryId']);
                    
                    $result = $book->update();
                    var_dump($result);
                    if ($result) {
                        http_response_code(201);
                        echo json_encode(["result" => "Ok", "message" => "Le livre a été modifié avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(["message" => "La modification du livre a échoué"]);
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

                // On instancie l'objet Books
                $book = new Books($db);

                // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
                $data = json_decode(file_get_contents("php://input"));

                if (!empty($data)) {

                    $book->setId($data);

                    // Pour supprimer l'image s'il y en a une
                    $resultImage = $book->readById($book->getId());
                    if ($resultImage->rowCount() > 0) {
                        $donnees = $resultImage->fetch();
                        if (isset($donnees["cover"]) && $donnees["cover"] > 0) {
                            unlink("C:\laragon\www\magic-books\backend\public\pictures" . DIRECTORY_SEPARATOR . $donnees["cover"]);
                        }
                    }

                    $result = $book->delete();

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(["result" => "Ok", "message" => "La suppression du livre a été effectué avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(["message" => "La suppression du livre a échoué"]);
                    }
                } else {
                    echo json_encode(["message" => "Vous devez précisé l'identifiant du livre"]);
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
