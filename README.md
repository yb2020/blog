# 隔壁老易打造的[vue-nuxt-blog](http://yi.wuhuhai.com) <-左边是访问地址

项目来源: [三毛，vue-blog](https://github.com/jkchao/vue-blog)

项目来源于开源，本项目也开源，此项目只有前端模板了，而且模板也做了修改。

使用说明：
1. clone 后使用，npm run dev启动项目。
2. 原项目没有做目录重写,所以无法在本地看到项目。本项目解决转发问题
3. 后台接口使用Java版本的RESTFul接口，Spring Cloud，基于[sea平台](https://github.com/yb2020/sea)
4. 标准的前后端分离项目，保留vue的开发方式，支持整站SEO

## 重写的地方
1. 整体页面宽度重构
2. 导航重构
3. 移动端侧边栏重构
4. 固定参数实现后台配置，例如seo信息、七牛云存储等
5. 新加分类导航
6. 标签列表、分类导航列表显示优化
7. 文章详情页重构
8. 评论重构，并加入博客作者回复，显示与评论人不一样
9. 我没有看过三毛的后台项目，几乎所有接口数据格式都进行了重构
10. 关于我页面重构，加入markdown简历编写
11. 联系我在后台进行配置
12. 赞赏码后台配置
13. 外接渠道后台配置，比如csdn、cnblog、掘金、github等等
14. 标题显示优化，以前的标题会省略显示，现在都是全量显示
15. 加入文章目录显示

## 功能列表
- 在线搜索
- 全部文章
- 标签
- 文章分类
- 在线评论与回复
- 在线统计
- 自动提交百度搜索引擎
- 整站seo
- 文章seo
- 暗夜模式
- 文章点赞
- 评论点赞
- 赞赏码
- 作者简历

## TODO List
- 分页功能
- 评论内容自动检测，有反动言论不可提交
- 后台配置百度统计、cnzz统计,目前已经可以百度统计，但不是后台可配置式的，目前不对外提供服务，后台配置式先搁浅
- ~~集成作者的微信公众号二维码，并适配移动端，作者可在后台改换二维码~~
- 文章一键同步至微信公众号
- 文章一键同步至百家号
- 文章一键同步至今日头条号

## 未修复的缺陷

- 切换分类和标签列表时,canvas图标会导致占用内存升高

## 主要插件

 - NUXT + Vuex + Vue-router + Axios
 - marked + highlight.js
 - nprogress
 - 跨域请求转发
 - consola
 
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production
npm run build
npm start

```



