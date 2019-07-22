<template>
  <div class="goods-list">
    <ul>
      <router-link v-for="item in goodslist" :key="item.id" :to="'/index/goodslist/goodsinfo/' + item.id" tag="li">
        <img :src=" item.img_url " alt />
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
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http
        .get("api/getgoods?pageindex=" + this.currentPage)
        .then(res => {
          if (res.data.status == 0) {
            this.goodslist = res.data.message;
            console.log(this.goodslist);
          }
        })
        .catch(err => {});
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
  justify-content: space-between; // 子盒子贴边
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
