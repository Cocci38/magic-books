import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Books } from '../../components/Admin/Books';
import { Categories } from '../../components/Admin/Categories';
import { Authors } from '../../components/Admin/Authors';

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
                    <button style={{
                        color: !showBooks ? '#2D3250' : '#F8B179',
                    }} className="buttonAdmin" onClick={displayBook} aria-label="afficher la liste des livres">Afficher les livres</button>
                    <Link to={'/book'} className="buttonAdmin" aria-label="ajouter un livre">Ajouter un livre</Link>
                </div>
                <hr></hr>
                <div className='boxLien'>
                    <h2>Catégories</h2>
                    <button style={{
                        color: !showCategories ? '#2D3250' : '#F8B179',
                    }} className="buttonAdmin" onClick={displayCategory} aria-label="afficher la liste des catégories">Afficher les catégories</button>
                    <Link to={'/category'} className="buttonAdmin" aria-label="ajouter une catégorie">Ajouter une catégorie</Link>
                </div>
                <hr></hr>
                <div className='boxLien'>
                    <h2>Auteurs</h2>
                    <button style={{
                        color: !showAuthors ? '#2D3250' : '#F8B179',
                    }} className="buttonAdmin" onClick={displayAuthor} aria-label="afficher la liste des auteurs">Afficher les auteurs</button>
                    <Link to={'/author'} className="buttonAdmin" aria-label="ajouter un auteur">Ajouter un auteur</Link>
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