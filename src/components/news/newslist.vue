<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/index/newslist/newslistinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <span class="title">{{ item.title }}</span>
            <p>{{ item.zhaiyao }}</p>
            <p class="mui-ellipsis">
              <span>{{ item.add_time | dateFormat}}</span>
              <span class="touch">浏览: {{ item.click }} 次</span>
            </p>
          </div>
        </router-link>
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
      newslist: []
    };
  },
  created() {
    Indicator.open({
      text: "马上就好...",
      spinnerType: "double-bounce"
    });
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http
        .get("api/getnewslist")
        .then(res => {
          if (res.data.status == 0) {
            Indicator.close();
            this.newslist = res.data.message;
          }
        })
        .catch(err => {
          Indicator.close();
          Toast({
            message: "获取新闻列失败",
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
.mui-table-view {
  .mui-table-view-cell {
    height: 100px;
    padding: 0 10px;
    a {
      height: 100%;
      text-decoration: none;
      margin: 20px 0 0;
      img {
        border-radius: 7px;
      }
      .mui-media-body {
        .title {
          font-size: 18px;
          font-weight: 700;
        }
        .mui-ellipsis {
          display: flex;
          margin-top: 10px;
          justify-content: space-between;
          span {
            // flex: 50%;
            color: #d253b1;
          }
        //   .touch {
        //     text-align: right;
        //   }
        }
      }
    }
  }
}
</style>
