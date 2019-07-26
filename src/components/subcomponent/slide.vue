<template>
  <div>
    <!-- 轮播图 -->
    <!-- 谁用轮播图就需要传递 v-for 的数组 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in swipelist" :key="item.id">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["swipelist"]
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
</style>
