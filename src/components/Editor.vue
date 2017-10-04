<template>
    <div class="editor" contenteditable="true" @input="editor">
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            /**
             * 输入或粘贴事件
             */
            editor(){
                const domPathMap = {}
                this.recursiveSearch('', domPathMap, this.$el)

                this.$emit('change', domPathMap)
            },
            /**
             * 递归查询样式
             * @param domPath
             * @param domPathMap
             * @param elm
             */
            recursiveSearch(domPath, domPathMap, elm){
                //如果不是元素对象，直接跳过
                if(elm.nodeType != 1)
                    return

                //循环遍历子元素，获取子元素样式
                Array.from($(elm).children()).forEach((elm ,i)=>{
                    const newDomPath = domPath + elm.tagName.toLowerCase() + i
                    if($(elm).data('initialized') != true){
                        domPathMap[newDomPath] = $(elm).attr('style') ? $(elm).attr('style').split(';') : []
                        $(elm).attr('style', '')
                        $(elm).attr('class', newDomPath)
                        $(elm).data('initialized', true)
                    } else {
                        domPathMap[($(elm).attr('class')).trim()] = true
                    }
                    this.recursiveSearch(newDomPath, domPathMap, elm)
                })
            },
        },
    }
</script>

<style scoped>
    .editor{
        width: 50%;
        float: left;
        min-height: 400px;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #999;
    }
</style>
