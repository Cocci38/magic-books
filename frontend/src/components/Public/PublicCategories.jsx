import { useEffect, useRef, useState } from "react";
import { adminService } from '../../services/admin.service';
import { Link } from "react-router-dom";
import { publicService } from "../../services/public.service";

export const PublicCategories = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const urlImage = import.meta.env.VITE_BASE_URL_IMAGE;
    const flag = useRef(false);

    const fetchCategoriesCover = async () => {
        await publicService.getBooksByCategory()
            .then((res) => {
                if (res.data.category) {
                    setCategories(res.data.category)
                } 
                if (res.data.book){
                        setBooks(res.data.book)
                }
            })
    }
    useEffect(() => {
        // Fonction de nettoyage pour ne faire qu'une seule fois l'appel vers l'api
        if (flag.current === false) {
            fetchCategoriesCover()
        }
        return () => flag.current = true
    }, []);

    return (

        <section className="centerContainer divMargin">
            <h2 style={{textAlign: "center"}}>Toutes les catégories</h2>
            <div className="blocCategory flexRowWrap divMarginLeft">
                {Array.isArray(categories) ? categories
                    .filter((categoryName) =>
                        categoryName.name === "Fantasy" ||
                        categoryName.name === "Polar" ||
                        categoryName.name === "Romance" ||
                        categoryName.name === "Manga"
                    )
                    .map((category) => (
                        <Link to={'categorie/' + category.id} >{category.name}
                            <div key={category.id} className="flexRow containerCategory divMargin">
                                {Array.isArray(books) ? books.map((book) => (
                                    <div>
                                        {category.name == book.category ?
                                            <div key={book.book_id} >
                                                {book.cover !== "" ?
                                                    <div className="coverCategory divLittleMargin">
                                                        <img src={urlImage + book.cover} className="coverMini" alt={"couverture du livre " + book.title} />
                                                    </div>
                                                    : <div style={{ display: "none" }}></div>}
                                            </div>
                                            : ""}
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
