<script setup>

</script>

<template>
 <v-app>
    <v-layout>
      <v-app-bar  color="surface-variant">
        <v-app-bar-title>Todo List</v-app-bar-title>
        <v-spacer></v-spacer>  
          <v-btn to="/">Home</v-btn>
          <v-btn to="/about">About</v-btn>
      </v-app-bar>

      <v-main style="min-height: 100vh;">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>

</style>
