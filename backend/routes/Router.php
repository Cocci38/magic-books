<?php

namespace Router;

class Router
{

    public $url;
    public $routes = [];
    
    /**
     * On passe l'url au constructeur
     *
     * @param [type] $url
     */
    public function __construct($url)
    {
        $this->url = trim($url, '/'); // trim pour enlever les slash en début et fin d'url
    }

    /**
     * Fonction pour retourner les routes GET
     *
     * @param string $path
     * @param string $action
     */
    public function get(string $path, string $action)
    {
        $this->routes['GET'][] = new Route($path, $action);
    }

    /**
     * Fonction pour retourner les routes POST
     *
     * @param string $path
     * @param string $action
     */
    public function post(string $path, string $action)
    {
        $this->routes['POST'][] = new Route($path, $action);
    }

    /**
     * Fonction pour retourner les routes PUT
     *
     * @param string $path
     * @param string $action
     */
    public function put(string $path, string $action)
    {
        $this->routes['PUT'][] = new Route($path, $action);
    }

    /**
     * Fonction pour retourner les routes DELETE
     *
     * @param string $path
     * @param string $action
     */
    public function delete(string $path, string $action)
    {
        $this->routes['DELETE'][] = new Route($path, $action);
    }

    /**
     * Fonction pour boucler sur les routes
     */
    public function run()
    {
        if (isset($this->routes[$_SERVER['REQUEST_METHOD']])) {
            foreach ($this->routes[$_SERVER['REQUEST_METHOD']] as $route) // On appelle nos routes avec la super variable serveur
            {
                if ($route->matches($this->url)) { // La route a une fonction matches qui prend en paramètre l'url
                    $route->execute(); // Cette fonction appelle le bon controller avec la bonne fonction
                }
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "La méthode demandée n'existe pas"]);
        }
    }
}