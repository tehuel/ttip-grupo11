<template>
  <div class="comment-card pb-2 mt-2">
    <div class="d-flex flex-row">
      <b-img class="comment-thumbnail mr-2" :src="avatarUrl" alt="" rounded />
      <div>
        <p class="text-muted m-0">
          El {{ formattedDate }}, {{ comment.user.name }} dijo:
        </p>
        <p class="text-dark m-0">
          {{ comment.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
  props: ['comment'],
  computed: {
    formattedDate() {
      const formatter = new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
      return formatter.format(this.comment.createdAt)
    },
    avatarUrl() {
      if (!this.comment.user.image) {
        const encodedEmail = encodeURI(this.comment.user.email)
        return `https://avatars.dicebear.com/api/croodles-neutral/${encodedEmail}.svg`
      }
      return this.comment.user.image
    },
  },
}
</script>

<style lang="scss">
.comment-card {
  &:not(:last-of-type) {
    border-bottom: 1px solid #efefef;
  }

  .comment-thumbnail {
    width: 64px;
    height: 64px;
    object-fit: cover;
  }
}
</style>
