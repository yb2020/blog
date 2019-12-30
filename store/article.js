/**
 * aiticle
 */

import service from '../api';

export const state = () => ({
  // 热门文章
  hotArt: {
    pagination: {},
    list: []
  },

  // 列表文章
  art: {
    pagination: {},
    list: [],
    comments: 0
  },

  // 相关文章推荐
  relativeList: [],

  // 随机文章推荐
  randomList: [],

  fetch: false,

  // 文章详情
  details: {}
});

export const mutations = {
  FETCH_ART(state) {
    state.fetch = true;
    state.art = {
      pagination: {},
      list: []
    };
  },

  SET_ART_FILE(state) {
    state.fetch = false;
  },

  SET_HOT_ART(state, data) {
    state.hotArt = data;
  },

  SET_ART_SUCCESS(state, data) {
    state.art = data;
    state.fetch = false;
  },

  SET_ART_FAIL(state) {
    state.art = {
      pagination: {},
      list: []
    };
    state.fetch = false;
  },

  SET_DETAILS(state, data) {
    state.details = data;
  },

  ADD_LIKE(state) {
    state.details.likeCount += 1;
  },

  ADD_COMMENT(state) {
    state.details.commentCount += 1;
  },

  SET_RELATIVE_ART_LIST(state, list) {
    state.relativeList = list.filter(item => item.id !== state.details.id);
  },
  SET_RANDOM_ART_LIST(state, list) {
    state.randomList = list.filter(item => item.id !== state.details.id);
  }
};

export const actions = {
  // 获取文章
  async getArtList(
    { commit, state },
    data = {
      current_page: 1
    }
  ) {
    commit('FETCH_ART');
    const res = await service.getArts({
      ...data,
      page_size: data.page_size || 6
    });
    if (res && res.status === 1) {
      if (!process.client) {
        commit('SET_ART_SUCCESS', res.data);
      } else
        setTimeout(() => {
          commit('SET_ART_SUCCESS', res.data);
        }, 200);
    } else commit('SET_ART_FILE');
  },

  // 获取最热文章列表
  async getHotArt({ commit }) {
    const res = await service.getArts({
      hot: true
    });
    commit(
      'SET_HOT_ART',
      res.result || {
        pagination: {},
        list: []
      }
    );
  },

  // 文章详情
  async getArt({ commit, dispatch }, data) {
    const res = await service.getArt(data);
    if(res && res.status === 1) {
      commit('SET_DETAILS', res.data || {});
    }
  },

  async getRelativeList({ commit, state }, data) {
    const list = await service.getArts({
      tag: state.details.tag[0]._id || 0,
      current_page: 1,
      page_size: 4
    });
    commit('SET_RELATIVE_ART_LIST', list.result.list || []);
  },

  async getRandomList({ commit, state }, data) {
    const result = await service.getRandomArts(data);
    if(result && result.status === 1) {
      commit('SET_RANDOM_ART_LIST', result.data || []);
    }
    
  },

  // 喜欢文章
  async likeArt({ commit }, data) {
    const res = await service.likeArt(data);
    if(res && res.status === 1) {
      commit('ADD_LIKE');
      return res;
    }
    return 0 ;
  }
};
