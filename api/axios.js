import querystring from "querystring";

import axios from "axios";
import { SERVER_HOST, SERVER_DOMAIN, SERVER_PORT } from "../config";

const ax = axios.create({
  baseURL: !process.client
    ? `http://${SERVER_HOST}:${SERVER_PORT}/api`
    : "/api",
  withCredentials: true // send cookies when cross-domain requests
});

// 拦截器
ax.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (!config.timeout) {
    //   config.timeout = 5000
    // }
    config.headers["Domain"] = `http://${SERVER_DOMAIN}:${SERVER_PORT}`;
    return config;
  },
  data => {
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

ax.interceptors.response.use(
  response => {
    // if (response && response.data.code !== 1) {
    //   if (window) window.alert('出错了：' + response.data.message);
    // }

    return response;
  },
  error => {
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes("timeout")) {
        console.log("超时了");
        window.alert("请求超时，请检查网络是否连接正常");
      } else {
        // 可以展示断网组件
        console.log("断网了11111111111");
        //window.alert('请求失败，请检查网络是否已连接');
      }
    }
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default ax;
