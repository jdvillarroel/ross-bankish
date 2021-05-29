<template>
  <header>
    <div class="header-container">
      <div class="logo-container">
        <span class="material-icons">account_balance_wallet</span>
        <h2>Ross Bankish</h2>
      </div>
      <!-- Display menu or close menu icons -->
      <div class="menu">
        <span v-if="isMenuOpen" @click="toggleMenu" class="material-icons">close</span>
        <span v-else @click="toggleMenu" class="material-icons">menu</span>
      </div>
    </div>

    <ul v-if="isMenuOpen" class="actions">
      <li @click="login">Ingresar</li>
      <li @click="logout">Salir</li>
      <li @click="register">Registrarse</li>
    </ul>
  </header>
</template>

<script>
import * as fb from "@/firebase"

export default {
  emits: [
    "show-modal"
  ],

  data() {
    return {
      isMenuOpen: false
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },

    login() {
      this.$emit("show-modal", "login")
      setTimeout(this.toggleMenu, 1000)
    },

    logout() {
      fb.logout()
      setTimeout(this.toggleMenu, 1000)
    },

    register() {
      this.$emit("show-modal", "register")
      setTimeout(this.toggleMenu, 1000)
    }
  }
}
</script>

<style>

</style>