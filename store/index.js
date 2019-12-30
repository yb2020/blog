/* eslint-disable require-await */
export const actions = {
  nuxtServerInit(store, { req }) {
    const isServer = process && process.server;
    // 设备检查类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent;
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/gi.test(userAgent);
    store.commit('options/SET_MOBILE_LAYOUT', isMobile);
    store.commit('options/SET_USER_AGENT', userAgent);

    const initAppData = [
      // author information
      store.dispatch('options/getAdminInfo'),

      // site information
      store.dispatch('options/getOpt'),

      // tag
      store.dispatch('tag/getTag'),

      // friend link
      store.dispatch('link/getLink', {
        page_size: 1000
      }),

      // nav
      store.dispatch('nav/getNav' , {position: 'top'}),
      store.dispatch('nav/getBottomNav' , {position: 'bottom'})

    ];

    // if (!isMobile) {
    //   initAppData.push(store.dispatch('article/getHotArt'))
    // }
    return Promise.all(initAppData);
  }
};