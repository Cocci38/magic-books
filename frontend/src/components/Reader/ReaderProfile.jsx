import { useEffect, useRef, useState } from "react";
import { accountService } from "../../services/account.service";
import { readerService } from "../../services/reader.service";

export const ReaderProfile = () => {

    const [reader, setReader] = useState([]);
    const flag = useRef(false);

    const id = accountService.getReaderId();
    // console.log(id);

    const fetchReader = async () => {
        await readerService.getReader(id)
            .then((res) => {
                setReader(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        if (flag.current === false) {
            fetchReader()
        }
        return () => flag.current = true
    }, [id])

    return (
        <section className="containerInfo">
            <h2 className="divMargin">Mes informations</h2>
            <div className="flexColumn">
            {/* <div className="flexColumn labelInfo border"><span className="divColor divMargin">Nom utilisateur : </span><span className="divColor divMargin">Email : </span></div>
            <div className="flexColumn labelInfo divMargin"><span>{reader.username}</span><span>{reader.email}</span></div> */}
            <div className="flexRow">
                <span className="labelInfo divMargin">Nom utilisateur : </span>
                <span className="divMargin">{reader.username}</span>
            </div>
            <div className="flexRow">
            <span className="labelInfo divMargin">Email : </span>
                <span className="divMargin">{reader.email}</span>
            </div>
            </div>
        </section>
    )
}