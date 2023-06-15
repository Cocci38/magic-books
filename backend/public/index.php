<?php
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Allow-Credentials: true");
    exit;
}

// Entêtes autorisées
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
// Les entêtes requis
// Accès depuis n'importe quel site ou appareil (*)
header("Access-Control-Allow-Origin: http://localhost:5173");
// Format des données envoyées
header("Content-Type: application/json; charset=UTF-8");
// Durée de vie de la requête
header("Access-Control: no-cache, max-age=0, private");
header("Pragma: no-cache");
header("Access-Control-Allow-Credentials: true");
header("Authorization: Bearer");

use Router\Router;

require '../vendor/autoload.php';

// print_r($_SERVER);
$url = "/".substr($_SERVER["QUERY_STRING"],4);
$router = new Router($url);

// On appelle les fonctions readAll, readById, create, update and delete dans le bloc BooksController
$router->get('/books', 'App\Controllers\BooksController@readAll'); // Un chemin '/' et une action BooksController@readAll' (le controller @ la méthode)
$router->get('/book/:id', 'App\Controllers\BooksController@readById'); // Dans l'url on écrit book/id
$router->post('/create/book', 'App\Controllers\BooksController@create');
$router->post('/update/book/:id', 'App\Controllers\BooksController@update');
$router->delete('/delete/book/:id', 'App\Controllers\BooksController@delete');

// On appelle les fonctions readAll, readById, create, update and delete dans le bloc CategoriesController
$router->get('/categories', 'App\Controllers\CategoriesController@readAll'); // Un chemin '/' et une action CategoriesController@readAll' (le controller @ la méthode)
$router->get('/category/:id', 'App\Controllers\CategoriesController@readById'); // Dans l'url on écrit category/id
$router->post('/create/category', 'App\Controllers\CategoriesController@create');
$router->put('/update/category/:id', 'App\Controllers\CategoriesController@update');
$router->delete('/delete/category/:id', 'App\Controllers\CategoriesController@delete');

// On appelle les fonctions readAll, readById, create, update and delete dans le bloc AuthorsController
$router->get('/authors', 'App\Controllers\AuthorsController@readAll'); // Un chemin '/' et une action AuthorsController@readAll' (le controller @ la méthode)
$router->get('/author/:id', 'App\Controllers\AuthorsController@readById'); // Dans l'url on écrit authors/id
$router->post('/create/author', 'App\Controllers\AuthorsController@create');
$router->put('/update/author/:id', 'App\Controllers\AuthorsController@update');
$router->delete('/delete/author/:id', 'App\Controllers\AuthorsController@delete');

// On appelle les fonctions signUp, signIn, updateAccount and deleteAccount dans le bloc UsersController
$router->get('/user/:id', 'App\Controllers\UsersController@readById'); // Dans l'url on écrit users/id
$router->post('/signup', 'App\Controllers\UsersController@signUp');
$router->post('/signin', 'App\Controllers\UsersController@signIn');
$router->put('/update/account/:id', 'App\Controllers\UsersController@updateAccount');
$router->delete('/delete/account/:id', 'App\Controllers\UsersController@deleteAccount');

// On appelle les fonctions readAllByReaderId, create, delete dans le bloc ReaderHasBookController
$router->get('/library/:id', 'App\Controllers\ReaderHasBookController@readAllByReaderId');
$router->post('/create/library', 'App\Controllers\ReaderHasBookController@create');
$router->delete('/delete/library-book/:id', 'App\Controllers\ReaderHasBookController@delete');

// Pour vérifier que nos routes fonctionnent
$router->run();
