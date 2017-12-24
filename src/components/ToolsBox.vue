<template>
    <div class="toolsBox">
        <el-button  size="small" @click="goReadMe" icon="el-icon-question">查看readme</el-button>
        <el-button-group>
            <el-button :plain="!showEdit" size="small" :type="showEdit ? 'primary' : ''" @click="toggerShowEdit">编辑区</el-button>
            <el-button :plain="!showHtml" size="small" :type="showHtml ? 'primary' : ''" @click="toggerShowHtml">代码区</el-button>
            <el-button :plain="!showStyle" size="small" :type="showStyle ? 'primary' : ''" @click="toggerShowStyle">样式区</el-button>
        </el-button-group>
        <el-button-group>
            <el-button :disabled="!undoable" size="small" @click="undo" icon="icon-reply"></el-button>
            <el-button :disabled="!redoable" size="small" @click="redo" icon="icon-forward"></el-button>
        </el-button-group>
        <!-- <el-button size="small" @click="toggerShowEdit" :class="{active: showEdit}">导出</el-button> -->
        <div class="github-btn-group">
            <iframe class="github-btn" src="https://ghbtns.com/github-btn.html?user=laden666666&repo=my-copy2style&type=star&count=false&size=large" frameborder="0" scrolling="0" width="80px" height="30px"></iframe>
            <iframe class="github-btn" src="https://ghbtns.com/github-btn.html?user=laden666666&repo=my-copy2style&type=fork&count=false&size=large" frameborder="0" scrolling="0" width="80px" height="30px"></iframe>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
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
