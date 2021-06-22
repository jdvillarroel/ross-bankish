<template>
  <div class="user-info">
    <p class="user">Usuario: {{ currentUser.email }}</p>
  </div>
  <Balance :userAccount="userAccount" />
  <button v-if="userAccount.userType === 'adminUser'" @click="updateBalance">Actualizar Saldo</button>
  <ErrorMsg v-show="transactionError.length" :errorMsg="transactionError" />
  <TransactionForm v-if="userAccount.userType === 'regularUser'" @transaction-event="handleTransaction" />
  <Transactions :currentUser="currentUser" :userAccount="userAccount" />
  <Loader v-if="showLoader" />
</template>

<script>
import Balance from "./Balance.vue"
import TransactionForm from "./TransactionForm.vue"
import Transactions from "./Transactions.vue"
import ErrorMsg from "./ErrorMsg.vue"
import Loader from "./Loader.vue"
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
    ErrorMsg,
    Loader
  },

  setup(props) {
    const transactionError = ref("")
    const showLoader = ref(false)

    const handleTransaction = (transaction) => {
      let amount = transaction.type === "send" ? -transaction.amount : transaction.amount
      
      // Veriy the user has funds to transfer.
      if (props.userAccount.availableBalance >= transaction.amount) {
        // Show loader
        showLoader.value = true

        accountsRef.doc(props.currentUser.uid).update({
          availableBalance: increment(amount)
        })
        .then(() => {
          return transactionsRef.add({
            ...transaction,
            uid: props.currentUser.uid,
            date: timestamp()
          })
        })
        .then(() => {
          console.log(`Transaction success! Balance: ${props.userAccount.availableBalance}`)
          showLoader.value = false
          transactionError.value = ""
        })
        .catch(e => {
          console.log(e)
          transactionError.value = e.message
          showLoader.value = false
        })

      } else {
        transactionError.value = "Fondos no son sufucientes."
        setTimeout(() => {transactionError.value = ""}, 5000)
      }      
    }

    // Update balance for admin user account.
    const updateBalance = () => {
      let availableBalance = 0
      let postedBalance = 0

      accountsRef.get()
      .then(docs => {
        docs.forEach(doc => {
          if (props.currentUser.uid !== doc.id) {
            // Calculate balances for admin user
            availableBalance += doc.data().availableBalance
            postedBalance += doc.data().postedBalance
          }
        })

        // Update balances in database
        return accountsRef.doc(props.currentUser.uid).update({
          availableBalance: availableBalance,
          postedBalance: postedBalance
        })
      })
      .then(console.log("Balance updated successfully!"))
      .catch(e => {
        console.log(e)
      })
    }

    return { transactionError, handleTransaction, showLoader, updateBalance }
  }

}
</script>

<style>

</style>