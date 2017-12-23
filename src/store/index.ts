import Vuex, {Store} from 'vuex'
import {Style} from '../class/Style'
import {DOMTree} from '../class/DOMTree'
import Vue from 'vue'

Vue.use(Vuex)

export type StoreState = {
    //编辑区显示的html
    html: '',
    //编辑区的dom文档对应的样式列表
    styleList: Style[],
    //编辑区的dom文档对应的对象
    domTree :DOMTree,
}

export default new Store<{
    //撤销和重做
    memento: StoreState[],
    recycle: StoreState[],
    //编辑的状态
    state: StoreState,
    //显示编辑区
    showEdit: boolean,
    //显示html区
    showHtml: boolean,
    //显示style区
    showStyle: boolean,
    //高亮的id
    activeId: string,
}>({
    strict: false,
    state:{
        //撤销和重做
        memento: [],
        recycle: [],
        state: {
            html: '',
            styleList:[],
            domTree: new DOMTree('', '', '')
        },
        //显示编辑区
        showEdit: true,
        //显示html区
        showHtml: false,
        //显示style区
        showStyle: true,
        //高亮的id
        activeId: '',
    },
})
