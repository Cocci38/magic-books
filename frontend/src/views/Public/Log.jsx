import React, { useState } from 'react';
import { SignIn } from '../../components/Log/SignIn'
import { SignUp } from '../../components/Log/SignUp'
import {useLocation} from "react-router-dom";

export const Log = () => {

    const [showSignIn, setShowSignIn] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);
    
    // const location = useLocation().state.data;
    // //const data = location;
    // let coucou = "";
    // console.log(location);

    // if (data == "signUp") {
    //     coucou = "coucou";
        
    // } 
    // if (coucou == "coucou") {
    // }
    
    // Fonction pour afficher le formulaire d'inscription
    const displaySignUp = () => {
        //console.log('inscription');
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
            {
                showSignIn && (<SignIn displaySignUp={displaySignUp} />)
            }
            {
                showSignUp && (<SignUp displaySignUp={displaySignUp} />)
            }
        </>
    )
}
