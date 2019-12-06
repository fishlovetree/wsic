import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
// import {Loading} from 'element-ui'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://193.168.1.101:11010'//电力
// axios.defaults.baseURL = 'http://193.168.1.199:11020'//水务
// axios.defaults.baseURL = 'http://193.168.1.114:11030'//消防
// axios.defaults.baseURL = 'http://193.168.1.114:11020'
axios.defaults.timeout = 40000

// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  // 获取localStorage中的token如果有则添加，如果没有则不添加
  const token = localStorage.getItem('token')
  token ? config.headers.common['Authorization'] =  token : null
  // Loading.service({text:"Loading..."});
  //处理数据格式
  config.method === 'post'
  ? config.data = qs.stringify({...config.data})
  : config.params = {...config.params};
  return config
}, (err) => {
  // Message.error({message: '请求超时!'});
  return Promise.reject(err)
})

// 添加一个响应拦截器
axios.interceptors.response.use((res) => {
  if (res.code === 401) {
    // 跳转到登录页
    router.push('/login')
  }
  // else if(res.data.code == 1) {
  //   Message.success('请求成功')
  // }else {
  //   Message.error(res.data.msg)
  // }
  // 对响应数据做点什么
  return res;
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 再重新将设置好的axios作为模块导出
export default axios