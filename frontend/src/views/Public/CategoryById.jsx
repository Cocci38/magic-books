import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
            <section className="centerContainer divMargin">
                <h2>{nameCategory}</h2>
                <div>{count} livres pour la catégorie {nameCategory}</div>
                <div className="flexRowWrap">
                    {Array.isArray(categories) ? categories
                        .map((category) => (
                            <div key={category.book_id} className="categoryIdContainer divMargin">
                                <div className="coverContainer divMargin">
                                    {category.cover ? <img src={urlImage + category.cover} className="cover" alt={"couverture du livre " + category.title} /> : <img src='/images/image_vide.png' className="cover" alt="ce livre n'a pas de couverture" />}
                                </div>
                                <div className="divMargin">{category.summary.substring(0, 100) + " ..."}</div>
                            </div>
                        ))
                        : ""}
                </div>
            </section>
        </main>
    )
}
