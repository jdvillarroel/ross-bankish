<template>
  <div class="home">
    <div class="container">
      <h1>Bienvenid@</h1>
      <div v-if="user" class="user-info">
        <p class="user">Usuario: {{ user.email }}</p>
        <button @click="logoutUser">Salir</button>
      </div>
      

      <!-- Register and login modal forms -->
      <RegisterForm v-if="showForm === 'register'" @close-modal="closeModal" @register-user="registerUser" />      
      <LoginForm v-if="showForm === 'login'" @close-modal="closeModal" @login-user="loginUser" />      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue"
import RegisterForm from "../components/RegisterForm.vue"
import LoginForm from "../components/LoginForm.vue"
import { createUser, login, logout, currentUser } from "../composables/useAuth"

export default {
  name: 'Home',

  components: {
    RegisterForm,
    LoginForm
  },

  emits: ["close-modal"],

  props: [
    "showForm"
  ],

  setup(props, context) {
    const user = ref(null)

    // **************** Methods *************** //
    // Emit event to close modal in App component
    const closeModal = () => {
      context.emit("close-modal", "")
    }

    // Register a new user in firebase.
    const registerUser = (userData) => {
      console.log(userData)
      createUser(userData).then((user) => {
        user.value = user
        closeModal()
      })
      .catch(error => {
        console.log(error.message)
      })
    }

    // Login existing user in firebase
    const loginUser = (userData) => {
      console.log(userData)
      login(userData).then(user => {
        user.value = user
        closeModal()
      })
      .catch(error => {
        console.log(error.message)
      })
    }

    // Logout current User
    const logoutUser = () => {
      logout()
      console.log("User logged out...")
      user.value = null
    }

    return {
      user,
      closeModal,
      registerUser,
      loginUser,
      logoutUser
    }
  }

  // mounted() {
  //   this.user = currentUser()
  // },

  // updated() {
  //   this.user = currentUser()
  // }

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