<template>
  <div class="backdrop" @click.self="closeRegisterForm">
    <div class="modal">
      <form @submit.prevent="registerUser">
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
          <p class="form-message" @click="togglePasswordType">Mostrar/Ocultar clave</p>
          <p class="error-message">{{ errorMessage }}</p>
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
import { ref, computed, onUnmounted, watchEffect } from 'vue'

export default {
  emits: ["close-modal", "register-user"],

  props: {
    registerError: String
  },

  setup(props, context) {
    const fName = ref("")
    const lName = ref("")
    const email = ref("")
    const password = ref("")
    const passType = ref("password")
    const errorMessage = ref("")

    // ********** Computed properties *************** //
    const userData = computed(() => {
      return {firstName: fName.value, lastName: lName.value, email: email.value.toLowerCase(), password: password.value}
    })

    // ********** Methods ************ //
    // Toggle password input type between password and text
    const  togglePasswordType = () => {
      passType.value = passType.value === "text" ? "password" : "text"
    }

    const closeRegisterForm = () => {
      context.emit("close-modal")
    }

    const registerUser = () => {
      // Emit event to create user in firebase.
      context.emit("register-user", userData.value)
    }

    onUnmounted(() => {
      fName.value = ""
      lName.value = ""
      email.value = ""
      password.value = ""
      errorMessage.value = ""
      passType.value = "password"
    })

    watchEffect(() => {
      errorMessage.value = props.registerError
    })

    return {
      fName,
      lName,
      email,
      password,
      passType,
      errorMessage,
      togglePasswordType,
      closeRegisterForm,
      registerUser
    }
  }
}
</script>

<style>

</style>