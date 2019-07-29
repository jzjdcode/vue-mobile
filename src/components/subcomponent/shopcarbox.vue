<template>
  <div>
    <!-- 数组输入框组价 -->
    <div class="mui-numbox" data-numbox-min="1">
      <!-- "-"按钮，点击可减小当前数值 -->
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <!-- change 事件监听到输入框中值的改变 -->
      <input class="mui-numbox-input" type="number" :value="initcount" ref="numbox" @change="countChange" />
      <!-- "+"按钮，点击可增大当前数值 -->
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui-master/dist/js/mui.js";
export default {
  props: ["maxNum"],
  mounted() {
    mui(".mui-numbox").numbox();
    // console.log(this.maxNum);
  },
  methods: {
    // 监听 数量发生改变
    // 没当数值改变，则立即把最新的数量同步到 购物车 store 中，覆盖之前的数量
    countChange() {
      this.$store.commit("updateGoodsNum", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: [ "initcount", "goodsid"],
};
</script>
<style lang="less" >
.mui-numbox {
  height: 25px;
}
</style>
