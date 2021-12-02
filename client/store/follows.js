const FollowService = require('../service/follow')

export const actions = {
  async followUser({ commit }, { userId, profile, userToken }) {
    const followUserResponse = await FollowService.followUser(this.$axios, {
      userId,
      profile,
      userToken,
    })
    /*     commit('setProfile', {
      profile: followUserResponse,
    }) */
    return followUserResponse
  },
}
