import { ReaderLibrary } from "../../components/Reader/ReaderLibrary";
import { ReaderProfile } from "../../components/Reader/ReaderProfile";

export const ReaderDashboard = () => {

    return (
        <main>
            <h1>Je suis le dashboard de l'utilisateur</h1>
            <div className="mainRow">
            <ReaderProfile />
            <div className="bar"></div>
            <ReaderLibrary />
            </div>
        </main>
    )
}