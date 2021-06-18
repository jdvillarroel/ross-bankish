<template>
  <div class="user-info">
    <p class="user">Usuario: {{ currentUser.email }}</p>
  </div>
  <Balance :userAccount="userAccount" />
  <ErrorMsg v-show="transactionError.length" :errorMsg="transactionError" />
  <TransactionForm @transaction-event="handleTransaction" />
  <Transactions :currentUser="currentUser" />
</template>

<script>
import Balance from "./Balance.vue"
import TransactionForm from "./TransactionForm.vue"
import Transactions from "./Transactions.vue"
import ErrorMsg from "./ErrorMsg.vue"
import { transactionsRef, timestamp, accountsRef, increment } from "../firebase"
import { ref } from '@vue/reactivity'

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
    Transactions,
    ErrorMsg
  },

  setup(props) {
    const transactionError = ref("")

    const handleTransaction = (transaction) => {
      // Veriy the user has funds to transfer.
      if (props.userAccount.balance >= transaction.amount) {
        accountsRef.doc(props.currentUser.uid).update({
          balance: increment(-transaction.amount)
        })
        .then(() => {
          return transactionsRef.add({
            ...transaction,
            id: props.currentUser.uid,
            date: timestamp()
          })
        })
        .then(() => {
          console.log(`Transaction success! Balance: ${props.userAccount.balance}`)
        })
        .catch(e => {
          console.log(e)
        })

      } else {
        transactionError.value = "Fondos no son sufucientes."
        setTimeout(() => {transactionError.value = ""}, 5000)
      }

      
    }

    return { transactionError, handleTransaction }
  }

}
</script>

<style>

</style>