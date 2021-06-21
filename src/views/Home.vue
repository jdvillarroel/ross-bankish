<template>
  <div class="home">
    <div class="container">
      <h1 v-show="isAuth">Bienvenid@</h1>
      <p v-show="!isAuth">Por favor presione el icono de menu para ingresar</p>
      <RegularUser
        v-if="isAuth"
        :currentUser="currentUser"
        :userAccount="userAccount"
      />

    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import {  ref } from "vue"
import RegularUser from "../components/RegularUser.vue"
import AdminUser from "../components/AdminUser.vue"

export default {
  name: 'Home',

  props: {
    isAuth: Boolean,
    currentUser: Object,
    userType: String,
    userAccount: Object
  },

  components: {
    RegularUser,
    AdminUser
  },

  setup(props, context) {

    // **************** Methods *************** //

    return {
      
    }
  }

}
</script>

<style>


</style>