import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostCategory = () => {
    const url = window.location.pathname.slice(10);

    //const [showBooks, setShowBooks] = useState(true);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handlSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        // const elements = form.elements;
        // const nameCategory = elements.nameCategory.value;
        const formData = new FormData(form);
        const nameCategory = formData.get("nameCategory");
        const validateData = () => {
            let errors = {};
            if (!nameCategory) {
                errors.nameCategory = "La catégorie est requise";
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
                    'http://localhost/magic-books/backend/create/category', {
                    name: nameCategory,
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
                <h2 className="h2Form"> Ajouter une catégorie</h2>
                <label htmlFor="nameCategory">Nom de la catégorie</label>
                <input type="text" name="nameCategory" id="nameCategory" />
                <span style={{ color: "red" }}>{errors.nameCategory}</span>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}