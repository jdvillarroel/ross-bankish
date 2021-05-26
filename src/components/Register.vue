<template>
  <div class="backdrop">
    <div class="modal">
      <form>
        <div class="form-row">
          <label for="fName">Nombre</label>
          <input type="text" id="fName" required v-model="fName">
        </div>
        
        <div class="form-row">
          <label for="lName">Apellido</label>
          <input type="text" id="lName" required v-model="lName">
        </div>
        
        <div class="form-row">
          <label for="email">Email</label>
          <input type="email" id="email" required v-model="email">
        </div>
        
        <div class="form-row">
          <label for="password">Password</label>
          <input :type="passType" id="password" required v-model="password" >
          <p class="form-message" @click="togglePasswordType">Show/hide password</p>
        </div>
        
        <div class="btn-container">
          <button type="reset">Reset</button>
          <button type="submit">Registrarse</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    // *********** Data ****************//
    let isPassword = ref(true)
    let fName = ref("")
    let lName = ref("")
    let email = ref("")
    let password = ref("")
    let passType = ref("password")

    // *********** Methods **************** //
    const togglePasswordType = () => {
      isPassword.value = !isPassword.value

      passType.value = isPassword.value ? "password" : "text"
      console.log(passType.value)
    }

    return { isPassword, togglePasswordType, fName, lName, email, password, passType }
  }
}
</script>

<style>

</style>