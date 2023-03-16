<?php

namespace App\Models;

use PDO;

class Categories {

    private $table = "categories";
    private $connexion = null;

    private $id;
    private $name;

    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db){
        if ($this->connexion == null) {
            $this->connexion = $db;
        }
    }

    /**
     * Get the value of table
     */
    public function getTable()
    {
        return $this->table;
    }

    /**
     * Set the value of table
     */
    public function setTable($table): self
    {
        $this->table = $table;

        return $this;
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
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     */
    public function setId($id): self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     */
    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }
    
    /**
     * Fonction pour nettoyer les données qui arrivent
     *
     * @param [type] $data
     * @return void
     */
    private function valid_data($data){
        //$data = ($data != null) ? trim(stripslashes(strip_tags(htmlspecialchars($data)))) : $data;
        $data = trim($data);            // Supprime les espaces (ou d'autres caractères) en début et fin de chaîne
        $data = stripslashes($data);    // Supprime les antislashs d'une chaîne
        $data = htmlspecialchars($data);// Convertit les caractères spéciaux en entités HTML
        $data = strip_tags($data);      // Supprime les balises HTML et PHP d'une chaîne
        //$data = htmlentities($data, ENT_COMPAT);
        return $data;
    }

    /**
     * Pour lire la liste des categories
     * 
     */
    public function readAll(){
        // On écrit la requête
        // $query = $this->connexion->prepare("SELECT b.title, b.author, b.editor, b.summary, b.release_date, b.cover, c.name FROM $this->table c 
        //                                     LEFT JOIN books b ON c.id = b.categories_id ORDER BY c.name ASC");

        $query = $this->connexion->prepare("SELECT name FROM " . $this->table . " ORDER BY name ASC");
        
        // On prépare la requête
        //$query = $this->connexion->prepare($sql);

        //On execute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    /**
     * Pour lire la liste des categories
     * 
     */
    public function readById(){
        // On écrit la requête
        //$query = $this->connexion->prepare("SELECT b.title, b.author, b.editor, b.summary, b.release_date, b.cover, c.name FROM " . $this->table . " c LEFT JOIN books b ON c.id = b.categories_id WHERE c.id = :id");

        $query = $this->connexion->prepare("SELECT name FROM " . $this->table . " WHERE id = :id");
        
        // On prépare la requête
        //$query = $this->connexion->prepare($sql);
        $this->id = $this->valid_data($this->id);

        $query->bindParam(":id", $this->id, PDO::PARAM_INT);

        //On execute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }
}