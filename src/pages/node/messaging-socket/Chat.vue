<template>
	<div>
		<div class="q-pa-md row justify-center">
			<div style="width: 100%; max-width: 400px">
				<q-chat-message
					v-for="message in messages.results"
					:key="message.id"
					:name="getMessageName(message)"
					:text='[message.message]'
					:sent="getMessageSent(message)"
					:bg-color="getMessageBackgroundColor(getMessageSent(message))"
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
import { onMounted, ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { io, Socket } from 'socket.io-client'
import { nodeMessagingSocketApi, nodeMessagingSocketApiUserTokenKey } from 'boot/axios'

interface User {
	uuid: string;
	UserProfile: UserProfile;
}

interface UserProfile {
	userId: number;
	email: string;
	name: string;
}

interface Message {
	id: number;
	socketId: string;
	userId: number;
	message: string;
	User: User
}

export default {
	setup() {
		const $q = useQuasar()
		const userToken = $q.localStorage.getItem(nodeMessagingSocketApiUserTokenKey)
		const userProfile = ref<UserProfile | null>(null)
		onMounted(async () => {
			const userProfileReponse = await nodeMessagingSocketApi.get('api/v1/user_profiles')
			userProfile.value = userProfileReponse.data as UserProfile
		});
	
		const socket: Socket = io(window.location.origin, {
			extraHeaders: {
				Authorization: `Bearer ${userToken as string}`
			}
		});
		let messages = reactive({
			results: [] as Message[]
		})

		const currentSocketId = ref<string>('')
		socket.on('connect', () => {
			if (socket.id) {
				currentSocketId.value = socket.id
			}
		})

		socket.on('message', (data:Message[]) => {
			messages.results = data
		})

		const addMessage = ref('')

		/**
		 * Functions
		 */
		const	getMessageName = (message:Message) => {
			if(message.userId > 0 && message.User && message.User.UserProfile) return message.User.UserProfile.name

			return message.socketId
		}
		const	getMessageSent = (message:Message) => {
				if(message.userId === userProfile.value?.userId) return true

				if(currentSocketId.value === message.socketId) return true

				return false
		}
		const getMessageBackgroundColor = (sent:boolean) => {
			return sent ? 'green-4' : 'grey-4'
		}
		const sendMessage = () => {
			if(addMessage.value === '') return false
			socket.emit('add:message', {
				message: addMessage.value
			})
			addMessage.value = ''
		}

		return {
			userProfile,
			socket,
			currentSocketId,
			messages,
			addMessage,

			getMessageName,
			getMessageSent,
			getMessageBackgroundColor,
			sendMessage
		}
	}
}
</script>

<style>

</style>