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
      :twitterOauth10Login="twitterOauth10Login"
      :twitterOauth20Login="twitterOauth20Login"
    />
  </q-page>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue'
import { Token } from 'components/login-form'
import { GoogleOauthCredential } from 'components/third-party-auths'
import LoginForm from 'components/LoginForm.vue'
import ThirdPartyAuth from 'components/ThirdPartyAuth.vue'
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
    //check oauth
    onBeforeMount(async () => {
      console.log($router.currentRoute.value.query)
      switch ($router.currentRoute.value.query.oauth) {
        case 'twitter':
          const code = $router.currentRoute.value.query.code
            await goLanguageRepositoryApi.post<Token>('/api/v1/user/twitter/10/oauth_request_token', {
              code: code,
              oauth_callback: location.href,
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
          break;

        default:
          break;
      }
    })


    const onSubmit = async (account:string, password:string) => {
      //login request
      return await goLanguageRepositoryApi.post<Token>('/api/v1/user/login', {
        account: account,
        password: password,
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

    const twitterOauth10Login = async () => {
      return await goLanguageRepositoryApi.post<Token>('/api/v1/user/twitter/10/oauth_request_token', {
          oauth_callback: location.href,
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
    const twitterOauth20Login = () => {
      const twitterOauth20URL = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.GO_LANGUAGE_REPOSITORY_TWITTER_OAUTH_20_CLIENT_ID as string}&redirect_uri=${process.env.GO_LANGUAGE_REPOSITORY_TWITTER_OAUTH_20_REDIRECT_URI as string}?oauth=twitter&scope=users.read%20follows.read&state=state&code_challenge=challenge&code_challenge_method=plain`
      location.replace(twitterOauth20URL)
    }
    return {

      onSubmit,

      googleOauthClientID,
      handleCredentialResponse,

      twitterOauth10Login,
      twitterOauth20Login
    }
  }
}
</script>
