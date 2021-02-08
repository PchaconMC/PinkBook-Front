<template>
  <div id="app">    
    <!-- <div class="ContainerOver"> -->
<router-view/>
    <!-- </div>    -->
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=RalewayBold:wght@900&display=swap');

html,body{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
