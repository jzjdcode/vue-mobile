<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in swipeArr" :key="item.id">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
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
        <a href="#">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">天猫购</div>
        </a>
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
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      swipeArr: null
    };
  },
  created() {
    Indicator.open({
      text: "马上就好...",
      spinnerType: "double-bounce"
    });
    this.getPic();
  },
  methods: {
    // 发起图片请求
    getPic() {
      this.$http
        .get("api/getlunbo")
        .then(res => {
          if (res.body.status == 0) {
            Indicator.close();
            this.swipeArr = res.body.message;
          }
        })
        .catch(err => {
          Indicator.close();
          Toast({
            message: "获取图片失败",
            position: "middel",
            duration: 3000,
            iconClass: "glyphicon glyphicon-alert"
          });
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
