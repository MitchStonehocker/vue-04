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
            label="User Name"
            name="userName"
            prepend-icon="person"
            type="text"
            requried
            v-model="userName"
            @input="$v.userName.$touch()"
            @blur="$v.userName.$touch()"
            :error-messages="userNameErrors"
          />
          <v-text-field
            label="Email"
            name="email"
            prepend-icon="email"
            type="email"
            requried
            v-model="email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            :error-messages="emailErrors"
          />

          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
            requried
            v-model="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            :error-messages="passwordErrors"
          />
          <v-text-field
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            prepend-icon="lock"
            type="password"
            requried
            v-model="confirmPassword"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
            :error-messages="confirmPasswordErrors"
          />

          <v-checkbox
            label="Agree to AITO Consulting terms of use?"
            requried
            v-model="userAgreement"
            @change="$v.userAgreement.$touch()"
            @blur="$v.userAgreement.$touch()"
            :error-messages="userAgreementErrors"
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
import { required, email, minLength } from 'vuelidate/lib/validators'
import { hasNumber, hasLowerCaseLetter, hasUpperCaseLetter, hasSpecialCharacter } from '../../utilities/password'

export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userAgreement: false,
      signedIn: false,
      isSubmitting: false
    }
  },
  validations: {
    userName: { required },
    email: { required, email },
    password: { required, minLength: minLength(8), hasNumber, hasLowerCaseLetter, hasUpperCaseLetter, hasSpecialCharacter },
    confirmPassword: { required },
    userAgreement: { 
      checked(val) {
        return val
      }
     },
  },
  computed: {
    userNameErrors () {
      const errors = []
      if (!this.$v.userName.$dirty) return errors
      !this.$v.userName.required && errors.push('User name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required.')
      !this.$v.email.email && errors.push('Valid email is required (__@__.__).')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      !this.$v.password.hasLowerCaseLetter && errors.push('Password must have 1 lower case letter.')
      !this.$v.password.hasUpperCaseLetter && errors.push('Password must have 1 upper case letter.')
      !this.$v.password.hasNumber && errors.push('Password must have 1 number.')
      !this.$v.password.hasSpecialCharacter && errors.push('Password must have 1 special character.')
      !this.$v.password.minLength && errors.push('Password must have 8 or more characters.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      //(this.$v.confirmPassword.required === this.$v.password) && errors.push("Passwords don't match.")
      !this.$v.confirmPassword.required && errors.push('Password match is required.')
      !(this.password === this.confirmPassword) && errors.push('Password does not match.')
      return errors
    },
    userAgreementErrors () {
      const errors = []
      if (!this.$v.userAgreement.$dirty) return errors
      !this.$v.userAgreement.checked && errors.push('Agreement to terms is required.')
      return errors
    },
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
      this.$v.$touch()
      if (!this.$v.$dirty) {
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
        .then(() => {
          //console.log('>>>-SignUp-data->',data)
          this.isSubmitting = false
          this.$router.push({ path: '/confirmsignup', query: { email: this.email } })
        })
        .catch(err => this.console.log(err))
        this.isSubmitting = false
      } else {
        console.log("User sign up validations failed")
      }
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

