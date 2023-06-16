import { PublicBooks } from "../../components/Public/PublicBooks"
import { PublicCategories } from "../../components/Public/PublicCategories"


export const Home = () => {
    return (
        <main>
            <h1>Je suis la page d'accueil</h1>
            <PublicCategories />
            <PublicBooks />
        </main>
        
    )
}