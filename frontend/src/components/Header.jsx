import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='headerMenu'>
            <img src="/images/mikolaj-DCzpr09cTXY-unsplash.jpg" className='imageHeader' alt='livre ouvert' />
            <div className='titleBlock'>
                <p> Avec Magic Books, découvrez les dernières sorties littéraires,
                    créez votre bibliothèque virtuelle et suivez votre historique de lecture
                </p>
                <p>Pas encore de compte ? <Link to={"authentification"} className="colorOrange">S'inscrire</Link></p>
                {/* <p>Pas encore de compte ? <Link to={"authentification"} state={{ data:"signUp" }} className="colorOrange">S'inscrire</Link></p> */}
            </div>
        </div>
    )
}
