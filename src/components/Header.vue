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

    <transition name="nav-links">
    <ul v-if="isMenuOpen" class="actions">
      <li @click="loginUser">Ingresar</li>
      <!-- <li @click="logoutUser">Salir</li> -->
      <li @click="registerUser">Registrarse</li>
    </ul>
    </transition>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: [
    "show-modal"
  ],

  setup(props, context) {
    const isMenuOpen = ref(false)

    // *********** Methods ************ //
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const loginUser = () => {
      context.emit("show-modal", "login")
      setTimeout(toggleMenu, 1000)
    }

    const registerUser = () => {
      context.emit("show-modal", "register")
      setTimeout(toggleMenu, 1000)
    }

    return { isMenuOpen, toggleMenu, loginUser, registerUser }
  }
}
</script>

<style>
  .nav-links-enter-from,
  .nav-links-leave-to {
    transform: translateY(-10rem);
  }

  .nav-links-enter-to,
  .nav-links-leave-from {
    transform: translateY(0);
  }

  .nav-links-enter-active,
  .nav-links-leave-active {
    transition: all 0.6s ease-in-out;
  }
</style>