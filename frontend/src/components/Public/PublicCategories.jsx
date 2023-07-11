import { useEffect, useRef, useState } from "react";
import { adminService } from '../../services/admin.service';
import { Link } from "react-router-dom";
import { publicService } from "../../services/public.service";

export const PublicCategories = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";
    const flag = useRef(false);

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

    const fetchBooks = async () => {
        await publicService.getBooksOrderByDate()
            .then((res) => {
                console.log(res.data)
                if (res.data.result !== "ERROR") {
                    console.log(res.data.cover);
                    setBooks(res.data)
                }

            })
            .catch((err) => {
                console.log(err)

            })
    }
    // Le useEffect se joue lorsque le composant est monté
    useEffect(() => {
        // Fonction de nettoyage pour ne faire qu'une seule fois l'appel vers l'api
        if (flag.current === false) {
            fetchBooks()
        }
        return () => flag.current = true
    }, []);

    return (

        <section className="centerContainer divMargin">
            <h2>Toutes les catégories</h2>
            {Array.isArray(categories) ? categories
                .filter((categoryName) =>
                    categoryName.name === "Fantasy" ||
                    categoryName.name === "Polar" ||
                    categoryName.name === "Romance"
                )
                .map((category) => (
                    <div key={category.id} className="flexColumn">
                        <Link to={'categorie/' + category.id} >{category.name}</Link>
                        <div className="flexRow">
                            {Array.isArray(books) ? books.map((book) => (
                                <div>
                                    {category.name == book.name ?
                                        <div key={book.id} >
                                            {book.cover !== "" ?
                                                <div className="coverContainerMini">
                                                    <img src={urlImage + book.cover} className="coverMini" alt={"couverture du livre " + book.title} />
                                                </div>
                                                : ""}
                                        </div>
                                        : <div style={{ display: "none" }}></div>}
                                </div>
                            ))
                                : ""
                            }
                        </div>
                    </div>
                ))
                : ""}
        </section>
    )
}
