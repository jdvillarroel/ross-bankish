<template>
  <div class="home">
    <div class="container">

      <h1 v-show="currentUser">Bienvenid@</h1>
      <div class="user-info">
        <p v-if="currentUser" class="user">Usuario: {{ currentUser.email }}</p>
        <button v-if="currentUser" @click="logoutUser">Salir</button>
        <p v-show="!currentUser">Por favor presione el icono de menu para ingresar</p>
      </div>

      <!-- Balance card -->
      <Balance v-show="currentUser" :userAccount="userAccount" />

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
import Balance from "../components/Balance.vue"
import { createUser, login, logout } from "../composables/useAuth"
import { getAccount } from "../composables/useCollection"
import { auth, accountsRef } from "../firebase"

export default {
  name: 'Home',

  components: {
    RegisterForm,
    LoginForm,
    Balance
  },

  emits: ["close-modal"],

  props: [
    "showForm"
  ],

  setup(props, context) {
    const currentUser = ref(null)
    const errorMsg = ref("")
    const userAccount = ref({})

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

    // *************** Real time listeners *********** //
    const stopAuthListener = auth.onAuthStateChanged(user => {
      if (user) {
        currentUser.value = user
        
        // Query database to get user account
        getAccount(user).then(account => {
          userAccount.value = account
          console.log(account)
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        currentUser.value = null
      }
    })

    // const stopAccountListener = accountsRef.doc(currentUser.value.uid).onSnapshot(acc => {
    //   userAccount.value = acc.data()
    //   console.log(currentUser.value.uid)
    //   console.log(userAccount.value)
    // })

    // ************** Hooks ************ //
    onUnmounted(() => {
      stopAuthListener()
      stopAccountListener()
    })

    return {
      currentUser,
      userAccount,
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
    margin-bottom: 0.8rem;
    font-size: 1.7rem;
  }

</style>