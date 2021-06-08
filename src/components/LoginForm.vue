<template>
  <div class="backdrop" @click.self="closeLoginForm">
    <div class="modal">
      <form @submit.prevent="loginUser">
        
        <div class="form-row">
          <label for="loginEmail">Email</label>
          <input type="email" id="loginEmail" required v-model="loginEmail">
        </div>
        
        <div class="form-row">
          <label for="loginPassword">Password</label>
          <input :type="passType" id="loginPassword" required v-model="loginPassword" >
          <p class="form-message" @click="togglePasswordType">Mostrar/Ocultar clave</p>
          <p class="error-message">{{ errorMessage }}</p>
        </div>
        
        <div class="btn-container">
          <button type="reset">Reset</button>
          <button type="submit">Ingresar</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  emits: ["close-modal", "login-user"],

  setup(props, context) {
    const loginEmail = ref("")
    const loginPassword = ref("")
    const passType = ref("password")
    const errorMessage = ref("")

    // ********** Computed variables ************** //
    const userData = computed(() => {
      return {email: loginEmail.value, password: loginPassword.value}
    })

    // **************** Methods **************** //
        // Toggle password input type between password and text
    const togglePasswordType = () => {
      passType.value = passType.value === "text" ? "password" : "text"
    }

    const closeLoginForm = () => {
      context.emit("close-modal")
    }

    const loginUser = () => {
      context.emit("login-user", userData.value)
    }

    return {
      loginEmail,
      loginPassword,
      passType,
      errorMessage,
      userData,
      togglePasswordType,
      closeLoginForm,
      loginUser
    }
  }
}
</script>

<style>

</style>