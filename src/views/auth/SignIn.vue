// src/views/SignIn.vue

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
        <v-toolbar-title>Sign In</v-toolbar-title>
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
            v-model="email"
            id="email"
            label="Email"
            name="email"
            prepend-icon="email"
            type="text"
          />

          <v-text-field
            v-model="password"
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
          />

        </v-form>
      </v-card-text>
      <v-card-actions>

        <v-btn 
          color="primary" 
          large
          @click="signIn"
        >Sign In</v-btn>
        <v-spacer />
        <v-btn color="secondary" small to="/">Cancel</v-btn>
        <v-btn color="secondary" small to="/forgotpassword">Forgot Password</v-btn>
        <v-btn color="secondary" small to="/signup">Go To Sign Up</v-btn>

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
      email: this.$route.query.email || '',
      password: '',
      signedIn: false,
      isSubmitting: false
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
        //Auth.currentAuthenticatedUser()
        const userObj = Auth.currentAuthenticatedUser()
        this.console.log(userObj)
        this.signedIn = true
      } catch(err) {
        //console.log(err)
        this.signedIn = false
      }
      this.isSubmitting = false
    },
    async signIn() {
      this.isSubmitting = true
      Auth.signIn(this.email, this.password)
      .then(user => console.log('>>>-signIn-user->',user))
      .catch(err => {
        console.log('>>>-signIn-err->',err)
        this.signedIn = false})
        
      this.isSubmitting = false
      this.$router.push({ path: '/userhome' })
    }
  }
}
</script>

<style>
  .container{
    max-width: 100vw;
    padding: 25px;
  }

</style>
