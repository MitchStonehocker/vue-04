// src/views/SignUp.vue

<template>

  <v-flex xs12 sm8 md4>
    <v-flex xs12>
      <router-link to="/">
      <v-img
        :src="require('../../assets/android-chrome-256x256.png')"
        class="my-3"
        contain
        height="100"
      ></v-img>
      </router-link>
    </v-flex>
    <v-card class="elevation-12">
      <v-toolbar
        color="primary"
        dark
        flat
      >
        <v-toolbar-title>Sign Up Confirmation</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-progress-linear
        v-if="isSubmitting"
        :indeterminate="true"
        class="my-1"
        color="cyan"
      ></v-progress-linear>

      <v-card-text>
        <v-form>
        <v-text-field
            disabled
            v-model="userEmail"
            label="Email"
            name="userEmail"
            prepend-icon="email"
            type="email"
        >
        {{ userEmail }}
        </v-text-field>
        <v-text-field
            v-model="signupConfirm"
            label="Confirmation Code"
            name="signupConfirm"
            prepend-icon="lock"
            type="text"
            requried
        />
        </v-form>
      </v-card-text>
      <v-card-actions>

        <v-btn 
            @click="confirmSignup"
            color="primary" 
            large
        >Confirm Sign Up</v-btn>
        <v-spacer />
        <v-btn color="secondary" small to="/">Send New Code</v-btn>

      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script>
import SignUpIn from '../../layouts/SignUpIn';
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  data() {
    return {
      signedIn: false,
      isSubmitting: false,
      userEmail: this.$route.query.email,
      signupConfirm: ''
    }
  },
  created() {
    this.$emit(`update:layout`,SignUpIn)
    this.isUserSignedIn()
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.isUserSignedIn()
      } else {
        this.signedIn = false
      }
    })
  },
  methods: {
    async isUserSignedIn() {
      this.isSubmitting = true
      try {
        Auth.currentAuthenticatedUser()    //const userObj = Auth.currentAuthenticatedUser()
        //const userObj = Auth.currentAuthenticatedUser()
        //this.console.log(userObj)
        this.signedIn = true
      } catch(err) {
        //console.log(err)
        this.signedIn = false
      }
      this.isSubmitting = false
    },
    async confirmSignup() {
        this.isSubmitting = true
        console.log('>>>-confirmSignup-this.email->',(this.email))
        console.log('>>>-confirmSignup-this.signupConfirm->',(this.signupConfirm))
        Auth.confirmSignUp(this.userEmail, this.signupConfirm, {})
        .then((data) => {
            console.log('>>>-confirmSignup-data->',(data))
            this.$router.push({ path: '/signin' })
        })
        .catch(err => alert(err))
    }
    //this.isSubmitting = false
  }
}
</script>

<style>
  .container{
    max-width: 100vw;
    padding: 25px;
  }

</style>

