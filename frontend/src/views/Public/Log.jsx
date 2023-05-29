import React, { useState } from 'react';
import { SignIn } from '../../components/Log/SignIn'
import { SignUp } from '../../components/Log/SignUp'

export const Log = () => {

    const [showSignIn, setShowSignIn] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    // Fonction pour afficher le formulaire d'inscription
    const displaySignUp = () => {
        console.log('inscription');
        if (showSignUp == false) {
            setShowSignUp(true)
            setShowSignIn(false)
        } else {
            setShowSignUp(false)
            setShowSignIn(true)
        }
    }

    return (
        <>
            {
                showSignUp && (<SignIn displaySignUp={displaySignUp} />)
            }
            {
                showSignUp && (<SignUp />)
            }
        </>
    )
}
