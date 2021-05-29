<template>
  <div class="home">
    <div class="container">
      <h1>Bienvenid@</h1>
      <p v-if="user">Usuario Actual: {{ user.email }}</p>
      <RegisterForm v-if="showForm === 'register'" @close-modal="closeModal" @user-created="userCreated" />      
      <LoginForm v-if="showForm === 'login'" @close-modal="closeModal" @user-logged-in="userLoggedIn" />      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from "../components/RegisterForm.vue"
import LoginForm from "../components/LoginForm.vue"
import * as fb from "@/firebase"

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
      user: null
    }
  },

  methods: {
    // Close register or login form.
    closeModal() {
      this.$emit("close-modal", "")
    },

    userCreated(user) {
      this.user = user
      this.closeModal()
    },

    userLoggedIn(user) {
      this.user = user
      this.closeModal()
    }
  },

  mounted() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },

  updated() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
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