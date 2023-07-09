import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { accountService } from "../../services/account.service";
import { readerService } from "../../services/reader.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";


export const ReaderLibrary = () => {

    const [libraries, setLibrary] = useState([]);
    const flag = useRef(false);

    const readerId = accountService.getReaderId();
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";

    const fetchLibrary = async () => {
        await readerService.getLibrary(readerId)
            .then((res) => {
                //console.log(res);
                setLibrary(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        if (flag.current === false) {
            fetchLibrary()
        }
        return () => flag.current = true
    }, [readerId]);

    const deleteLibrary = async (id) => {
        if (window.confirm("Voulez-vous supprimer ce livre de votre bibliothèque ?")) {
            //console.log(id);
            await readerService.deleteBookLibrary(id)
                .then((res) => {
                    console.log(res.data.result);
                    if (res.data.result === "Ok") {
                        fetchLibrary();
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
        <section className="flexColumn ">
            <h2 className="divMargin">Ma bibliothèque</h2>
            <div className="sectionRowWrap libraryContainer">
            {Array.isArray(libraries) ? libraries
            .map((library) => (
                <div key={library.libraryId} className="flexRow libraryBook">
                    <div className="coverContainerMini">
                        {library.cover ? <img src={urlImage + library.cover} className="coverMini" alt={"couverture du livre " + library.title} /> : <img src='/images/image_vide.png' className="coverMini" alt="ce livre n'a pas de couverture" />}
                    </div>
                    <div className="readerBook">
                        <h3>{library.title}</h3>
                        <div><span>{library.author}</span></div>
                        <div><span> {new Date(library.release_date).toLocaleDateString("fr-FR")}</span> </div>
                        <div className="buttonContainer">
                            <Link to={'/livre/' + library.bookId} className="iconButton eye" aria-label="voir la fiche du livre"><FontAwesomeIcon icon={faEye} size="lg" /></Link>
                            <button onClick={() => { deleteLibrary(library.libraryId) }} className="iconButton trash" aria-label="supprimer le livre"><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
                        </div>
                    </div>
                </div>
            ))
            : ""}
            </div>

        </section>
    )
}
