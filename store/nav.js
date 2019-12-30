
import service from '../api'


export const state = () => ({
  data: {},
  bottomData: {}
})

export const mutations = {
  SET_NAV(state, data) {
    state.data = data
  },
  SET_BOTTOM_NAV(state, data) {
    state.bottomData = data
  }
}


export const actions = {
  // 获取顶部导航
  async getNav({commit}, data={position: 'top'}) {
    const res = await service.getNav(data)
    if(res && res.status === 1) {
      commit('SET_NAV', res.data)
    }
  },
  // 获取底部导航
  async getBottomNav({commit}, data={position: 'bottom'}) {
    const res = await service.getNav(data)
    if(res && res.status === 1) {
      commit('SET_BOTTOM_NAV', res.data)
    }
  },
}