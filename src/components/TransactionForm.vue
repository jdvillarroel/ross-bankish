<template>
  <div class="transaction-form-title" @click="toggleForm">
    <h4>Registrar Transaccion</h4>
    <span v-show="!showTransactionForm" class="material-icons">expand_more</span>
    <span v-show="showTransactionForm" class="material-icons">expand_less</span>
  </div>
  
  <div class="form-wrap">
    <form @submit.prevent="handleTransaction" v-show="showTransactionForm">
    <div class="form-row">
      <label for="from">De (email)</label>
      <input type="email" id="from" required v-model="from">
    </div>
    
    <div class="form-row">
      <label for="to">Para (email)</label>
      <input type="email" id="to" required v-model="to">
    </div>
    
    <div class="form-row">
      <label for="amount">Cantidad</label>
      <input type="number" min="0" step="0.01" id="amount" required v-model="amount">
    </div>
    
    <div class="form-row">
      <label for="description">Descripcion</label>
      <textarea id="description" cols="30" rows="10" v-model="description"></textarea>
      <p class="error-message"></p>
    </div>
    
    <div class="btn-container">
      <button type="reset">Reset</button>
      <button type="submit">Registrar</button>
    </div>
    
  </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: "TransactionForm",

  setup() {
    const from = ref("")
    const to = ref("")
    const amount = ref(null)
    const description = ref("")
    const showTransactionForm = ref(false)

    const handleTransaction = () => {
      console.log(from.value)
      console.log(to.value)
      console.log(amount.value)
      console.log(description.value)
    }

    const toggleForm = () => {
      showTransactionForm.value = !showTransactionForm.value
    }


    return { from, to, amount, description, showTransactionForm, handleTransaction, toggleForm }
  }
}
</script>

<style>

</style>