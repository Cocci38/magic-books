import Axios from "./services";

// Services pour l'admin
// Services de connexion vers l'api pour la gestion des livres (l'affichage de tous les livres, la modification et la suppression)
const getAllBooks = () => {
    return Axios.get("books")
}

const postBook = (formData) => {
    return Axios.post('create/book', formData)
}

const updateBook = (id, formData) => {
    return Axios.post('update/book/' + id, formData)
}

const deleteBook = (id) => {
    return Axios.delete("delete/book/" + id, {
        data: id,
    })
}

// Services de connexion vers l'api pour la gestion des catégories (l'affichage de toutes les catégories, la modification et la suppression)
const getAllCategories = () => {
    return Axios.get("categories")
}

const postCategory = (nameCategory) => {
    return Axios.post('create/category', {
        name: nameCategory,
    })
}

const updateCategory = (id, nameCategory) => {
    return Axios.put('update/category/' + id, {
        id: id,
        name: nameCategory,
    })
}

const deleteCategory = (id) => {
    return Axios.delete("delete/category/" + id, {
        data: id,
    })
}

// Services de connexion vers l'api pour la gestion des auteurs (l'affichage de tous les auteurs, la modification et la suppression)
const getAllAuthors = () => {
    return Axios.get("authors")
}

const postAuthor = (nameAuthor, nationality, biography) => {
    return Axios.post('create/author', {
        name: nameAuthor,
        nationality: nationality,
        biography: biography
    })
}

const updateAuthor = (id, nameAuthor, nationality, biography) => {
    return Axios.put('update/author/' + id, {
        id: id,
        name: nameAuthor,
        nationality: nationality,
        biography: biography
    })
}

const deleteAuthor = (id) => {
    return Axios.delete("delete/author/" + id, {
        id: id,
    })
}

// Déclaration des services pour l'import
export const adminService = {
    getAllBooks, postBook, updateBook, deleteBook, getAllCategories, postCategory, updateCategory, deleteCategory, 
    getAllAuthors, postAuthor, updateAuthor, deleteAuthor
}