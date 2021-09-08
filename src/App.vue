<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    $q.dark.set(Boolean($q.localStorage.getItem('dark_mode')??true))
    provide('api',  {
      laravelBaseApi: process.env.LARAVEL_BASE_API
    })
  }
})
</script>
