<template>
  <q-page class="column items-center justify-evenly">
    <q-card>
      <q-card-section>
        註冊會員
      </q-card-section>
      <div class="q-pa-md">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="register.account"
            type="email"
            label="帳號"
            lazy-rules
            :rules="[ val => val && val.length > 0 || '不可以留空']"
          />

          <q-input
            filled
            v-model="register.password"
            type="password"
            label="密碼"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '不可以留空',
            ]"
          />

          <q-input
            filled
            v-model="register.name"
            type="text"
            label="姓名"
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
    <div>
      <router-link :to="{name: 'node.messaging-socket.login'}">
      返回
      </router-link>
    </div>
  </q-page>
</template>

<script lang="ts">
interface Register{
  account: string;
  password: string;
  name: string;
  validate_url: string;
}

interface Token{
  token: string;
}

import { ref } from 'vue'
import { useRouter, NavigationFailure } from 'vue-router'
import { useQuasar } from 'quasar'
import { nodeMessagingSocketApi, nodeMessagingSocketApiUserTokenKey } from 'boot/axios'

export default{
  setup () {
    const $q = useQuasar()
    const $router = useRouter()

    const validateUrl = `${window.location.origin}/node/messaging-socket/register/email_validate`;

		const register = ref<Register>({
			account: '',
			password: '',
			name: '',
      validate_url: validateUrl,
		})

    const onSubmit = async () => {
      //login request
      return await nodeMessagingSocketApi.post<Token>('/api/v1/users/register', register.value).then((response) => {
        const token = response.data.token

        return awaitingVerification(token)
      })
    }

    const awaitingVerification = (token:string):Promise<void | NavigationFailure | undefined> => {
      if(process.env.NODE_MESSAGING_SOCKET_USER_THIRD_PARTY_VALIDATION) return $router.push({ name: 'node.messaging-socket.register.awaiting_verification'})

        $q.localStorage.set(nodeMessagingSocketApiUserTokenKey, token)
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: '註冊成功'
        })

      return $router.push({ name: 'node.messaging-socket.index'})
    }

    const onReset = () => {
      register.value.account = ''
      register.value.password = ''
      register.value.name = ''
    }

    return {
			register,

      onSubmit,
      awaitingVerification,
      onReset
    }
  }
}
</script>
