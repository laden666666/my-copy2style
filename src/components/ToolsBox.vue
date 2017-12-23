<template>
    <div class="toolsBox">
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
</style>
