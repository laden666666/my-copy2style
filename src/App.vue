<template>
    <div id="app">
        <ToolsBox></ToolsBox>
        <div class="views">
            <Editor id="editor" v-show="showEdit" ref="editor"></Editor>
            <ShowHTML id="showHTML" v-show="showHtml" style="margin-left: 10px"></ShowHTML>
            <CSSList v-show="showStyle" style="margin-left: 10px"></CSSList>
        </div>
    </div>
</template>

<script>
    import Editor from './components/Editor.vue'
    import CSSList from './components/CSSList.vue'
    import ShowHTML from './components/ShowHTML.vue'
    import ToolsBox from './components/ToolsBox.vue'
    import $ from 'jquery'

    window.$ = $
    

    export default {
        methods: {
        },
        computed: {
            showHtml: function () {
                return this.$store.state.showHtml
            },
            showEdit: function () {
                return this.$store.state.showEdit
            },
            showStyle: function () {
                return this.$store.state.showStyle
            },
        },
        components: {
            Editor,
            CSSList,
            ShowHTML,
            ToolsBox
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
        color: #2c3e50;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
    }
    .views{
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        flex: 1;
    }
</style>
