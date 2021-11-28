<template>
  <div class="profile-form">
    <b-overlay :show="isLoading">
      <b-form @submit="onSubmitProfile" @reset="onResetForm">
        <b-form-group id="group-name" label="Nombre" label-for="input-name">
          <b-form-input id="input-name" v-model="name" trim></b-form-input>
        </b-form-group>

        <b-form-group id="group-email" label="Email" label-for="input-email">
          <b-form-input id="input-email" v-model="email" trim></b-form-input>
        </b-form-group>

        <b-form-group id="group-image" label="Imagen" label-for="input-image">
          <b-form-input id="input-image" v-model="image" trim></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Editar Perfil</b-button>
        <b-button type="reset" variant="light">Cancelar</b-button>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
export default {
  props: ['profile'],
  data() {
    return {
      isLoading: false,
      newName: null,
      newEmail: null,
      newImage: null,
    }
  },
  computed: {
    name: {
      get() {
        return this.newName || this.profile.name
      },
      set(value) {
        this.newName = value
      },
    },
    email: {
      get() {
        return this.newEmail || this.profile.email
      },
      set(value) {
        this.newEmail = value
      },
    },
    image: {
      get() {
        return this.newImage || this.profile.image
      },
      set(value) {
        this.newImage = value
      },
    },
  },
  mounted() {
    this.name = this.profile.name
    this.email = this.profile.email
    this.image = this.profile.image
  },
  methods: {
    async onSubmitProfile() {
      this.isLoading = true
      try {
        const userId = this.profile.id
        const userToken = this.$store.state.user.token
        const userProfile = {
          name: this.name,
          email: this.email,
          image: this.image,
        }

        await this.$store.dispatch('user/updateProfile', {
          userId,
          userToken,
          userProfile,
        })
      } catch (e) {
        console.error(e)
      }
      this.isLoading = false
      this.$emit('submit')
    },
    onResetForm() {
      this.$emit('reset')
      return null
    },
  },
}
</script>
