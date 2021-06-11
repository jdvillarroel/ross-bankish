<template>
  <Header @show-modal="showModal" @logout-user="logoutUser" />
  <Links />
  <!-- <router-view :showForm="showForm" @close-modal="showModal"/> -->
  <router-view
    :isAuth="isAuth"
    :userType="userType"
    :currentUser="currentUser"
  />

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
import { auth, accountsRef, timestamp } from "./firebase"

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
    let currentUser = reactive({
      uid: "",
      email: ""
    })
    const registerError = ref("")
    const loginError = ref("")
    const isAuth = ref(false)
    let stopAuthObserver = ref(null)
    let userAccount = reactive({
      firstname: "",
      lastName: "",
      email: "",
      createdAt: null,
      balance: null
    })

    onBeforeMount(() => {
      stopAuthObserver = auth.onAuthStateChanged(user => {
        if (user) {
          /** 
           * As the currentUser is a reactive object all the properties assignmenst have to be individually done.
           * If we add a value that is not part of the object, it loses its reactivity.
           */
          currentUser.uid = user.uid
          currentUser.email = user.email

          // Set the user type
          userType.value = currentUser.uid === "sakjdksdjfsjdfk34rfds44" ? "adminUser" : "regularUser"

          console.log(user)
          isAuth.value = true
        }else {
          console.log("No user logged in...")
          currentUser.uid = ""
          currentUser.email = ""
          isAuth.value = false
          userType.value = ""
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
      // Reset login error message in case it has a previous value
      loginError.value = ""

      // Reset register error value in case it has a previos value
      registerError.value = ""

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
        // Create a user account in the database
        console.log(userData)
        return accountsRef.doc(userCredential.user.uid).set({
          firstName: userData.firstname,
          lastName: userData.lastName,
          email: userData.email,
          createdAt: timestamp,
          balance: 0
        })
      })
      .then(acc => {
        console.log(acc)
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
      isAuth
    }
  }
}
</script>

<style>

</style>
