<template>
  <div class="content">
    <!-- 顶部 header 区域 -->
    <mt-header
      fixed
      title="自助货架"
      style="background: linear-gradient(to top left, #d253b1, #fb6f4a); font-size: 20px"
    ></mt-header>

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
          <span class="mui-badge">0</span>
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
</script>
<style lang="less" scoped>
.content {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  .mui-bar {
    .mui-active {
      color: #fff!important;
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
    transition: all 0.3s;
  }
}
</style>
