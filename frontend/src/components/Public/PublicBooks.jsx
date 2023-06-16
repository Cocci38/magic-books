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
        <section className="sectionRow">{Array.isArray(books) ? books 
            .map((book) => (
                <div key={book.id} className="bookContainer">
                    <div className="coverContainer">
                        {book.cover ? <img src={urlImage + book.cover} className="cover" alt={"couverture du livre " + book.title} /> : <img src='/images/image_vide.png' className="cover" alt="ce livre n'a pas de couverture" />}
                    </div>
                    <div className="bookInfo">
                        <h3>{book.title}</h3>
                        <div className="infoContainer">
                            <p className="paragraphFlex"><span className="paragraphName">Auteur</span><span>{book.author}</span></p>
                            <p className="paragraphFlex"><span className="paragraphName">Date de sortie</span><span> {new Date(book.release_date).toLocaleDateString("fr-FR")}</span> </p>
                            <p className="paragraphFlex"><span className="paragraphName">Catégorie</span><span>{book.name}</span></p>
                            <p className="paragraphFlex"><span className="paragraphName">Éditeur</span><span>{book.editor}</span></p>
                        </div>
                        <p className="paragraphFlex"><span className="paragraphName">Résumé</span><span>{book.summary.substring(0, 70) + " ..."}</span></p>
                    </div>
                </div>
            ))
            : "" }
        </section>
    )
}