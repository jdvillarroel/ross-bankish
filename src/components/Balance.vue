<template>
  <div class="balance-wrap">
    <h3>Balance Disponible</h3>
    <p>VUSD: <em>${{ balance }}</em></p>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  name: "Balance",

  props: ["userAccount"],

  setup(props) {
    const balance = ref(null)

    watchEffect(() => {
      balance.value = props.userAccount.balance
    })

    return { balance }
  }
}
</script>

<style>

</style>