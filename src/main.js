// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import App from './App'
import store from './store'

Vue.use(element)
Vue.config.productionTip = false

window.store = store

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    template: '<App/>',
    components: { App }
})
