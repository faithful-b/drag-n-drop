import "./comps.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Element from "./Element";

function Canvas() {
    const [dataT, setDataT] = useState(null);
    const [innerHTML, setInnerHTML] = useState("");
    const [elems, setElems] = useState(() => {
        const ssEls = sessionStorage.getItem("dnd_els");
        return ssEls ? JSON.parse(ssEls) : [];
    });

    useEffect(() => {
        const fetchRes = async () => {
            try {
                var temp = "";
                const res = await axios.get('http://localhost:3000/api/els');
                setDataT(res.data)
                setElems(() => {
                    const ssEls = sessionStorage.getItem("dnd_els");
                    return ssEls ? JSON.parse(ssEls) : [];
                })
                for (let i of elems) {
                    const newI = new Element(i.tag, i.innerText, i.props)
                    temp += newI.returnHTML()
                }
                setInnerHTML(res.data["innerHTML"] + temp)
            } catch (e) {
                console.error(e)
            };
        };
        fetchRes()
    }, []);

    return(
    <div id="canvas" dangerouslySetInnerHTML={{__html: `
        <h3 style="color:red;background-color:blue;">Welcome To Drag 'n Drop</h3>
        <b><p>Version 1.0</p></b>
        ${innerHTML}`}}>
        {/* Canvas */}
    </div>
    )
}

export default Canvas