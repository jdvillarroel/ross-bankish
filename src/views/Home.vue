<template>
  <div class="home">
    <div class="container">
      <RegularUser />


    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import {  ref } from "vue"
import RegularUser from "../components/RegularUser.vue"

export default {
  name: 'Home',

  components: {
    RegularUser
  },

  setup(props, context) {

    // **************** Methods *************** //

    return {

    }
  }

}
</script>

<style>
  .container {
    width: 90%;
    margin: 1rem auto;
    text-align: center;
  }

  .container h1 {
    margin-bottom: 0.8rem;
    font-size: 1.7rem;
  }

</style>