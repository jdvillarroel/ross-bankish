<template>
  <ul class="links">
    <li><router-link :to="{ name: 'Home' }">Principal</router-link></li>
    <li><router-link :to="{ name: 'Instructions' }">Instrucciones</router-link></li>
  </ul>
</template>

<script>

export default {

}
</script>

<style>
  .links {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .links li {
    list-style: none;
    margin: 1rem;
  }

  .links li a {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    text-decoration: none;
    color: rgb(53, 53, 53);
  }

</style>