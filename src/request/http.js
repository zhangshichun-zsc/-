/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import QS from "qs";
import store from "../store/index";
import router from "../router/index";

/**
 * 服务器地址
 */
const SERVICE_URL = {
  API_URL: [
    "https://rhzgtest.co-inclusion.org/rhzg-web", // 测试服务器 0
    "http://192.168.0.6:8084/rhzg-web", // 余海 1  192.168.0.6
    "http://192.168.0.14:8084/rhzg-web", // 张飞飞 2
    "http://192.168.0.9:8084/rhzg-web", //张向阳 3
    "http://192.168.0.11:8084/rhzg-web", // 竺文聪 4
    "http://192.168.0.11:8083/rhzg-app-server", // 竺文聪 5 //图片上传
    "http://192.168.0.5:8084/rhzg-web" // 王盛 6
  ],
  API_INDEX: 1
}

export const orgimg = (SERVICE_URL.API_URL[SERVICE_URL.API_INDEX] + '/pic/upload').slice(5) //组织管理-上传图片

const token = localStorage.getItem("token");

export const userExprotUrl = SERVICE_URL.API_URL[SERVICE_URL.API_INDEX]; // 导出文件

axios.defaults.baseURL = SERVICE_URL.API_URL[SERVICE_URL.API_INDEX];

// axios.defaults.withCredentials = true  //让ajax携带cookie

// 请求超时时间
axios.defaults.timeout = 100000;

// post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (router.currentRoute.fullPath.indexOf('/login') != -1) {
      //登录接口,不做token信息添加
    } else {
      // console.log(store.state.token)
      //非登录接口,为了一些权限接口,做token信息添加
      if (config.method === "post") {
        config.url = `${config.url}?token=${store.state.token}`;
      } else if (config.method === "get") {
        config.params = {
          token: store.state.token,
          ...config.params
        };
      } else if (config.method === "options") {
        // config.url = `${config.url}?token=${store.state.token}`;
      }
    }
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {

    if (response.data.code == 107) {
      router.currentRoute.path != "/login" &&
        router.replace({
          path: "/login",
          query: {
            redirect: router.currentRoute.path
          }
        });
    } else if (response.data.code == 105) {
      router.currentRoute.path != "/login" &&
        router.replace({
          path: "/login",
          query: {
            redirect: router.currentRoute.path
          }
        });
    } else if (response.data.code == 1003) {

    }
    return response;
  }
  // error => {
  //   console.log(error)
  //   if (error.response) {
  //     switch (error.response.status) {
  //       case 106:
  //         console.log(11)
  //         this.$router.push({
  //           name: 'login'
  //         })
  //         // 401 清除token信息并跳转到登录页面
  //         localStorage.clear();
  //         // 只有在当前路由不是登录页面才跳转
  //         router.currentRoute.path != '/login' &&
  //           router.replace({
  //             path: '/login',
  //             // query: { redirect: router.currentRoute.path },
  //           });
  //     }
  //   }
  //   return Promise.reject(error.response.data)
  // },
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  // params.token = token
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params }
      )
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
// export function gets(url, params) {
//   return new Promise((resolve, reject) => {
//     let token = localStorage.getItem("token");
//     axios.get(url, params, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//     })
//       .then(res => {
//         resolve(res.data)
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   })
// }

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  // url = `${url}?token=${token}`
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求  application/json;charset=UTF-8请求头
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function posts(url, params) {
  // url = `${url}?token=${token}`
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.parse(QS.stringify(params)), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function postdel(url, params) {
  // url = `${url}?token=${token}`
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export const upload = p => {
  // p.token = token
  return new Promise((resolve, reject) => {
    axios
      .post("/pic/upload", p, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};
