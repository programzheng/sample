<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section>
        登入
      </q-card-section>
      <div class="q-pa-md">
        <q-form
          @submit="onSubmit"
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
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useQuasar } from 'quasar'
  import { goLanguageRepositoryApi } from 'boot/axios'

  export default defineComponent({
    setup () {
      const $q = useQuasar()

      const account = ref('')
      const password = ref('')

      return {
        account,
        password,

        onSubmit () {
          //login request
          return goLanguageRepositoryApi.post('/api/v1/user/login', {
            account: account.value,
            password: password.value,
          }).then((response) => {
            console.log(response)
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: '登入成功'
            })
          }).catch((err) => {
            console.log(err)
          });
        },

        onReset () {
          account.value = ''
          password.value = ''
        }
      }
    }
  })
</script>
