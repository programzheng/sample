<template>
	<div></div>
</template>

<script lang='ts'>
import { io, Socket } from 'socket.io-client'

export default {
	setup() {
		const socket: Socket = io(process.env.GO_MESSAGING_SOCKET as string);

		socket.on('connect', () => {
			console.log(socket.id)
		})

		// socket.on('notice', () => {

		// })

		// socket.emit('reply', 'Hello!')
	}
}
</script>

<style>

</style>