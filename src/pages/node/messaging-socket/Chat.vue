<template>
	<div>
		<div class="q-pa-md row justify-center">
			<div style="width: 100%; max-width: 400px">
				<q-chat-message
					v-for="message in messages.results"
					:key="message.id"
					:name="message.socket_id"
					:text='[message.message]'
					:sent="currentSocketId === message.socket_id"
				/>

				<div>
					<q-input dense debounce="300" v-model.trim="addMessage"  @keyup.enter="sendMessage" />
					<!-- <q-btn class="q-ml-sm" color="primary" label="Send Message" @click="sendMessage" /> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script lang='ts'>
import { ref, reactive } from 'vue'
import { io, Socket } from 'socket.io-client'

interface Message {
	id: number;
	socket_id: string;
	message: string;
}

export default {
	setup() {
		const socket: Socket = io(process.env.NODE_MESSAGING_SOCKET as string);
		let messages = reactive({
			results: [] as Message[]
		})

		const currentSocketId = ref('')
		socket.on('connect', () => {
			currentSocketId.value = socket.id
		})

		socket.on('message', (data:Message[]) => {
			messages.results = data
		})

		const addMessage = ref('')

		return {
			socket,
			currentSocketId,
			messages,
			addMessage,

			sendMessage() {
				socket.emit('add:message', {
					message: addMessage.value
				})
				addMessage.value = ''
			}
		}
	}
}
</script>

<style>

</style>