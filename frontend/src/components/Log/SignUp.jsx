import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../services/account.service";

export const SignUp = () => {

    // Fonction qui récupère les données transmis par le formulaire et qui l'envoie vers le serveur
    const [errors, setErrors] = useState({});
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
        console.log(email);

        const validateData = () => {
            let regexPassword = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g);
            let regexMinuscule = new RegExp(/^(?=.* ?[a-z])$/g);
            let errors = {};
            if (!username) {
                errors.username = "L'username est requis";
            }
            if (!email) {
                errors.email = "L'email est requis";
            }
            if (!password) {
                errors.password = "Le mot de passe est requis";
            }

            if (!regexPassword.test(password)) {
                if (password.length < 8) {
                    errors.password = "Le mot de passe doit contenir au moins 8 caractères";
                } else if (!regexMinuscule.test(password)){
                    errors.password = "Le mot de passe doit contenir au moins 1 minuscule";
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
                    navigate("/admin");
                })
                .catch(error => { console.log(error.data) });
        }

    }

    return (
        <div className="container">
            <form onSubmit={handlSubmit}>
                <h2 className="h2Form"> S'inscrire</h2>

                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" />
                <span style={{ color: "red" }}>{errors.username}</span><br></br>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <span style={{ color: "red" }}>{errors.email}</span><br></br>

                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" />
                <span style={{ color: "red" }}>{errors.password}</span><br></br>

                <button type="submit" className="button">Enregistrer</button>
            </form>
        </div>
    )
}