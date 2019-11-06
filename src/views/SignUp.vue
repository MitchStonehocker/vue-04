// src/views/SignUp.vue

<template>

  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar
        color="primary"
        dark
        flat
      >
        <v-toolbar-title>Sign Up</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Sign Up"
            name="signUp"
            prepend-icon="person"
            type="text"
          />

          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
          />
            <v-text-field
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            prepend-icon="lock"
            type="password"
          />

        </v-form>
      </v-card-text>
      <v-card-actions>

        <v-btn color="primary">Sign Up</v-btn>
        <v-spacer />
        <v-btn color="secondary" to="/">Cancel</v-btn>
        <v-btn color="secondary" to="/signin">Sign In</v-btn>

      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script>
import SignUpIn from '../layouts/SignUpIn';

export default {
  created() {
    this.$emit(`update:layout`,SignUpIn)
  }
}
</script>

<style>
  .container{
    max-width: 100vw;
    padding: 25px;
  }

</style>

