import Axios from "./services";

// Services de connexion vers l'api pour l'inscription des utilisateurs
const signUp = (username, email, password) => {
    return Axios.post('signup', {
        username: username,
        email: email,
        password: password
    })
}

// Services de connexion vers l'api pour la connexion des utilisateurs
const signIn = (email, password) => {
    return Axios.post('signin', {
        email: email,
        password: password
    })
}

// Services pour l'authentification de l'utilisateur
/**
 * Sauvegarde du token dans le localStorage
 * @param {string} token 
 */
let saveToken = (token) => {
    localStorage.setItem('token', token)
}

/**
 * Sauvegarde du role dans le localStorage
 * @param {string} role 
 */
let saveRole = (role) => {
    localStorage.setItem('role', role)
}

/**
 * Suppression du token du localStorage
 */
let logout = () => {
    localStorage.removeItem('token')
}

/**
 * État de la présence d'un token dans le localStorage
 * @returns {boolean}
 */
let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

let getToken = () => {
    return localStorage.getItem('token')
}

// Déclaration des services pour import
export const accountService = {
    signUp, signIn, saveToken, saveRole, logout, isLogged, getToken
}