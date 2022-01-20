<template>
  <q-layout view="lHh Lpr lFf">
		<q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Go Messaging Socket
        </q-toolbar-title>

        <div class="q-pr-auto" v-if="false">
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
import { goLanguageRepositoryApi } from 'boot/axios'

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
        const token = $q.localStorage.getItem('go_messaging_socket_user_token')
        if(!token){
          return false
        }
        await goLanguageRepositoryApi.post('api/v1/user/auth').catch(() => {
          return true
        })
        return false
      },
      logout () {
        $q.localStorage.set('go_messaging_socket_user_token', null)
        return $router.push({ name: 'go.messaging-socket.login'})
      }
    }
  }
}
</script>