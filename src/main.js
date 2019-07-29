import Vue from 'vue'
import app from './app.vue'

// 导入 vuex 模块
import Vuex from 'vuex'
// 注册 vuex 模块
Vue.use(Vuex)

// 每次进入网站就从本地存储中取到 car 中的数据
let car = JSON.parse(localStorage.getItem("car")) || [];
// 创建 vuex 实例
let store = new Vuex.Store({
    state: { // this.$store.state.xxx
        shopCar: car // 将购物车商品数据存储在一个数组里，在数组中存储对象{ id: 商品id, count: 购买数, price: 单价, selected: true（是否为选中） }
    },
    mutations: { // this.$store.commit("方法名", "唯一的参数")
        // 添加到购物车
        addToShopCar(state, goods) {
            let flag = false; // 默认购物车没有添加商品
            // some 方法取到 相同id 的商品 并只加购买数量
            state.shopCar.some(item => {
                if (item.id == goods.id) {
                    item.count += parseInt(goods.count);
                    if (item.count > goods.stock) item.count = goods.stock; // 当大于库存量时，等于库存量
                    flag = true;
                    return true
                }
            })
            // 若没有找到相同id的商品，就加入购物车
            if (!flag) state.shopCar.unshift(goods)

            // 存入本地存储 每次刷新页面数据能加载
            localStorage.setItem("car", JSON.stringify(state.shopCar))
        },
        // 更新商品数量
        updateGoodsNum(state, goods) {
            state.shopCar.some(item => {
                if (item.id == goods.id) {
                    item.count = parseInt(goods.count); // id相同时，将数量重新赋值给 商品数量
                    return true
                }
            })
            // 存入本地存储 每次刷新页面数据能加载
            localStorage.setItem("car", JSON.stringify(state.shopCar))
        },
        // 删除本地存储的商品数据
        delGoodsData(state, id) {
            state.shopCar.some((item, i) => {
                if (item.id == id) {
                    state.shopCar.splice(i, 1)
                }
            })
            // 存入本地存储 每次刷新页面数据能加载
            localStorage.setItem("car", JSON.stringify(state.shopCar))
        },
        // 更新 选择按钮的状态
        updateSeletedChange(state, val) {
            state.shopCar.some(item => {
                // 匹配到 id 
                if(item.id == val.id) {
                    // 把传来的 selected状态 加入到 item 对象中
                    item.selected = val.selected
                    return true
                }
            })
            // 存入本地存储 每次刷新页面数据能加载
            localStorage.setItem("car", JSON.stringify(state.shopCar))
        }
    },
    getters: { // this.$store.getters.xxx
        // 计算 购物车 图标
        countNum(state) {
            let num = 0;
            // 循环 state 数组
            state.shopCar.forEach(item => {
                num += item.count
            })
            return num
        },
        // 计算 单品 数量
        getGoodsCount(state) {
            // 声明一个空对象，用于存放 { item.id : item.count; } 对应id 所对应 的数量
            let o = {}
            state.shopCar.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        // 声明一个空对象，用于存放 { item.id : item.selected; } 对应id 所对应 的数量
        getSelected(state) {
            let o = {}
            state.shopCar.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },

        // 商品总量和总价
        countNumAndPrice(state) {
            let o = {
                totalNum: 0,
                totalPrice: 0
            }
            state.shopCar.forEach(item => {
                if(item.selected) {
                    o.totalNum += item.count
                    o.totalPrice = item.price * o.totalNum
                }
            })
            return o
        }

    }
})

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
import {
    stringify
} from 'querystring';

new Vue({
    el: '#app',
    render: c => c(app),
    router,
    // 挂载至 vm 实例上
    store
})