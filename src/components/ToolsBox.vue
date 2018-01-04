<template>
    <div class="toolsBox">
        <el-button  size="small" @click="goReadMe" icon="el-icon-question">查看readme</el-button>
        <el-button-group>
            <el-tooltip class="item" effect="dark" :content="showEdit ? '隐藏编辑区' : '显示编辑区'" placement="bottom">
                <el-button :plain="!showEdit" size="small" :type="showEdit ? 'primary' : ''" @click="toggerShowEdit">编辑区</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="showHtml ? '隐藏代码区' : '显示代码区'" placement="bottom">
                <el-button :plain="!showHtml" size="small" :type="showHtml ? 'primary' : ''" @click="toggerShowHtml">代码区</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="showStyle ? '隐藏样式区' : '显示样式区'" placement="bottom">
                <el-button :plain="!showStyle" size="small" :type="showStyle ? 'primary' : ''" @click="toggerShowStyle">样式区</el-button>
            </el-tooltip>
        </el-button-group>
        <el-button-group>
            <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
                <el-button :disabled="!undoable" size="small" @click="undo" icon="icon-reply"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重做" placement="bottom">
                <el-button :disabled="!redoable" size="small" @click="redo" icon="icon-forward"></el-button>
            </el-tooltip>
        </el-button-group>

        <el-tooltip class="item" effect="dark" content="导出html" placement="bottom">
            <el-button :disabled="!undoable" size="small" @click="exportHTML" icon="el-icon-download"></el-button>
        </el-tooltip>

        <!-- <el-button size="small" @click="toggerShowEdit" :class="{active: showEdit}">导出</el-button> -->
        <div class="github-btn-group">
            <iframe class="github-btn" src="https://ghbtns.com/github-btn.html?user=laden666666&repo=my-copy2style&type=star&count=false&size=large" frameborder="0" scrolling="0" width="80px" height="30px"></iframe>
            <iframe class="github-btn" src="https://ghbtns.com/github-btn.html?user=laden666666&repo=my-copy2style&type=fork&count=false&size=large" frameborder="0" scrolling="0" width="80px" height="30px"></iframe>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import pretty from 'pretty'
    import editService from '../service/editService'
    export default {
        data () {
            return {
            }
        },
        methods: {
            toggerShowEdit(){
                editService.toggerShowEdit()
            },
            toggerShowStyle(){
                editService.toggerShowStyle()
            },
            toggerShowHtml(){
                editService.toggerShowHtml()
            },
            undo(){
                editService.undo()
            },
            redo(){
                editService.redo()
            },
            goReadMe(){
                window.open('https://github.com/laden666666/my-copy2style', '_blank')
            },
            exportHTML(){
                var eleLink = document.createElement('a');
                eleLink.download = 'copy2html.html';
                eleLink.style.display = 'none';
                // 字符内容转变成blob地址
                var blob = new Blob([pretty(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <style>
                                ${$("#cssList").text()}
                            </style>
                        </head>
                        <body>
                            ${$("#showHTML").text()}
                        </body>
                    </html>`)]);
                eleLink.href = URL.createObjectURL(blob);
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            }
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
            undoable: function () {
                return !!this.$store.state.memento.length
            },
            redoable: function () {
                return !!this.$store.state.recycle.length
            },
        },
    }
</script>

<style scoped>
    .toolsBox{
        padding: 10px;
    }
    .github-btn-group{
        vertical-align: middle;
        line-height: 0;
        float: right;
    }
    .github-btn{

    }
</style>
