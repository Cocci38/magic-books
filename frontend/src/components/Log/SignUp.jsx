import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../services/account.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

export const SignUp = ({ displaySignUp }) => {

    // Fonction qui récupère les données transmis par le formulaire et qui l'envoie vers le serveur
    const [errors, setErrors] = useState({});
    const [isToggleLock, setIsToggleLock] = useState(false);
    const navigate = useNavigate();
    //console.log(displaySignUp);
    // Fonction qui récupère les données transmis par le formulaire et qui l'envoie vers le serveur
    const handlSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        //console.log(email);

        const validateData = () => {
            let regexPassword = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g);
            let regexEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g)
            let errors = {};

            // Gestion des erreurs pour l'username
            if (!username) {
                errors.username = "L'username est requis";
            }

            // Gestion des erreurs pour l'email
            if (!email) {
                errors.email = "L'email est requis";
            }
            if (!regexEmail.test(email)) {
                errors.email = "L'adresse mail n'est pas valide";
            }
            // Gestion des erreurs pour le mot de passe
            if (!password) {
                errors.password = "Le mot de passe est requis";
            }
            if (!regexPassword.test(password)) {
                if (password.length < 8) {
                    errors.password = "Le mot de passe doit contenir au moins 8 caractères";
                } else {
                    errors.password = "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial";
                }
            }
            return errors;
        };
        const errors = validateData();

        if (Object.keys(errors).length) {
            setErrors(errors);
        } else {
            await accountService.signUp(username, email, password)
                .then(res => {
                    console.log(res.data);
                    navigate("/");
                })
                .catch(error => { console.log(error.data) });
        }

    }

    const unlockPassword = () => {
        if (isToggleLock == false) {
            setIsToggleLock(true);
        } else if (isToggleLock == true) {
            setIsToggleLock(false);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handlSubmit}>
                <h2 className="h2Form"> S'inscrire</h2>

                <label htmlFor="username">username</label>
                <div className="flexRow flexAttribute">
                    <input type="text" name="username" id="username" style={{marginRight:"25px"}} />
                </div>
                <span style={{ color: "red" }}>{errors.username}</span><br></br>

                <label htmlFor="email">Email</label>
                <div className="flexRow flexAttribute">
                    <input type="email" name="email" id="email" style={{marginRight:"25px"}} />
                </div>
                <span style={{ color: "red" }}>{errors.email}</span><br></br>

                <label htmlFor="password">Mot de passe</label>
                <div className="flexRow flexAttribute">
                    <input type={isToggleLock ? "text" : "password"} name="password" id="password" />
                    {isToggleLock ? <FontAwesomeIcon icon={faLockOpen} size="lg" style={{ marginLeft: "10px" }} onClick={unlockPassword} />
                        : <FontAwesomeIcon icon={faLock} size="lg" style={{ marginLeft: "10px" }} onClick={unlockPassword} />}
                </div>
                <span style={{ color: "red" }}>{errors.password}</span><br></br>
                <p style={{ textAlign: "center", cursor: "pointer" }}>J'ai déjà un compte ? <a type="button" className="colorOrange" onClick={displaySignUp}>Je me connecte</a></p>

                <button type="submit" className="button">Je m'inscris</button>

            </form>
        </div>
    )
}