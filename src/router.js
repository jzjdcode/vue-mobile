import VueRouter from 'vue-router'

// 导入 tabbar 组件
import index from './components/tabbar/index.vue'
import user from './components/tabbar/user.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import newsList from './components/news/newslist.vue'
import newsListInfo from './components/news/newslistinfo.vue'
import photosList from './components/photos/photoslist.vue'
import photoInfo from './components/photos/photoinfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import goodsDesc from './components/goods/goodsDesc.vue'
import goodsComm from './components/goods/goodsComm.vue'

// 3. 创建路由对象
let router = new VueRouter({
  routes: [
    { path: '/', redirect: 'index' },
    { path: '/index', component: index},
    { path: '/user', component: user},
    { path: '/shopcar', component: shopcar},
    { path: '/search', component: search},
    { path: '/index/newslist', component: newsList },
    { path: '/index/newslist/newslistinfo/:id', component: newsListInfo },
    { path: '/index/photoslist', component: photosList },
    { path: '/index/photoslist/photoinfo/:id', component: photoInfo },
    { path: '/index/goodslist', component: goodsList },
    { path: '/index/goodslist/goodsinfo/:id', component: goodsInfo, name: "goodsInfo" },
    { path: '/index/goodslist/goodsinfo/goodsdesc/:id', component: goodsDesc, name: 'goodsDesc' },
    { path: '/index/goodslist/goodsinfo/goodscomm/:id', component: goodsComm, name: 'goodsComm' },
  ],
  linkActiveClass: 'mui-active' // 替换默认的高亮的active类
})

// 把路由对象暴露出去
export default router