import Axios from "./services";

// Services pour la partie "reader"
// Services de connexion vers l'api pour l'affichage d'un livre
const getReader = (id) => {
    return Axios.get("user/" + id)
}

// Déclaration des services pour l'import
export const readerService = {
    getReader
}