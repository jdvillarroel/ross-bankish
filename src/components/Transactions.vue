<template>
  <div class="transactions-title" @click="toggleTransactions">
    <h4>Historial de Transacciones</h4>
    <!-- <span v-show="!showTransactions" class="material-icons">expand_more</span> -->
    <span class="material-icons"> history</span>
  </div>

  <div v-show="showTransactions">
    <p>Mostrar ultimas transacciones</p>
    <button @click="handleTransactions">Mostrar</button>

    <details v-for="(transaction, index) in transactions" :key="transaction.id" class="transaction-details">
      <summary><span>{{ index + 1 }} - </span> Fecha: {{ transaction.date.toDate().toLocaleString() }}</summary>
      <div>
        <p>De: {{ transaction.from }}</p>
        <p>Para: {{ transaction.to }}</p>
        <p>Monto: ${{ transaction.amount }}</p>
        <p>Descripcion: {{ transaction.description }}</p>
      </div>
    </details>
  </div>
</template>

<script>
import { ref, reactive, toRef } from 'vue'
import { transactionsRef } from "../firebase"

export default {
  name: "Transactions",

  setup() {
    const showTransactions = ref(false)
    let transactions = ref(null)

    // ********* Methods ********** //
    const toggleTransactions = () => {
      showTransactions.value = !showTransactions.value
    }

    const handleTransactions = () => {
      let trans = []

      transactionsRef.orderBy("date", "desc").limit(10).get()
      .then(docs => {
        docs.forEach((doc) => {
          trans.push({...doc.data(), id: doc.id})          
        })
        transactions.value = trans
      })
      .catch(e => {
        console.log(e)
      })
      console.log(transactions)
    }

    return { transactions, showTransactions, handleTransactions, toggleTransactions }
  }
}
</script>

<style>

</style>