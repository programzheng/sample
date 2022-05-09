<template>
    <div class="q-pa-md">
      <div class="q-pa-md">
        <div id="g_id_onload"
            :data-client_id="googleOauthClientID"
            data-callback="handleCredentialResponse">
        </div>
        <div class="g_id_signin" data-type="standard"></div>
      </div>
      <!-- twitter oauth 1.0 -->
      <!-- <div>
        <q-btn class="q-ml-sm" color="primary" label="Twitter Login" @click="twitterOauth10Login" />
      </div> -->
      <!-- twitter oauth 2.0 -->
      <div class="q-pa-md">
        <q-img src="~assets/sign-in-with-twitter-gray.png.twimg.2560.png" style="cursor:pointer;" @click="twitterOauth20Login"></q-img>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

declare global {
    interface Window {
        handleCredentialResponse:(idToken:string) => void
    }
}

export default defineComponent({
  name: 'ThirdPartyAuth',
  props: {
    googleOauthClientID: String,
    handleCredentialResponse: Function,
    twitterOauth10Login: Function,
    twitterOauth20Login: Function,
  },
  setup(props) {

    onMounted(() => {
      let gsiScript = document.createElement('script')
      gsiScript.async = true
      gsiScript.setAttribute('src', 'https://accounts.google.com/gsi/client')
      document.head.appendChild(gsiScript)
      window.handleCredentialResponse = props.handleCredentialResponse as (idToken:string) => void
    })

    return {
    }
  }

})
</script>
