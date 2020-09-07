<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import tips from '@/common/tips'
export default {
  name: 'App',
  created(){
    tips.setDom(this)
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  background:#ECECEC;
  font-weight: 400;
  font-size:4vw;
}
</style>
