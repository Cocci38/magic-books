import React from 'react'

export const Header = () => {
    return (
        <div className='headerMenu'>
            <img src="/src/assets/mikolaj-DCzpr09cTXY-unsplash.jpg" className='imageHeader' />
            <div className='titleBlock'>
                <p> Avec Magic Books, découvrez les dernières sorties littéraires,
                    créez votre bibliothèque virtuelle et suivez votre historique de lecture
                </p>
                <p>Pas encore de compte ? <span className="colorOrange">S'inscrire</span></p>
            </div>
        </div>
    )
}
