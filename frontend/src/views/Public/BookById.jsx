import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicService } from '../../services/public.service';

export const BookById = () => {

    const { id } = useParams();
    //console.log(id);
    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            await publicService.getBook(id)
                .then((res) => {
                    setBook(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchBook()
    }, [id])

    //console.log(books);
    return (
        <main>
            <section>
                    <div className="bookContainer">
                        <h2>{ book.title }</h2>
                        <p className="paragraphFlex"><span className="paragraphName">Auteur</span><span>{ book.author }</span></p>
                        <p className="paragraphFlex"><span className="paragraphName">Date de sortie</span><span> { new Date(book.release_date).toLocaleDateString("fr-FR") }</span> </p>
                        <p className="paragraphFlex"><span className="paragraphName">Éditeur</span><span>{ book.editor }</span></p>
                        <p className="paragraphFlex"><span className="paragraphName">Catégorie</span><span>{ book.categories_name }</span></p>
                        <p className="paragraphFlex"><span className="paragraphName">Résumé</span><span>{ book.summary }</span></p>
                    </div>
                </section>
        </main>
    )
}