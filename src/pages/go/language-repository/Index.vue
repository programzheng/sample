<template>
	<div class="q-pa-md row center justify-evenly">
		<div>
			<router-link class="display-under-line" :to="{name: 'go.language-repository.dictionary'}">
				<q-card>
					<div class="q-pa-md row">
						<q-icon class="col-12" tag="div" name="menu_book" size="3rem" />
					</div>
					<q-card-section>
						<div class="text-h5">辭典</div>
						<div class="text-caption text-grey">
							Dictionary
						</div>
					</q-card-section>
				</q-card>
			</router-link>
		</div>
	</div>
</template>