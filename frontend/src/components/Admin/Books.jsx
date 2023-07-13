import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { adminService } from '../../services/admin.service';

export const Books = () => {

    const [books, setBooks] = useState([]);
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";
    const flag = useRef(false);

    const fetchBooks = async () => {
        await adminService.getAllBooks()
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

    const deleteBook = async (id) => {
        if (window.confirm("Voulez-vous supprimer ce livre ?")) {
            //console.log(id);
            await adminService.deleteBook(id)
                .then((res) => {
                    //console.log(res.data.result);
                    if (res.data.result === "Ok") {
                        fetchBooks();
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
        <section className="list">
            <div className="flexRow barLine">
                <span className="itemFlex" style={{ width: '30%' }}>Titre</span>
                <span className="itemFlex" style={{ width: '18%' }}>Auteur</span>
                <span className="itemFlex divNone" style={{ width: '10%' }}>Date de sortie</span>
                <span className="itemFlex" style={{ width: '13%' }}>Catégorie</span>
                <span className="itemFlex" style={{ width: '12%' }}>Éditeur</span>
                <span className="spanEmpty"></span>
            </div>
            {Array.isArray(books) ? books
                .map((book) => (
                    <div className="flexRow barLine" key={book.id}>
                        <span className="itemFlex" style={{ width: '30%' }}>{book.title}</span>
                        <span className="itemFlex" style={{ width: '18%' }}>{book.author}</span>
                        <span className="itemFlex divNone" style={{ width: '10%' }}> {new Date(book.release_date).toLocaleDateString("fr-FR")}</span>
                        <span className="itemFlex" style={{ width: '13%' }}>{book.name}</span>
                        <span className="itemFlex" style={{ width: '12%' }}>{book.editor}</span>
                        <div className="flexResponsive">
                            <Link to={'/livre/' + book.id} style={{ height: "20px", width: "19px" }} className="iconButton eye" aria-label="voir la fiche du livre"><FontAwesomeIcon icon={faEye} size="lg" /></Link>
                            <Link to={'/admin/livre/editer/' + book.id} style={{ height: "20px", width: "18px" }} className="iconButton pen" aria-label="modifier le livre"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></Link>
                            <button onClick={() => { deleteBook(book.id) }} className="iconButton trash" aria-label="supprimer le livre"><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
                        </div>
                    </div>
                ))
                : <Navigate to={"/"} />}
        </section>
    )
}