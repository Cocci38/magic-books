import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { publicService } from '../../services/public.service';

export const AuthorById = () => {

    const { id } = useParams();
    //console.log(id);
    const [author, setAuthor] = useState([]);
    const flag = useRef(false);


    const fetchAuthor = async () => {
        await publicService.getAuthor(id)
            .then((res) => {
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
                    <h2>{author.name}</h2>
                    <p className="paragraphFlex"><span className="paragraphName">Nationalité</span><span>{author.nationality}</span></p>
                    <p className="paragraphFlex"><span className="paragraphName">Biographie</span><span>{author.biography}</span></p>
                </div>
            </section>
        </main>
    )
}