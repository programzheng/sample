<template>
  <q-page class="column items-center justify-evenly">
    <q-card>
      <q-card-section>
        登入
      </q-card-section>
      <div class="q-pa-md">
        <LoginForm
          :onSubmit="onSubmit"
        />
      </div>
    </q-card>
    <ThirdPartyAuth
      v-if="googleOauthClientID"
      :googleOauthClientID="googleOauthClientID"
      :handleCredentialResponse="handleCredentialResponse"
    />
  </q-page>
</template>

<script lang="ts">
import { Token } from 'components/login-form'
import { GoogleOauthCredential } from 'components/third-party-auths'
import LoginForm from 'components/LoginForm.vue'
import ThirdPartyAuth from 'components/ThirdPartyAuth.vue'
import { Ref } from 'vue'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import { goLanguageRepositoryApi } from 'boot/axios'

export default{
  components: {
    LoginForm,
    ThirdPartyAuth
  },
  setup () {
    const $q = useQuasar()
    const $router = useRouter()

    const onSubmit = async (account:Ref<string>, password:Ref<string>) => {
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
    }

    const googleOauthClientID = process.env.GO_LANGUAGE_REPOSITORY_GOOGLE_OAUTH_CLIENT_ID
    const handleCredentialResponse = async (credential:GoogleOauthCredential) => {
        return await goLanguageRepositoryApi.post<Token>('/api/v1/user/google/oauth', {
          id_token: credential.credential,
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
    }

    return {

      onSubmit,

      googleOauthClientID,
      handleCredentialResponse
    }
  }
}
</script>
