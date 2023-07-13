<?php

namespace App\Models;

use PDO;
use PDOException;

class ReaderHasBook extends Model
{
    private $table = "reader_has_book";

    private $id;
    private $readerId;
    private $bookId;


    

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
     * Get the value of readerId
     */
    public function getReaderId()
    {
        return $this->readerId;
    }

    /**
     * Set the value of readerId
     */
    public function setReaderId($readerId): self
    {
        $this->readerId = $readerId;

        return $this;
    }

    /**
     * Get the value of bookId
     */
    public function getBookId()
    {
        return $this->bookId;
    }

    /**
     * Set the value of bookId
     */
    public function setBookId($bookId): self
    {
        $this->bookId = $bookId;

        return $this;
    }

    /**
     * Pour lire la liste des livres présent dans la bibliothèque d'un lecteur
     *
     * @return $query
     */
    public function readAllByReaderId()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT rb.id as libraryId, b.id as bookId, b.title, a.name as author, b.editor, b.summary, b.release_date, b.cover, c.name 
                                                FROM reader_has_book rb 
                                                LEFT JOIN books b ON rb.book_id = b.id
                                                LEFT JOIN categories c ON b.category_id = c.id 
                                                LEFT JOIN authors a ON b.author_id = a.id 
                                                WHERE reader_id = :reader_id
                                                ORDER BY b.title ASC");

            $this->readerId = $this->valid_data($this->readerId);
            $query->bindParam(":reader_id", $this->readerId, PDO::PARAM_INT);

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour lire la liste des livres présent dans la bibliothèque d'un lecteur
     *
     * @return $query
     */
    public function readByBookId()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT id 
                                                FROM reader_has_book 
                                                WHERE reader_id = :reader_id AND book_id = :book_id");

            $this->readerId = $this->valid_data($this->readerId);
            $this->bookId = $this->valid_data($this->bookId);
            $query->bindParam(":reader_id", $this->readerId, PDO::PARAM_INT);
            $query->bindParam(":book_id", $this->bookId, PDO::PARAM_INT);

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour insérer un lien entre un lecteur et un livre
     *
     * @return void
     */
    public function create()
    {
        try {
            $query = $this->connexion->prepare("INSERT INTO $this->table(reader_id, book_id)
                                                            VALUES(:reader_id, :book_id)");
            
            // Protection contre les injections
            $this->readerId = $this->valid_data($this->readerId);
            $this->bookId = $this->valid_data($this->bookId);

            $query->bindParam(":reader_id", $this->readerId, PDO::PARAM_INT);
            $query->bindParam(":book_id", $this->bookId, PDO::PARAM_INT);

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

    /**
     * Pour supprimer de la bibliothèque d'un lecteur
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

?>