<?php

namespace App\Models;

use PDO;
use PDOException;

class Users extends Model
{
    private $table = "users";

    private $id;
    private $username;
    private $email;
    private $password;
    private $roles = "[ROLE_READER]";


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
     * Pour l'inscription d'un utilisateur dans la base données
     *
     * @return boolean
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
                            if (preg_match("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/", $this->password)) {
                                $query = $this->connexion->prepare("INSERT INTO $this->table(username, email, password, roles)
                                                                    VALUES(:username, :email, :password, :roles)");

                                // Protection contre les injections
                                $this->username = $this->valid_data($this->username);
                                $this->email = $this->valid_data($this->email);
                                $this->email = filter_var($this->email, FILTER_SANITIZE_EMAIL);
                                $this->roles = $this->valid_data($this->roles);
                                $this->password = $this->valid_data($this->password);

                                $passwordHash = password_hash($this->getPassword(), PASSWORD_DEFAULT);
                                
                                $query->bindParam(":username", $this->username, PDO::PARAM_STR);
                                $query->bindParam(":email", $this->email, PDO::PARAM_STR);
                                $query->bindParam(":password", $passwordHash, PDO::PARAM_STR);
                                $role = json_encode($this->roles);
                                $query->bindParam(":roles", $role, PDO::PARAM_STR);

                                //On execute la requête
                                if ($query->execute()) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                http_response_code(409);
                                echo json_encode(["message" => "Le password n'est pas valide"]);
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
     * Pour afficher un utilisateur selon son id
     *
     * @return $query
     */
    public function readById()
    {
        try {
            $query = $this->connexion->prepare("SELECT id, username, email FROM " . $this->table . " WHERE id = :id");

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
