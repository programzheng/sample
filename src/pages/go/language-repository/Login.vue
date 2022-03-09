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
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
  interface Token{
    token: string;
  }

  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar'
  import { goLanguageRepositoryApi } from 'boot/axios'

export default{
  setup () {
    const $q = useQuasar()
    const $router = useRouter()

    const account = ref('')
    const password = ref('')
    return {
      account,
      password,

      async onSubmit () {
        //login request
        return await goLanguageRepositoryApi.post<Token>('/api/v1/user/login', {
          account: account.value,
          password: password.value,
        }).then((response) => {
          const token = response.data.token
          $q.localStorage.set('go_language_repository_user_token', token)
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: '登入成功'
          })
          return $router.push({ name: 'go.language-repository.index'})
        })
      },

      onReset () {
        account.value = ''
        password.value = ''
      }
    }
  }
}
</script>
