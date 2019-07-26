<template>
  <div class="main">
    <h4>{{ goodsDesc.title }}</h4>
    <hr />
    <div class="content" v-html="goodsDesc.content"></div>
  </div>
</template>
<script>
import { getGoodsDescApi } from "../../api.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsDesc: []
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      getGoodsDescApi(this.id)
        .then(res => {
          this.goodsDesc = res.message[0];
          console.log(this.goodsDesc);
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" >
.main {
  padding: 10px;
  // width: 100%;
  h4 {
    margin: 10px 0;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #333;
  }
  hr {
    margin: 10px 0;
  }
  .content {
    // width: 100%;.
    text-indent: 2em;

    img {
      text-align: center;
      width: 100%;
      margin-left: -30px;
    }
  }
}
</style>
