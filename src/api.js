// 导入请求器模块
import request from "./components/request/request.js"
// 首页轮播图
export const getIndexPicApi = params => {
    return request.get("getlunbo", {
        params
    })
}
// 新闻列表
export const getNewsListApi = params => {
    return request.get("getnewslist", {
        params
    })
}
// 新闻详情页
export const getNewsInfoApi = params => {
    return request.get("getnew/" + params)
}

// 评论子组件渲染
export const getCommentApi = (params1, params2) => {
    return request.get("getcomments/" + params1 + "?pageindex=" + params2)
}

// 添加评论
export const postCommentApi = (params1, params2) => {
    return request.post("postcomment/" + params1, {
        content: params2
    })
}

// 渲染图片
export const getPhotosListApi = params => {
    return request.get("getimgcategory", {
        params
    })
}

// 获取分类对应图片
export const getCurrentPhotosApi = params => {
    return request.get("getimages/" + params)
}

// 获取图片详情
export const getPicInfoApi = params => {
    return request.get("getimageInfo/" + params)
}

// 获取缩略图
export const getThumbsApi = params => {
    return request.get("getthumimages/" + params)
}

// 获取商品列表
export const getGoodsListApi = params => {
    return request.get("getgoods?pageindex=" + params)
}

// 获取商品轮播图
export const getGoodsListSlideApi = params => {
    return request.get("getthumimages/" + params)
}

// 获取商品简介
export const getGoodsListInfoIntroApi = params => {
    return request.get("goods/getinfo/" + params)
}

// 获取商品图文详情
export const getGoodsDescApi = params => {
    return request.get("goods/getdesc/" + params)
}

// 获取购物车列表
export const getShopCarListApi = params => {
    return request.get("goods/getshopcarlist/" + params)
}
