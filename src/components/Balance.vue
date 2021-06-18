<template>
  <div class="balance-wrap">
    <h3>Balance Disponible</h3>
    <p>VUSD: <em>${{ parseFloat(userAccount.balance.toFixed(2)) }}</em></p>
  </div>
</template>

<script>

export default {
  name: "Balance",

  props: {
    userAccount: Object
  },

  setup(props) {
    
  }
}
</script>

<style>

</style>