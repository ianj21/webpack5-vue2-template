import axios from "axios";
// import { Message } from "element-ui";
// import { Loading } from "element-ui";

let loadingInstance = null;
let requestNum = 0;

const addLoading = () => {
  // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
  requestNum++;
  if (requestNum == 1) {
    // loadingInstance = Loading.service({
    //   text: "正在努力加载中....",
    //   background: "rgba(0, 0, 0, 0)",
    // });
  }
};

const cancelLoading = () => {
  // 取消loading 如果pending请求数量等于0，关闭loading
  requestNum--;
  if (requestNum === 0) loadingInstance?.close();
};

const createServer = (config = {}) => {
  const instance = axios.create({
    timeout: 1000 * 15, //超时配置
    withCredentials: true, //跨域携带cookie
    ...config, // 自定义配置覆盖基本配置
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      const { loading = true } = config;
      config.headers.Authorization = localStorage.getItem("token");
      if (loading) addLoading();
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    (response) => {
      return response.data
      // 对响应数据做点什么
      // const { loading = true } = response.config;
      // if (loading) cancelLoading();
      // const { code, data } = response.data;
      // if (response.data instanceof Blob) {
      //   return response.data;
      // } else {
      //   if (code === 200) return data;
      //   else if (code === 401) {
      //     // 无权限跳转登录
      //   } else {
      //     //  Message.error(message);
      //     return Promise.reject(response.data);
      //   }
      // }
    },
    (error) => {
      // 对响应错误做点什么
      const { loading = true } = error.config;
      if (loading) cancelLoading();
      if (error.response) {
        if (error.response.status === 401) {
          // 无权限跳转登录
        }
      }
      // Message.error(error?.response?.data?.message || "服务端异常");
      return Promise.reject(error);
    }
  );
  return instance;
};

export const request = createServer({
  baseURL: process.env.VUE_APP_BASE_URL,
});
