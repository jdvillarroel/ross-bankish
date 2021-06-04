<template>
  <div class="home">
    <div class="container">
      <h1>Bienvenid@</h1>
      <div class="user-info">
        <p v-if="currentUser" class="user">Usuario: {{ currentUser.email }}</p>
        <button v-if="currentUser" @click="logoutUser">Salir</button>
        <p v-show="!currentUser">Por favor presione el icono de menu para ingresar</p>
      </div>
      

      <!-- Register and login modal forms -->
      <RegisterForm v-if="showForm === 'register'" @close-modal="closeModal" @register-user="registerUser" />      
      <LoginForm v-if="showForm === 'login'" @close-modal="closeModal" @login-user="loginUser" />      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onUnmounted, ref, watchEffect } from "vue"
import RegisterForm from "../components/RegisterForm.vue"
import LoginForm from "../components/LoginForm.vue"
import { createUser, login, logout } from "../composables/useAuth"
import { auth } from "../firebase"

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
    const currentUser = ref(null)
    const errorMsg = ref("")

    // **************** Methods *************** //
    // Emit event to close modal in App component
    const closeModal = () => {
      context.emit("close-modal", "")
    }

    // Register a new user in firebase.
    const registerUser = (userData) => {

      createUser(userData).then((createdUser) => {
        currentUser.value = createdUser
        errorMsg.value = ""
        closeModal()
      })
      .catch(error => {
        console.log(error)
      })
    }

    // Login existing user in firebase
    const loginUser = (userData) => {
      login(userData).then(loggedInUser => {
        currentUser.value = loggedInUser
        errorMsg.value = ""
        closeModal()
      })
      .catch(error => {
        console.log(error)
      })
    }

    // Logout current User
    const logoutUser = () => {
      logout()
    }

    // ********** Watchers ************** //
    watchEffect(() => {
      console.log(currentUser.value)
    })

    // Authentication real time listener
    const stopAuthListener = auth.onAuthStateChanged(user => {
      if (user) {
        currentUser.value = user
      } else {
        currentUser.value = null
      }
    })

    // ************** Hooks ************ //
    onUnmounted(() => {
      stopAuthListener()
    })

    return {
      currentUser,
      errorMsg,
      closeModal,
      registerUser,
      loginUser,
      logoutUser
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