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

// Services de connexion vers l'api pour l'affichage des livres (par date, par auteur et par catégorie)
const getBooksOrderByDate = (id) => {
    return Axios.get("book-by-date")
}

const getBooksByAuthor = (id) => {
    return Axios.get("book-by-author/" + id)
}

const getBooksByCategory = () => {
    return Axios.get("category-books")
}

// Déclaration des services pour l'import
export const publicService = {
    getBook, getCategory, getAuthor, getBooksOrderByDate, getBooksByAuthor, getBooksByCategory
}