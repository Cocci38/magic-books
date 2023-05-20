import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const Authors = () => {

    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        await axios
            .get('http://localhost/magic-books/backend/authors')
            .then((res) => {
                //console.log(res.data)
                setAuthors(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // Le useEffect se joue lorsque le composant est monté
    useEffect(() =>{
        fetchAuthors()
    },[]);

    const deleteAuthor = async (id) => {
        if (window.confirm("Voulez-vous supprimer cet auteur ?")) {
            // console.log(id);
            await axios
                .delete('http://localhost/magic-books/backend/delete/author/' + id, {
                    data: id,
                })
                .then((res) => {
                    //console.log(res.data.result);
                    if (res.data.result === "Ok") {
                        fetchAuthors();
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
        <section>{!authors ? '' : authors
                    .map((author) => (
                    <div key={author.id} className="bookContainer">
                        <h3>{ author.name }</h3>
                        <div className="infoContainer">
                            <p className="paragraphFlex">
                                <span className="paragraphName">Nationalité</span>
                                <span>{ author.nationality }</span>
                            </p>
                            <p className="paragraphFlex">
                                <span className="paragraphName">Bibiographie</span>
                                <span>{ author.biography.substring(0, 70) + " ..." }</span>
                            </p>
                        </div>
                        
                        <Link to={'/author/' + author.id} className="iconButton eye"><FontAwesomeIcon icon={faEye} size="lg" /></Link>
                        <Link to={'/author/update/' + author.id} className="iconButton pen"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></Link>
                        <button onClick={() => { deleteAuthor(author.id) }} className="iconButton trash"><FontAwesomeIcon icon={faTrashCan} size="xl"/></button>
                    </div>
                    
            ))}
        </section>
    )

}