import { ref } from 'vue'
import { Dark, LocalStorage } from 'quasar'

const status = ref(LocalStorage.getItem('dark_mode'))

const toggle = function () {
	let status = LocalStorage.getItem('dark_mode')??true
	Dark.set(!status)
	LocalStorage.set('dark_mode', !status)
}

export default{
	status,
	toggle
}