<template>
  <div class="user-info">
    <p class="user">Usuario: {{ currentUser.email }}</p>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
  name: "RegularUser",

  props: {
    currentUser: {
      type: Object
    }
  },

  setup(props) {
    
  }

}
</script>

<style>

</style>