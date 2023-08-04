import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../services/account.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

export const SignIn = ({ displaySignUp }) => {
    const [errors, setErrors] = useState({});
    const [isToggleLock, setIsToggleLock] = useState(false);

    const navigate = useNavigate();
    //console.log(displaySignUp);

    // Fonction qui récupère les données transmis par le formulaire et qui l'envoie vers le serveur
    const handlSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        const validateData = () => {
            let errors = {};
            if (!email) {
                errors.email = "L'email est requis";
            }
            if (!password) {
                errors.password = "Le mot de passe est requis";
            }
            return errors;
        };
        const errors = validateData();

        if (Object.keys(errors).length) {
            setErrors(errors);
        } else {
            await accountService.signIn(email, password)
                .then(res => {
                    if (res.data.result === "Ok") {
                        console.log(res.data.id);
                        let cookies = res.data.token
                        accountService.saveToken(cookies)
                        accountService.saveId(res.data.id)
                        navigate("/")
                        accountService.saveRole(JSON.parse(res.data.role))
                        if (accountService.isLogged()) {
                            window.location.reload();
                            navigate("/admin");
                        }
                    }


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

    const handleChange = async (e) => {
        const form = e.target;

        console.log(form);
    }

    return (
        <main className="mainRow">
            <section className="container">
                <form onSubmit={handlSubmit}>
                    <h2 className="h2Form"> Se connecter</h2>

                    <label htmlFor="email">Email</label>
                    <div className="flexRow flexAttribute">
                        <input type="email" name="email" id="email" style={{marginRight:"25px"}} onChange={handleChange} />
                    </div>
                    <span style={{ color: "red" }}>{errors.email}</span><br></br>

                    <label htmlFor="password">Mot de passe</label>
                    <div className="flexRow flexAttribute">
                        <input type={ isToggleLock ? "text" : "password"} name="password" id="password" />
                        {isToggleLock ? <FontAwesomeIcon icon={faLockOpen} size="lg" style={{marginLeft:"10px"}} onClick={unlockPassword} /> 
                        : <FontAwesomeIcon icon={faLock} size="lg" style={{marginLeft:"10px"}} onClick={unlockPassword} /> }
                    </div>
                    <span style={{ color: "red" }}>{errors.password}</span><br></br>

                    <button type="submit" className="button">Connexion</button>
                </form>
            </section>
            <div className="bar"></div>
            <section className="container">
                <div className="form">
                    <h2 className="h2Form"> Pas encore membre ?</h2>
                    <button type="button" className="button" onClick={displaySignUp}>Créer un compte</button>
                    <p>Magic-books est une application dédié aux livres et aux lecteurs. Il permet de créer et d’organiser sa bibliothèque
                        en ligne, d’obtenir des informations sur des œuvres.
                    </p>
                </div>
            </section>
        </main>
    )
}