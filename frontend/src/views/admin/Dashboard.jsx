import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Books } from '../../components/Books';
import { Categories } from '../../components/Categories';

export const Dashboard = () => {

    const [showBooks, setShowBooks] = useState(true);
    const [showCategories, setShowCategories] = useState(false);

    // Fonction pour afficher la liste des livres et cacher la liste des catégories
    const displayBook = () => {
        //console.log('livres');
        if (showBooks == true) {
            setShowBooks(false)
            setShowCategories(true)
        } else {
            setShowBooks(true)
            setShowCategories(false)
        }
    }
    // Fonction pour afficher la liste des catégories et cacher la liste des livres
    const displayCategory = () => {
        //console.log('catégorie');
        if (showCategories == true) {
            setShowCategories(false)
            setShowBooks(true)
        } else {
            setShowCategories(true)
            setShowBooks(false)
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
            </section>

            {
                showBooks && (<Books />)
            }
            {
                showCategories && (<Categories />)
            }

        </main>

    )
}