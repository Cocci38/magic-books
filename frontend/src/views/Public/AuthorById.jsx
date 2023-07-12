import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { publicService } from '../../services/public.service';

export const AuthorById = () => {

    const { id } = useParams();
    //console.log(id);
    const [authors, setAuthor] = useState([]);
    const flag = useRef(false);


    const fetchAuthor = async () => {
        await publicService.getAuthor(id)
            .then((res) => {
                console.log(res.data);
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

    //console.log(authors);
    return (
        <main>
            <section>
                <div className="bookContainer">
                <h2>{authors.name}</h2>
                    <p className="paragraphFlex"><span className="paragraphName">Nationalité</span><span>{authors.nationality}</span></p>
                    <p className="paragraphFlex"><span className="paragraphName">Biographie</span><span>{authors.biography}</span></p>
                {Array.isArray(authors) ? authors.map((author) => (
                    <div>
                    <h2>{author.name}</h2>
                    <p className="paragraphFlex"><span className="paragraphName">Nationalité</span><span>{author.nationality}</span></p>
                    <p className="paragraphFlex"><span className="paragraphName">Biographie</span><span>{author.biography}</span></p>
                    </div>
                    ))
                    : ""}
                </div>
            </section>
        </main>
    )
}