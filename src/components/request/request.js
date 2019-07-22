// 导入 axios 模块
import axios from 'axios'
// mintui 弹框
import { Toast } from 'mint-ui'

// 自定义 axios 实例
const resInstance = axios.create({
    // 基准url 
    baseURL: 'http://47.110.139.196',
    // 响应超时时间
    timeout: 20000,
    // 请求头 
    headers: { 'Content-Type': 'application/json' } // 对于 复杂数据类型使用 json
})

// 请求拦截器
resInstance.interceptors.request.use( config => {
    return config // 对请求发出之前对 config 进行配置修改
}, err => {
    Toast("请求发送失败了")
    return Promise.reject(err) // 请求失败返回 promise.reject(err)
} )

// 响应拦截器
resInstance.interceptors.response.use( res => {
    // 浏览器状态码为 200 时返回响应res
    Toast("响应成功")
    // 判断res 中的 status 值
    if(res.data.status == 0) res.data
    if(res.data,status !== 0) Promise.reject(res)

}, err => {
    Toast("请求不到后台数据")
    return Promise.reject(err)
})

// 暴露axios 实例
export default resInstance