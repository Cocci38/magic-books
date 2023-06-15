import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
//import { faEye } from '@fortawesome/free-solid-svg-icons';
import { adminService } from '../../services/admin.service';

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const flag = useRef(false);

    const nomInput = useRef();

    const fetchCategories = async () => {
        await adminService.getAllCategories()
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
        if (flag.current === false) {
        fetchCategories()
    }
    return () => flag.current = true
    }, []);

    // const updateCategory = (idCat) => {
    //     setShowCategory((showCategory) => !showCategory)
    //     console.log(idCat);
    // }

    // const changeHandler = () => {
    //     console.log('coucou');
    //     const nameCategory = nomInput.current.value;
    //     console.log(nameCategory);
    //     setCategories({
    //         ...data,
    //         "name": nameCategory
    //     })
    // }

    const deleteCategory = async (id) => {
        if (window.confirm("Voulez-vous supprimer cette catégorie ?")) {
            // console.log(id);
            await adminService.deleteCategory(id)
                .then((res) => {
                    console.log(res.data.result);
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

        <section className="sectionRow">{Array.isArray(categories) ? categories
            .map((category) => (
                <div key={category.id} className="categoryContainer">
                    <span className="paragraphName">Nom de la catégorie</span>
                    {!showCategory && <span>{category.name}</span>}
                    {showCategory && <input type="text" name="nameCategory" defaultValue={category.name} onChange={changeHandler} ref={nomInput}></input>}
                    <div className="buttonContainer">
                        {/* <Link to={'/category/' + category.id} className="iconButton eye" aria-label="voir la fiche catégorie"><FontAwesomeIcon icon={faEye} size="lg" /></Link> */}
                        <Link to={`/admin/categorie/editer/${category.id}`} className="iconButton pen" aria-label="modifier la catégorie"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></Link>
                        <button onClick={() => { deleteCategory(category.id) }} className="iconButton trash" aria-label="supprimer la catégorie"><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
                    </div>
                </div>
            ))
            : <Navigate to={"/"} />}
        </section>
    )
}