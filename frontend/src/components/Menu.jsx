import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { Link, NavLink } from "react-router-dom"

export const Menu = () => {
    return (
        <header>
            <img src='/images/Magic-books.png' alt='logo magic book' />
            <nav>
                <ul>
                    <li><NavLink to='/' className={({isActive}) => (isActive ? "activeLink" : undefined)}>Accueil</NavLink></li>
                    <li><NavLink to='/admin' className={({isActive}) => (isActive ? "activeLink" : undefined)}>Tableau de bord</NavLink></li>
                </ul>
            </nav>
            <Link to={'/authentification'} className="buttonAdmin"> <FontAwesomeIcon icon={faCircleUser} size="xl" /> Connexion </Link>
        </header>
    )
}