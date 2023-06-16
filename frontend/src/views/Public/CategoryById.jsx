import { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { publicService } from "../../services/public.service";


export const CategoryById = () => {
    const { id } = useParams();
    //console.log(id);
    const [categories, setCategory] = useState([]);
    const [nameCategory, setNameCategory] = useState([]);
    const [count, setCount] = useState([]);

    const flag = useRef(false);
    const urlImage = "http://localhost/magic-books/backend/public/pictures/";

    const fetchCategory = async () => {
        await publicService.getCategory(id)
            .then((res) => {
                //console.log(res.data.count);
                setCategory(res.data.data)
                setCount(res.data.count)
                setNameCategory(res.data.categoryName)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (flag.current === false) {
            fetchCategory()
        }
        return () => flag.current = true
    }, [id])
    return (
        <main>
            <section>
                <h2>{nameCategory}</h2>
                <div>{count} livres pour la catégorie {nameCategory}</div>
                {Array.isArray(categories) ? categories
                .map((category) => (
                    <div key={category.book_id} className="categoryContainer">
                    <div className="coverContainer">
                        {category.cover ? <img src={urlImage + category.cover} className="cover" alt={"couverture du livre " + category.title} /> : <img src='/images/image_vide.png' className="cover" alt="ce livre n'a pas de couverture" />}
                    </div>
                    <div>{category.title}</div>
                    <div>{category.author}</div>
                    </div>
                ))
                : ""}
            </section>
        </main>
    )
}
