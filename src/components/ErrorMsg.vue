<template>
  <div class="error-msg">
    <p>Lo sentimos. Hubo un error: {{ errorMsg }}</p>
  </div>
</template>

<script>
export default {
  props: {
    errorMsg: String
  },

  setup(props) {

  }

}
</script>

<style>

</style>