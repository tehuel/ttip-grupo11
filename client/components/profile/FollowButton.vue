<template>
  <div class="follow-button">
    <b-overlay :show="isLoading">
      <b-button
        v-if="!isFollowingUser"
        variant="primary"
        @click="onClickFollowUser"
      >
        Seguir
      </b-button>
      <b-button
        v-else
        class="btn btn-outline-danger btn-block"
        @click="onClickUnfollow"
      >
        Dejar de seguir
      </b-button>
    </b-overlay>
  </div>
</template>

<script>
export default {
  props: ['profile'],
  data() {
    return {
      isLoading: false,
      following: [],
    }
  },
  async fetch() {
    const userId = this.$store.state.user.userId
    const userToken = this.$store.state.user.token
    this.following = await this.$store.dispatch('follows/getFollowing', {
      userId,
      userToken,
    })
  },
  computed: {
    favRecipes() {
      return this.$store.state.user.profile?.favRecipes
    },
    isFollowingUser() {
      return this.following.includes(this.profile.id)
    },
  },
  methods: {
    async onClickFollowUser() {
      const userId = this.$store.state.user.userId
      const profile = this.profile
      const userToken = this.$store.state.user.token
      await this.$store.dispatch('follows/followUser', {
        userId,
        profile,
        userToken,
      })
      this.$bvToast.toast('Ahora sigues a esta persona!', {
        title: 'Seguir usuario',
        variant: 'success',
        appendToast: true,
        solid: true,
      })
    },
    async onClickUnfollow() {
      const userId = this.$store.state.user.userId
      const profile = this.profile
      const userToken = this.$store.state.user.token
      await this.$store.dispatch('follows/unfollow', {
        userId,
        profile,
        userToken,
      })
      this.$bvToast.toast('Has dejado de seguir a esta persona', {
        title: 'Dejar de seguir usuario',
        variant: 'success',
        appendToast: true,
        solid: true,
      })
    },
    async onClickAddRecipeToFavourites() {
      this.isLoading = true
      const userToken = this.$store.state.user.token
      await this.$store.dispatch('user/addRecipeToFavourites', {
        recipe: this.recipe,
        userToken,
      })
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    },
    onClickRemoveRecipeFromFavourites() {
      this.isLoading = true
      // TODO
      // const userToken = this.$store.state.user.token
      // await this.$store.dispatch('user/addRecipeToFavourites', {
      //   recipe: this.recipe,
      //   userToken,
      // })
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    },
  },
}
</script>
