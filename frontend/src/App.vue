
<template>
 
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<script>

import NavBar from './components/navBar.vue'

export default {
  components:{
    NavBar
  }
}

</script>
<style>
*{
  margin: 0;
  padding: 0;
}
</style>
