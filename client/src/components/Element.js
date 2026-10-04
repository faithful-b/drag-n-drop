
const htmlTagList = ["h1", "p", "div", "span", "a", "button", "input", "textarea", "select", "option", "label", "form", "img", "svg", "canvas", "video", "audio"]


class Element {
    constructor(tag, innerText, props = {"color": "black", "background-color": "white"}){
        this.tag = tag;
        this.innerText = innerText;
        this.props = props
    }

    objectify() {
        return {
            tag: this.tag,
            innerText: this.innerText,
            props: this.props
        }
    }

    returnHTML() {
        const ite = this.props
        let propsHTM = "";
        for (let i in ite) {
            propsHTM += `${i}:${ite[i]};`
        }
        return `<${this.tag} style=${propsHTM}>${this.innerText}</${this.tag}>`
    }

    changeTagAndContent(newTag, newContent) {
        this.tag = newTag || this.tag;
        this.content = newContent || this.tag;
    }
}


export default Element