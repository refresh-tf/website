export const state = () => ({
  backgroundImg: require('~/assets/images/cp_process.jpeg'),
})

export const mutations = {
  CHANGE_LAYOUT_BG(state, backgroundImg) {
    state.backgroundImg = backgroundImg;
  }
}
