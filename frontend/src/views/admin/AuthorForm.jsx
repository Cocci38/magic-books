import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from '../../services/admin.service';
import { publicService } from '../../services/public.service';

export const AuthorForm = () => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { id } = useParams();
    //console.log(id);
    const [author, setAuthor] = useState([]);

    if (id !== undefined) {
        useEffect(() => {
            const fetchAuthor = async () => {
                await publicService.getAuthor(id)
                    .then((res) => {
                        setAuthor(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            fetchAuthor()
        }, [id])
    }
    //console.log(author);
    const handlSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        const nameAuthor = formData.get("nameAuthor");
        const nationality = formData.get("nationality");
        const biography = formData.get("biography");
        const validateData = () => {
            let errors = {};
            if (!nameAuthor) {
                errors.nameAuthor = "Le nom est requis";
            }
            if (!nationality) {
                errors.nationality = "La nationalité est requise";
            }
            if (!biography) {
                errors.biography = "La biographie est requise";
            }
            return errors;
        };
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
        } else {
            if (id === undefined) {
                //console.log(nameCategory);
                await adminService.postAuthor(nameAuthor, nationality, biography)
                    .then(res => {
                        console.log(res.data);
                        navigate("/admin");
                    })
                    .catch(error => { console.log(error.data) });
            } else {
                await adminService.updateAuthor(id, nameAuthor, nationality, biography)
                    .then(res => {
                        console.log(res.data);
                        navigate("/admin");
                    })
                    .catch(error => { console.log(error.data) });
            }
        }
        form.reset();
    }
    return (
        <div className="container">
            <form onSubmit={handlSubmit}>
                {!id ? <h2 className="h2Form"> Ajouter un auteur</h2> : <h2 className="h2Form"> Modifier un auteur</h2>}

                <label htmlFor="nameAuthor">Nom de l'auteur</label>
                {!id ? <input type="text" name="nameAuthor" id="nameAuthor" /> : <input type="text" name="nameAuthor" id="nameAuthor" defaultValue={author.name} />}
                <span style={{ color: "red" }}>{errors.nameAuthor}</span><br></br>
                <label htmlFor="nationality">Nationalité</label>
                {!id ? <input type="text" name="nationality" id="nationality" /> : <input type="text" name="nationality" id="nationality" defaultValue={author.nationality} />}
                <span style={{ color: "red" }}>{errors.nationality}</span><br></br>
                <label htmlFor="biography">Biographie</label>
                {!id ? <textarea name="biography" id="biography" rows={8} /> : <textarea name="biography" id="biography" rows={8} defaultValue={author.biography} />}

                <span style={{ color: "red" }}>{errors.biography}</span><br></br>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}