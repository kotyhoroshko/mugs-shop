<template>
  <router-view v-slot="slotProps">
    <transition name="slide" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style lang="scss" >
body {
  margin: 0;
  background: #ffefba;
  background: -webkit-linear-gradient(to bottom, #ffffff, #ffefba);
  background: linear-gradient(to bottom, #ffffff, #ffefba);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 101svh;
}

* {
  box-sizing: border-box;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-66%);
  opacity: 0;
}
.slide-leave-active,
.slide-enter-active {
  transition: 0.33s ease-in-out;
}
</style>
