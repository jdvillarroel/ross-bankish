<template>
  <div class="balance-wrap">
    <h3>Resumen de Cuenta</h3>
    <p>Saldo Actual: <em>${{ parseFloat(userAccount.postedBalance.toFixed(2)) }}</em></p>
    <p>Saldo Disponible: <em :class="{ 'diff-balance': isDifferent }">${{ parseFloat(userAccount.availableBalance.toFixed(2)) }}</em></p>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: "Balance",

  props: {
    userAccount: Object
  },

  setup(props) {
    const isDifferent = computed(() => {
      return props.userAccount.availableBalance !== props.userAccount.postedBalance
    })



    return { isDifferent }
  }
}
</script>

<style>

</style>