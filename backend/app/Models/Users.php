<?php

namespace App\Models;

use PDO;
use PDOException;

class Users
{
    private $table = "users";
    private $connexion = null;

    private $id;
    private $username;
    private $email;
    private $password;
    private $roles = "[ROLE_READER]";

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
     * Get the value of username
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set the value of username
     */
    public function setUsername($username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get the value of email
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     */
    public function setEmail($email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of password
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     */
    public function setPassword($password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get la valeur du rôle en lui attribuant un rôle par défaut
     */
    public function getRoles()
    {
        $roles = $this->roles;

        $roles[] = 'ROLE_READER';

        return $this->roles;
    }

    /**
     * Set la valeur de role
     * 
     * @return self
     */
    public function setRoles($roles): self
    {
        $this->roles = json_decode($roles);

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
        $data = htmlspecialchars($data, ENT_COMPAT,'ISO-8859-1', true); // Convertit les caractères spéciaux en entités HTML
        $data = strip_tags($data);      // Supprime les balises HTML et PHP d'une chaîne
        //$data = htmlentities($data, ENT_COMPAT);
        return $data;
    }

    /**
     * Pour l'inscription d'un utilisateur dans la base données
     *
     * @return void
     */
    public function signUp()
    {

        try {
            // On vérifie si l'email est unique
            $emailUnique = $this->connexion->prepare("SELECT email from users WHERE email = :email");
            $emailUnique->bindParam(":email", $this->email, PDO::PARAM_STR);
            $emailUnique->execute();
            $resultEmail = $emailUnique->fetch(PDO::FETCH_ASSOC);

            if (empty($resultEmail['email']) || $this->email !== $resultEmail['email']) {
                if (filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                    if (preg_match("/^[a-zA-Z0-9-\' :,.?!æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->username)) {
                        if (preg_match("/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/", $this->email)) {
                            if (preg_match("/^[a-zA-Z0-9-\' \æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->password)) {
                                $query = $this->connexion->prepare("INSERT INTO $this->table(username, email, password, roles)
                                                        VALUES(:username, :email, :password, :roles)");

                                // Protection contre les injections
                                $this->username = $this->valid_data($this->username);
                                $this->email = $this->valid_data($this->email);
                                $this->email = filter_var($this->email, FILTER_SANITIZE_EMAIL);
                                $this->password = $this->valid_data($this->password);
                                $passwordHash = password_hash($this->getPassword(), PASSWORD_DEFAULT);
                                $this->roles = $this->valid_data($this->roles);

                                $query->bindParam(":username", $this->username, PDO::PARAM_STR);
                                $query->bindParam(":email", $this->email, PDO::PARAM_STR);
                                $query->bindParam(":password", $passwordHash, PDO::PARAM_STR);
                                //$query->bindParam(":roles", $this->getRoles("ROLE_READER"), PDO::PARAM_STR);
                                $role = json_encode($this->roles);
                                $query->bindParam(":roles", $role, PDO::PARAM_STR);

                                //On execute la requête
                                if ($query->execute()) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
                    }
                }
            } else {
                echo json_encode(["message" => "L'email existe déjà"]);
            }
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour la connexion d'un utilisateur
     * @return
     */
    public function signIn()
    {
        try {
            if ($this->email !== "" && $this->password !== "") {
                if (filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                    if (preg_match("#^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$#", $this->email)) {
                        if (preg_match("#^[a-zA-Z0-9-?!*+/]{8,25}$#", $this->password)) {
                            $query = $this->connexion->prepare("SELECT id, username, email, password, roles 
                            FROM users 
                            WHERE email = :email");

                            $this->email = $this->valid_data($this->email);
                            $this->email = filter_var($this->email, FILTER_SANITIZE_EMAIL);

                            $query->bindParam("email", $this->email, PDO::PARAM_STR);
                            $query->execute();
                            return $query;
                        }
                    }
                }
            }
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour la modification d'un compte utilisateur
     *
     * @return void
     */
    public function updateAccount()
    {
        try {
            // On vérifie si l'email est unique
            $emailUnique = $this->connexion->prepare("SELECT email from users WHERE email = :email");
            $emailUnique->bindParam(":email", $this->email, PDO::PARAM_STR);
            $emailUnique->execute();
            $resultEmail = $emailUnique->fetch(PDO::FETCH_ASSOC);

            if (empty($resultEmail['email']) || $this->email !== $resultEmail['email']) {
                if (filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                    if (preg_match("/^[a-zA-Z0-9-\' :,.?!æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->username)) {
                        if (preg_match("/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/", $this->email)) {
                            if (preg_match("/^[a-zA-Z0-9-\' \æœçéàèùâêîôûëïüÿÂÊÎÔÛÄËÏÖÜÀÆÇÉÈŒÙ]{3,100}$/", $this->password)) {
                                $query = $this->connexion->prepare("UPDATE " . $this->table . " SET username = :username, email = :email, password = :password WHERE id=:id");

                                // Protection contre les injections
                                $this->username = $this->valid_data($this->username);
                                $this->email = $this->valid_data($this->email);
                                $this->email = filter_var($this->email, FILTER_SANITIZE_EMAIL);
                                $this->password = $this->valid_data($this->password);
                                $passwordHash = password_hash($this->getPassword(), PASSWORD_DEFAULT);
                                $this->id = $this->valid_data($this->id);

                                $query->bindParam(":id", $this->id, PDO::PARAM_INT);
                                $query->bindParam(":username", $this->username, PDO::PARAM_STR);
                                $query->bindParam(":email", $this->email, PDO::PARAM_STR);
                                $query->bindParam(":password", $passwordHash, PDO::PARAM_STR);
                                //$query->bindParam(":roles", $this->getRoles("ROLE_USER"), PDO::PARAM_STR);

                                //On execute la requête
                                if ($query->execute()) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
                    }
                }
            } else {
                echo json_encode(["message" => "L'email existe déjà"]);
            }
        } catch (PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    /**
     * Pour supprimer un utilisateur
     *
     * @return void
     */
    public function deleteAccount()
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
