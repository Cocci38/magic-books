import Axios from "./services";

// Services pour la partie "public"
// Services de connexion vers l'api pour l'affichage d'un livre
const getBook = (id) => {
    return Axios.get("book/" + id)
}

// Services de connexion vers l'api pour l'affichage d'une catégorie
const getCategory = (id) => {
    return Axios.get("category/" + id)
}

// Services de connexion vers l'api pour l'affichage d'un auteur
const getAuthor = (id) => {
    return Axios.get("author/" + id)
}

const getBooksOrderByDate = (id) => {
    return Axios.get("book-by-date")
}

// Déclaration des services pour l'import
export const publicService = {
    getBook, getCategory, getAuthor, getBooksOrderByDate
}