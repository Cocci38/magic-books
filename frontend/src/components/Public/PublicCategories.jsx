import { useEffect, useRef, useState } from "react";
import { adminService } from '../../services/admin.service';
import { Link } from "react-router-dom";

export const PublicCategories = () => {
    const [categories, setCategories] = useState([]);
    const flag = useRef(false);

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
        if (flag.current === false) {
            fetchCategories()
        }
        return () => flag.current = true
    }, []);

    return (

        <section className="centerContainer divMargin">
            <h2>Toutes les catégories</h2>
            {Array.isArray(categories) ? categories
                .map((category) => (
                    <div key={category.id} className="categoryContainer">
                    <Link to={'categorie/'+category.id} >{category.name}</Link>
                        
                    </div>
                ))
                : ""}
        </section>
    )
}
