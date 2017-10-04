<template>
    <div id="app">
        <Editor @change="change($event)"></Editor>
        <CSSList :cssMap="cssMap"></CSSList>
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
        },
        components: {
            Editor,
            CSSList
        }
    }
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
