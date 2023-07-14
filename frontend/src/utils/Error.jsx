import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <main className='error-page'>
            <div className='error-content'>
                <h2>404</h2>
                <h3>Oups ! Page non trouvé</h3>
                <p>Désolé, la page que vous recherchez n'existe pas.</p>
                <Link to={"/"} className='button' >Revenir à l'accueil</Link>
            </div>
        </main>
    );
};

export default Error;