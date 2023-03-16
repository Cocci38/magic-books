<?php

namespace App\Controllers;

class BooksController{

    public function readAll()
    {
        echo 'Je suis la liste de tous les livres';
    }

    public function readById(int $id)
    {
        echo 'Je suis le livre ' . $id;
    }
}




?>