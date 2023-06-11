
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from '../../services/admin.service';
import { publicService } from '../../services/public.service';

export const CategoryForm = () => {

    // Je récupère l'id, useParams la paires clé/valeur des paramètres de l'url qui ont été mis en correspondance par le <Route path>.
    const { id } = useParams();
    // console.log(id);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [category, setCategory] = useState({name:''});

    // Si je l'id est présent, je récupère la catégorie pour l'afficher dans le formulaire de modification
    if (id !== undefined) {
        useEffect(() => {
            const fetchCategory = async () => {
                await publicService.getCategory(id)
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
    

    // Fonction qui récupère les données transmis par le formulaire et qui l'envoie vers le serveur
    const handlSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

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
            // Si l'id est indéfini, j'envoie le formulaire de création
            if (id === undefined) {
                //console.log('je passe ici');
                await adminService.postCategory(nameCategory)
                .then(res => {
                    // console.log(res.data);
                    navigate("/admin");
                })
                .catch(error => { console.log(error.data) });
            // Sinon j'envoie le formulaire de modification
            } else {
                await adminService.updateCategory(id, nameCategory)
                .then(res => {
                    // console.log(res.data);
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
                {!id ? <h2 className="h2Form"> Ajouter une catégorie</h2> : <h2 className="h2Form"> Modifier une catégorie</h2>}
                <label htmlFor="nameCategory">Nom de la catégorie</label>
                {!id ? <input type="text" name="nameCategory" id="nameCategory" /> : <input type="text" name="nameCategory" id="nameCategory" defaultValue={category.name} />}
                <span style={{ color: "red" }}>{errors.nameCategory}</span>
                <button type="submit" className="button">Enregistrer</button>
            </form>
        </div>
    )
}