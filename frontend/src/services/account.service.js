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
        password: password,
    })
}

// Services pour l'authentification de l'utilisateur
/**
 * Sauvegarde du token dans le localStorage
 * @param {string} token 
 */
let saveToken = (token) => {
    // localStorage.setItem('token', token)
    sessionStorage.setItem('token', token)
}

/**
 * Sauvegarde du role dans le localStorage
 * @param {string} role 
 */
let saveRole = (role) => {
    // localStorage.setItem('role', role)
    sessionStorage.setItem('role', role)
}

/**
 * Sauvegarde de l'id dans le localStorage
 * @param {string} id 
 */
let saveId = (id) => {
    // localStorage.setItem('id', id)
    sessionStorage.setItem('id', id)
}



// /**
//  * État de la présence d'un token dans le localStorage
//  * @returns {boolean}
//  */
// let isLogged = () => {
//     let token = localStorage.getItem('token')
//     return !!token
// }

// let isAdmin = () => {
//     let role = localStorage.getItem('role')
//     if (role === "[ROLE_ADMIN]") {
//         return !!role
//     } else {
//         return false
//     }
// }

// let isReader = () => {
//     let role = localStorage.getItem('role')
//     if (role === "[ROLE_READER]") {
//         return !!role
//     } else {
//         return false
//     }
// }

// let getToken = () => {
//     return localStorage.getItem('token')
// }

// let getReaderId = () => {
//     return localStorage.getItem('id')
// }

/**
 * État de la présence d'un token dans le localStorage
 * @returns {boolean}
 */
let isLogged = () => {
    let token = sessionStorage.getItem('token')
    return !!token
}

let isAdmin = () => {
    let role = sessionStorage.getItem('role')
    if (role === "[ROLE_ADMIN]") {
        return !!role
    } else {
        return false
    }
}

let isReader = () => {
    let role = sessionStorage.getItem('role')
    if (role === "[ROLE_READER]") {
        return !!role
    } else {
        return false
    }
}

let getToken = () => {
    return sessionStorage.getItem('token')
}

let getReaderId = () => {
    return sessionStorage.getItem('id')
}

/**
 * Suppression du token du localStorage
 */
let logout = () => {
    // localStorage.removeItem('token')
    // localStorage.removeItem('id')
    // localStorage.removeItem('role')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('role')
    sessionStorage.clear();
    isAdmin();
    isReader();
}

// Déclaration des services pour import
export const accountService = {
    signUp, signIn, saveToken, saveRole, saveId, logout, isLogged, isAdmin, isReader, getToken, getReaderId
}