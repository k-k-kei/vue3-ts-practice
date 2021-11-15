<template>
<div>
<!-- <div class="bg-local" style="background-image: url('../public/images/wood_100.jpg')"> -->
  <Header />
  <router-view />
  <Footer />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  }
});

</script>