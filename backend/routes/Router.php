<?php

namespace Router;

class Router{

    public $url;
    public $routes = [];

    public function __construct($url)
    {
        $this->url = trim($url, '/'); // trim pour enlever les slash en début et fin d'url
    }

    public function get(string $path, string $action)
    {
        $this->routes['GET'][] = new Route($path, $action);
    }

    // Pour boucler sur nos routes
    public function run()
    {
        foreach ($this->routes[$_SERVER['REQUEST_METHOD']] as $route) // On appelle nos routes avec la super variable serveur
        {
            if ($route->matches($this->url)){ // La route a une fonction matches qui prend en paramètre l'url
            $route->execute(); // Cette fonction appelle le bon controlleur avec la bonne fonction
        }
    }
        return header('HTTP/1.0 404 Not Found');
    }
}
