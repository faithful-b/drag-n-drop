import "./comps.css";
import axios from "axios";
import Element from "./Element";
import { useState, useEffect } from "react";
import useSessionStorage from "./useSessionStorage";

function BottomPanel() {
    const [els, setEls] = useSessionStorage("dnd_els");

    function handleClick1() {
        setEls(prev => [
            ...prev, {
                id: crypto.randomUUID(),
                tag: "p",
                innerText: "Empty Content",
                props: {
                    "color": "#000000",
                    "background-color": "#ffffff"
                }
            }
        ]);
    }

    async function handleClick2(e) {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:3000/api/elsave`, els)
            sessionStorage.removeItem('dnd_els')
            console.log(res.data)
        } catch (e) {
            console.error(e);
        }
        window.location.reload()
    }

    async function handleClick3(e) {
        e.preventDefault();
        try {
            const undone = els.pop();
            sessionStorage.setItem("dnd_els", JSON.stringify(els));
            alert(`Remove Element Successful tag: "${undone.tag}" content: "${undone.innerText}"`);
        } catch(e) {
            console.error(e)
            alert("Couldn't Remove Anything, Have You Input Anything Yet?")
        }
    }

    async function handleClick4(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/api/elsdelete`)
            console.log(res.data)
        } catch (e) {
            console.error(e);
        }
        window.location.reload()
    }

    return(
    <div id="bottomPanel">
        {/* Bottom Panel */}
        <button className="bottomButton" onClick={handleClick1}>
            Add Element
        </button>
        <button className="bottomButton" onClick={handleClick2}>
            Save To Database
        </button>
        <button className="bottomButton" onClick={handleClick3}>
            Undo
        </button>
        <button className="bottomButton" onClick={handleClick4}>
            Delete Previous
        </button>
    </div>
    )
}

export default BottomPanel