<template>
  <div class="balance-wrap">
    <h3>Balance Disponible</h3>
    <p>VUSD: <em>${{ userAccount.balance }}</em></p>
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