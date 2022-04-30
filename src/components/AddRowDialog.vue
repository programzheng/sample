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
        <div v-if="unit.type === 'base64_files'">
          <div class="q-pa-md" style="max-width: 300px">
            <q-uploader
              @added="addedBase64Upload"
              multiple
            >
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                    <q-tooltip>Clear All</q-tooltip>
                  </q-btn>
                  <div class="col">
                    <div class="q-uploader__title">Choose your files</div>
                  </div>
                  <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" @click="scope.pickFiles" round dense flat>
                    <q-uploader-add-trigger />
                    <q-tooltip>Pick Files</q-tooltip>
                  </q-btn>
                </div>
              </template>
              <template v-slot:list="scope">
                <q-list padding>

                  <q-item v-for="file in scope.files" :key="file.__key">
                    <!-- <q-item-section>
                      <q-item-label class="full-width">
                        {{ file.name }}
                      </q-item-label>

                      <q-item-label caption>
                        Status: {{ file.__status }}
                      </q-item-label>

                      <q-item-label caption>
                        {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                      </q-item-label>
                    </q-item-section> -->

                    <q-item-section
                      v-if="file.__img"
                      top
                      style="height: 50%; max-width: 80%"
                    >
                      <q-img :src="file.__img.src" />
                    </q-item-section>

                    <q-item-section side>
                      <q-btn
                        class="gt-xs"
                        size="24px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="scope.removeFile(file)"
                      />
                    </q-item-section>
                  </q-item>

                </q-list>
              </template>
            </q-uploader>
          </div>
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
import { UploaderFile } from 'src/components/uploader'

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
  setup (props) {
    const unitsRequest = ref({})

    const getBase64 = (file:File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    const addedBase64s = ref<UploaderFile[]>([])
    const addedBase64Upload = async (files:File[]) => {
      if(props.units){
        const file = files[0]
        const base64 = await getBase64(file) as string
        const fileKey = props.units.find(x => x.type === 'base64_files')?.type
        if(fileKey){
          addedBase64s.value.push({
            hash_id: '',
            type: 'base64',
            value: base64
          })
          unitsRequest.value = { ...unitsRequest.value, files:addedBase64s.value }
        }
      }
    }

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    return {
      dialogRef,
      onDialogHide,
      onOKClick () {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK((unitsRequest.value))
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
      unitsRequest,
      addedBase64Upload
    }
  }
})
</script>
