<template>
    <div id="app">
        <Editor ref="editor" @change="change($event)"></Editor>
        <CSSList style="margin-left: 10px" :cssMap="cssMap" @enter="enter($event)" @leave="leave($event)"></CSSList>
    </div>
</template>

<script>
    import Editor from './components/Editor.vue'
    import CSSList from './components/CSSList.vue'

    export default {
        data: function () {
            return {
                cssMap: {}
            }
        },
        methods: {
            /**
             * 输入或粘贴事件
             */
            change($event){
                this.cssMap = $event
            },
            /**
             * 样式表的鼠标hover
             */
            enter(key){
                if(this.$refs.editor){
                    this.$refs.editor.showActive(key)
                }
            },
            leave(key){
                if(this.$refs.editor){
                    this.$refs.editor.hideActive(key)
                }
            },
        },
        components: {
            Editor,
            CSSList
        }
    }
</script>

<style>
    html, body, #app{
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
    }
</style>
