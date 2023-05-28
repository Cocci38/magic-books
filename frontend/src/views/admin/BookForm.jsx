import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from '../../services/admin.service';
import { publicService } from '../../services/public.service';

export const BookForm = () => {

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
                await publicService.getBook(id)
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
    // console.log(book);

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
        fetchAuthors()
    }, []);

    const fetchCategories = async () => {
        await adminService.getAllCategories()
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

    const handlSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        //console.log(e.target);
        const formData = new FormData(form);
        
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
                await adminService.postBook(formData)
                    .then(res => {
                        console.log(res.data);
                        navigate("/admin");
                    })
                    .catch(error => { console.log(error.data) });
            } else {
                await adminService.updateBook(id, formData)
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
            <h2 className="h2Form">{!id ? "Ajouter un livre" : "Modifier un livre"}</h2>
                <input type="hidden" name="id" defaultValue={!id ? "" : book.id} />
                
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
                {!id ? "" : <input type="hidden" name="cover" defaultValue={book.cover}/>}
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