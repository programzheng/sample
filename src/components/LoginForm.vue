<template>
  <q-form
      @submit="onSubmit(account, password)"
      @reset="onReset"
      class="q-gutter-md"
  >
      <q-input
      filled
      v-model="account"
      label="帳號"
      lazy-rules
      :rules="[ val => val && val.length > 0 || '不可以留空']"
      />

      <q-input
      filled
      v-model="password"
      type="password"
      label="密碼"
      lazy-rules
      :rules="[
          val => val !== null && val !== '' || '不可以留空',
      ]"
      />

      <div>
      <q-btn label="送出" type="submit" color="primary"/>
      <q-btn label="重填" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginForm',
  props: {
    inputs: Object,
    onSubmit: Function
  },
  setup () {
    const account = ref('')
    const password = ref('')

    const onReset = () => {
      account.value = ''
      password.value = ''
    }

    return {
      account,
      password,

      onReset
    }
  }
})
</script>
