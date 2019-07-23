<template>
  <div>
    <div class="new-container" v-for="item in newsinfo" :key="item.id">
      <h4 class="title">{{ item.title }}</h4>
      <div class="time-click">
        <span>发布时间：{{ item.add_time | dateFormat}}</span>
        <span>浏览：{{ item.click }}次</span>
      </div>
      <!-- 内容区 -->
      <div class="content" v-html="item.content" ></div>
      <!-- 评论区 -->
      <!-- 父组件传入id值 -->
      <comment-box :id="item.id"></comment-box>
    </div>
  </div>
</template>
<script>

import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

import { getNewsInfoApi } from '../../api.js'

// 导入评论区子组件
import comment from "../subcomponent/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: []
    };
  },
  created() {
    // Indicator.open({
    //   text: "马上就好...",
    //   spinnerType: "double-bounce"
    // });
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      // this.$http
      //   .get("api/getnew/" + this.id)
        getNewsInfoApi(this.id)
        .then(res => {
          // if (res.data.status == 0) {
          //   Indicator.close();
          //   this.newsinfo = res.data.message;
          // }
          this.newsinfo = res.message;
        })
        // .catch(err => {
        //   Indicator.close();
        //   Toast({
        //     message: "获取新闻失败",
        //     position: "middel",
        //     duration: 3000,
        //     iconClass: "glyphicon glyphicon-alert"
        //   });
        // });
    }
  },
  components: {
    // 注册子组件
    "comment-box": comment
  }
};
</script>
<style lang="less">
.new-container {
  padding: 0 10px;
  .title {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
  .time-click {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: #d253b1;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
