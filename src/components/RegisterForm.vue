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
import * as fb from "@/firebase"

export default {
  data() {
    return {
      fName: "",
      lName: "",
      email: "",
      password: "",
      passType: "password",
      //user: null,
      errorMessage: ""
    }
  },

  computed: {
    userData() {
      return {
        email: this.email,
        password: this.password,
        firstName: this.fName,
        lastName: this.lName
      }
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
      // Create user in firebase.
      fb.createUser(this.userData)
      .then(user => {
        // this.user = user
        this.fName = ""
        this.lName = ""
        this.email = ""
        this.password = ""

        this.$emit("user-created", user)
      })
      .catch(err => {
        this.errorMessage = err.message
      })
    }
  }
}
</script>

<style>

</style>