

export const Footer = () => {
    return (
        <footer>
            <div className="flexRow" style={{width: '600px'}}>
                <img src="/src/assets/Logo_ter.png" alt='logo magic book' />
                <p>Magic-books est une application dédié aux livres et aux lecteurs.
                    Il permet de créer et d’organiser sa bibliothèque en ligne, d’obtenir des informations sur des œuvres.
                </p>
            </div>
            <p className="notice"><span className="colorOrange">Magic Books</span> - Tous droits réservés - <span className="colorOrange">Mention Légale</span></p>
        </footer>
    )
}
