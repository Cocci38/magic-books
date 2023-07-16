<?php

namespace App\Models;

use PDO;
use PDOException;

class Books extends Model
{

    private $table = "books";

    private $id;
    private $title;
    private $author_id;
    private $editor;
    private $summary;
    private $release_date;
    private $cover;
    private $category_id;
    private $categories_name;


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
    public function getAuthorId()
    {
        return $this->author_id;
    }

    /**
     * Set the value of author
     */
    public function setAuthorId($author_id): self
    {
        $this->author_id = $author_id;

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
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * Set the value of categories_id
     */
    public function setCategoryId($category_id): self
    {
        $this->category_id = $category_id;

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
     * Pour lire la liste des livres
     * 
     * @return $query
     */
    public function readAll()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT b.id, b.title, a.name as author, b.editor, b.summary, b.release_date, b.cover, c.name 
                                            FROM $this->table b 
                                            LEFT JOIN categories c ON b.category_id = c.id 
                                            LEFT JOIN authors a ON b.author_id = a.id ORDER BY b.title ASC");

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour lire un livre selon son id
     *
     * @return id
     */
    public function readById()
    {
        try {
            // On écrit la requête
            $query = $this->connexion->prepare("SELECT b.id, b.title, b.author_id, a.name as author, b.editor, b.summary, b.release_date, b.cover, b.category_id, c.name as categories_name FROM " . $this->table . " b 
                                            LEFT JOIN categories c ON b.category_id = c.id 
                                            LEFT JOIN authors a ON b.author_id = a.id
                                            WHERE b.id = :id");

            $this->id = $this->valid_data($this->id);
            $query->bindParam(":id", $this->id, PDO::PARAM_INT);

            $query->execute();

            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour sélectionner 6 livres en partant du plus récent
     *
     * @return $query
     */
    public function readOrderByDate()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT b.id, b.title, a.name as author, b.editor, b.summary, b.release_date, b.cover, c.name 
                                            FROM $this->table b 
                                            LEFT JOIN categories c ON b.category_id = c.id 
                                            LEFT JOIN authors a ON b.author_id = a.id 
                                            ORDER BY b.release_date DESC 
                                            LIMIT 6");

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour afficher les livres d'un auteur selon son id
     * @return $query
     */
    public function readBookByAuthor()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT b.id as book_id, b.title, b.cover 
                                                FROM " . $this->table . " b
                                                LEFT JOIN authors a ON a.id = b.author_id WHERE a.id = :id");

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
     * Pour afficher les livres d'un auteur selon son id
     * @return $query
     */
    public function readBookByCategory()
    {
        try {
            // On écrit la requête préparée
            $query = $this->connexion->prepare("SELECT b.id as book_id, b.title, b.cover, a.name as author 
                                                FROM " . $this->table . " b
                                                LEFT JOIN authors a ON a.id = b.author_id
                                                LEFT JOIN categories c ON c.id = b.category_id 
                                                WHERE b.category_id = :id
                                                ORDER BY release_date DESC
                                                LIMIT 4");

            $this->category_id = $this->valid_data($this->category_id);

            $query->bindParam(":id", $this->category_id, PDO::PARAM_INT);

            //On execute la requête
            $query->execute();

            // On retourne le résultat
            return $query;
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour insérer un livre dans la base données
     *
     * @return void
     */
    public function create()
    {
        if (preg_match("/^[a-zA-Z0-9-\' :,.?!-æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->title)) {
            if (preg_match("/^[a-zA-Z0-9-\' \æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->editor)) {
                // if (preg_match("/^[a-zA-Z0-9-\' ,.?!:-()æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{10,1000}$/", $this->summary)) {

                    try {
                        $query = $this->connexion->prepare("INSERT INTO $this->table(title, author_id, editor, summary, release_date, cover, category_id)
                                                            VALUES(:title, :author_id, :editor, :summary, :release_date, :cover, :category_id)");

                        // Protection contre les injections
                        $this->title = $this->valid_data($this->title);
                        $this->author_id = $this->valid_data($this->author_id);
                        $this->editor = $this->valid_data($this->editor);
                        $this->summary = $this->valid_data($this->summary);
                        $this->release_date = $this->valid_data($this->release_date);
                        $this->cover = $this->valid_data($this->cover);
                        $this->category_id = $this->valid_data($this->category_id);

                        $query->bindParam(":title", $this->title, PDO::PARAM_STR);
                        $query->bindParam(":author_id", $this->author_id, PDO::PARAM_INT);
                        $query->bindParam(':editor', $this->editor, PDO::PARAM_STR);
                        $query->bindParam(":summary", $this->summary, PDO::PARAM_STR);
                        $query->bindParam(":release_date", $this->release_date, PDO::PARAM_STR);
                        $query->bindParam(":cover", $this->cover, PDO::PARAM_STR);
                        $query->bindParam(":category_id", $this->category_id, PDO::PARAM_INT);

                        //On execute la requête
                        if ($query->execute()) {
                            return true;
                        } else {
                            return false;
                        }
                    } catch (PDOException $exception) {
                        echo "Erreur de connexion : " . $exception->getMessage();
                    }
                // }
            }
        }
    }

    /**
     * Pour la modification d'un livre
     *
     * @return void
     */
    public function update()
    {
        if (preg_match("/^[a-zA-Z0-9-\' :,.?!æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->title)) {
            if (preg_match("/^[a-zA-Z0-9-\' \æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->editor)) {
                if (preg_match("/^[a-zA-Z0-9-\' ,.?!:æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{10,500}$/", $this->summary)) {

                    try {
                        $query = $this->connexion->prepare("UPDATE " . $this->table . " SET title = :title, author_id = :author_id, editor = :editor, summary = :summary, release_date = :release_date, cover = :cover, category_id = :category_id WHERE id=:id");

                        // Protection contre les injections
                        $this->title = $this->valid_data($this->title);
                        $this->author_id = $this->valid_data($this->author_id);
                        $this->editor = $this->valid_data($this->editor);
                        $this->summary = $this->valid_data($this->summary);
                        $this->release_date = $this->valid_data($this->release_date);
                        $this->cover = $this->valid_data($this->cover);
                        $this->category_id = $this->valid_data($this->category_id);
                        $this->id = $this->valid_data($this->id);

                        $query->bindParam(":title", $this->title, PDO::PARAM_STR);
                        $query->bindParam(":author_id", $this->author_id, PDO::PARAM_INT);
                        $query->bindParam(":editor", $this->editor, PDO::PARAM_STR);
                        $query->bindParam(":summary", $this->summary, PDO::PARAM_STR);
                        $query->bindParam(":release_date", $this->release_date, PDO::PARAM_STR);
                        $query->bindParam(":cover", $this->cover, PDO::PARAM_STR);
                        $query->bindParam(":category_id", $this->category_id, PDO::PARAM_INT);
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
     * Pour supprimer un livre
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

    /**
     * Pour l'upload d'un fichier
     *
     * @return $newName . "." . $extension
     */
    public function uploadImage()
    {
        //var_dump($_FILES);
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] === 0) {
            // On a reçu l'image
            // On procède aux vérifications
            // On vérifie toujours l'extension et le type MIME
            $allowed = [
                "jpg" => "image/jpeg",
                "jpeg" => "image/jpeg",
                "png" => "image/png"
            ];

            $filename = $_FILES["image"]["name"];
            $filetype = $_FILES["image"]["type"];
            $filesize = $_FILES["image"]["size"];

            $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            // On vérifie l'absence de l'extension dans les clés de $allowed ou l'absence du type MIME dans les valeurs
            if (!array_key_exists($extension, $allowed) || !in_array($filetype, $allowed)) {
                // Ici l'extension ou le type est incorrect
                die("Erreur : format de fichier incorrect");
            }
            // Ici le type est correct
            // On limite à 1Mo
            if ($filesize > 1024 * 1024) {
                die("Erreur : Fichier trop volumineux");
            }

            // On génère un nom unique pour le fichier
            $newName = md5(uniqid());
            // On génère le chemin complet
            $newFilename = "C:\laragon\www\magic-books\backend\public\pictures" . DIRECTORY_SEPARATOR . $newName . "." . $extension;
            //var_dump($newFilename);
            // On déplace le fichier de tmp à pictures en le renommant
            if (!move_uploaded_file($_FILES["image"]["tmp_name"], $newFilename)) {
                die("L'upload a échoué");
            }

            // On interdit l'exécution du fichier
            // Notre fichier une fois uploader ne pourra pas être exécuter. Le groupe et les autres pourront seulement le lire 
            chmod($newFilename, 0644);

            return $newName . "." . $extension;
        }
    }
}
