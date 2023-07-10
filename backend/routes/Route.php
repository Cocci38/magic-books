<?php

namespace Router;

class Route{

    public $path;
    public $action;
    public $matches;

    /**
     * On passe le chemin et l'action au constructeur
     *
     * @param [type] $path
     * @param [type] $action
     */
    public function __construct($path, $action)
    {
        $this->path = trim($path, '/');
        $this->action = $action;
    }

    /**
     * Fonction pour vérifier si l'url match avec l'une des routes
     *
     * @param string $url
     */
    public function matches(string $url)
    {
        $path = preg_replace('#:([\w]+)#', '([^/]+)', $this->path); // On cherche à remplacer (\w est un raccourci)
        $pathToMatch = "#^$path$#"; // On veut passer toute la variable

        if (preg_match($pathToMatch, $url, $matches)){
            $this->matches = $matches;
            return true;
        }else{
            return false;
        }
    }

    /**
     * Fonction pour appeler le bon controller avec la bonne fonction
     *
     */
    public function execute()
    {
        $params = explode('@', $this->action); // @ est le délimiteur de notre action
        $controller = new $params[0](); // La 1ère clé du tableau params
        $method = $params[1]; // La 2ème clé du tableau params

        return isset($this->matches[1]) ? $controller->$method($this->matches[1]) : $controller->$method();
    }


}
?>