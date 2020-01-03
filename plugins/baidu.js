/*
** 只在生成模式的客户端中使用
*/

export default ({ app: { router }, store }) => {
  if (process.env.NODE_ENV === "production") {
    /* 每次路由变更时进行pv统计 */
    router.afterEach((to, from) => {
      /* 告诉增加一个PV */
      try {
        window._hmt = window._hmt || [];
        window._hmt.push(["_trackPageview", to.fullPath]);
      } catch (e) {}
    });
  }
};
