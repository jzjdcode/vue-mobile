<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div
          class="mui-scroll"
          style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;"
        >
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in photoArr"
            :key="item.id"
            @click="getCurrentPhotos(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <!-- 图片展示 -->
    <div class="photos">
      <ul>
        <router-link v-for="item in photoList" :key="item.id" tag="li" :to="'/index/photoslist/photoinfo/' + item.id">
          <img v-lazy="item.img_url" />
          <div class="title-box">
            <h5>{{ item.title }}</h5>
            <p>{{ item.zhaiyao }}</p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui-master/dist/js/mui.js";
export default {
  data() {
    return {
      photoArr: [],
      photoList: []
    };
  },
  created() {
    this.getPhotosList();
    this.getCurrentPhotos(0);
  },
  mounted() {
    this.scroll();
  },
  methods: {
    // babel-plugin-transform-remove-strict-mode 由于 mui 中语法与webpack严格模式冲突，导致报错
    // 以上的包 能关闭 webpack 的严格模式 让 mui 无报错
    scroll() {
      mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },

    // 渲染图片分类
    getPhotosList() {
      this.$http
        .get("api/getimgcategory")
        .then(res => {
          if (res.data.status == 0) {
            this.photoArr = res.data.message;
            this.photoArr.unshift({ id: 0, title: "全部" });
          }
        })
        .catch(err => {});
    },

    // 获取各个分类对应图片
    getCurrentPhotos(id) {
      this.$http
        .get("api/getimages/" + id)
        .then(res => {
          if (res.data.status == 0) {
            this.photoList = res.data.message;
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
* {
  touch-action: pan-y;
}
.mui-active {
  text-decoration: none;
  color: #d253b1 !important;
}
.mui-slider {
  position: fixed;
  top: 40px;
  background-color: #fff;
}
.photos {
  margin-top: 38px;
}
ul {
  margin: 0;
  padding: 10px;
  // height: 300px;
  li {
    position: relative;
    list-style: none;
    margin-bottom: 20px;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ccc;
    img {
      width: 100%;
    }
    img[lazy=loading] {
      width: 40px;  
      height: 300px;
      margin: auto;
    }
    .title-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 10px;
      background-color: #00000080;
      text-align: left;
      h5 {
        margin: 0 0 5px;
        font-weight: 700;
        font-size: 14px;
        color: #ffffffe0;
      }
      p {
        margin: 0;
        color: #ffffffb9;
        font-size: 12px;
        text-indent: 2em;
      }
    }
  }
}
</style>
