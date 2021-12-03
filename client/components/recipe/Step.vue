<template>
  <div class="recipe-step rounded my-5">
    <div class="title-box sticky-top py-1 my-2 bg-white">
      <h3 class="h6 m-0">Paso {{ index + 1 }}</h3>
      <p v-if="step.title" class="h4">{{ step.title }}</p>
    </div>

    <div class="recipe-step-content">
      <b-img v-if="step.image" fluid-grow :src="step.image" />
      <div class="recipe-body my-3">
        {{ step.description }}
      </div>
    </div>
    <hr class="separator my-5" />
  </div>
</template>

<script>
export default {
  props: ['step', 'index'],
  data() {},
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
.recipe-step {
  .separator {
    margin: 0 auto;
    width: 75%;
    border-top: 1px solid #ccc;
  }

  &:last-of-type {
    .separator {
      display: none;
    }
  }
}
</style>
