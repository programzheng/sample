<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-uploader
      :factory="uploadFactory"
      @factory-failed="uploadFactoryFailed"
      multiple
      auto-upload
      hide-upload-btn
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup () {
    const resultBase64s = reactive<{base64:string[]}>({
      base64: []
    })

    const getBase64 = (file:File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    const uploadFactory = (files:File[]) => {
      return new Promise((resolve, reject) => {
        void (async () => {
          try {
            const file = files[0]
            const base64 = await getBase64(file) as string
            resultBase64s.base64.push(base64)
            resolve(null)
          } catch (error) {
            reject(error)
          }
        })()
      })
    }

    const uploadFactoryFailed = (err:Error) => {
      console.log('UploaderBase64 uploadFactoryFailed: ',err)
    }

    return {
      uploadFactory,
      uploadFactoryFailed,
      resultBase64s
    }
  }
})
</script>
