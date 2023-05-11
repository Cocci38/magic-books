import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Books } from '../../components/Books';
import { Categories } from '../../components/Categories';

export const Dashboard = () => {

    const [show, setShow] = useState(true);
    const [showCategories, setShowCategories] = useState(false);

    const displayBook = () => {
        //console.log('livres');
        if (show == true) {
            setShow(false)
            setShowCategories(true)
        } else {
            setShow(true)
            setShowCategories(false)
        }
    }
    const displayCategory = () => {
        //console.log('catégorie');
        if (showCategories == true) {
            setShowCategories(false)
            setShow(true)
        } else {
            setShowCategories(true)
            setShow(false)
        }
    }

    return (
        <main>
            <Link to={'/category'} className="button">Ajouter une catégorie</Link>
            <button onClick={displayBook}>Afficher les livres</button>
            <button onClick={displayCategory}>Afficher les catégories</button>
            {
                show && (<Books />)
            }
            {
                showCategories && (<Categories />)
            }
            
        </main>
        
    )
}