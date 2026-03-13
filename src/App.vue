<template>
  <div>
    <div class="mb-[94px]"> 
      <Navbar />
    </div>
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/layouts/navbar/Navbar.vue";
import Footer from "./components/layouts/Footer.vue";
import Home from "./pages/home/home.vue";
</script>

<style></style>
