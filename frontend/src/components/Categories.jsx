import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Categories = () => {

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        await axios
            .get('http://localhost/magic-books/backend/categories')
            .then((res) => {
                //console.log(res.data)
                setCategories(res.data)
            })
            .catch((err) => {
                console.log(err)

            })
    }
    // Le useEffect se joue lorsque le composant est monté
    useEffect(() => {
        fetchCategories()
    }, []);
    return (
        
        <section>{!categories ? '' : categories
            .map((category) => (
                <div key={category.id} className="categoryContainer">
                    <p className="paragraphFlex"><span className="paragraphName">Nom de la catégorie</span><span>{category.name}</span></p>
                    {/* <Link to={'/category/' + category.id} className="button">Voir le livre</Link> */}
                </div>

            ))}</section>
    )
}
