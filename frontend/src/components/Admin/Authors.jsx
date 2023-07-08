import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { adminService } from '../../services/admin.service';

export const Authors = () => {

    const [authors, setAuthors] = useState([]);
    const flag = useRef(false);

    const fetchAuthors = async () => {
        await adminService.getAllAuthors()
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
        if (flag.current === false) {
            fetchAuthors()
        }
        return () => flag.current = true
    }, []);

    const deleteAuthor = async (id) => {
        if (window.confirm("Voulez-vous supprimer cet auteur ?")) {
            // console.log(id);
            await adminService.deleteAuthor(id)
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
        <section className="list">
            <div className="flexRow barLine">
                <span className="itemFlex" style={{ width: '30%' }}>Nom</span>
                <span className="itemFlex" style={{ width: '20%' }}>Nationalité</span>
                <span className="itemFlex" style={{ width: '35%' }}>Biographie</span>
                <span className="spanEmpty"></span>
            </div>
            {Array.isArray(authors) ? authors
                .map((author) => (
                    <div key={author.id} className="flexRow barLine">
                        <span className="itemFlex" style={{ width: '30%' }}>{author.name}</span>
                        <span className="itemFlex" style={{ width: '20%' }}>{author.nationality}</span>
                        <span className="itemFlex" style={{ width: '35%' }}> {author.biography.substring(0, 70) + " ..."}</span>
                        <div className="flexResponsive">
                            <Link to={'/auteur/' + author.id} style={{ height: "20px", width: "19px" }} className="iconButton eye" aria-label="fiche auteur"><FontAwesomeIcon icon={faEye} size="lg" /></Link>
                            <Link to={'/admin/auteur/editer/' + author.id} style={{ height: "20px", width: "18px" }} className="iconButton pen" aria-label="modifier l'auteur"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></Link>
                            <button onClick={() => { deleteAuthor(author.id) }} className="iconButton trash" aria-label="supprimer l'auteur"><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
                        </div>
                    </div>

                ))
                : <Navigate to={"/"} />}
        </section>
    )

}