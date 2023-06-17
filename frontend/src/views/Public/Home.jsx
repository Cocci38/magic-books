import { PublicBooks } from "../../components/Public/PublicBooks"
import { PublicCategories } from "../../components/Public/PublicCategories"


export const Home = () => {
    return (
        <main>
            <PublicCategories />
            <PublicBooks />
        </main>
        
    )
}