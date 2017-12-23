export class Style{
    id: string
    className: string
    styleList: {[name: string]: string}

    constructor(id: string, className: string, styleList: {[name: string]: string}){
        this.id = id;
        this.className = className;
        this.styleList = styleList;
    }
}
