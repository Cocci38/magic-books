import axios from "axios";
import { accountService } from "./account.service";

// Paramétrage de base d'axios avec l'url de de l'api
const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

/**
 * Intercepteur pour le token
 */
Axios.interceptors.request.use(request => {
    if (accountService.isLogged()) {
        request.headers.Authorization = "Bearer "+accountService.getToken()
        request.withCredentials = true
    }
    return request
});

export default Axios