<template>
  <Dashboard>

    <div class="home">
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
            <a href="https://aitoconsulting.org" target="_blank">contact</a>
            us.
            <br><br>
            Our toolbox is full of: 
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
    </div>
    
  </Dashboard>
</template>

<script>
  import Dashboard from '../layouts/Dashboard'
  import SignUpIn from '../layouts/SignUpIn'

  export default {
    components: {
      Dashboard
    },
    created() {
      this.$emit(`update:layout`,SignUpIn)
    }
  }
</script>

<style scoped>
  .container{
    max-width: 96vw;
    padding: 50px;
  }
</style>