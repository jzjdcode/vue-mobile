<template>
  <div class="goodsInfo-main">
    <!-- 轮播图区 -->
    <div class="mui-card">
      <!--内容区-->
      <div class="mui-card-content">
        <!-- 轮播图 -->
        <slide :swipelist="goodsListInfoSlide"></slide>
      </div>
    </div>
    <!-- 小球运动 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="showball" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">
        <h4 class="title">{{ goodsListInfoIntro.title }}</h4>
      </div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="price">
          市场价：
          <del>￥{{ goodsListInfoIntro.market_price }}</del>
          销售价：
          <span>￥{{ goodsListInfoIntro.sell_price }}</span>
        </div>
        <div class="buy-num">
          购买数量：
          <!-- 数字输入框组件 -->
          <numbox
            style="display: inline-block; margin-right: 10px; margin-bottom: 10px"
            @getMaxCount="getMaxNumCount"
            :maxNum="goodsListInfoIntro.stock_quantity"
          ></numbox>
          <br />剩余数量：
          <span>{{ goodsListInfoIntro.stock_quantity }} 件</span>
        </div>
        <div class="buy-btn">
          <button
            type="button"
            class="mui-btn mui-btn-primary"
            style="margin-right: 10px"
            @tap="addShopCar"
          >加入购物车</button>
          <button type="button" class="mui-btn mui-btn-danger">立即购买</button>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">商品参数</div>
      <!--内容区-->
      <div class="mui-card-content">
        <p>商品货号：{{ goodsListInfoIntro.goods_no }}</p>
        <!-- <p>库存数量：{{ goodsListInfoIntro.stock_quantity }} 件</p> -->
        <p>上架时间：{{ goodsListInfoIntro.add_time | dateFormat }}</p>
      </div>
      <!--页脚，放置补充信息或支持的操作-->
      <div class="mui-card-footer">
        <button
          class="mint-button mint-button--primary mint-button--large is-plain"
          @tap="getGoodsDesc(goodsListInfoIntro.id)"
        >
          <!---->
          <label class="mint-button-text">图文介绍</label>
        </button>
        <button
          class="mint-button mint-button--danger mint-button--large is-plain"
          @tap="getGoodsComm(goodsListInfoIntro.id)"
        >
          <!---->
          <label class="mint-button-text">商品评价</label>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { getGoodsListSlideApi } from "../../api.js";
import slide from "../subcomponent/slide.vue";
import { getGoodsListInfoIntroApi } from "../../api.js";
import numbox from "../subcomponent/numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsListInfoSlide: [],
      goodsListInfoIntro: {},
      showball: false,
      maxCount: 1 // 默认商品数量为1
    };
  },
  created() {
    // this.getId()
    this.getGoodsListSlide();
    this.getGoodsListInfoIntro();
  },
  methods: {
    // 获取商品轮播图
    getGoodsListSlide() {
      getGoodsListSlideApi(this.id).then(res => {
        res.message.forEach(item => {
          item.img = item.src;
        });
        this.goodsListInfoSlide = res.message;
      });
    },
    // 获取商品介绍详情
    getGoodsListInfoIntro() {
      getGoodsListInfoIntroApi(this.id).then(res => {
        this.goodsListInfoIntro = res.message[0];
        // console.log(this.goodsListInfoIntro);
      });
    },
    // 跳转图文介绍(编程式跳转)
    getGoodsDesc(id) {
      this.$router.push({ name: "goodsDesc", params: { id } });
    },
    // 跳转商品评论(编程式跳转)
    getGoodsComm(id) {
      this.$router.push({ name: "goodsComm", params: { id } });
    },
    // 加入购物车(小球图标)
    addShopCar() {
      this.showball = !this.showball;
      // { id: 商品id, count: 购买数, price: 单价, selected: true（是否为选中）} 需要存储在 vuex 中的商品对象
      let addGoodsList = {
        id: this.id,
        count: this.maxCount,
        price: this.goodsListInfoIntro.sell_price,
        stock: this.goodsListInfoIntro.stock_quantity,
        selected: true
      };
      // 调用 vuex 中的 addToShopCar 方法，将商品信息传入 mutations 方法中
      this.$store.commit("addToShopCar", addGoodsList)
    },
    // 小球运动钩子函数
    // 小球动画优化思路
    // 1. 动画不准确原因：由于位移距离固定了某个坐标 上，所以当屏幕或者分辨率改变时，就会出现 小球位置不准确
    // 2. 即需要动态计算 小球位移
    // 3. 用购物车的绝对位置 - 小球相对于屏幕位置坐标 = 小球相对于购物车的相对位置
    // 4. 如何获取小球位置: domObject.getBoundingClienRect()
    beforeEnter(el) {
      // 起始位置
      //  el.style.opacity = 1;
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 获取到小球的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();

      // 获取到购物车图标的位置
      const shopCarIocnPosition = document
        .querySelector("#shop_car_icon")
        .getBoundingClientRect();
      // 小球相对于购物车图标的位置
      const relaDistX = shopCarIocnPosition.left - ballPosition.left;
      const relaDistY = shopCarIocnPosition.top - ballPosition.top;

      // 相对位移
      el.style.transform = `translate(${relaDistX}px, ${relaDistY}px)`;
      // 过渡效果
      el.style.transition = "all .3s";
      done();
    },
    afterEnter(el) {
      // 位移结束后隐藏小球
      this.showball = !this.showball;
    },
    getMaxNumCount(count) {
      this.maxCount = count;
      //   console.log(this.maxCount);
    }
  },
  components: {
    slide,
    numbox
  }
};
</script>
<style lang="less" scoped>
.goodsInfo-main {
  background-color: #eee;
  overflow: hidden;
  .ball {
    position: absolute;
    top: 383px;
    left: 152px;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    z-index: 999;
  }
  .mui-card {
    .mui-card-header {
      padding: 10px 5px 0 10px;
      .title {
        text-align: left;
        font-size: 14px;
      }
    }
    .mui-card-content {
      padding: 10px;
      .price {
        //   padding: 10px;
        font-size: 13px;
        del {
          color: #929292;
          margin-right: 15px;
        }
        span {
          color: #cc1e1e;
        }
      }
      .buy-num {
        padding: 10px 0;
        font-size: 13px;
      }
      .buy-btn {
        display: flex;
        button {
          flex: 50%;
        }
      }
    }
    .mui-card-footer {
      display: block;
      .mint-button--primary {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
