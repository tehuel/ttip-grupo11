<template>
  <span class="d-inline">
    <NuxtLink :to="{ name: 'user-id', params: { id: userId } }">
      {{ userName }}
    </NuxtLink>
  </span>
</template>

<script>
import UserService from '../../service/user'

export default {
  props: ['userId'],
  data() {
    return {
      user: null,
    }
  },
  async fetch() {
    this.user = await UserService.getProfile(this.$axios, {
      userId: this.userId,
    })
  },
  computed: {
    userName() {
      return this.user?.name || this.userId
    },
  },
  methods: {},
}
</script>
