import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const Books = () => {

    const [books, setBooks] = useState([]);
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";
    const fetchBooks = async () => {
        await axios
            .get('http://localhost/magic-books/backend/books')
            .then((res) => {
                //console.log(res.data)
                setBooks(res.data)
            })
            .catch((err) => {
                console.log(err)

            })
    }
    // Le useEffect se joue lorsque le composant est monté
    useEffect(() => {
        fetchBooks()
    }, []);

    const deleteBook = async (id) => {
        if (window.confirm("Voulez-vous supprimer ce livre ?")) {
            console.log(id);
            await axios
                .delete('http://localhost/magic-books/backend/delete/book/' + id, {
                    data: id,
                })
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
        <section className="sectionBook">{!books ? '' : books
            .map((book) => (
                <div key={book.id} className="bookContainer">
                    <div className="coverContainer">
                        {book.cover ? <img src={urlImage + book.cover} className="cover" /> : ""}
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
                        <div className="buttonContainer">
                            <Link to={'/book/' + book.id} className="iconButton eye"><FontAwesomeIcon icon={faEye} size="lg" /></Link>
                            <Link to={'/book/update/' + book.id} className="iconButton pen"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></Link>
                            <button onClick={() => { deleteBook(book.id) }} className="iconButton trash"><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}