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
      v-if="display"
    >加载更多...</button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { getCommentApi } from "../../api.js";
import { postCommentApi } from "../../api.js";

export default {
  data() {
    return {
      currentPage: 1,
      commentsarr: [],
      msg: "",
      display: true
    };
  },
  created() {
    this.getComment();
  },
  props: ["id"], // 父组件传值
  methods: {
    // 获取评论
    getComment() {
      getCommentApi(this.id, this.currentPage).then(res => {
        this.commentsarr = this.commentsarr.concat(res.message);
        // 当加载到没有数据时隐藏 加载更多
        if (res.message.length < 10) {
          this.display = false;
        }
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
      postCommentApi(this.id, this.msg).then(res => {
        var userinfo = {
          user_name: "匿名用户",
          add_time: Date.now(),
          content: this.msg
        };
        this.commentsarr.unshift(userinfo);
        this.msg = "";
      });
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
  > .mui-table-view {
      background-color: transparent;
    margin-bottom: 0;
    
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
  .mui-table-view:after {
    height: 1px;
  }
}
</style>
