<template>
  <div class="content">
    <!-- 顶部 header 区域 -->
    <mt-header
      fixed
      title="自助货架"
      style="background: linear-gradient(to top left, #d253b1, #fb6f4a)"
    >
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- <mt-header >
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
      <span class="hd">自助货架</span> 
    </mt-header> -->

    <!-- 中间 router-view 区域 -->
    <transition mode="out-in">
      <router-view></router-view>
    </transition>

    <!-- 底部footer -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/index" class="mui-tab-item1" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/user" class="mui-tab-item1" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/shopcar" class="mui-tab-item1" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-extra mui-icon-extra-express">
          <span class="mui-badge" id="shop_car_icon">{{ $store.getters.countNum }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item1" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">检索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
// import func from '../vue-temp/vue-editor-bridge';
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === "/index" ? false : true;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal === "/index") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mint-header-title {
  margin: 0;
}
.content {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  .hd {
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: linear-gradient(to top left, #d253b1, #fb6f4a);
    color: #fff;
    font-size: 20px;
    z-index: 999;
  }
  .mui-bar {
    .mui-active {
      color: #fff !important;
      background: linear-gradient(to top left, #d253b1, #fb6f4a);
      text-decoration: none;
    }
    .mui-tab-item1 {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
      .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.2s;
  }
}
</style>
