<?php

namespace App\Models;

use PDO;

class Books {

    private $table = "books";
    private $connexion = null;
    
    private $id;
    private $title;
    private $author;
    private $editor;
    private $summary;
    private $release_date;
    private $cover;
    private $categories_id;
    private $categories_name;

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
     * Get the value of title
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set the value of title
     */
    public function setTitle($title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get the value of author
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set the value of author
     */
    public function setAuthor($author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get the value of editor
     */
    public function getEditor()
    {
        return $this->editor;
    }

    /**
     * Set the value of editor
     */
    public function setEditor($editor): self
    {
        $this->editor = $editor;

        return $this;
    }

    /**
     * Get the value of summary
     */
    public function getSummary()
    {
        return $this->summary;
    }

    /**
     * Set the value of summary
     */
    public function setSummary($summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    /**
     * Get the value of release_date
     */
    public function getReleaseDate()
    {
        return $this->release_date;
    }

    /**
     * Set the value of release_date
     */
    public function setReleaseDate($release_date): self
    {
        $this->release_date = $release_date;

        return $this;
    }

    /**
     * Get the value of cover
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * Set the value of cover
     */
    public function setCover($cover): self
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * Get the value of categories_id
     */
    public function getCategoriesId()
    {
        return $this->categories_id;
    }

    /**
     * Set the value of categories_id
     */
    public function setCategoriesId($categories_id): self
    {
        $this->categories_id = $categories_id;

        return $this;
    }

    /**
     * Get the value of categories_name
     */
    public function getCategoriesName()
    {
        return $this->categories_name;
    }

    /**
     * Set the value of categories_name
     */
    public function setCategoriesName($categories_name): self
    {
        $this->categories_name = $categories_name;

        return $this;
    }

    /**
     * Fonction pour nettoyer les données qui arrivent
     *
     * @param [type] $data
     * @return void
     */
    private function valid_data($data){
        //$data = ($data != null) ? trim($data) : $data;
        //$data = ($data != null) ? stripslashes($data) : $data;
        //$data = ($data != null) ? strip_tags($data) : $data;
        //$data = ($data != null) ? htmlspecialchars($data, ENT_COMPAT,'ISO-8859-1', true) : $data;
        $data = trim($data);            // Supprime les espaces (ou d'autres caractères) en début et fin de chaîne
        $data = stripslashes($data);    // Supprime les antislashs d'une chaîne
        $data = htmlspecialchars($data, ENT_COMPAT,'ISO-8859-1', true);// Convertit les caractères spéciaux en entités HTML
        $data = strip_tags($data);      // Supprime les balises HTML et PHP d'une chaîne
        //$data = htmlentities($data, ENT_COMPAT);
        return $data;
    }

    /**
     * Pour lire la liste des livres
     * 
     */
    public function readAll(){
        // On écrit la requête
        $query = $this->connexion->prepare("SELECT b.title, b.author, b.editor, b.summary, b.release_date, b.cover, c.name FROM $this->table b 
                                            LEFT JOIN categories c ON b.categories_id = c.id ORDER BY b.title ASC");
        
        // On prépare la requête
        //$query = $this->connexion->prepare($sql);

        //On execute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    public function readById(){
        // On écrit la requête
        //$query = $this->connexion->prepare("SELECT id, title, author, editor, summary, release_date, cover FROM " . $this->table . " WHERE id = :id");
        $query = $this->connexion->prepare("SELECT b.title, b.author, b.editor, b.summary, b.release_date, b.cover, c.name as categories_name FROM " . $this->table . " b 
                                            LEFT JOIN categories c ON b.categories_id = c.id 
                                            WHERE b.id = :id");
        //$query = $this->connexion->prepare($sql);
        //$query->bindParam(1, $this->id);
        $this->id = $this->valid_data($this->id);
        $query->bindParam(":id", $this->id, PDO::PARAM_INT);

        $query->execute();

        return $query;
    }
}