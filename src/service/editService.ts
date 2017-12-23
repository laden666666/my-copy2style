import store, {StoreState} from '../store/'
import * as $ from 'jquery'
import {DOMTree} from '../class/DOMTree'
import {Style} from '../class/Style'

/**
 * 递归将dom变为DOMTree和Style[]对象
 * @param {{[name: string]: boolean}} pathMap 
 * @param {DOMTree} parentDOMTree 
 * @param {Style[]} styleList 
 * @param {HTMLElement} elm 
 */
function recursiveSearch(pathMap:  {[name: string]: boolean}, parentDOMTree:DOMTree, styleList: Style[], elm: HTMLElement){

    //循环遍历子元素，获取子元素样式
    Array.from(elm.childNodes).forEach((elm ,i)=>{
        //如果不是元素对象，直接跳过
        if(elm.nodeType != 1 && elm.nodeType != 3){
            return
        }else if(elm.nodeType == 3){
            parentDOMTree.append(elm.textContent)
            return
        }
        let element:HTMLElement = elm as HTMLElement
        const newDOMID = parentDOMTree.id + element.tagName.toLowerCase() + i
        pathMap[newDOMID] = true
        const newDOMTree = new DOMTree(newDOMID, element.tagName.toLowerCase(), newDOMID)
        parentDOMTree.append(newDOMTree)

        //如果该DOM未做初始化处理，初始化该DOM
        if($(elm).data('initialized') != true){
            //新产生的样式取出
            var styleString = $(elm).attr('style')
            if(styleString){
                var style = new Style(newDOMID, newDOMID, styleString.split(';').reduce((map, string)=>{
                    var arr = string.split(":")
                    if(arr[0]){
                        map[arr[0]] = arr[1]
                    }
                    return map
                }, {}))
                styleList.push(style)
            }

            //去除行内样式，采用class样式
            $(elm).removeAttr('style')
            //移除id
            $(elm).removeAttr('id')

            //生成的class默认值是路径名
            $(elm).attr('class', newDOMID)

            //用生成的class做真正的样式绑定
            $(elm).attr('c2s-class', newDOMID)

            //标记已经初始化过
            $(elm).data('initialized', true)
        }
        recursiveSearch(pathMap, newDOMTree, styleList, element)
    })
}

export default {
    //重做和撤销相关
    pushNewState(state: StoreState){
        store.state.memento.push(store.state.state)
        store.state.recycle = []
        store.state.state = state
    },
    undo(){
        store.state.recycle.push(store.state.state)
        store.state.state = store.state.memento.pop()
    },
    redo(){
        store.state.memento.push(store.state.state)
        store.state.state = store.state.recycle.pop()
    },
    //显示板块相关
    toggerShowEdit(){
        store.state.showEdit = !store.state.showEdit
    },
    toggerShowStyle(){
        store.state.showStyle = !store.state.showStyle
    },
    toggerShowHtml(){
        store.state.showHtml = !store.state.showHtml
    },
    //编辑
    edit(elm: HTMLElement){
        const domTree = new DOMTree('', '', '')
        let styleList = [...store.state.state.styleList]
        const pathMpa = {}
        recursiveSearch(pathMpa, domTree, styleList, elm)
        var html = $(elm).html()
        styleList = styleList.filter(style=>{
            var r = pathMpa[style.id]
            pathMpa[style.id] = false
            return r
        })
        this.pushNewState({
            html,
            styleList,
            domTree,
        })
    },
    //高亮
    setActiveById(id: string){
        store.state.activeId = id
    },
    //高亮
    setInactiveById(id: string){
        store.state.activeId = ''
    },
}