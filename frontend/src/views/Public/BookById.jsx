import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { publicService } from '../../services/public.service';
import { accountService } from "../../services/account.service";
import { readerService } from "../../services/reader.service";

export const BookById = () => {

    const { id } = useParams();
    const readerId = accountService.getReaderId();
    // console.log(id);
    // console.log(readerId);
    const [book, setBook] = useState([]);
    const flag = useRef(false);


    const fetchBook = async () => {
        await publicService.getBook(id)
            .then((res) => {
                setBook(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (flag.current === false) {
            fetchBook()
        }
        return () => flag.current = true
    }, [id])

    const addLibrary = async () => {
        // console.log(id);
        // console.log(readerId);
        await readerService.postBookLibrary(readerId, id)
            .then((res) => {
                console.log("Livre ajouté à la bibliothèque")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //console.log(books);
    return (
        <main>
            <section>
                <div className="bookContainer">
                    <h2>{book.title}</h2>
                    <p className="paragraphFlex"><span className="paragraphName">Auteur</span><span>{book.author}</span></p>
                    <p className="paragraphFlex"><span className="paragraphName">Date de sortie</span><span> {new Date(book.release_date).toLocaleDateString("fr-FR")}</span> </p>
                    <p className="paragraphFlex"><span className="paragraphName">Éditeur</span><span>{book.editor}</span></p>
                    <p className="paragraphFlex"><span className="paragraphName">Catégorie</span><span>{book.categories_name}</span></p>
                    <p className="paragraphFlex"><span className="paragraphName">Résumé</span><span>{book.summary}</span></p>
                </div>
                <button className="button" onClick={addLibrary}>Ajouter à la bibliothèque</button>
            </section>
        </main>
    )
}