<template>
  <v-app>
    <v-toolbar
      height="50px"
      fixed
      color="#970747" dark
      :extended="extended"
      :prominent="prominent"
      :dense="dense"
      :collapse="collapse"
      :flat="flat"
      :src="bg ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg' : undefined"
      :extension-height="extensionHeight"
    >
      <v-toolbar-title to="/">Vue-04</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/signup">Sign Up</v-btn>
        <v-btn text to="/signin">Sign In</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer fixed color="#970747" dark>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} &nbsp;-&nbsp; ATIO Consulting</div>
      <v-spacer></v-spacer>
    </v-footer>

  </v-app>
</template>

<script>
//import Home from './views/Home';

export default {
  name: 'App',

  components: {
    //Home
  },

  data: () => ({
    extended: false,
    extendedSlot: false,
    prominent: false,
    dense: false,
    collapse: false,
    flat: false,
    bg: false,
    extensionHeight: 48,
  }),
};
</script>
