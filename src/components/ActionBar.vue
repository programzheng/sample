<template>
  <div class="q-pa-md row justify-between">
    <div class="col-6">
      <q-btn class="q-ml-sm" color="green" label="回到上一頁" @click="$router.back()" />
    </div>
    <div class="col-6 row justify-end">
      <q-btn class="q-ml-sm" color="primary" label="Add row" :disable="addRowButtonDisabled" @click="addRowClick" />
      <q-btn class="q-ml-sm" color="amber" label="Edit row" :disable="editRowButtonDisabled" @click="editRowClick" />
      <q-btn class="q-ml-sm" color="red" label="Remove row" :disable="removeRowButtonDisabled" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ActionBar',
  props: {
    addRowButtonDisabled: Boolean,
    addRowClick: Function,
    editRowButtonDisabled: Boolean,
    editRowClick: Function,
    removeRowButtonDisabled: Boolean
  },
  setup () {
    console.log('action bar setup')
    return {}
  }
})
</script>
