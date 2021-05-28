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
      console.log("login selected")
    },

    logout() {
      console.log("logout selected")
    },

    register() {
      this.$emit("show-modal", "register")
    }
  }
}
</script>

<style>

</style>