import { useEffect, useState } from "react"
import "./comps.css"
import Element from "./Element";

function SidePanel() {
    const [els, setEls] = useState(() => {
        const exists = sessionStorage.getItem("dnd_els");
        return exists ? JSON.parse(exists) : [];
    });

    const [selected, setSelected] = useState(() => {
        var props;
        if (!els[els.length - 1]) {
            props = {tag: "", innerText: "", props: {"color":"", "background-color": ""}};
        } else {
            props = els[els.length - 1]
        }
        const sel = new Element(props.tag, props.innerText, props.props)
        return sel;
    });
    
    const [newTagname, setNewTagname] = useState(selected.tag);
    const [newContent, setContent] = useState(selected.innerText);
    const [newProps, setNewProps] = useState(selected.props);


    useEffect(() => {
        if (selected.tag != "") {
        els.pop()
        els.push(selected.objectify());
        sessionStorage.setItem(
            "dnd_els",
            JSON.stringify(els)
        )
        } else {
            console.log("Cannot Save Empty Content or Tagname")
        }
    }, [selected])

    function handlePress() {
        setSelected(new Element(newTagname, newContent, newProps))
        window.location.reload()
    }

    return(
    <div id="sidePanel">
        {/* Side Panel */}
        <p>Tagname: <input defaultValue={selected.tag} onChange={(e) => {setNewTagname(e.target.value)}}/></p>
        <p>Content: <input defaultValue={selected.innerText} onChange={(e) => {setContent(e.target.value)}}/></p>
        <p>Colour: <input defaultValue={selected.props["color"]} onChange={(e) => {newProps.color = e.target.value}}/></p>
        <p>Listen: <input defaultValue={selected.props["color"]} onChange={(e) => {newProps.color = e.target.value}}/></p>
        <button onClick={handlePress}>Edit</button>
        <a href="../TestRun.jsx">Test</a>
    </div>
    )
}

export default SidePanel