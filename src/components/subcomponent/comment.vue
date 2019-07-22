<template>
  <div class="comment">
    <!-- 发表评论 -->
    <p class="title">发表评论</p>
    <hr />
    <textarea maxlength="120" placeholder="评论数不超过120字" v-model="msg"></textarea>
    <button type="button" class="mui-btn mui-btn-primary" @click="postcomment">发表</button>
    <hr />
    <!-- 评论区 -->
    <p class="bd">评论区</p>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell" v-for="(item, i) in commentsarr" :key="i">
        <p class="hd">
          #{{ i + 1 == 1 ? '沙发': i + 1}}&nbsp;&nbsp;&nbsp;&nbsp;用户：{{ item.user_name }}
          <span>发表时间：{{ item.add_time | dateFormat}}</span>
        </p>
        <div class="commentContent">{{ item.content == "" ? '这位用户很懒，什么也没写': item.content}}</div>
      </li>
    </ul>

    <!-- 加载更多 -->
    <button
      type="button"
      class="mui-btn mui-btn-success mui-btn-outlined getmore"
      @click="getMore"
    >加载更多...</button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      currentPage: 1,
      commentsarr: [],
      msg: ""
    };
  },
  created() {
    this.getComment();
  },
  props: ["id"], // 父组件传值
  methods: {
    // 获取评论
    getComment() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.currentPage)
        .then(res => {
          if (res.data.status == 0) {
            // 每当获取新评论数，把旧数据与新数据进行拼接
            this.commentsarr = this.commentsarr.concat(res.data.message);
          }
        })
        .catch(err => {
          Toast({
            message: "获取评论失败",
            position: "middel",
            duration: 3000,
            iconClass: "glyphicon glyphicon-alert"
          });
        });
    },
    // 获取更多评论
    getMore() {
      this.currentPage++;
      this.getComment();
    },
    // 发表评论
    postcomment() {
      // 发送 post 请求
      this.$http
        .post("api/postcomment/" + this.id, {
          content: this.msg
        })
        .then(res => {
            // console.log(res.data);
            if(res.data.status == 0) {
                var userinfo = { user_name: '匿名用户', add_time: Date.now(), content: this.msg }
                this.commentsarr.unshift(userinfo)
                this.msg = ""
            }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
.comment {
  .title,
  .bd {
    width: 100px;
    margin-top: 20px;
    text-align: left;
    font-weight: normal;
    font-size: 16px;
    color: #333;
    padding: 5px;
    text-align: center;
    background-color: #d253b1;
    border-radius: 7px;
    color: #fff;
  }
  hr {
    margin: 5px;
  }
  textarea {
    font-size: 12px;
    color: #333;
  }
  .mui-btn {
    width: 100%;
    border-radius: 7px;
  }
  .mui-table-view {
    .mui-table-view-cell {
      padding: 3px 0 10px;
      .hd {
        font-size: 12px;
        background-color: #eee;
        span {
          float: right;
        }
      }
      .commentContent {
        padding: 20px 10px 0;
      }
    }
  }
  .getmore {
    margin: 20px 0;
  }
}
</style>
