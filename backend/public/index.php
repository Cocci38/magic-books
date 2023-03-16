<?php

use Router\Router;

require '../vendor/autoload.php';

$router = new Router( $_GET['url']);

// On appelle la fonction readAll et readById dans le bloc BooksController
$router->get('/books', 'App\Controllers\BooksController@readAll'); // Un chemin '/' et une action BooksController@readAll' (le controller @ la méthode)
$router->get('/book/:id', 'App\Controllers\BooksController@readById'); // Dans l'url on écrit posts/id

// Pour vérifier que nos routes fonctionnent
$router->run();

?>