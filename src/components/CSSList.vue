<template>
    <div class="cssList">
        <!--样式表-->
        <div v-html="styleTag"></div>

        <!--样式列表，供用户查看-->
        <ul class="cssList-list">
            <li class="cssList-item" v-for="item in styleList" :key="item.id" @mouseenter="enter(item.id)" @mouseleave="leave(item.id)">
                <div class="cssList-className">
                    .{{item.className}}
                    <span class="cssList-bracket">{</span>
                </div>
                <ul class="cssList-styleList" v-for="(value, key) in item.styleList" :key="item.id + '|' + key">
                    <li class="cssList-styleItem">
                        <span class="cssList-styleItemName">{{key}}</span>
                        :
                        <span class="cssList-styleItemValue">{{value}}</span>
                        ;
                    </li>
                </ul>
                <div class="cssList-bracket">}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import editService from '../service/editService'
    export default {
        methods: {
            enter(key){
                editService.setActiveById(key)
            },
            leave(key){
                editService.setInactiveById(key)
            },
        },
        computed: {
            cssMap(){
                return this.styleList.reduce((map, style)=>{
                    map[style.id] = style
                    return map
                }, {})
            },
            // 生成style标签
            styleTag: function () {

                var styleTagHtml = ''
                for(let key in this.cssMap){
                    var style = this.cssMap[key]
                    var className = style.className
                    var styleKeys = Object.keys(style.styleList)
                    styleTagHtml +=  `[c2s-class='${className}']{
                        ${styleKeys.map(key=>key + ':' + style.styleList[key]).join(';')}
                    }`
                }
                return `<style type="text/css">${styleTagHtml}</style>`
            },
            // 生成style标签
            styleList: function () {
                return this.$store.state.state.styleList
            },
        },
    }
</script>

<style scoped>
    .cssList{
        flex: 1;
        margin: 0;
        padding: 10px;
        border: 1px solid #e1e1e8;
        border-radius: 4px;
        background-color: #f7f7f9;
        height: 100%;

        box-sizing: border-box;
        overflow: auto;
        font-size: 13px;
        line-height: 1.42857;
        color: rgb(51, 51, 51);
        word-break: normal;
        word-wrap: break-word;
        white-space: nowrap;
    }

    .cssList-list{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .cssList-item{
        margin-bottom: 10px;
        transition: text-shadow ease-in .5s;
    }
    .cssList-item:hover{
        text-shadow: 0 0 2px rgba(0, 0, 0, .3);
    }
    .cssList-className{
        box-sizing: border-box;
        color: rgb(0, 170, 136);
    }
    .cssList-styleList{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .cssList-styleItem{
        padding-left: 30px;
    }
    .cssList-styleItemName{
        box-sizing: border-box;
        color: rgb(153, 153, 255);
    }
    .cssList-styleItemValue{
        box-sizing: border-box;
        color: rgb(204, 0, 255);
    }
    .cssList-bracket{
        box-sizing: border-box;
        color: rgb(0, 102, 153);
    }
</style>
