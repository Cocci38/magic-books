import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    useEffect(() =>{
        fetchBooks()
    },[]);

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
        <section>{!books ? '' : books
                    .map((book) => (
                    <div key={book.id} className="bookContainer">
                        <h3>{ book.title }</h3>
                        <div className="infoContainer">
                            <p className="paragraphFlex"><span className="paragraphName">Auteur</span><span>{ book.author }</span></p>
                            <p className="paragraphFlex"><span className="paragraphName">Date de sortie</span><span> { new Date(book.release_date).toLocaleDateString("fr-FR") }</span> </p>
                            <p className="paragraphFlex"><span className="paragraphName">Catégorie</span><span>{ book.name }</span></p>
                            {/* <img src="{book.cover}" /> */}
                            {book.cover ? <img src={urlImage + book.cover}/> : ""}
                        </div>
                        <p className="paragraphFlex"><span className="paragraphName">Résumé</span><span>{ book.summary.substring(0, 70) + " ..." }</span></p>
                        <Link to={'/book/' + book.id} className="button">Voir le livre</Link>
                        <Link to={'/book/update/' + book.id} className="buttonAdmin">Modifier</Link>
                        <button onClick={() => { deleteBook(book.id) }}>Supprimer</button>
                    </div>
                    
            ))}
        </section>
    )
}