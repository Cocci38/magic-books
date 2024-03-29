import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicService } from '../../services/public.service';
import { accountService } from "../../services/account.service";
import { readerService } from "../../services/reader.service";

export const BookById = () => {

    const { id } = useParams();
    const readerId = accountService.getReaderId();
    const urlImage = import.meta.env.VITE_BASE_URL_IMAGE;
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

    let isLogin = false;
    let isAdmin = accountService.isAdmin();
    let isReader = accountService.isReader();
    let isLogged = accountService.isLogged();

    if (isLogged) {
        if (isAdmin) {
            isLogin = true;
        } else if (isReader) {
            isLogin = true;
        } else {
            isLogin = false;
        }
    }
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
                                <h3>Auteur</h3>
                                <Link to={"/auteur/" + book.author_id} className="aHover">
                                    {book.author}
                                </Link>
                            </div>
                            <div className="flexColumn divMargin">
                                <h3>Date de sortie</h3>
                                <span> {new Date(book.release_date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
                            </div>
                            <div className="flexColumn divMargin">
                                <h3>Éditeur</h3>
                                <span>{book.editor}</span>
                            </div>
                            <div className="flexColumn divMargin">
                                <h3>Catégorie</h3>
                                <Link to={"/categorie/" + book.category_id} className="aHover">
                                    {book.categories_name}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flexColumn divMargin">
                        <h3>Résumé</h3>
                        <p>{book.summary}</p>
                    </div>
                    {accountService.isLogged() ?
                        <div className="buttonContainerLibrary">
                            <button className="button" onClick={addLibrary}>Ajouter à la bibliothèque</button>
                        </div>
                        :
                        ""}
                </div>

            </section>
        </main>
    )
}