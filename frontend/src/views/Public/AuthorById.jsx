import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AuthorById = () => {

    const { id } = useParams();
    //console.log(id);
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        const fetchAuthor = async () => {
            await axios
                .get('http://localhost/magic-books/backend/author/' + id)
                .then((res) => {
                    setAuthor(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchAuthor()
    }, [id])

    //console.log(authors);
    return (
        <main>
            <section>
                    <div className="bookContainer">
                        <h2>{ author.name }</h2>
                        <p className="paragraphFlex"><span className="paragraphName">Nationalité</span><span>{ author.nationality }</span></p>
                        <p className="paragraphFlex"><span className="paragraphName">Biographie</span><span>{ author.biography }</span></p>
                    </div>
                </section>
        </main>
    )
}