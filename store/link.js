/**
 *
 * link
 */

import service from "../api";

export const state = () => ({
  data: {
    list: [],
    pagination: {}
  },

  fetch: false
});

export const mutations = {
  // 成功
  SET_LINK_SUCCESS(state, data) {
    state.data = data;
    state.fetch = false;
  },

  // 失败
  SET_LINK_FILE(state, data) {
    state.data = {
      list: [],
      pagination: {}
    };
    state.fetch = false;
  }
};

export const actions = {
  // 获取链接
  async getLink(
    { commit, state },
    data = {
      current_page: 1,
      pageSize: 30
    }
  ) {
    const res = await service.getLink(data);
    if (res && res.status === 1) {
      commit("SET_LINK_SUCCESS", res.data);
    } else commit("SET_LINK_FILE");
    return res;
  }
};
