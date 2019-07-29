<template>
  <div class="shopcar-main">
    <!-- 购物车无商品时显示 -->
    <div class="car-info" v-show="car_info" v-cloak>
      <p>{{ carInfo }}</p>
      <mt-button plain type="danger" @click="toGoodsList">去看看</mt-button>
    </div>
    <!-- 购物车商品列表 -->
    <ul id="OA_task_1" class="mui-table-view" v-show="carlist_info">
      <li
        class="mui-table-view-cell mui-transitioning"
        v-for="(item, i) in renderGoodsList"
        :key="item.id"
      >
        <div class="mui-slider-right mui-disabled">
          <a
            class="mui-btn mui-btn-red"
            style="transform: translate(0px, 0px);"
            @click="del(item.id, i)"
          >删除</a>
        </div>
        <div class="mui-slider-handle" style="transform: translate(0px, 0px);">
          <div class="mui-card">
            <div class="mui-card-content">
              <div class="mui-card-content-inner">
                <img :src="item.thumb_path" alt />
                <div class="info">
                  <h4>{{ item.title }}</h4>
                  <div class="price">
                    <span>￥ {{ item.sell_price}}</span>
                    <shopcarbox
                      style="margin: 10px 0"
                      :initcount="$store.getters.getGoodsCount[item.id]"
                      :goodsid="item.id"
                    ></shopcarbox>
                  </div>
                </div>

                <mt-switch
                  v-model="$store.getters.getSelected[item.id]"
                  @change="selectedChange(item.id, $store.getters.getSelected[item.id])"
                ></mt-switch>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 结算 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="clearing">
            <h4>总计（不含运费）</h4>
            <p>
              已勾选商品
              <span>{{ $store.getters.countNumAndPrice.totalNum }}</span> 件 , 总价
              <span>￥{{ $store.getters.countNumAndPrice.totalPrice }}</span>
            </p>
          </div>
          <button type="button" class="mui-btn mui-btn-danger">去买单</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import mui from '../../lib/mui-master/dist/js/mui.js'
import shopcarbox from "../subcomponent/shopcarbox.vue";
import { getShopCarListApi } from "../../api.js";
export default {
  data() {
    return {
      renderGoodsList: [],
      carInfo: "购物车啥也没有...",
      car_info: false,
      carlist_info: false
    };
  },
  components: {
    shopcarbox
  },
  created() {
    this.getShopCarList();
  },
  methods: {
    // 获取购物车列表( 从 $store 本地存储的数据拿到)
    getShopCarList() {
      let goodsList = [];
      this.$store.state.shopCar.forEach(item => goodsList.push(item.id));

      // 如果购物车没有商品则不会发送请求
      if (goodsList.length <= 0) {
        this.car_info = true;
        return;
      }
      getShopCarListApi(goodsList)
        .then(res => {
          this.carlist_info = true;
          this.renderGoodsList = res.message;
          // console.log(this.renderGoodsList);
        })
        .catch(err => {});
    },
    // 删除商品
    del(id, i) {
      // 删除 页面上的数据
      this.renderGoodsList.splice(i, 1);
      if (this.renderGoodsList.length <= 0) {
        this.car_info = true;
        this.carlist_info = false;
      }
      // 删除本地存储的 数据
      this.$store.commit("delGoodsData", id);
    },

    // 跳转到商品列表
    toGoodsList() {
      this.$router.push({ name: "goodsList" });
    },

    // 监听 选择按钮的状态
    selectedChange(id, val) {
      this.$store.commit("updateSeletedChange", { id, selected: val });
    }
  }
};
</script>
<style lang="less" >
[v-cloak] {
  display: none;
}
.shopcar-main {
  background-color: #eee;
  overflow: hidden;
  padding: 0 !important;
  .car-info {
    position: absolute;
    width: 100%;
    color: #bebebe;
    padding-top: 80px;
    text-align: center;
    p {
      font-size: 20px;
    }
  }
  .mui-card {
    border-radius: 10px;
  }
  .mui-table-view-cell {
    padding: 0;
    .mui-card-content-inner {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      align-items: center; // 垂直居中
      img {
        width: 60px;
        margin-right: 10px;
      }
      .info {
        width: 250px;
        h4 {
          text-align: left;
          font-size: 13px;
        }
        .price {
          span {
            color: red;
            font-weight: 700;
            margin-bottom: 10px;
          }
        }
      }
      .mui-switch {
        margin-right: 10px;
      }
    }
  }
  > .mui-card {
    position: fixed;
    bottom: 50px;
    width: 100%;
    margin: 0;
    border-radius: 0;
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    }
    .clearing {
      h4 {
        text-align: left;
        font-size: 14px;
      }
      p {
        font-size: 13px;
        span {
          color: red;
          font-weight: 700;
        }
      }
    }
    .clearing-Btn {
      width: 150px;
      height: 40px;
    }
  }
}
.mui-table-view:before {
  height: 0;
}
.mui-table-view:after {
  height: 0;
}
.mui-table-view-cell:after {
  background-color: #fff;
  height: 0 !important;
}
.mint-switch-input:checked + .mint-switch-core {
  border-color: #d253b1;
  background-color: #d253b1;
}
.mui-table-view {
  background-color: #eee;
  margin-bottom: 85px;
}
.mui-table-view-cell > .mui-slider-handle {
  background-color: #eee;
}
</style>