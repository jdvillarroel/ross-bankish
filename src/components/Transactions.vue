<template>
  <div class="transactions-title" @click="toggleTransactions">
    <h4>Historial de Transacciones</h4>
    <!-- <span v-show="!showTransactions" class="material-icons">expand_more</span> -->
    <span class="material-icons"> history</span>
  </div>

  <div v-show="showTransactions">
    <p>Mostrar ultimas transacciones</p>
    <button @click="handleTransactions">Mostrar</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { transactionsRef } from "../firebase"

export default {
  name: "Transactions",

  setup() {
    const showTransactions = ref(false)

    // ********* Methods ********** //
    const toggleTransactions = () => {
      showTransactions.value = !showTransactions.value
    }

    const handleTransactions = () => {
      transactionsRef.get()
      .then(docs => {
        docs.forEach(doc => {
          console.log(doc.data())
        })
      })
      .catch(e => {
        console.log(e)
      })

    }

    return { showTransactions, handleTransactions, toggleTransactions }
  }
}
</script>

<style>

</style>