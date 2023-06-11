import axios from "axios";

// Paramétrage de base d'axios avec l'url de de l'api
const Axios = axios.create({
    baseURL: "http://localhost/magic-books/backend/"
});

export default Axios