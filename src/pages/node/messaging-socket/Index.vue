<template>
	<div class="q-pa-md row center justify-evenly">
		<div>
			<router-link class="display-under-line" :to="{name: 'node.messaging-socket.chat'}">
				<q-card>
					<div class="q-pa-md row">
						<q-icon class="col-12" tag="div" name="chat" size="3rem" />
					</div>
					<q-card-section>
						<div class="text-h5">公共聊天頻道</div>
						<div class="text-caption text-grey">
							Chat
						</div>
					</q-card-section>
				</q-card>
			</router-link>
		</div>
	</div>
</template>