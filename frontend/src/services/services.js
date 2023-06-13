import axios from "axios";
import { accountService } from "./account.service";

// Paramétrage de base d'axios avec l'url de de l'api
const Axios = axios.create({
    baseURL: "http://localhost/magic-books/backend/"
});

/**
 * Intercepteur pour le token
 */
Axios.interceptors.request.use(request => {
    // if (accountService.isLogged()) {
    //     request.headers.Authorization = "Bearer "+ accountService.getToken()
    // }
    return request
});

export default Axios