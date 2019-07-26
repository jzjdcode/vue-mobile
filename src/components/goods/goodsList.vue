<template>
  <div class="goods-list">
    <ul>
      <!-- 网页中有两种跳转方式：
      1. 使用 a 标签跳转 叫做 标签跳转
      2. 使用 window.location.href 叫做编程式导航-->

      <!-- 要区分 this.$route 和 this.$router 这两个对象
      其中 this.$route 是路由参数对象，所有路由中的参数, parmas, query 都属于它 
      this.$router 是一个路由导航对象，用它可以使用js代码，实现路由的前进和后退、跳转新的 url 地址-->
      <!-- <router-link
        v-for="item in goodslist"
        :key="item.id"
        :to="'/index/goodslist/goodsinfo/' + item.id"
        tag="li"
      >-->
      <li v-for="item in goodslist" :key="item.id" @click="getHref(item.id)">
        <img :src=" item.img_url " :alt="item.title" />
        <div class="goods-content">
          <div class="title">
            <h3>{{ item.title }}</h3>
          </div>
          <div class="info">
            <p>{{ item.zhaiyao }}</p>
          </div>
          <div class="price">
            <span>￥{{ item.sell_price }}</span>
            <del>￥{{ item.market_price }}</del>
          </div>
          <div class="num">
            <p>剩余 {{ item.stock_quantity }} 件</p>
          </div>
        </div>
      </li>
      <mt-button type="danger" plain size="large" @click="getGoodsListMore" v-if="display">加载更多...</mt-button>
    </ul>
  </div>
</template>
<script>
import { getGoodsListApi } from "../../api.js";

export default {
  data() {
    return {
      currentPage: 1,
      goodslist: [],
      display: true
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      getGoodsListApi(this.currentPage).then(res => {
        this.goodslist = this.goodslist.concat(res.message);
        // 当加载到没有数据时隐藏 加载更多
        if (res.message.length < 10) {
          this.display = false;
        }
      });
    },
    getGoodsListMore() {
      this.currentPage++;
      this.getGoodsList();
    },
    // 编程式跳转
    getHref(id) {
      this.$router.push({ name: "goodsInfo", params: { id } });
    }
  }
};
</script>
<style lang="less" scoped>
ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 8px;
  flex-wrap: wrap; // 换行
  justify-content: space-between; // 子盒子默认横向贴边
  li {
    display: flex;
    flex-direction: column; // 内容以纵向排列
    justify-content: space-between; // 以纵向两边贴边
    width: 49%;
    min-height: 300px;
    margin: 0 0 8px 0;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #eee;
    overflow: hidden;
    img {
      width: 100%;
      text-align: center;
      padding: 5px; 
      padding-bottom: 0;
      border-radius: 10px;
    }
    .goods-content {
      background-color: #eee;
      margin: 10px 2px 2px;
      border-radius: 7px;
      .title {
        padding: 0 5px;
        h3 {
          margin-top: 10px;
          font-size: 14px;
          text-align: center;
          color: #333;
          /* 1.0 溢出部分隐藏 */
          overflow: hidden;
          /* 2.0 文字溢出部分显示省略号 */
          text-overflow: ellipsis;
          /* 3.0 需要设置成弹性盒子 */
          display: -webkit-box;
          /* 4.0 最多显示的行数 (不规范的属性) */
          -webkit-line-clamp: 2;
          /* 5.0 子元素的排列方式 (不规范的属性) */
          -webkit-box-orient: vertical;
        }
      }
      .info {
        padding: 0 10px;
        p {
          margin: 0;
          font-size: 13px;
          color: #b0b0b0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          
        }
      }
      .price {
        text-align: center;
        font-size: 14px;
        margin: 10px 0;
        span {
          color: #ff6700;
        }
        del {
          color: #b0b0b0;
        }
      }
      .num {
        text-align: center;
        p {
          font-size: 12px;
          color: #b0b0b0;
        }
      }
    }
  }
}
</style>
