// src/components/HelloWorld

<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/android-chrome-256x256.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to AITO Consulting
        </h1>
        <p class="subheading font-weight-regular">
          For help or collaboration with your computation heavy single page applications, 
          <br>please  
          <a href="https://community.vuetifyjs.com" target="_blank">contact</a>
          us.
          <br><br>
          We specialize in: 
          <br>ReactJS 
          <br>VueJS 
          <br>NodeJS 
          <br>Python 
          <br>R 
          <br>Mathematica
          <br>AWS
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({

  }),
};
</script>

<style>
h1 {
  color: #0c1b74
}
p {
  color: #0b0431
}
</style>
