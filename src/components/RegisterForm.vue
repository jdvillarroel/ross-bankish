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

export default {
  data() {
    return {
      fName: "",
      lName: "",
      email: "",
      password: "",
      passType: "password"
    }
  },

  methods: {
    // Toggle password input type between password and text
    togglePasswordType() {
      this.passType = this.passType === "text" ? "password" : "text"
    },

    closeRegisterForm() {
      this.$emit("close-modal")
    },

    registerUser() {
      console.log("Register clicked")
    }
  }
}
</script>

<style>

</style>