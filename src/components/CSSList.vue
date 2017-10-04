<template>
    <div class="cssList">
        <!--样式表-->
        <div v-html="styleTag"></div>
    </div>
</template>

<script>
    export default {
        props:{
            cssMap: {
                type: Object,
                required: true,
            }
        },
        watch: {
            cssMap: function () {
                var newCacheCssMap = {};
                //取this.cssMap和this.cacheCssMap的交集，key重复的表示已经初始化过了，取cacheCssMap的值
                Object.keys(this.cssMap).forEach((key)=>{
                    if(this.cacheCssMap[key]){
                        newCacheCssMap[key] = this.cacheCssMap[key]
                    } else {
                        newCacheCssMap[key] = this.cssMap[key]
                    }
                })
                this.cacheCssMap = newCacheCssMap
            },
        },
        computed: {
            // 生成style标签
            styleTag: function () {

                var styleTagHtml = ''
                for(let key in this.cacheCssMap){
                    if(Array.isArray(this.cacheCssMap[key])){
                        var className = key.trim().split(' ').filter(str=>!!str).map(str=>'.' + str).join('')
                        styleTagHtml +=  `${className}{
                            ${this.cacheCssMap[key].join(';')}
                        }`
                    }
                }
                return `<style type="text/css">${styleTagHtml}</style>`
            }
        },
        data () {
            return {
                //克隆一份props缓存
                cacheCssMap: {...this.cssMap}
            }
        }
    }
</script>

<style scoped>
    .cssList{

    }
</style>
