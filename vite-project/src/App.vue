<template>
  <HelloTS />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloTS from "./components/HelloTS.vue";

export default defineComponent({
  name: 'App',
  components: {
    HelloTS
  }
});

</script>