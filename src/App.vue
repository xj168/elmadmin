<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
};
</script>

<style>
body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,legend,li,ol,p,pre,td,textarea,th,ul {
  margin: 0;
  padding: 0;
}
html,body,#app{
  height: 100%;
  width: 100%;
}
a:link,a:visited,a{
  text-decoration: none;
  color: #606266;
}
a:hover{
  color: #6695f3;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
