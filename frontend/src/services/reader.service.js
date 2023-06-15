import Axios from "./services";

// Services pour la partie "reader"
// Service de connexion vers l'api pour l'affichage d'un utilisateur
const getReader = (id) => {
    return Axios.get("user/" + id)
}

// Service de connexion vers l'api pour l'affichage de la bibliothèque du lecteur
const getLibrary = (readerId) => {
    return Axios.get("library/" + readerId)
}

const postBookLibrary = (readerId, bookId) => {
    // console.log(readerId);
    // console.log(bookId);
    return Axios.post("create/library", {
        readerId: readerId,
        bookId: bookId
    })
}

const deleteBookLibrary = (id) => {
    //console.log(id);
    return Axios.delete("delete/library-book/" + id, {
        data: id,
    })
}

// Déclaration des services pour l'import
export const readerService = {
    getReader, getLibrary, postBookLibrary, deleteBookLibrary
}