export class DOMTree{
    id: string
    tagName: string
    className: string
    children: Array<DOMTree | string>

    constructor(id: string, tagName: string, className: string){
        this.tagName = tagName;
        this.className = className;
        this.id = id;
        this.children = []
    }
    append(domTree:DOMTree | string){
        this.children.push(domTree)
    }
}
