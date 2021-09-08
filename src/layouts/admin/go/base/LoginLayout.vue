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

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import darkMode from 'boot/darkMode'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const api = inject('api');
    console.log(api)

		return {
			darkMode
		}
  }
})
</script>