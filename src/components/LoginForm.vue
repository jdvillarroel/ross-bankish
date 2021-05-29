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
          <p class="form-message" @click="togglePasswordType">Show/hide password</p>
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
import * as fb from "@/firebase"

export default {
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      passType: "password",
      errorMessage: ""
    }
  },

  computed: {
    userData() {
      return {
        email: this.loginEmail,
        password: this.loginPassword
      }
    }
  },

  methods: {
    // Toggle password input type between password and text
    togglePasswordType() {
      this.passType = this.passType === "text" ? "password" : "text"
    },

    closeLoginForm() {
      this.$emit("close-modal")
    },

    loginUser() {
      fb.loginUser(this.userData)
      .then(user => {
        this.$emit("user-logged-in", user)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  }
}
</script>

<style>

</style>