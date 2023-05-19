import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const PostBook = () => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { id } = useParams();
    //console.log(id);

    const [book, setBook] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    if (id !== undefined) {
        useEffect(() => {
            const fetchBook = async () => {
                await axios
                    .get('http://localhost/magic-books/backend/book/' + id)
                    .then((res) => {
                        setBook(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            fetchBook()
        }, [id])
    }
    console.log(book);

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
        if (id) {
            formData.append('_method', 'put');
        }
        console.log([...formData]);

        const validateData = () => {
            let errors = {};
            if (!title) {
                errors.title = "Le titre est requis";
            }
            if (!editor) {
                errors.editor = "L'éditeur est requis";
            }
            if (!releaseDate) {
                errors.releaseDate = "La date est requise";
            }
            return errors;
        };
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
        } else {
            if (id === undefined) {
                // axios
                // axios.post(
                //     'http://localhost/magic-books/backend/create/book', formData)
                //     .then(
                //         axios.spread((res, image) => {
                //             console.log(res.data);
                //             console.log(image.data);
                //             //navigate("/dashboard");
                //         })
                //     )
                //     .catch(error => { console.log(error.data) });
                axios
                    .post('http://localhost/magic-books/backend/create/book', formData)
                    .then(res => {
                        console.log(res.data);
                        // navigate("/dashboard");
                    })
                    .catch(error => { console.log(error.data) });
            } else {
                axios 
                    .post('http://localhost/magic-books/backend/update/book/' + id, formData)
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
            {!id ? "" : "@method('PUT')"}
            <h2 className="h2Form">{!id ? "Ajouter un livre" : "Modifier un livre"}</h2>

                <label htmlFor="title">Titre</label>
                <input type="text" name="title" id="title" defaultValue={!id ? "" : book.title} />
                <span style={{ color: "red" }}>{errors.title}</span><br></br>

                <label htmlFor="authorId">Auteur
                    <select name="authorId" >
                        <option>{ "--- Sélectionner un auteur ---" }</option>
                        {!authors ? '' : authors
                            .map((author) => (
                                <option 
                                    key={author.id} 
                                    value={author.id}
                                    defaultValue={book.author_id}
                                    selected={author.id === book.author_id ? "selected" : ""}>{author.name}
                                    </option>
                            ))
                        }
                    </select>
                </label>
                <span style={{ color: "red" }}>{errors.authorId}</span><br></br>

                <label htmlFor="editor">Éditeur</label>
                <input type="text" name="editor" id="editor" defaultValue={!id ? "" : book.editor} />
                <span style={{ color: "red" }}>{errors.editor}</span><br></br>

                <label htmlFor="releaseDate">Date de sortie</label>
                <input type="date" name="releaseDate" id="releaseDate" defaultValue={!id ? "" : book.release_date} />
                <span style={{ color: "red" }}>{errors.releaseDate}</span><br></br>

                <label htmlFor="image">Couverture</label>
                <input type="file" name="image" id="fileInput" />

                <label htmlFor="categoryId">Catégorie
                    <select name="categoryId" >
                        <option>{ "--- Sélectionner une catégorie ---" }</option>
                        {!categories ? '' : categories
                            .map((category) => (
                                <option key={category.id}
                                value={category.id}
                                selected={category.name === book.categories_name ? "selected" : ""}>{category.name} </option>
                            ))
                        }
                    </select>
                </label>
                <span style={{ color: "red" }}>{errors.categoryId}</span><br></br>

                <label htmlFor="summary">Résumé</label>
                <textarea name="summary" id="summary" rows={8} defaultValue={!id ? "" : book.summary} />
                <span style={{ color: "red" }}>{errors.summary}</span><br></br>

                <button type="submit">Enregistrer</button>
            </form>
        </div>
    )
}