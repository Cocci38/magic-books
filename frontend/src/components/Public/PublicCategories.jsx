import { useEffect, useRef, useState } from "react";
import { adminService } from '../../services/admin.service';
import { Link } from "react-router-dom";

export const PublicCategories = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";
    const flag = useRef(false);

    const fetchCategories = async () => {
        await adminService.getAllCategories()
            .then((res) => {
                console.log(res.data)
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
        console.log(categories);
        await adminService.getAllBooks()
            .then((res) => {
                if (res.data.result !== "ERROR") {
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
            <div className="gridTwoColumn">
                {Array.isArray(categories) ? categories
                    .filter((categoryName) =>
                        categoryName.name === "Fantasy" ||
                        categoryName.name === "Polar" ||
                        categoryName.name === "Romance"
                    )
                    .map((category) => (
                        <Link to={'categorie/' + category.id} >{category.name}
                            <div key={category.id} className="flexRow divMargin">
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
                        </Link>
                    ))
                    : ""}
            </div>
        </section>
    )
}
