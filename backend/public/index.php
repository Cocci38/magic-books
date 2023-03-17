<?php

use Router\Router;

require '../vendor/autoload.php';

// Les entêtes requis
// Accès depuis n'importe quel site ou appareil (*)
header("Access-Control-Allow-Origin: *");

// Format des données envoyées
header("Content-Type: application/json; charset=UTF-8");

// Durée de vie de la requête
header("Access-Control-Max-Age: 3600");

// Entêtes autorisées
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$router = new Router($_GET['url']);

// On appelle la fonction readAll et readById dans le bloc BooksController
$router->get('/books', 'App\Controllers\BooksController@readAll'); // Un chemin '/' et une action BooksController@readAll' (le controller @ la méthode)
$router->get('/book/:id', 'App\Controllers\BooksController@readById'); // Dans l'url on écrit book/id
$router->post('/create/book', 'App\Controllers\BooksController@create');
$router->put('/update/book/:id', 'App\Controllers\BooksController@update');
$router->delete('/delete/book/:id', 'App\Controllers\BooksController@delete');

// On appelle la fonction readAll et readById dans le bloc CategoriesController
$router->get('/categories', 'App\Controllers\CategoriesController@readAll'); // Un chemin '/' et une action CategoriesController@readAll' (le controller @ la méthode)
$router->get('/category/:id', 'App\Controllers\CategoriesController@readById'); // Dans l'url on écrit category/id
$router->post('/create/category', 'App\Controllers\CategoriesController@create');
$router->put('/update/category/:id', 'App\Controllers\CategoriesController@update');
$router->delete('/delete/category/:id', 'App\Controllers\CategoriesController@delete');

// Pour vérifier que nos routes fonctionnent
$router->run();
