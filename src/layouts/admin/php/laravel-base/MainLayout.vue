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
          <a class="header-icon-link" href="/">
            <q-icon name="home" size="md"></q-icon>
          </a>
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
    title: '會員',
    caption: '會員',
    icon: 'person',
    childrens: [
      {
        title: '使用者',
        caption: '使用者',
        icon: 'people',
        link: '/admin/php/laravel-base/user'
      }
    ]
  }
];

import { useQuasar } from 'quasar'
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  setup () {
    const api = inject('api');
    console.log(api)
    const $q = useQuasar()
    const darkMode = ref(true)
    $q.dark.set(darkMode.value)
    const leftDrawerOpen = ref(false)

    return {
      ionMdSquareOutline,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      darkMode,
      darkModeSet () {
        $q.dark.set(darkMode.value)
      }
    }
  }
})
</script>