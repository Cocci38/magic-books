import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const PostCategory = () => {

    //const [showBooks, setShowBooks] = useState(true);
    const id = useParams().id;
    //console.log(id);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [category, setCategory] = useState({name:''});

    if (id !== undefined) {
        useEffect(() => {
            const fetchCategory = async () => {
                await axios
                    .get('http://localhost/magic-books/backend/category/' +id)
                    .then((res) => {
                        setCategory(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            fetchCategory()
        }, [id]);
        //console.log(category.name);
    }
    

    
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
            if (id === undefined) {
                //console.log('je passe ici');
                axios
                .post(
                    'http://localhost/magic-books/backend/create/category', {
                    name: nameCategory,
                })
                .then(res => {
                    console.log(res.data);
                    //navigate("/dashboard");
                })
                .catch(error => { console.log(error.data) });
            } else {
                axios
                .put(
                    'http://localhost/magic-books/backend/update/category/'+id, {
                    id: id,
                    name: nameCategory,
                })
                .then(res => {
                    console.log(res.data);
                    //navigate("/dashboard");
                })
                .catch(error => { console.log(error.data) });
            }
            
        }
        //form.reset();
    }

    return (
        <div className="container">
            <form onSubmit={handlSubmit}>
                {!id ? <h2 className="h2Form"> Ajouter une catégorie</h2> : <h2 className="h2Form"> Modifier une catégorie</h2>}
                <label htmlFor="nameCategory">Nom de la catégorie</label>
                {!id ? <input type="text" name="nameCategory" id="nameCategory" /> : <input type="text" name="nameCategory" id="nameCategory" defaultValue={category.name} />}
                <span style={{ color: "red" }}>{errors.nameCategory}</span>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}