<template>
  <div class="home">
    <div class="container">

      <h1 v-show="currentUser">Bienvenid@</h1>
      <p v-show="!currentUser">Por favor presione el icono de menu para ingresar</p>
      <div v-if="userAccount.type === 'regular'" class="user-info">
        <p class="user">Usuario: {{ currentUser.email }}</p>
      </div> 

      <!-- Balance card -->
      <Balance v-show="userAccount.type === 'regular'" :userAccount="userAccount" />
      <!-- <TransactionForm /> -->

    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import {  ref } from "vue"
import TransactionForm from "../components/TransactionForm.vue"
import Balance from "../components/Balance.vue"

export default {
  name: 'Home',

  components: {
    TransactionForm,
    Balance
  },

  props: [
    "showForm"
  ],

  setup(props, context) {
    const currentUser = ref(null)
    const errorMsg = ref("")
    const userAccount = ref({})

    // **************** Methods *************** //

    return {
      currentUser,
      userAccount,
      errorMsg
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