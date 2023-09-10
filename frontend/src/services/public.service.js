import Axios from "./services";

// Services pour la partie "public"
// Services de connexion vers l'api pour l'affichage d'un livre
const getBook = (id) => {
    return Axios.post("book/" + id, {
        id: id
    })
}

// Services de connexion vers l'api pour l'affichage d'une catégorie
const getCategory = (id) => {
    return Axios.post("category/" + id, {
        id: id
    })
}

// Services de connexion vers l'api pour l'affichage d'un auteur
const getAuthor = (id) => {
    return Axios.post("author/" + id, {
        id: id
    })
}

// Services de connexion vers l'api pour l'affichage des livres (par date, par auteur et par catégorie)
const getBooksOrderByDate = () => {
    return Axios.get("book-by-date")
}

const getBooksByAuthor = (id) => {
    return Axios.post("book-by-author/" + id, {
        id: id
    })
}

const getBooksByCategory = () => {
    return Axios.get("category-books")
}

// Déclaration des services pour l'import
export const publicService = {
    getBook, getCategory, getAuthor, getBooksOrderByDate, getBooksByAuthor, getBooksByCategory
}