<?php
namespace App\Controllers;

use App\Models\Authors;
use Config\Database;
use App\Models\Books;

class SearchController extends Controller
{
    public function searchBookAndAuthor()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // On instancie la base de données
            $database = new Database();
            $db = $database->getConnexion();

            // On instancie l'objet Books
            $book = new Books($db);
            $author = new Authors($db);

            // On récupère les informations envoyées et je décode le JSON pour que php puisse le lire
            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->search)) {
                $search = $data->search;
                // On récupère les données
                $book->setSearch($search);
                $author->setSearch($search);

                $resultBook = $book->searchBook($book->getSearch());
                $resultAuthor = $author->searchAuthor($author->getSearch());

                /** @var object $resultBook */
                /** @var object $resultAuthor */
                $countData = 0;
                $countBook = $resultBook->rowCount();
                $countAuthor = $resultAuthor->rowCount();
                if ($resultBook->rowCount() > 0 || $resultAuthor->rowCount() > 0) {
                    //$data = [];
                    $donneesBook = $resultBook->fetchAll();
                    $donneesAuthor = $resultAuthor->fetchAll();
                    
                    $countData = $countBook + $countAuthor;
                    // On envoie le code réponse 200 OK
                    http_response_code(200);
                    // On encode en json et on envoie
                    //echo json_encode($donnees);
                    echo json_encode(array("count"=>$countData,"dataBooks" => $donneesBook,"dataAuthors"=>$donneesAuthor));
                } else {
                    http_response_code(200);
                    echo json_encode(array("count"=>$countData,"message" => "Aucun livre, ni aucun auteur n'a été trouvé."));
                }
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode n'est pas autorisée"]);
        }
    }

}


?>