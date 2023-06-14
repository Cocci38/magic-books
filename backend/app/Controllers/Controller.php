<?php

namespace App\Controllers;

use Config\JWT;
use Config\DotEnvEnvironment as ConfigDotEnvEnvironment;

class Controller
{

    protected function Authorization()
    {
        // On verifie si on reçoit un token
        // Il n'y a pas une seule façon de récupérer un token (nginx, apache ou autre)
        if (isset($_SERVER['Authorization'])) {
            $token = trim($_SERVER['Authorization']);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $token = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            if (isset($requestHeaders['Authorization'])) {
                $token = trim($requestHeaders['Authorization']);
            }
        }

        $dotEnv = new ConfigDotEnvEnvironment;
        $dotEnv->load(__DIR__ . '/../../');
        $secret = getenv('SECRET');
        //var_dump($token);
        // On vérifie si la chaine commence par "Bearer "
        if (!isset($token) || !preg_match('/Bearer\s(\S+)/', $token, $matches)) {
            http_response_code(400);
            echo json_encode(['message' => 'Token introuvable']);
            exit;
        }

        // On extrait le token
        $token = str_replace('Bearer ', '', $token);

        $jwt = new JWT();

        // On vérifie la validité du token
        if (!$jwt->isValid($token)) {
            http_response_code(400);
            echo json_encode(['message' => 'Token invalide']);
            exit;
        }

        // On vérifie la signature du token
        if (!$jwt->check($token, $secret)) {
            http_response_code(403);
            echo json_encode(['message' => 'Le Token est invalide']);
            exit;
        }

        // On vérifie l'expiration du token
        if ($jwt->isExpired($token)) {
            http_response_code(403);
            echo json_encode(['message' => 'Le token a expiré']);
            exit;
        }

        $roles = $jwt->getPayload($token)['roles'][0];
        $roles = trim($roles, '"');
        //var_dump(trim($roles, '"'));
        //echo json_encode($jwt->getPayload($token));
        return $roles;
    }

}
