<template>
    <div class="editor">
        <!--用于粘贴dom元素-->
        <div class="editor-container" contenteditable="true" @input="editor">
        </div>

        <!--用于高亮显示元素-->
        <div class="active">
            <div class="active-box" :class="{'active-box_show': isShowActive}" :style="{
                top: activeBoxPosition.top + 'px',
                left: activeBoxPosition.left + 'px',
                width: activeBoxPosition.width + 'px',
                height: activeBoxPosition.height + 'px',
            }">
                <div class="active-line active-line-vertical"></div>
                <div class="active-line active-line-vertical active-line-end"></div>
                <div class="active-line"></div>
                <div class="active-line active-line-end"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        data () {
            return {
                //高亮区域的坐标和大小
                activeBoxPosition: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                },
                //是否显示高亮区域
                isShowActive: false,

            }
        },
        methods: {
            /**
             * 输入或粘贴事件
             */
            editor(){
                const domPathMap = {}
                this.recursiveSearch('', domPathMap, this.$el.querySelector('.editor-container'))

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

                        //去除行内样式，采用class样式
                        $(elm).attr('style', '')

                        //生成的class默认值是路径名
                        $(elm).attr('class', newDomPath)

                        //标记已经初始化过
                        $(elm).data('initialized', true)
                    } else {
                        domPathMap[domPath] = true
                    }
                    this.recursiveSearch(newDomPath, domPathMap, elm)
                })
            },
            showActive(key){
                const activeDom = document.getElementsByClassName(key)[0]
                if(activeDom){
                    const clientRect = activeDom.getClientRects()[0];

                    ['top', 'left', 'width', 'height'].forEach(key=>{
                        this.activeBoxPosition[key] = clientRect[key]
                    })
                    this.isShowActive = true

                    //计算滚动条位置，将滚动条移到高亮位置
                    this.$el.scrollTop = clientRect.top
                }
            },
            hideActive(key){
                this.isShowActive = false
            },
        },
    }
</script>

<style scoped>
    .editor{
        flex: 1;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 4px;
    }
    .editor-container{
        box-sizing: border-box;
        min-height: 100%;
        padding: 10px;
    }
    .editor-container:empty::before{
        font-size: 12px;
        color: #aaa;
        content: '请复制要导出样式的文字或排版，将他们粘贴进来';
    }

    /*高亮显示元素信息*/
    .active {
    }
    .active-box {
        opacity: 0;
        transition: opacity ease-in .3s;
        position: absolute;
        background: rgba(255, 0, 0, .3);
        box-sizing: border-box;
    }
    .active-box.active-box_show {
        opacity: 1!important;
    }
    .active-line {
        top: 0;
        left: 0;
        width: 10000px;
        height: 0;
        border: dashed rgba(255, 0, 0, .7) 1px;
        transform: translateX(-50%);
        position: absolute;
        pointer-events: none;
    }
    .active-line.active-line-end{
        top: auto;
        bottom: 0;
    }
    .active-line.active-line-vertical {
        width: 0;
        height: 10000px;
        transform: translateY(-50%);
    }
    .active-line.active-line-vertical.active-line-end{
        left: auto;
        right: 0;
        top: 0;
        bottom: auto;
    }
</style>
