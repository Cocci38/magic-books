import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [showCategory, setShowCategory] = useState(false);

    const nomInput = useRef();

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

    const updateCategory = (idCat) => {
        setShowCategory((showCategory) => !showCategory)
        console.log(idCat);
    }

    const changeHandler = () => {
        console.log('coucou');
        const nameCategory = nomInput.current.value;
        console.log(nameCategory);
        setCategories({
            ...data,
            "name": nameCategory
        })
    }

    const deleteCategory = async (id) => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
            // console.log(id);
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
    }
    return (

        <section className="containerFlex">{!categories ? '' : categories
            .map((category) => (
                <div key={category.id} className="categoryContainer">
                    <p className="paragraphFlex">
                        <span className="paragraphName">Nom de la catégorie</span>
                        {!showCategory && <span>{category.name}</span>}
                        {showCategory && <input type="text" name="nameCategory" defaultValue={category.name} onChange={changeHandler} ref={nomInput}></input>}
                    </p>
                    {/* <Link to={'/category/' + category.id} className="button">Voir le livre</Link> */}
                    <Link to={`/category/${category.id}`} className="buttonAdmin">Modifier</Link>
                    {/* <button onClick={() => { updateCategory(category.id) }}>Modifier</button> */}
                    <button onClick={() => { deleteCategory(category.id) }}>Supprimer</button>
                </div>
            ))
        }
        </section>
    )
}