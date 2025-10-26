<?php

namespace App\Models;

use PDO;
use PDOException;

class Authors extends Model
{
    private $table = "authors";

    private $id;
    private $name;
    private $nationality;
    private $biography;
    private $search;

    

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
     * Get the value of nationality
     */
    public function getNationality()
    {
        return $this->nationality;
    }

    /**
     * Set the value of nationality
     */
    public function setNationality($nationality): self
    {
        $this->nationality = $nationality;

        return $this;
    }

    /**
     * Get the value of biography
     */
    public function getBiography()
    {
        return $this->biography;
    }

    /**
     * Set the value of biography
     */
    public function setBiography($biography): self
    {
        $this->biography = $biography;

        return $this;
    }

    /**
     * Get the value of search
     */
    public function getSearch()
    {
        return $this->search;
    }

    /**
     * Set the value of search
     * @return $this
     */
    public function setSearch($search): self
    {     
        $this->search = "%".$search."%";
        return $this;
    }

    /**
     * Pour lire la liste des auteurs
     * 
     */
    public function readAll()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT id, name, nationality, biography FROM " . $this->table . " ORDER BY name ASC");

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour afficher un auteur selon son id
     * @return $query
     */
    public function readById()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT id, name, nationality, biography FROM " . $this->table . " WHERE id = :id");

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
     * Pour afficher un auteur selon son id
     * @return $query
     */
    public function searchAuthor()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT id, name, nationality, biography FROM " . $this->table . " WHERE 1 = 1 AND name like :search limit 5");

            $this->search = $this->valid_data($this->search);
            $query->bindParam(":search", $this->search, PDO::PARAM_STR);
            
            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour insérer un auteur dans la base données
     *
     * @return void
     */
    public function create()
    {
        if (preg_match("/^[a-zA-Z0-9-\' :,.-?!æœçéàèùâêîôûäëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->name)) {
            if (preg_match("/^[a-zA-Z0-9-\' :,.-?!æœçéàèùâêîôûäëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->nationality)) {
                if (preg_match("/^[a-zA-Z0-9-\' ,.-?!:()«»æœçéàèùäâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{10,}$/", $this->biography)) {

                    try {
                        $query = $this->connexion->prepare("INSERT INTO $this->table(name, nationality, biography)
                                                            VALUES(:name, :nationality, :biography)");

                        // Protection contre les injections
                        $this->name = $this->valid_data($this->name);
                        $this->nationality = $this->valid_data($this->nationality);
                        $this->biography = $this->valid_data($this->biography);

                        $query->bindParam(":name", $this->name, PDO::PARAM_STR);
                        $query->bindParam(":nationality", $this->nationality, PDO::PARAM_STR);
                        $query->bindParam(":biography", $this->biography, PDO::PARAM_STR);

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
        }
    }

    /**
     * Pour la modification d'une auteur
     *
     * @return void
     */
    public function update()
    {
        if (preg_match("/^[a-zA-Z0-9-\' :,.?!æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->name)) {
            if (preg_match("/^[a-zA-Z0-9-\' :,.?!æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->nationality)) {
                if (preg_match("/^[a-zA-Z0-9-\' ,.?!:æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{10,500}$/", $this->biography)) {

                    try {
                        $query = $this->connexion->prepare("UPDATE " . $this->table . " SET name = :name, nationality = :nationality, biography = :biography WHERE id=:id");

                        // Protection contre les injections
                        $this->name = $this->valid_data($this->name);
                        $this->nationality = $this->valid_data($this->nationality);
                        $this->biography = $this->valid_data($this->biography);
                        $this->id = $this->valid_data($this->id);

                        $query->bindParam(":name", $this->name, PDO::PARAM_STR);
                        $query->bindParam(":nationality", $this->nationality, PDO::PARAM_STR);
                        $query->bindParam(":biography", $this->biography, PDO::PARAM_STR);
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
        }
    }

    /**
     * Pour supprimer un auteur
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
