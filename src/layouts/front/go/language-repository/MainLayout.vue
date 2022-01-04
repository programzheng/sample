<template>
  <q-layout view="lHh Lpr lFf">
		<q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Go Language Repository
        </q-toolbar-title>

        <div class="q-pr-auto">
          <router-link class="header-icon-link" to="/">
            <q-icon name="home" size="md"></q-icon>
          </router-link>
          <a class="header-icon-link" href="https://github.com/programzheng">
            <q-icon name="ion-logo-github" size="md"></q-icon>
          </a>
        </div>

        <q-toggle
          v-model="darkMode"
          color="black"
          label="Dark Mode"
          @click="darkModeSet"
        />
      </q-toolbar>
    </q-header>

		<q-page-container>
      <router-view />
    </q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { ionMdSquareOutline } from '@quasar/extras/ionicons-v4'

import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'MainLayout',

  setup () {
    const $q = useQuasar()
    const darkMode = ref(true)
    $q.dark.set(darkMode.value)

    return {
      ionMdSquareOutline,
      darkMode,
      darkModeSet () {
        $q.dark.set(darkMode.value)
      }
    }
  }
}
</script>