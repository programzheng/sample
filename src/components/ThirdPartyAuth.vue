<template>
    <div class="q-pa-md">
      <div id="g_id_onload"
          :data-client_id="googleOauthClientID"
          data-callback="handleCredentialResponse">
      </div>
      <div class="g_id_signin" data-type="standard"></div>
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
    handleCredentialResponse: null,
    Api: null,
    LoginApi: String,
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
