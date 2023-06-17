import { ReaderLibrary } from "../../components/Reader/ReaderLibrary";
import { ReaderProfile } from "../../components/Reader/ReaderProfile";

export const ReaderDashboard = () => {

    return (
        <main>
            <h1 style={{textAlign: "center"}}>Mon Compte</h1>
            <div className="mainRow">
            <ReaderProfile />
            <div className="bar"></div>
            <ReaderLibrary />
            </div>
        </main>
    )
}