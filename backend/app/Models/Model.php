<?php

namespace App\Models;

class Model {

    protected $connexion = null;


    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db)
    {
        if ($this->connexion == null) {
            $this->connexion = $db;
        }
    }

    /**
     * Get the value of connexion
     */
    public function getConnexion()
    {
        return $this->connexion;
    }

    /**
     * Set the value of connexion
     */
    public function setConnexion($connexion): self
    {
        $this->connexion = $connexion;

        return $this;
    }


    /**
     * Fonction pour nettoyer les données qui arrivent
     *
     * @param [type] $data
     * @return void
     */
    protected function valid_data($data)
    {
        $data = ($data != null) ? trim($data) : ""; 
        $data = ($data != null) ? stripslashes($data) : "";
        $data = ($data != null) ? strip_tags($data) : "";
        $data = ($data != null) ? htmlspecialchars($data, ENT_COMPAT,'ISO-8859-1', true) : "";
        return $data;
    }
}

?>