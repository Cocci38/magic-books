import React, { useState } from 'react';
import { SignIn } from '../../components/Log/SignIn'
import { SignUp } from '../../components/Log/SignUp'

export const Log = () => {

    const [showSignIn, setShowSignIn] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    // Fonction pour afficher le formulaire d'inscription
    const displaySignUp = () => {
        console.log('inscription');
        if (showSignIn == false) {
            setShowSignIn(true)
            setShowSignUp(false)
        } else {
            setShowSignIn(false)
            setShowSignUp(true)
        }
    }

    return (
        <>
            {/* <SignIn displaySignUp={displaySignUp} /> */}
            {
                showSignIn && (<SignIn displaySignUp={displaySignUp} />)
            }
            {
                showSignUp && (<SignUp />)
            }
        </>
    )
}
