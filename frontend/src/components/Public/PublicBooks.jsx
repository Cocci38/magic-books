import { useEffect, useRef, useState } from "react";
import { publicService } from "../../services/public.service";

export const PublicBooks = () => {

    const [books, setBooks] = useState([]);
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";
    const flag = useRef(false);

    const fetchBooks = async () => {
        await publicService.getBooksOrderByDate()
            .then((res) => {
                console.log(res.data)
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
            <h2>Livres mis en avant</h2>
            <div className="flexRowWrap">

                {Array.isArray(books) ? books
                    .map((book) => (
                        <div key={book.id} className="categoryIdContainer divMargin">
                            <div className="coverContainer divMargin">
                                {book.cover ? <img src={urlImage + book.cover} className="cover" alt={"couverture du livre " + book.title} /> : <img src='/images/image_vide.png' className="cover" alt="ce livre n'a pas de couverture" />}
                            </div>
                            <div className="divMargin">{book.summary.substring(0, 100) + " ..."}</div>
                        </div>
                    ))
                    : ""}
            </div>
        </section>
    )
}