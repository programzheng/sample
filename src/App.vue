<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    provide('api',  {
      laravelBaseApi: process.env.LARAVEL_BASE_API
    })
  }
})
</script>
