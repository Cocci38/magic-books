import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
            <section className="centerContainer flexColumn divMargin">
                    <h2>{author.name}</h2>
                    <h3 className="divMarginTop">Nationalité</h3>
                    <span>{author.nationality}</span>
                    <h3 className="divMarginTop">Biographie</h3>
                    <span>{author.biography}</span>
                    <h2 className="divMarginTop" style={{marginTop: "40px"}}>Tous les livres de {author.name}</h2>
                    <div className="flexRowWrap textAlign">
                        {Array.isArray(books) ? books.map((book) => (
                            <Link to={"/livre/" + book.book_id} key={book.book_id} className="categoryIdContainer divMargin">
                                <div className="coverContainer divLittleMargin">
                                    {book.cover ? <img src={urlImage + book.cover} className="cover" alt={"couverture du livre " + book.title} /> : <img src='/images/image_vide.png' className="cover" alt="ce livre n'a pas de couverture" />}
                                </div>
                                <span>{book.title}</span>
                            </Link>
                        ))
                            : ""}
                    </div>
            </section>
        </main>
    )
}