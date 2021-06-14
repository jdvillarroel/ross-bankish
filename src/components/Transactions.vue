<template>
  <div class="transactions-title" @click="handleTransactions">
    <h4>Historial de Transacciones</h4>
    <span v-show="!showTransactions" class="material-icons">expand_more</span>
    <span v-show="showTransactions" class="material-icons">expand_less</span>
  </div>

  <div v-show="showTransactions">
    Transacciones...
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "Transactions",

  setup() {
    const showTransactions = ref(false)

    // ********* Methods ********** //
    const handleTransactions = () => {
      showTransactions.value = !showTransactions.value
    }

    return { showTransactions, handleTransactions }
  }
}
</script>

<style>

</style>