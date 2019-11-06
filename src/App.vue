<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
  </v-app>
</template>

<script>
import Home from './views/Home';
import About from './views/About';

export default {
  name: 'App',

  components: {
    Home,
    About
  },

  data() {
    return {
      layout: `div`,
    }
  },
};
</script>
