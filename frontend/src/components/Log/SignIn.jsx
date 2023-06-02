
export const SignIn = ({ displaySignUp }) => {
    //console.log(displaySignUp);
    // Fonction qui récupère les données transmis par le formulaire et qui l'envoie vers le serveur
    const handlSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
    }

    return (
        <main className="mainRow">
            <section className="container">
                <form onSubmit={handlSubmit}>
                    <h2 className="h2Form"> Se connecter</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    {/* <span style={{ color: "red" }}>{errors.email}</span><br></br> */}

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" />
                    {/* <span style={{ color: "red" }}>{errors.password}</span><br></br> */}

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