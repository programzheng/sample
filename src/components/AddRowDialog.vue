<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-center text-h5">ADD</div>
      </q-card-section>

      <template v-for="(unit, unitKey) in units" :key="unitKey">
        <div v-if="unit.type === 'input'">
          <q-card-section>
            <div class="text-h6">{{unit.label}}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input dense v-model="unitsRequest[unit.name]" />
          </q-card-section>
        </div>
      </template>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { Unit } from 'src/components/add-row-dialog'

export default defineComponent({
  props: {
    units: {
      type: Array as PropType<Array<Unit>>,
    }
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  setup () {
    let unitsRequest = ref({})
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    return {
      dialogRef,
      onDialogHide,
      onOKClick () {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(unitsRequest.value)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
      unitsRequest
    }
  }
})
</script>
