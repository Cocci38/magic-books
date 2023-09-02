<?php

namespace App\Controllers;

use Config\Database;
use App\Models\Users;
use Config\JWT;

class UsersController
{

    /**
     * Fonction pour l'inscription des utilisateurs
     *
     * @return void
     */
    public function signUp()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Categories
            $users = new Users($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));
            if (!empty($data->username) && !empty($data->email) && !empty($data->username)) {
                // On hydrate l'objet users
                $users->setUsername($data->username);
                $users->setEmail($data->email);
                $users->setPassword($data->password);
                // $users->setRoles($data->roles);
                //var_dump($users);
                $result = $users->signUp();
                if ($result) {
                    http_response_code(201);
                    echo json_encode(["result" => "Ok", "message" => "L'utilisateur' a été ajouté avec succès"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "L'ajout de l'utilisateur' a échoué"]);
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

    /**
     * Fonction pour la connexion des utilisateurs
     *
     * @return void
     */
    public function signIn()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $header = [];
            $secret = '';
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $user = new Users($db);

            $data = json_decode(file_get_contents("php://input"));

            $user->setEmail($data->email);
            $user->setPassword($data->password);

            // On récupère les données
            $stmt = $user->signIn();
            if ($stmt->rowCount() > 0) {
                //$data = [];
                $data = $stmt->fetch();

                if (password_verify($user->getPassword(),  $data['password']) && $data['email'] == $user->getEmail()) {

                    // Je génère le token de l'utilisateur
                    $payload = [
                        'id' => $data['id'],
                        'email' => $data['email'],
                        'username' => $data['username'],
                        'roles' => [
                            $data['roles']
                        ],
                    ];
                    $jwt = new JWT();
                    $token = $jwt->generate($header, $payload, $secret);

                    // Je mets les données dans des cookies pour les envoyer au client
                    // setcookie("token", $token, time()+3600);
                    // //setcookie("role", json_decode($data['roles']), time()+3600, secure:true, httponly:true);
                    // setcookie("username", $data['username'], time()+3600);
                    // setcookie("toto", "Toto", time()+3600);
                    
                    // On renvoie les données au format JSON
                    http_response_code(200);
                    echo json_encode(["result" => "Ok", "token"=>$token, "id"=>$data['id'], "username"=>$data["username"], "role"=>$data['roles']]);
                    //echo json_encode($data['username']);
                } else {
                    echo json_encode(["message" => "Aucun compte n'a été trouvé"]);
                }
            } else {
                echo json_encode(["message" => "Aucunes données à renvoyer"]);
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
            $user = new Users($db);
            // file_get_contents => c'est le fichier d'entrée php
            $data = json_decode(file_get_contents("php://input"));
            $id = $data->id;
            // $url = $_GET['url'];
            // $id = basename(parse_url($url, PHP_URL_PATH));
            //$user->setId($data->id);
            $user->setId($id);
            // On récupère les données
            $result = $user->readById();

            if ($result->rowCount() > 0) {
                //$data = [];
                $donnees = $result->fetch();

                // On renvoie les données au format JSON
                http_response_code(200);
                echo json_encode($donnees);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Aucun utilisateur ne correspond"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

    public function updateAccount()
    {
        if ($_SERVER["REQUEST_METHOD"] === "PUT") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Users
            $users = new Users($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->id)) {
                $users->setId($data->id);
                $users->setUsername($data->username);
                $users->setEmail($data->email);
                $users->setPassword($data->password);

                $result = $users->updateAccount();
                if ($result) {
                    http_response_code(201);
                    echo json_encode(["result" => "Ok", "message" => "L'utilisateur a été modifié avec succès"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "La modification de l'utilisateur a échoué"]);
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

    public function deleteAccount()
    {
        if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Users
            $users = new Users($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->id)) {
                $users->setId($data->id);

                $result = $users->deleteAccount();
                if ($result) {
                    http_response_code(200);
                    echo json_encode(["result" => "Ok", "message" => "La suppression de l'utilisateur' a été effectué avec succès."]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "La suppression de l'utilisateur' a échoué."]);
                }
            } else {
                echo json_encode(["message" => "Vous devez préciser l'identifiant de l'utilisateur."]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée."]);
        }
    }
}
