<template>
  <q-layout view="lHh Lpr lFf">
		<q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Node Messaging Socket
        </q-toolbar-title>

        <div class="q-pr-auto" v-if="checkLogin">
          <q-btn icon="logout" dense :ripple="false" size="md" unelevated @click="logout"></q-btn>
        </div>

        <div class="q-pr-auto">
          <router-link class="header-icon-link" :to="{name: 'index'}">
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
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import { nodeMessagingSocketApi, nodeMessagingSocketApiUserTokenKey } from 'boot/axios'

export default {
  name: 'MainLayout',

  setup () {
    const $q = useQuasar()
    const $router = useRouter()

    const darkMode = ref(true)
    $q.dark.set(darkMode.value)

    return {
      ionMdSquareOutline,
      darkMode,
      darkModeSet () {
        $q.dark.set(darkMode.value)
      },
      async checkLogin () {
        const token = $q.localStorage.getItem(nodeMessagingSocketApiUserTokenKey)
        if(!token){
          return false
        }
        await nodeMessagingSocketApi.post('api/v1/users/auth').catch(() => {
          return true
        })
        return false
      },
      logout () {
        $q.localStorage.set(nodeMessagingSocketApiUserTokenKey, null)
        return $router.push({ name: 'node.messaging-socket.login'})
      }
    }
  }
}
</script>