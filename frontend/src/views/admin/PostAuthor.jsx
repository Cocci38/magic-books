import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostAuthor = () => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handlSubmit = (e) => {
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
            //console.log(nameCategory);
            axios
                .post(
                    'http://localhost/magic-books/backend/create/author', {
                    name: nameAuthor,
                    nationality: nationality,
                    biography: biography
                })
                .then(res => {
                    console.log(res.data);
                    navigate("/dashboard");
                })
                .catch(error => { console.log(error.data) });
        }
        form.reset();
    }
    return (
        <div className="container">
            <form onSubmit={handlSubmit}>
                <h2 className="h2Form"> Ajouter un auteur</h2>
                <label htmlFor="nameAuthor">Nom de l'auteur</label>
                <input type="text" name="nameAuthor" id="nameAuthor" />
                <span style={{ color: "red" }}>{errors.nameAuthor}</span><br></br>
                <label htmlFor="nationality">Nationalité</label>
                <input type="text" name="nationality" id="nationality" />
                <span style={{ color: "red" }}>{errors.nationality}</span><br></br>
                <label htmlFor="biography">Biographie</label>
                <textarea name="biography" id="biography" rows={8} />
                <span style={{ color: "red" }}>{errors.biography}</span><br></br>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}