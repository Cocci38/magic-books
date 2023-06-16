import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { accountService } from '../services/account.service';
import { Header } from './Header';

export const Menu = () => {
    let navigate = useNavigate();
    const logout = () => {
        accountService.logout()
        navigate('/')
    }

    let isLogin = false;
    let isAdmin = accountService.isAdmin();
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
            <div className='menu'>
                <img src='/images/Magic-books.png' alt='logo magic book' />
                <nav>
                    <ul>
                        <li><NavLink to='/' className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Accueil</NavLink></li>
                        {isAdmin ? <li><NavLink to='/admin' className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Tableau de bord</NavLink></li> : ""}
                        {isLogin ? <li><NavLink to='/mon-compte' className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Mon compte</NavLink></li> : ""}

                    </ul>
                </nav>
                {!accountService.isLogged() ?
                    <Link to={'/authentification'} className="buttonAdmin"> <FontAwesomeIcon icon={faCircleUser} size="xl" /> Connexion </Link>
                    :
                    <button className="buttonAdmin" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" /> Déconnexion</button>
                }
            </div>
            <Header />
        </header>
    )
}