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
    useEffect(() => {
        fetchAuthors()
    }, []);

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
        <section className="sectionRow">{!authors ? '' : authors
            .map((author) => (
                <div key={author.id} className="authorContainer">
                    <h3>{author.name}</h3>
                    <div className="infoAuthor">
                        <div className="authorItem">
                            <span>Nationalité</span>
                            <span>{author.nationality}</span>
                        </div>
                        <div className="authorItem">
                            <span>Bibiographie</span>
                            <span>{author.biography.substring(0, 70) + " ..."}</span>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Link to={'/auteur/' + author.id} className="iconButton eye" aria-label="fiche auteur"><FontAwesomeIcon icon={faEye} size="lg" /></Link>
                        <Link to={'/admin/auteur/editer/' + author.id} className="iconButton pen" aria-label="modifier l'auteur"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></Link>
                        <button onClick={() => { deleteAuthor(author.id) }} className="iconButton trash" aria-label="supprimer l'auteur"><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
                    </div>
                </div>

            ))}
        </section>
    )

}