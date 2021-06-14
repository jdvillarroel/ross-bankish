<template>
  <div class="user-info">
    <p class="user">Usuario: {{ currentUser.email }}</p>
  </div>
  <Balance :userAccount="userAccount" />
  <TransactionForm />
  <Transactions />
</template>

<script>
import Balance from "./Balance.vue"
import TransactionForm from "./TransactionForm.vue"
import Transactions from "./Transactions.vue"

export default {
  name: "RegularUser",

  props: {
    currentUser: {
      type: Object
    },
    userAccount: {
      type: Object
    }
  },

  components: {
    Balance,
    TransactionForm,
    Transactions
  },

  setup(props) {
    
  }

}
</script>

<style>

</style>