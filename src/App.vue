<template>
  <Header @show-modal="showModal" @logout-user="logoutUser" />
  <Links />
  <!-- <router-view :showForm="showForm" @close-modal="showModal"/> -->
  <router-view />

  <!-- Register and login modal forms -->
  <RegisterForm
    v-if="showForm === 'register'"
    @close-modal="closeModal"
    @register-user="registerUser"
    :registerError="registerError"
  />      
  <LoginForm
    v-if="showForm === 'login'"
    @close-modal="closeModal"
    @login-user="loginUser"
    :loginError="loginError"
  />


</template>

<script>
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue'
import Home from "./views/Home.vue"
import Instructions from "./views/Instructions.vue"
import Header from "./components/Header.vue"
import Links from "./components/Links.vue"
import RegisterForm from "./components/RegisterForm.vue"
import LoginForm from "./components/LoginForm.vue"
import { auth } from "./firebase"

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
    const currentUser = ref(null)
    const registerError = ref("")
    const loginError = ref("")
    const isUserLoggedIn = ref(false)
    let stopAuthObserver = ref(null)

    onBeforeMount(() => {
      stopAuthObserver = auth.onAuthStateChanged(user => {
        if (user) {
          currentUser.value = user
          console.log(currentUser.value.uid)
          console.log(currentUser.value.email)
          isUserLoggedIn.value = true
        }else {
          console.log("No user logged in...")
          isUserLoggedIn.value = false
        }
      })
    }),

    onUnmounted(() => {
      stopAuthObserver()
      console.log("Auth observer stopped...")
    })

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
      auth.signInWithEmailAndPassword(userData.email, userData.password)
      .then(userCredential => {

        closeModal()
      })
      .catch(e => {
        loginError.value = e.message
        console.log(e)
      })
      
    }

    // Register new user
    const registerUser = (userData) => {
      auth.createUserWithEmailAndPassword(userData.email, userData.password)
      .then(userCredential => {

        closeModal()
      })
      .catch(e => {
        registerError.value = e.message
        console.log(e)
      })      
    }

    // Logout existing user
    const logoutUser = () => {
      auth.signOut()
      .then(console.log("User logged out..."))
      .catch(e => console.log(e))
    }

    return {
      // Methods
      showForm,
      showModal,
      closeModal,
      loginUser,
      registerUser,
      logoutUser,
      userType,
      // Variables
      currentUser,
      loginError,
      registerError,
      isUserLoggedIn
    }
  }
}
</script>

<style>

</style>
