<template>
  <div>
    <div class="photo-container" v-for="item in picinfo" :key="item.id">
      <h4 class="title">{{ item.title }}</h4>
      <div class="time-click">
        <span>发布时间：{{ item.add_time | dateFormat}}</span>
        <span>浏览：{{ item.click }}次</span>
      </div>

      <!-- 缩略图 -->
      <div class="thumbs">
        <vue-preview :slides="slide1"></vue-preview>
      </div>

      <!-- 内容区 -->
      <div class="content" v-html="item.content"></div>
      <!-- 评论区 -->
      <!-- 父组件传入id值 -->
      <comment-box :id="item.id"></comment-box>
    </div>
  </div>
</template>
<script>
// 导入评论子组件
import comments from "../subcomponent/comment.vue";
import { getPicInfoApi } from "../../api.js";
import { getThumbsApi } from "../../api.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      picinfo: [],
      slide1: []
    };
  },
  // 注册子组件
  components: {
    "comment-box": comments
  },
  created() {
    this.getPicInfo();
    this.getThumbs();
  },
  methods: {
    // 获取图片详情
    getPicInfo() {
      // this.$http
      //   .get("api/getimageInfo/" + this.id)
      getPicInfoApi(this.id).then(res => {
        // if (res.data.status == 0) {
        //   this.picinfo = res.data.message;
        // }
        this.picinfo = res.message;
      });
      // .catch(err => {});
    },
    // 获取缩略图
    getThumbs() {
      // this.$http
      //   .get("api/getthumimages/" + this.id)
      getThumbsApi(this.id).then(res => {
        // if (res.data.status == 0) {
        //   // console.log(res.data.message)
        //   res.data.message.forEach(el => {
        //     el.w = 600;
        //     el.h = 400;
        //     el.msrc = el.src;
        //   });
        //   this.slide1 = res.data.message;
        // }
        res.message.forEach(el => {
          el.w = 600;
          el.h = 400;
          el.msrc = el.src;
        });
        this.slide1 = res.message;
      });
      // .catch(err => {});
    }
  }
};
</script>
<style lang="less" >
.photo-container {
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
    text-indent: 2em;
  }
  .thumbs {
    overflow: hidden;
    margin-bottom: 10px;
    .my-gallery {
      a {
        img {
          float: left;
          width: 80px;
          height: 80px;
          margin-right: 5px;
          margin-bottom: 5px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
