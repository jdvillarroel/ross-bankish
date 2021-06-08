<template>
  <h4>Registrar Transaction</h4>
  <div class="modal">
    <form @submit.prevent="">
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
      <textarea id="description" cols="30" rows="10"></textarea>
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


    return { from, to, amount, description }
  }
}
</script>

<style>

</style>