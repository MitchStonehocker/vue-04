<template>
    <div>
        <v-app-bar
            fixed
            color="#970747" 
            dark
            extension-height="57px"
            min-height="57px"
            max-height="57px"
        >
        <v-app-bar-nav-icon>

        </v-app-bar-nav-icon>
        
        <v-toolbar-title>
            <v-btn text to="/">Vue-04</v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text to="/signup">Sign Up</v-btn>
            <v-btn text to="/signin">Sign In</v-btn>
        </v-toolbar-items>
        </v-app-bar>

        <v-content>
            <slot />
        </v-content>

        <v-footer 
            fixed 
            color="#970747" 
            dark
            min-height="57px"
            max-height="57px"
        >
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }} &nbsp;-&nbsp; AITO Consulting</div>
        <v-spacer></v-spacer>
        </v-footer>
    </div>
</template>