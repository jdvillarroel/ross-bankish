<template>
  <div class="backdrop" @click.self="closeLoginForm">
    <div class="modal">
      <form>
        
        <div class="form-row">
          <label for="loginEmail">Email</label>
          <input type="email" id="loginEmail" required v-model="loginEmail">
        </div>
        
        <div class="form-row">
          <label for="loginPassword">Password</label>
          <input :type="passType" id="loginPassword" required v-model="loginPassword" >
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
      loginEmail: "",
      loginPassword: "",
      passType: "password"
    }
  },

  methods: {
    // Toggle password input type between password and text
    togglePasswordType() {
      this.passType = this.passType === "text" ? "password" : "text"
    },

    closeLoginForm() {
      this.$emit("close-modal")
    }
  }
}
</script>

<style>

</style>