<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          programzheng's projects
        </q-toolbar-title>

        <div class="q-pr-auto">
          <router-link class="header-icon-link" :to="{name: 'index'}">
            <q-icon name="home" size="md"></q-icon>
          </router-link>
          <a class="header-icon-link" href="https://github.com/programzheng">
            <q-icon name="ion-logo-github" size="md"></q-icon>
          </a>
        </div>

        <q-toggle
          v-model="darkMode.status.value"
          color="black"
          label="Dark Mode"
          @click="darkMode.toggle"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          網頁導覽
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :toggle-left-drawer="toggleLeftDrawer"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { ionMdSquareOutline } from '@quasar/extras/ionicons-v4'

const linksList = [
  {
    title: 'javascript',
    caption: 'javascript',
    icon: 'code',
    childrens: [
      {
        title: 'timestamp',
        caption: 'timestamp',
        icon: 'timer',
        link: '/javascript/timestamp'
      },
      {
        title: 'date',
        caption: 'date',
        icon: 'calendar_today',
        link: '/javascript/date'
      },
      {
        title: 'jsontodotenv',
        caption: 'jsontodotenv',
        icon: 'autorenew',
        link: '/javascript/jsontodotenv'
      },
      {
        title: 'jwt',
        caption: 'JWT產生與驗證',
        icon: 'vpn_key',
        link: '/javascript/jwt'
      }
    ]
  },
  {
    title: 'go',
    caption: 'go',
    icon: 'code',
    childrens: [
      {
        title: 'language-repository',
        caption: 'language-repository',
        icon: 'menu_book',
        link: '/go/language-repository'
      }
    ]
  },
    {
    title: 'node',
    caption: 'node',
    icon: 'code',
    childrens: [
      {
        title: 'messaging-socket',
        caption: 'messaging-socket',
        icon: 'menu_book',
        link: '/node/messaging-socket'
      }
    ]
  },
];

import { defineComponent, ref } from 'vue'
import darkMode from 'boot/darkMode'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false)
    return {
      ionMdSquareOutline,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      darkMode
    }
  }
})
</script>
