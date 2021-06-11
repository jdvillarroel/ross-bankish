<template>
  <div class="user-info">
    <p class="user">Usuario: {{ currentUser.email }}</p>
  </div>
  <Balance :userAccount="userAccount" />
</template>

<script>
import Balance from "./Balance.vue"

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
    Balance
  },

  setup(props) {
    
  }

}
</script>

<style>

</style>