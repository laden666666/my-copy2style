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
                <div class="active-horizontal-line" style="top: 0"></div>
                <div class="active-horizontal-line" style="bottom: 0"></div>
                <div class="active-vertical-line" style="right: 0"></div>
                <div class="active-vertical-line" style="left: 0"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import editService from '../service/editService'
    import {mapState} from 'vuex'
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
        computed:{
            ...mapState({
                html(state){
                    return state.state.html
                },
                recycle(state){
                    return state.recycle.length
                },
                activeId(state){
                    return state.activeId
                },
            })
        },
        watch:{
            'recycle': function(newValue, oldValue){
                if(oldValue.length != 0 && newValue.length != 0)
                    this.$el.querySelector('.editor-container').innerHTML = this.html
            },
            'activeId': function(newValue, oldValue){
                if(oldValue && !newValue){
                    this.hideActive()
                } else if(!oldValue && newValue){
                    this.showActive(newValue)
                }
            },
        },
        methods: {
            /**
             * 输入或粘贴事件
             */
            editor(){
                editService.edit(this.$el.querySelector('.editor-container'))
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
            hideActive(){
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
        z-index: 10000000;
    }
    .active-box {
        opacity: 0;
        transition: opacity ease-in .3s;
        position: absolute;
        background: rgba(255, 0, 0, .3);
        box-sizing: border-box;
        pointer-events: none;
    }
    .active-box.active-box_show {
        opacity: 1!important;
    }
    .active-horizontal-line{
        left: 50%;
        width: 5000px;
        height: 0;
        border: dashed rgba(255, 0, 0, .7) 1px;
        transform: translateX(-50%);
        position: absolute;
        pointer-events: none;
    }
    .active-vertical-line{
        top: 50%;
        height: 5000px;
        transform: translateY(-50%);
        border: dashed rgba(255, 0, 0, .7) 1px;
        position: absolute;
        pointer-events: none;
    }
</style>
