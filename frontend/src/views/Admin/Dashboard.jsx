import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Books } from '../../components/Admin/Books';
import { Categories } from '../../components/Admin/Categories';
import { Authors } from '../../components/Admin/Authors';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Dashboard = () => {

    const [showBooks, setShowBooks] = useState(true);
    const [showCategories, setShowCategories] = useState(false);
    const [showAuthors, setShowAuthors] = useState(false);
    const [isToggleAdmin, setIsToggleAdmin] = useState(false);

    // Fonction pour afficher la liste des livres et cacher la liste des catégories et des auteurs
    const displayBook = () => {
        //console.log('livres');
        if (showBooks == false) {
            setShowBooks(true)
            setShowCategories(false)
            setShowAuthors(false)
            setIsToggleAdmin(false);
        }
    }

    // Fonction pour afficher la liste des catégories et cacher la liste des livres et des auteurs
    const displayCategory = () => {
        if (showCategories == false) {
            setShowCategories(true)
            setShowBooks(false)
            setShowAuthors(false)
            setIsToggleAdmin(false);
        }
    }

    // Fonction pour afficher la liste des auteurs et cacher la liste des livres et des catégories
    const displayAuthor = () => {
        if (showAuthors == false) {
            setShowAuthors(true)
            setShowBooks(false)
            setShowCategories(false)
            setIsToggleAdmin(false);
        }
    }

    const addMenu = () => {
        if (isToggleAdmin == false) {
            setIsToggleAdmin(true);
        } else if (isToggleAdmin == true) {
            setIsToggleAdmin(false);
        }

    }

    return (
        <main>
            <button className="buttonBugger responsiveButton" onClick={addMenu}><FontAwesomeIcon icon={faBars} size="xl" /></button>
            <div className="dashboard">
                <section className={isToggleAdmin ? 'boxContainer toggleNavAdmin' : 'boxContainer'}>
                    <div className='boxLien'>
                        <h2>Livres</h2>
                        <button style={{
                            color: !showBooks ? '#2D3250' : '#F8B179',
                        }} className="buttonAdmin" onClick={displayBook} aria-label="afficher la liste des livres">Afficher les livres</button>
                        <Link to={'livre/ajout'} className="buttonAdmin" aria-label="ajouter un livre">Ajouter un livre</Link>
                    </div>
                    <hr></hr>
                    <div className='boxLien'>
                        <h2>Catégories</h2>
                        <button style={{
                            color: !showCategories ? '#2D3250' : '#F8B179',
                        }} className="buttonAdmin" onClick={displayCategory} aria-label="afficher la liste des catégories">Afficher les catégories</button>
                        <Link to={'categorie/ajout'} className="buttonAdmin" aria-label="ajouter une catégorie">Ajouter une catégorie</Link>
                    </div>
                    <hr></hr>
                    <div className='boxLien'>
                        <h2>Auteurs</h2>
                        <button style={{
                            color: !showAuthors ? '#2D3250' : '#F8B179',
                        }} className="buttonAdmin" onClick={displayAuthor} aria-label="afficher la liste des auteurs">Afficher les auteurs</button>
                        <Link to={'auteur/ajout'} className="buttonAdmin" aria-label="ajouter un auteur">Ajouter un auteur</Link>
                    </div>
                </section>

                {
                    showBooks && (<Books />)
                }
                {
                    showCategories && (<Categories />)
                }
                {
                    showAuthors && (<Authors />)
                }
            </div>

        </main>

    )
}