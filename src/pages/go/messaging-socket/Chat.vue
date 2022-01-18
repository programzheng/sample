<template>
	<div></div>
</template>

<script>
import io from 'socket.io-client';

export default {
	setup() {
		var socket = io(process.env.GO_MESSAGING_SOCKET)

		socket.on('connect', () => {
			console.log(socket.id)
		})

		socket.on('notice', (data) => {
			console.log(data)
		})

		socket.emit('reply', 'Hello!')
	}
}
</script>

<style>

</style>