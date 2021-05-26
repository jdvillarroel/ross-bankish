<template>
  <div class="home">
    <div class="container">
      <h1>Bienvenid@</h1>
      <Register />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from "../components/Register.vue"

export default {
  name: 'Home',

  components: {
    Register
  }
}
</script>

<style>
  .container {
    width: 90%;
    margin: 1rem auto;
    text-align: center;
  }

  .container h1 {
    margin-bottom: 1rem;
  }
</style>