<template>
  <div class="profile-card">
    <b-card>
      <template v-if="editing">
        <ProfileForm
          :profile="profile"
          @submit="finishEditingProfile"
          @reset="finishEditingProfile"
        ></ProfileForm>
      </template>
      <template v-else>
        <div class="row">
          <div class="col-2">
            <img :src="avatarUrl" alt="" class="img img-thumbnail" />
          </div>
          <div class="col">
            <p class="lead">{{ profile.name }}</p>
            <p>{{ profile.email }}</p>
            <b-button @click="editProfile">Editar</b-button>
            <b-button variant="primary" @click="onFollowUser">Seguir</b-button>
          </div>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['profile'],
  data() {
    return {
      editing: false,
    }
  },
  computed: {
    canEditProfile() {
      return this.profile.id === this.$store.state.user.id
    },
    avatarUrl() {
      if (!this.profile.image) {
        const encodedEmail = encodeURI(this.profile.email)
        return `https://avatars.dicebear.com/api/croodles-neutral/${encodedEmail}.svg`
      }
      return this.profile.image
    },
  },
  methods: {
    async onFollowUser() {
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
    editProfile() {
      this.editing = true
    },
    finishEditingProfile() {
      this.editing = false
    },
  },
}
</script>
