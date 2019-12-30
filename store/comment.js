/*
 *
 * 评论数据状态
 *
 */

import service from '../api';

export const state = () => {
  return {
    fetching: false,
    posting: false,
    data: {
      data: {}
    }
  };
};

export const mutations = {
  // 获取评论
  REQUEST_LIST(state) {
    state.fetching = true;
  },

  // 清空评论
  CLEAR_LIST(state) {
    state.data = {
      data: {}
    };
  },

  GET_LIST_SUCCESS(state, action) {
    state.fetching = false;
    state.data = action;
  },

  GET_LIST_FAILURE(state) {
    state.fetching = false;
    state.data = {
      data: [],
      pagination: {}
    };
  },

  // 发布评论
  POST_ITEM(state) {
    state.posting = true;
  },

  POST_ITEM_SUCCESS(state, action) {
    state.posting = false;
    state.data.data.size += 1;
    state.data.data.list.unshift(action);
  },

  POST_ITEM_FAILURE(state) {
    state.posting = false;
  },

  // 喜欢某条评论
  LIKE_ITEM(state, action) {
    const comment = state.data.data.list.find(comment => Object.is(comment.id, action.id));
    if (comment) comment.likeCount++;
  }
};

export const actions = {
  // 提交留言墙
  async postHero({ commit }, data) {
    commit('POST_ITEM');
    const res = await service.postHero(data);
    commit('POST_ITEM_FINAL');
    return res;
  },

  // 发布评论
  async postComment({ commit }, comment) {
    commit('POST_ITEM');
    const res = await service.postComment(comment);
    if (res && res.status === 1) {
      commit('POST_ITEM_SUCCESS', res.data);
      if (!comment.parentId) commit('article/ADD_COMMENT', null, { root: true });
    } else commit('POST_ITEM_FAILURE');
    return res;
  },

  // 为某条回复点赞
  async likeComment({ commit }, data) {
    const res = await service.likeComment(data);
    if (res && res.status === 1) commit('LIKE_ITEM', data);
    return res;
  },

  // 根据ref-id获取评论列表
  async loadCommentsByRefId({ commit, state }, data) {
    data.sort = data.sort || -1;
    data.currentPage = data.currentPage || 1;
    data.pageSize = data.pageSize || 60;
    commit('REQUEST_LIST');

    setTimeout(async () => {

      const res = await service.getComments(data);
      
      if (res && res.status === 1) {
        var resultData = res.data
        if (resultData.pageNum > 1) 
          resultData.list = [...state.data.data.list, ...resultData.list];
        // if (Object.is(data.sort, -1)) res.result.data.reverse()
        commit('GET_LIST_SUCCESS', {
          data: resultData
        });
      } else commit('GET_LIST_FAILURE');
      return res;
    }, 500);
  }
};
