import VueRouter from 'vue-router'

// 导入 tabbar 组件
import index from './components/tabbar/index.vue'
import user from './components/tabbar/user.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'

// 3. 创建路由对象
let router = new VueRouter({
  routes: [
    { path: '/', redirect: 'index' },
    { path: '/index', component: index},
    { path: '/user', component: user},
    { path: '/shopcar', component: shopcar},
    { path: '/search', component: search},
  ],
  linkActiveClass: 'mui-active' // 替换默认的高亮的active类
})

// 把路由对象暴露出去
export default router