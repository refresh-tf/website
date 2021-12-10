export const state = () => ({
  backgroundImg: require('~/assets/images/background.jpg'),
})

export const mutations = {
  CHANGE_LAYOUT_BG(state, backgroundImg) {
    state.backgroundImg = backgroundImg;
  },
  RESET_LAYOUT_BG(state) {
    state.backgroundImg = require('~/assets/images/background.jpg');
  }
}
