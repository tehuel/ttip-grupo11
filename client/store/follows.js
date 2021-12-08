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
  async unfollow({ commit }, { userId, userToken }) {
    const unfollowUserResponse = await FollowService.unfollowUser(this.$axios, {
      userId,
      userToken,
    })
    /*     commit('setProfile', {
      profile: followUserResponse,
    }) */
    return unfollowUserResponse
  },
  async getFollowing({ commit }, { userId, userToken }) {
    const getFollowingResponse = await FollowService.getFollowing(this.$axios, {
      userId,
      userToken,
    })
    return getFollowingResponse
  },
}
