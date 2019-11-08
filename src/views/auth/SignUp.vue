// src/views/SignUp.vue

<template>

  <v-flex xs12 sm8 md4>
    <!-- <amplify-authenticator></amplify-authenticator>
    <amplify-sign-out></amplify-sign-out>
    {{signedIn}} -->
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
        <v-toolbar-title>Sign Up</v-toolbar-title>
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
            v-model="userName"
            label="User Name"
            name="userName"
            prepend-icon="person"
            type="text"
            requried
          />
          <v-text-field
            v-model="email"
            label="Email"
            name="email"
            prepend-icon="email"
            type="email"
            requried
          />

          <v-text-field
            v-model="password"
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
            requried
          />
          <v-text-field
            v-model="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            prepend-icon="lock"
            type="password"
            requried
          />

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'Agree to terms to access site.']"
            label="Agree to terms of use?"
            requried
          />

        </v-form>
      </v-card-text>
      <v-card-actions>

        <v-btn 
          color="primary" 
          large 
          @click="signUp"
        >Sign Up</v-btn>
        <v-spacer />
        <v-btn color="secondary" small to="/">Cancel</v-btn>
        <v-btn color="secondary" small to="/signin">Go To Sign In</v-btn>

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
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkbox: false,
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
        this.console.log('>>>-isUserSignedIn-userObj->',userObj)
        this.signedIn = true
      } catch(err) {
        //console.log(err)
        this.signedIn = false
      }
      this.isSubmitting = false
    },
    async signUp() {
      this.isSubmitting = true
      Auth.signUp({
        username: this.email,
        password: this.password,
        attributes: {
          email: this.email,
          name: this.userName
        },
        validationData: [] // optional
      })
      .then((data) => {
        console.log('>>>-SignUp-data->',data)
        this.isSubmitting = false
        this.$router.push({ path: '/confirmsignup', query: { email: this.email } })
      })
      .catch(err => this.console.log(err))
      //this.isSubmitting = false
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

