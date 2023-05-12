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

    const deleteCategory = async (id) => {

        //console.log(id);
        await axios
            .delete('http://localhost/magic-books/backend/delete/category/' + id, {
            data: id,
            })
            .then((res) => {
                //console.log(res.data.result);
                if (res.data.result === "Ok") {
                    fetchCategories();
                } else {
                    console.log('erreur');
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (

        <section className="containerFlex">{!categories ? '' : categories
            .map((category) => (
                <div key={category.id} className="categoryContainer">
                    <p className="paragraphFlex"><span className="paragraphName">Nom de la catégorie</span><span>{category.name}</span></p>
                    {/* <Link to={'/category/' + category.id} className="button">Voir le livre</Link> */}
                    <button onClick={() => {
                        if (window.confirm("Voulez-vous supprimer cet article ?")) {
                            deleteCategory(category.id);
                        }
                    }}>Supprimer</button>
                </div>

            ))
        }
        </section >
    )
}
