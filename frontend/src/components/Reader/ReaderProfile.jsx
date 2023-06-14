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
        <section>
            <h2>Mes informations</h2>
            <h2>{reader.username}</h2>
            <p className="paragraphFlex"><span className="paragraphName">Email</span><span>{reader.email}</span></p>
        </section>
    )
}