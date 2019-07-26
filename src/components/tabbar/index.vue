<template>
  <div>
    <!-- 轮播图 -->
    <slide :swipelist="swipeArr"></slide>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/index/newslist">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">News</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/index/photoslist">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/index/goodslist">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">天猫购</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">充值</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">Search</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">列表</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getIndexPicApi } from "../../api.js";

// 引入轮播图组件
import slide from "../subcomponent/slide.vue";

export default {
  data() {
    return {
      swipeArr: []
    };
  },
  created() {
    this.getPic();
  },
  components: {
    slide
  },
  methods: {
    // 发起图片请求
    getPic() {
      getIndexPicApi().then(res => {
        this.swipeArr = res.message;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  img {
    height: 100%;
    width: 100%;
  }
}
.mui-table-view {
  background-color: #fff;
  border: 0;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 14px;
  }
  .mui-active {
    background-color: #fff !important;
    text-decoration: none !important;
  }
  .mui-table-view-cell {
    a {
      text-decoration: none;
    }
  }
}
</style>
