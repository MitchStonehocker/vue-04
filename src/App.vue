<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
  </v-app>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'App',

  components: {
    Home
  },

  data() {
    return {
      layout: `div`,
    }
  },
};
</script>
