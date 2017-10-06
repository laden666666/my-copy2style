<template>
    <pre class="showHTML">
        <code class="language-css" v-html="formatHtml"></code>
    </pre>
</template>

<script>

    var Prism = require('prismjs')
    var pretty = require('pretty');
    require('prismjs/themes/prism.css')

    export default {
        props:{
            html: {
                type: String,
                required: true,
            }
        },
        computed: {
            // 生成style标签
            formatHtml: function () {
                console.log(pretty(this.html))
                return  Prism.highlight(pretty(this.html), Prism.languages.html)
            },
        },
    }
</script>

<style scoped>
    .showHTML{
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
</style>
