import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PostBook = () => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
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

    const fetchCategories = async () => {
        await axios
            .get('http://localhost/magic-books/backend/categories')
            .then((res) => {
                //console.log(res.data)
                setCategories(res.data)
            })
            .catch((err) => {
                console.log(err)

            })
    }
    // Le useEffect se joue lorsque le composant est monté
    useEffect(() => {
        fetchCategories()
    }, []);

    const handlSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        //console.log(e.target);
        const formData = new FormData(form);
        
        const title = formData.get("title");
        const authorId = formData.get("authorId");
        const editor = formData.get("editor");
        const releaseDate = formData.get("releaseDate");
        //const cover = formData.get("cover");
        //console.log([...formData]);
        const categoryId = formData.get("categoryId");
        const summary = formData.get("summary");
        // formData.append(title, title)
        // const validateData = () => {
        //     let errors = {};
        //     if (!title) {
        //         errors.title = "Le titre est requis";
        //     }
        //     if (!editor) {
        //         errors.editor = "L'éditeur est requis";
        //     }
        //     if (!releaseDate) {
        //         errors.releaseDate = "La date est requise";
        //     }
        //     return errors;
        // };
        //const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
        }else {
        axios
                // .post(
                //     'http://localhost/magic-books/backend/create/book', {
                //     title: title,
                //     author_id: authorId,
                //     editor: editor,
                //     summary: summary,
                //     release_date: releaseDate,
                //     category_id: categoryId,
                //     headers: {
                //         "Content-Type": "multipart/form-data"
                //     }
                // })
                .post(
                    'http://localhost/magic-books/backend/create/book', formData, {
                            title: title,
                            author_id: authorId,
                            editor: editor,
                            summary: summary,
                            release_date: releaseDate,
                            category_id: categoryId,
                        })
                .then(res => {
                    console.log(res.data);
                    //navigate("/dashboard");
                })
                .catch(error => { console.log(error.data) });
        }
        //form.reset();
    }

    return (
        <div className="container">
            <form onSubmit={handlSubmit} enctype="multipart/form-data">
                <h2 className="h2Form"> Ajouter un livre</h2>
                <label htmlFor="title">Titre</label>
                <input type="text" name="title" id="title" />
                <span style={{ color: "red" }}>{errors.title}</span><br></br>

                <label htmlFor="authorId">Auteur
                    <select name="authorId" >
                    {!authors ? '' : authors
                    .map((author) => (
                                <option key={author.id} value={author.id}>{author.name} </option>
                            ))
                        }
                    </select>
                </label>
                <span style={{ color: "red" }}>{errors.authorId}</span><br></br>

                <label htmlFor="editor">Éditeur</label>
                <input type="text" name="editor" id="editor" />
                <span style={{ color: "red" }}>{errors.editor}</span><br></br>

                <label htmlFor="releaseDate">Date de sortie</label>
                <input type="date" name="releaseDate" id="releaseDate" />
                <span style={{ color: "red" }}>{errors.releaseDate}</span><br></br>

                <label htmlFor="image">Couverture</label>
                <input type="file" name="image" id="image" />

                <label htmlFor="categoryId">Catégorie
                    <select name="categoryId" >
                        {!categories ? '' : categories
                            .map((category) => (
                                <option key={category.id} value={category.id}>{category.name} </option>
                            ))
                        }
                    </select>
                </label>
                <span style={{ color: "red" }}>{errors.categoryId}</span><br></br>

                <label htmlFor="summary">Résumé</label>
                <textarea name="summary" id="summary" rows={8} />
                <span style={{ color: "red" }}>{errors.summary}</span><br></br>

                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}