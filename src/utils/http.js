import Vue from 'vue'
import axios from 'axios'
// import { Message } from 'element-ui';

// const baseURL = process.env.NODE_ENV === 'development' ? 'http://love.hankin.ufutx.cn' : 'http://love.ufutx.com'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://love.hankin.ufutx.cn'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
    // config.headers['Origin'] = 'http://love.ufutx.com'
    config.url = config.url + '?XDEBUG_SESSION_START=1&paas=' + localStorage.getItem('paasName')
    console.log(config)
    // if(token){
    //   config.params = {'token':token}
    // }
    return config
  },
  error => {
    return Promise.reject(err)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: '/login',
        querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
// Vue.use(axios)
require('es6-promise').polyfill()
