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
            For construction of, or collaboration with, 
            your computation heavy single page applications, please  
            <a href="https://aitoconsulting.org" target="_blank">contact</a>
            us.
            <br><br>
            Our toolbox is full of: 
            <br><a href="https://aws.amazon.com/console/" target="_blank">AWS</a>
            <br><a href="https://reactjs.org/" target="_blank">ReactJS</a> 
            <br><a href="https://vuejs.org/" target="_blank">VueJS</a> 
            <br><a href="https://nodejs.org/en/" target="_blank">NodeJS</a> 
            <br><a href="https://www.wolfram.com/mathematica/" target="_blank">Mathematica</a>
            <br><a href="https://www.python.org/" target="_blank">Python</a> 
            <br><a href="https://www.r-project.org/" target="_blank">R</a> 
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