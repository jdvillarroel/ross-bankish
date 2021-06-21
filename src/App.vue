<template>
  <Header @show-modal="showModal" @logout-user="logoutUser" />
  <Links />
  <!-- <router-view :showForm="showForm" @close-modal="showModal"/> -->
  <router-view
    :isAuth="isAuth"
    :userType="userType"
    :currentUser="currentUser"
    :userAccount="userAccount"
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

  <Loader v-if="showLoader" />


</template>

<script>
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue'
import Home from "./views/Home.vue"
import Instructions from "./views/Instructions.vue"
import Header from "./components/Header.vue"
import Links from "./components/Links.vue"
import RegisterForm from "./components/RegisterForm.vue"
import LoginForm from "./components/LoginForm.vue"
import Loader from "./components/Loader.vue"
import { auth, accountsRef, timestamp } from "./firebase"

export default {
  
  components: {
    Home,
    Instructions,
    Header,
    Links,
    RegisterForm,
    LoginForm,
    Loader
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
    const accountError = ref("")
    const isAuth = ref(false)
    let stopAuthObserver = ref(null)
    let stopAccountObserver = ref(null)
    let userAccount = reactive({
      firstName: "",
      lastName: "",
      email: "",
      createdAt: null,
      userType: "",
      availableBalance: null,
      postedBalance: null
    })
    const showLoader = ref(false)

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
          // userType.value = currentUser.uid === "sakjdksdjfsjdfk34rfds44" ? "adminUser" : "regularUser"
          isAuth.value = true

          // Define a account observer to listen for real time changes
          stopAccountObserver = accountsRef.doc(currentUser.uid).onSnapshot(account => {
            userAccount.firstName = account.data().firstName
            userAccount.lastName = account.data().lastName
            userAccount.email = account.data().email
            userAccount.availableBalance = account.data().availableBalance
            userAccount.postedBalance = account.data().postedBalance
            userAccount.createdAt = account.data().createdAt.toDate()
            userAccount.userType = account.data().userType

            userType.value = account.data().userType
          }, e => {
            accountError.value = e
            console.log(e)
          })
          
        }else {
          console.log("No user logged in...")

          // Reset user
          currentUser.uid = ""
          currentUser.email = ""

          // No user logged in
          isAuth.value = false
          userType.value = ""

          // Reset Account
          userAccount.firstName = ""
          userAccount.lastName = ""
          userAccount.email = ""
          userAccount.availableBalance = 0
          userAccount.postedBalance = 0
          userAccount.userType = ""
          // stopAuthObserver()
        }
      })

    }),

    onUnmounted(() => {
      stopAuthObserver()
      console.log("Auth observer stopped...")
      stopAuthObserver()
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
      // Display loader
      showLoader.value = true

      auth.signInWithEmailAndPassword(userData.email, userData.password)
      .then(userCredential => {        
        closeModal()
        showLoader.value = false
      })
      .catch(e => {
        loginError.value = e.message
        console.log(e)
        showLoader.value = false
      })
      
    }

    // Register new user
    const registerUser = (userData) => {
      // Display loader
      showLoader.value = true

      auth.createUserWithEmailAndPassword(userData.email, userData.password)
      .then(userCredential => {
        // closeModal()
        // Create a user account in the database
        return accountsRef.doc(userCredential.user.uid).set({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          createdAt: timestamp(),
          userType: "regularUser",
          availableBalance: 0,
          postedBalance: 0
        })
      })
      .then(() => {
        console.log("Account created...")
        closeModal()
        showLoader.value = false
      })
      .catch(e => {
        registerError.value = e.message
        console.log(e)
        showLoader.value = false
      })      
    }

    // Logout existing user
    const logoutUser = () => {
      // Display loader
      showLoader.value = true

      auth.signOut()
      .then(() => {
        console.log("User logged out...")
        showLoader.value = false
      })
      .catch(e => {
        console.log(e)
        showLoader.value = false
      })
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
      userAccount,
      loginError,
      registerError,
      isAuth,
      showLoader
    }
  }
}
</script>

<style>

</style>
