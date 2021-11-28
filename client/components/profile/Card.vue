<template>
  <div class="profile-card">
    <b-card>
      <div class="row">
        <div class="col-2">
          <img :src="avatarUrl" alt="" class="img img-thumbnail" />
        </div>
        <div class="col">
          <p class="lead">{{ profile.name }}</p>
          <p>{{ profile.email }}</p>
          <pre>{{ profile }}</pre>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['profile'],
  computed: {
    avatarUrl() {
      if (!this.profile.image) {
        const encodedEmail = encodeURI(this.profile.email)
        return `https://avatars.dicebear.com/api/croodles-neutral/${encodedEmail}.svg`
      }
      return this.profile.image
    },
  },
}
</script>
