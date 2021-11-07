<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col col-md-10 col-lg-8">
        <div class="card shadow-lg">
          <div class="card-body">
            <h1 class="h2 text-center">{{ title }}</h1>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormContainer',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
