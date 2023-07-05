<?php

namespace App\Models;

use PDO;
use PDOException;

class Categories
{

    private $table = "categories";
    private $connexion = null;

    private $id;
    private $name;

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
    private function valid_data($data)
    {
        //$data = ($data != null) ? trim(stripslashes(strip_tags(htmlspecialchars($data)))) : $data;
        $data = trim($data);            // Supprime les espaces (ou d'autres caractères) en début et fin de chaîne
        $data = stripslashes($data);    // Supprime les antislashs d'une chaîne
        $data = htmlspecialchars($data, ENT_COMPAT, 'ISO-8859-1', true); // Convertis les caractères spéciaux en entités HTML
        $data = strip_tags($data);      // Supprime les balises HTML et PHP d'une chaîne
        //$data = htmlentities($data, ENT_COMPAT);
        return $data;
    }

    /**
     * Pour lire toutes les catégories
     *
     * @return query
     */
    public function readAll()
    {
        try {
            // On  prépare et on écrit la requête
            $query = $this->connexion->prepare("SELECT id, name FROM " . $this->table . " ORDER BY name ASC");

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour lire une catégorie
     * 
     * @return
     */
    public function readById()
    {
        try {
            // On prépare et on écrit la requête
            $query = $this->connexion->prepare("SELECT c.id as categorie_id, c.name as categorie_name, b.id as book_id, b.title, b.author_id, a.name as author, b.editor, b.summary, b.release_date, b.cover 
            FROM " . $this->table . " c
            LEFT JOIN books b ON c.id = b.category_id
            LEFT JOIN authors a ON b.author_id = a.id
            WHERE c.id = :id");

            $this->id = $this->valid_data($this->id);

            $query->bindParam(":id", $this->id, PDO::PARAM_INT);

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour insérer une catégorie dans la base données
     *
     * @return void
     */
    public function create()
    {
        if (preg_match("/^[a-zA-Z0-9-\' :,.?!æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->name)) {
            try {
                $query = $this->connexion->prepare("INSERT INTO $this->table(name) VALUES(:name)");

                // Protection contre les injections
                $this->name = $this->valid_data($this->name);

                $query->bindParam(":name", $this->name, PDO::PARAM_STR);

                //On execute la requête
                if ($query->execute()) {
                    return true;
                } else {
                    return false;
                }
            } catch (PDOException $exception) {
                echo "Erreur de connexion : " . $exception->getMessage();
            }
        }
    }

    /**
     * Pour la modification d'une catégorie
     *
     * @return void
     */
    public function update()
    {
        if (preg_match("/^[a-zA-Z0-9-\' :,.?!æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->name)) {

            try {
                $query = $this->connexion->prepare("UPDATE " . $this->table . " SET name = :name WHERE id=:id");

                // Protection contre les injections
                $this->name = $this->valid_data($this->name);
                $this->id = $this->valid_data($this->id);

                $query->bindParam(":name", $this->name, PDO::PARAM_STR);
                $query->bindParam(":id", $this->id, PDO::PARAM_INT);

                //On execute la requête
                if ($query->execute()) {
                    return true;
                } else {
                    return false;
                }
            } catch (PDOException $exception) {
                echo "Erreur de connexion : " . $exception->getMessage();
            }
        }
    }

    /**
     * Pour supprimer une catégorie
     *
     * @return void
     */
    public function delete()
    {
        try {
            $query = $this->connexion->prepare("DELETE FROM " . $this->table . " WHERE id = :id");

            $this->id = $this->valid_data($this->id);

            $query->bindParam(":id", $this->id, PDO::PARAM_INT);

            //On execute la requête
            if ($query->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }
}
