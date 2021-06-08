<template>
  <Header @show-modal="showModal" @logout-user="logoutUser" />
  <Links />
  <!-- <router-view :showForm="showForm" @close-modal="showModal"/> -->
  <router-view />

  <!-- Register and login modal forms -->
  <RegisterForm v-if="showForm === 'register'" @close-modal="closeModal" @register-user="registerUser" />      
  <LoginForm v-if="showForm === 'login'" @close-modal="closeModal" @login-user="loginUser" /> 
</template>

<script>
import { ref } from '@vue/reactivity'
import Home from "./views/Home.vue"
import Instructions from "./views/Instructions.vue"
import Header from "./components/Header.vue"
import Links from "./components/Links.vue"
import RegisterForm from "./components/RegisterForm.vue"
import LoginForm from "./components/LoginForm.vue"

export default {
  
  components: {
    Home,
    Instructions,
    Header,
    Links,
    RegisterForm,
    LoginForm
  },

  setup() {
    const showForm = ref("")
    const userType = ref("")

    /** 
     * METHODS
     */
    // Display modal according to the type
    const showModal = (payload) => {
      showForm.value = payload
    }

    // Close modal
    const closeModal = () => {
      showForm.value = ""
    }

    // Login user
    const loginUser = (userData) => {
      console.log(userData)
      closeModal()
    }

    // Register new user
    const registerUser = (userData) => {
      console.log(userData)
      closeModal()
    }

    // Logout existing user
    const logoutUser = () => {
      console.log("trying to logout...")
    }

    return {
      showForm,
      showModal,
      closeModal,
      loginUser,
      registerUser,
      logoutUser,
      userType
    }
  }
}
</script>

<style>

</style>
