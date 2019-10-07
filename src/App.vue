<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    font-family: "montserrat", sans-serif;
    box-sizing: border-box;

}
body{
      background-image: linear-gradient(120deg, #7f8fa6, #e1b12c);
      min-height: 100vh;
  }
</style>
