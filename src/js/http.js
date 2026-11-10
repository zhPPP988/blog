import axios from "axios";
import forge from "node-forge";

const BASE_URL = "http://127.0.0.1:3000";

const REQUEST_MAP = {
  login: {
    withTks: true,
    path: "/login",
    method: "POST",
    rsaName: "pwd",
  },
  register: {
    withTks: true,
    path: "register",
    method: "POST",
    rsaName: "pwd|confirmPwd",
  },
  index: {
    withTks: true,
    path: "/",
    method: "GET",
  },
  pubKey: {
    withTks: false,
    path: "getPbk",
    method: "GET",
  },
};

export default class Http {
  constructor({ type = "index", data = {} }) {
    this.type = type;
    this.data = data;
    this.request = axios.create({ timeout: 6000, baseURL: BASE_URL });
    this.init();
  }

  init() {
    let type = this.type;
    if (!(type in REQUEST_MAP)) {
      return false;
    }
    Object.assign(this, REQUEST_MAP[type]);
    if (this.withTks) {
      this.request.defaults.withCredentials = true;
    }
  }

  async send() {
    let { path, method, data, rsaName } = this;
    try {
      if (rsaName) {
        let tempForm = { ...data };
        let pbk = localStorage.getItem("public_key");
        if (!pbk || pbk == "undefined") {
          pbk = await this.getPubKey();
        }
        if (!pbk || pbk === "undefined") {
          throw new Error("获取公钥失败");
        }
        rsaName.split("|").forEach((item) => {
          tempForm[item] = this.encrypt(
            localStorage.getItem("public_key"),
            tempForm[item],
          );
        });
        data = tempForm;
      }
      let result = await this.request[method?.toLowerCase()](path, data);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPubKey() {
    let key;
    try {
      let pubKey = await axios.get(BASE_URL + "/getPbk");
      key = pubKey.data;
      localStorage.setItem("public_key", key);
    } catch (error) {
      console.log(error);
    }
    return key;
  }

  // interceptor() {
  //   // 添加请求拦截器
  //   this.request.interceptors.request.use((config) => {

  //     return config;
  //   }, (error) => {

  //     return Promise.reject(error);
  //   });

  //   // 添加响应拦截器
  //   this.request.interceptors.response.use((response) => {

  //     return response;
  //   }, (error) => {

  //     return Promise.reject(error);
  //   });
  // }

  encrypt(publicKey, plain) {
    const publicObj = forge.pki.publicKeyFromPem(publicKey);
    let bytes = publicObj.encrypt(plain, "RSA-OAEP");
    return forge.util.encode64(bytes);
  }
}
