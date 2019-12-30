const IS_DEV = process.env.NODE_ENV !== "production";

const API_ROOT = IS_DEV ? "http://localhost:9999/" : "http://localhost:9999/";

const STATIC_PATH = "http://static.yi.wuhuhai.com";

const CDN_PATH = "https://cdn.jkchao.cn/nuxt";

const SERVER_HOST = "0.0.0.0";
const SERVER_PORT = 3000;

const QINIU_OPTIONS = {
  // qiniu accessKey secretKey
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY,
  bucket: "blog-cdn",
  domain: "http://ply4cszel.bkt.clouddn.com"
};

module.exports = {
  IS_DEV,
  API_ROOT,
  STATIC_PATH,
  CDN_PATH,
  QINIU_OPTIONS,
  SERVER_HOST,
  SERVER_PORT
};
