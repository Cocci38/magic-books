import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Books } from '../../components/Books';
import { Categories } from '../../components/Categories';
import { Authors } from '../../components/Authors';

export const Dashboard = () => {

    const [showBooks, setShowBooks] = useState(true);
    const [showCategories, setShowCategories] = useState(false);
    const [showAuthors, setShowAuthors] = useState(false);

    // Fonction pour afficher la liste des livres et cacher la liste des catégories et des auteurs
    const displayBook = () => {
        //console.log('livres');
        if (showBooks == false) {
            setShowBooks(true)
            setShowCategories(false)
            setShowAuthors(false)
        }
    }
    // Fonction pour afficher la liste des catégories et cacher la liste des livres et des auteurs
    const displayCategory = () => {
        if (showCategories == false) {
            setShowCategories(true)
            setShowBooks(false)
            setShowAuthors(false)
        }
    }
    // Fonction pour afficher la liste des auteurs et cacher la liste des livres et des catégories
    const displayAuthor = () => {
        if (showAuthors == false) {
            setShowAuthors(true)
            setShowBooks(false)
            setShowCategories(false)
        }
    }

    return (
        <main className="dashboard">
            <section className='boxContainer'>
                <div className='boxLien'>
                    <h2>Livres</h2>
                    <a className="buttonAdmin" onClick={displayBook}>Afficher les livres</a>
                    <Link to={'/book'} className="buttonAdmin">Ajouter un livre</Link>
                </div>
                <hr></hr>
                <div className='boxLien'>
                    <h2>Catégories</h2>
                    <a className="buttonAdmin" onClick={displayCategory}>Afficher les catégories</a>
                    <Link to={'/category'} className="buttonAdmin">Ajouter une catégorie</Link>
                </div>
                <hr></hr>
                <div className='boxLien'>
                    <h2>Auteurs</h2>
                    <a className="buttonAdmin" onClick={displayAuthor}>Afficher les auteurs</a>
                    <Link to={'/author'} className="buttonAdmin">Ajouter un auteur</Link>
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
            

        </main>

    )
}