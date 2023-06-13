import { Navigate } from "react-router-dom";
import { accountService } from "../services/account.service";

/**
 * Fonction de vérification de token
 * Et fermeture partie admin
 * 
 * @param {Object} props{children} 
 * @returns {ReactNode}
 */
const AuthGuard = ({ children }) => {

    if (accountService.isLogged()) {
        return children;
        
    }

    return false;
    // return <Navigate to="authentification" />
};

//export default AuthGuard;