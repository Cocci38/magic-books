import axios from "axios";
import { useEffect, useState } from "react";

export const Books = () => {

    const [books, setBooks] = useState([]);

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

    return (
        <section>{!books ? '' : books
                    .map((book) => (
                    <div key={book.id} className="bookContainer">
                        {/* <h2><Link to={'/book/' + book.id}>{ book.title }</Link></h2> */}
                        <p className="paragraphFlex"><span className="paragraphName">Auteur</span><span>{ book.author }</span></p>
                        <p className="paragraphFlex"><span className="paragraphName">Date de sortie</span><span> { new Date(book.release_date).toLocaleDateString("fr-FR") }</span> </p>
                        <p className="paragraphFlex"><span className="paragraphName">Catégorie</span><span>{ book.name }</span></p>
                        <p className="paragraphFlex"><span className="paragraphName">Résumé</span><span>{ book.summary.substring(0, 100) }</span></p>
                    </div>
                    
            ))}</section>
    )
}