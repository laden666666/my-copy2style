<template>
    <div class="cssList">
        <!--样式表-->
        <div v-html="styleTag"></div>

        <!--样式列表，供用户查看-->
        <ul class="cssList-list">
            <li class="cssList-item" v-for="item in classList" :key="item.key" @mouseenter="enter(item.key)" @mouseleave="leave(item.key)">
                <div class="cssList-className">
                    {{item.className}}
                    <span class="cssList-bracket">{</span>
                </div>
                <ul class="cssList-styleList" v-for="style in item.styleList">
                    <li class="cssList-styleItem">
                        <span class="cssList-styleItemName">{{style.key}}</span>
                        :
                        <span class="cssList-styleItemValue">{{style.value}}</span>
                        ;
                    </li>
                </ul>
                <div class="cssList-bracket">}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:{
            cssMap: {
                type: Object,
                required: true,
            }
        },
        watch: {
            cssMap: function () {
                var newCacheCssMap = {};
                //取this.cssMap和this.cacheCssMap的交集，key重复的表示已经初始化过了，取cacheCssMap的值
                Object.keys(this.cssMap).forEach((key)=>{
                    if(this.cacheCssMap[key]){
                        newCacheCssMap[key] = this.cacheCssMap[key]
                    } else {
                        newCacheCssMap[key] = this.cssMap[key]
                    }
                })
                this.cacheCssMap = newCacheCssMap
            },
        },
        methods: {
            enter(key){
                this.$emit('enter', key)
            },
            leave(key){
                this.$emit('leave', key)
            },
        },
        computed: {
            // 生成style标签
            styleTag: function () {

                var styleTagHtml = ''
                for(let key in this.cacheCssMap){
                    if(Array.isArray(this.cacheCssMap[key])){
                        var className = key.trim().split(' ').filter(str=>!!str).map(str=>'.' + str).join('')
                        styleTagHtml +=  `${className}{
                            ${this.cacheCssMap[key].join(';')}
                        }`
                    }
                }
                return `<style type="text/css">${styleTagHtml}</style>`
            },
            //重命名的样式标签

            // 生成style标签
            classList: function () {
                const classList =[]
                for(let key in this.cacheCssMap){
                    var className = key.trim().split(' ').filter(str=>!!str).map(str=>'.' + str).join('')
                    classList.push({
                        key: key,
                        className,
                        styleList: this.cacheCssMap[key] ? this.cacheCssMap[key].filter(style=>style).map(style=>{
                            var arr = style.split(':')
                            return {
                                key: arr.shift(),
                                value: arr.join(':')
                            }
                        }) : []
                    })
                }
                return classList
            },
        },
        data () {
            return {
                //克隆一份props缓存
                cacheCssMap: {...this.cssMap}
            }
        }
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
