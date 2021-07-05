import Vue from 'vue'
import App from './App'

import uView from 'uview-ui';
import Request from '@/js_sdk/luch-request/luch-request/index.js'

const api = new Request();
Vue.prototype.$api = api // 全局使用第三方插件
// 请求拦截器
api.interceptors.request.use((config) => { // 可使用async await 做异步操作
  config.header = {
    ...config.header,
  //  token: 1 // 演示拦截器header加参
  }
  // 演示custom 用处
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  // if (config.custom.loading) {
  //  uni.showLoading()
  // }
  /**
   /* 演示
   if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
      return Promise.reject(config)
    }
   **/
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

api.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
  //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
  //  if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // 	}
  // console.log('response拦截器：'+ JSON.stringify(response))
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})


Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
