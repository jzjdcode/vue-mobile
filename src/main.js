
import Vue from 'vue'
import app from './app.vue'
// mintUI依赖vue
import 'mint-ui/lib/style.css'
// less 模块
import less from 'less'
Vue.use(less)

// 按需导入mint 文件
// import { Header, Swipe, SwipeItem } from 'mint-ui'
// // 注册 mint 
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
import Mint from 'mint-ui' // mint 图片懒加载需要全部导入
Vue.use(Mint)

// 导入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入路由模块
import VueRouter from 'vue-router'
//注册
Vue.use(VueRouter)

// 导入 resource 模块
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

// 设置 vue-resource 全局根域名
// Vue.http.options.root = 'http://47.110.139.196/'
// 设置 vue-resource 全局 post请求体
// Vue.http.options.emulateJSON = true;

// 导入时间插件
import moment from 'moment'
Vue.use(moment)

// 定义全局过滤器
Vue.filter('dateFormat', function (datastr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(datastr).format(pattern)
})

// 导入 mui 相关模块
import './lib/mui-master/dist/css/mui.min.css'
import './lib/mui-master/fonts/mui.ttf'
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'

// 导入 bs 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// 导入路由js文件
import router from './router.js'

new Vue({
    el: '#app',
    render: c => c(app),
    router
})