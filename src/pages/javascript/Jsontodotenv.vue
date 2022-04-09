<template>
  <div class="q-pa-md row justify-around">
    <div class="q-pa-md col-6">
      <p class="text-h3 text-center">JSON</p>
      <q-input
        v-model="json"
        filled
        autogrow
      />
    </div>
    <div class="q-pa-md col-6">
      <p class="text-h3 text-center">Dotenv</p>
      <div class="q-ma-sm"></div>
      <q-input
        v-model="de"
        filled
        autogrow
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  setup() {
    const formatJson = (val:string) => {
      try {
        return JSON.stringify(JSON.parse(val), null, '\t')
      } catch (error) {
        return val
      }
    }

    const jsonRef = ref(formatJson('{"PORT":"80"}'))
    const deRef = ref('PORT=80')

    const json = computed({
      get:() => {
        return jsonRef.value
      },
      set:(val) => {
        try {
          const data = JSON.parse(val) as Record<string, unknown>
          const keys = Object.keys(data)
          if(keys.length > 0) {
            deRef.value = ''
          }
          keys.forEach((key, index) => {
            deRef.value += `${key}=${data[key] as string}`
            if(keys.length-1 != index) {
              deRef.value += '\n'
            }
          })
        } catch (error) {

        }

        return jsonRef.value = formatJson(val)
      }
    })
    const de = computed({
      get:() => {
        return deRef.value
      },
      set:(val) => {
        let result = '{'
        const data = val.split('=')
        data.reduce((previousValue, currentValue) => {
          return result += `"${previousValue}":"${currentValue}"`
        })
        result += '}'
        jsonRef.value = formatJson(result)
        return deRef.value = val
      }
    })

    return {
      json,
      de
    }
  }
}
</script>
