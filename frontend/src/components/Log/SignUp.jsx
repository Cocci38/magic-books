export const SignUp = () => {

    // Fonction qui récupère les données transmis par le formulaire et qui l'envoie vers le serveur
    const handlSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
    }

    return (
        <div className="container">
            <form onSubmit={handlSubmit}>
                <h2 className="h2Form"> S'inscrire</h2>

                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" />
                {/* <span style={{ color: "red" }}>{errors.username}</span><br></br> */}

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                {/* <span style={{ color: "red" }}>{errors.email}</span><br></br> */}

                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" />
                {/* <span style={{ color: "red" }}>{errors.password}</span><br></br> */}

                <button type="submit" className="button">Enregistrer</button>
            </form>
        </div>
    )
}