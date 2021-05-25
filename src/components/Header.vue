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
      <li>Ingresar</li>
      <li>Salir</li>
      <li>Registrarse</li>
    </ul>
  </header>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {
    let isMenuOpen = ref(false)

    // Toggle menu icon.
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    return {isMenuOpen, toggleMenu}
  }

}
</script>

<style>

</style>