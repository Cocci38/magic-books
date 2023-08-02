import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { faArrowRightFromBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { accountService } from '../services/account.service';
import { Header } from './Header';
import { useState } from 'react';

export const Menu = () => {
    const [isToggle, setIsToggle] = useState(false);
    let navigate = useNavigate();

    const logout = () => {
        accountService.logout()
        navigate('/')
    }

    const addNav = (event) => {
        event.currentTarget.classList.toggle('removeBtn');
        if (isToggle == false) {
            setIsToggle(true);
        } else if (isToggle == true) {
            setIsToggle(false);
        }
    }

    let isLogin = false;
    let isAdmin = accountService.isAdmin();
    let isReader = accountService.isReader();
    let isLogged = accountService.isLogged();

    if (isLogged) {
        if (isAdmin) {
            isLogin = true;
        } else if (isReader) {
            isLogin = true;
        } else {
            isLogin = false;
        }
    }

    return (
        <header>
            <nav>
                <Link to='/'><img src='/images/Magic-books.png' alt='logo magic book' /></Link>
                <ul className={isToggle ? 'toggleNav' : ''}>
                    <li><NavLink to='/' className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Accueil</NavLink></li>
                    {isAdmin ? <li><NavLink to='/admin' className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Tableau de bord</NavLink></li> : ""}
                    {isLogin ? <li><NavLink to='/mon-compte' className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Mon compte</NavLink></li> : ""}
                    {!accountService.isLogged() ?
                        <Link to={'/authentification'} className="buttonLog responsiveButton"> <FontAwesomeIcon icon={faCircleUser} size="xl" /> Connexion </Link>
                        :
                        <button className="buttonLog responsiveButton" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" /> Déconnexion</button>
                    }
                </ul>
                {!accountService.isLogged() ?
                    <Link to={'/authentification'} className="buttonLog activeButton"> <FontAwesomeIcon icon={faCircleUser} size="xl" /> Connexion </Link>
                    :
                    <button className="buttonLog activeButton" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" /> Déconnexion</button>
                }
                <button className="buttonLog responsiveButton" onClick={addNav}><FontAwesomeIcon icon={faBars} size="xl" /></button>
            </nav>
            <Header />
        </header>
    )
}