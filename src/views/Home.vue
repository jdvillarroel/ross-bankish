<template>
  <div class="home">
    <div class="container">
      <h1>Bienvenid@</h1>
      <RegisterForm v-show="showForm === 'register'" @close-modal="closeModal" />      
      <LoginForm v-show="showForm === 'login'" @close-modal="closeModal" />      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from "../components/RegisterForm.vue"
import LoginForm from "../components/LoginForm.vue"

export default {
  name: 'Home',

  components: {
    RegisterForm,
    LoginForm
  },

  props: [
    "showForm"
  ],

  data() {
    return {
      
    }
  },

  methods: {
    // Close register or login form.
    closeModal() {
      this.$emit("close-modal", "")
    }
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