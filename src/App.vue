<template>
  <Header @show-modal="showModal" />
  <Links />
  <router-view :showForm="showForm" @close-modal="showModal"/>
</template>

<script>
import Home from "./views/Home.vue"
import Instructions from "./views/Instructions.vue"
import Header from "./components/Header.vue"
import Links from "./components/Links.vue"

export default {
  
  components: {
    Home,
    Instructions,
    Header,
    Links
  },

  data() {
    return {
      showForm: ""
    }
  },

  methods: {
    showModal(payload) {
      this.showForm = payload
    }
  }
}
</script>

<style>

</style>
