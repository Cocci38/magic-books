export const SignIn = () => {


    return (
        <div className="container">
            <form onSubmit={handlSubmit}>
                <h2 className="h2Form"> Se connecter</h2>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <span style={{ color: "red" }}>{errors.email}</span><br></br>

                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" />
                <span style={{ color: "red" }}>{errors.password}</span><br></br>

                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}