import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { publicService } from '../../services/public.service';

export const AuthorById = () => {

    const { id } = useParams();
    //console.log(id);
    const [author, setAuthor] = useState([]);
    const [books, setBooks] = useState([]);
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";
    const flag = useRef(false);


    const fetchAuthor = async () => {
        await publicService.getAuthor(id)
            .then((res) => {
                // console.log(res.data);
                setAuthor(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (flag.current === false) {
            fetchAuthor()
        }
        return () => flag.current = true
    }, [id])

    const fetchBook = async () => {
        await publicService.getBooksByAuthor(id)
            .then((res) => {
                setBooks(res.data)
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

    return (
        <main>
            <section>
                <div className="bookContainer">
                <h2>{author.name}</h2>
                    <p className="paragraphFlex"><span className="paragraphName">Nationalité</span><span>{author.nationality}</span></p>
                    <p className="paragraphFlex"><span className="paragraphName">Biographie</span><span>{author.biography}</span></p>

                    <h2>Tous les livres de {author.name}</h2>
                {Array.isArray(books) ? books.map((book) => (
                    <div key={book.book_id}>
                    <div className="coverContainer divLittleMargin">
                                    {book.cover ? <img src={urlImage + book.cover} className="cover" alt={"couverture du livre " + book.title} /> : <img src='/images/image_vide.png' className="cover" alt="ce livre n'a pas de couverture" />}
                                </div>
                    <span>{book.title}</span>
                    </div>
                    ))
                    : ""}
                </div>
            </section>
        </main>
    )
}