<template>
  <div>
    <!-- 数组输入框组价 -->
    <div class="mui-numbox" data-numbox-min="1">
      <!-- "-"按钮，点击可减小当前数值 -->
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <!-- change 事件监听到输入框中值的改变 -->
      <input class="mui-numbox-input" type="number" value="1" @change="countChange" ref="numbox" />
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
    countChange() {
      // 每当文本框数据被修改的时候，把 最新的数据，通过事件传递给父组件
      this.$emit("getMaxCount", parseInt(this.$refs.numbox.value));
      console.log(this.$refs.numbox.value);
    }
  },
  watch: {
    // 监听 maxNum
    maxNum: function(newval, oldval) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newval); // 官网文档固定写法 max 
      // console.log(newval);
    }
  }
};
</script>
<style lang="less" >
.mui-numbox {
  height: 25px;
}
</style>
