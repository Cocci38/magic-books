<?php

use Router\Router;

require '../vendor/autoload.php';

$router = new Router( $_GET['url']);

// On appelle la fonction readAll et readById dans le bloc BooksController
$router->get('/books', 'App\Controllers\BooksController@readAll'); // Un chemin '/' et une action BooksController@readAll' (le controller @ la méthode)
$router->get('/book/:id', 'App\Controllers\BooksController@readById'); // Dans l'url on écrit book/id

// On appelle la fonction readAll et readById dans le bloc CategoriesController
$router->get('/categories', 'App\Controllers\CategoriesController@readAll'); // Un chemin '/' et une action CategoriesController@readAll' (le controller @ la méthode)
$router->get('/category/:id', 'App\Controllers\CategoriesController@readById'); // Dans l'url on écrit category/id

// Pour vérifier que nos routes fonctionnent
$router->run();

?>