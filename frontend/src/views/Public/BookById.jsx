import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicService } from '../../services/public.service';
import { accountService } from "../../services/account.service";
import { readerService } from "../../services/reader.service";

export const BookById = () => {

    const { id } = useParams();
    const readerId = accountService.getReaderId();
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";
    // console.log(id);
    // console.log(readerId);
    const [book, setBook] = useState([]);
    const flag = useRef(false);
    const navigate = useNavigate();


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
                if (res.data.result === "Ok") {
                    navigate("/mon-compte")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //console.log(books);
    return (
        <main>
            <section className="flexColumn flexAttribute">
                <div className="bookIdContainer">
                    <h2>{book.title}</h2>
                    <div className="flexRow responsiveFlexColumn">
                        <div className="coverContainer divMargin">
                            {book.cover ? <img src={urlImage + book.cover} className="cover" alt={"couverture du livre " + book.title} /> : <img src='/images/image_vide.png' className="cover" alt="ce livre n'a pas d'image de couverture" />}
                        </div>
                        <div className="flexColumn">
                            <div className="flexColumn divMargin">
                                <h3 className="paragraphName">Auteur</h3>
                                <span>{book.author}</span>
                            </div>
                            <div className="flexColumn divMargin">
                                <h3 className="paragraphName">Date de sortie</h3>
                                <span> {new Date(book.release_date).toLocaleDateString("fr-FR")}</span>
                            </div>
                            <div className="flexColumn divMargin">
                                <h3 className="paragraphName">Éditeur</h3>
                                <span>{book.editor}</span>
                            </div>
                            <div className="flexColumn divMargin">
                                <h3 className="paragraphName">Catégorie</h3>
                                <span>{book.categories_name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flexColumn divMargin">
                        <h3 className="paragraphName">Résumé</h3>
                        <p>{book.summary}</p>
                    </div>
                    <div className="buttonContainerLibrary">
                        <button className="button" onClick={addLibrary}>Ajouter à la bibliothèque</button>
                    </div>
                </div>

            </section>
        </main>
    )
}