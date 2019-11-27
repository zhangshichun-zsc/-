/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import QS from 'qs'
import store from '../store/index'

/**
 * 服务器地址
 */
const SERVICE_URL = {
  API_URL: [
    'https://rhzgtest.co-inclusion.org/rhzg-web', // 测试服务器 0
    'http://192.168.0.6:8084/rhzg-web', // 余海 1  192.168.0.6
    'http://192.168.0.14:8084/rhzg-web', // 张飞飞 2
    "http://192.168.0.9:8084/rhzg-web", //张向阳 3
    'http://192.168.0.11:8084/rhzg-web', // 竺文聪 4
    'http://192.168.0.11:8083/rhzg-app-server', // 竺文聪 5 //图片上传
    'http://192.168.0.5:8084/rhzg-web', // 王盛
  ],
  API_INDEX: 4

}

export const orgimg = (SERVICE_URL.API_URL[SERVICE_URL.API_INDEX] + '/pic/upload').slice(5) //组织管理-上传图片

export const userExprotUrl = SERVICE_URL.API_URL[SERVICE_URL.API_INDEX] // 导出文件




axios.defaults.baseURL = SERVICE_URL.API_URL[SERVICE_URL.API_INDEX]


// 请求超时时间
axios.defaults.timeout = 100000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {

    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const userId = localStorage.setItem('userId')
    // console.log(userId)

    // config.params=qs.stringify({
    //   userId:userId,
    //   // appId:appId,
    //   ...config.params
    // })
    // config.params.set('userId',userId);
    //  config.data.set('appId',appId);
    // if(config.method==='post'){
    //   config.params=qs.stringify({
    //     userId:userId,
    //     appId:appId,
    //     ...config.params
    //   })
    // }else if(config.method==='get'){
    //   config.params={
    //     userId:userId,
    //     appId:appId,
    //     ...config.params
    //   }
    // }
    return config
  },
  error => {
    return Promise.error(error)
  })

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function gets(url, params) {
  return new Promise((resolve, reject) => {
    // let token = localStorage.getItem("token");
    axios.get(url, params, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求  application/json;charset=UTF-8请求头
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function posts(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.parse(QS.stringify(params)), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }).then(res => {
      resolve(res.data)
    })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function postdel(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export const upload = (p) => {
  return new Promise((resolve, reject) => {
    axios.post('/pic/upload', p, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}