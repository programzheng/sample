<template>
  <q-page class="column items-center justify-evenly">
    <div>
      {{validateMessage}}
    </div>
    <div>
      <router-link :to="{name: 'node.messaging-socket.login'}">
        返回登入
      </router-link>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { nodeMessagingSocketApi } from 'boot/axios'

export default{
  setup () {
    const $q = useQuasar()
    const $router = useRouter()
    const route = useRoute()

    const validateMessage = ref('等待驗證中...');

    onBeforeMount(async () => {
      const code = route.query.code
      const validate = {
        code: code
      }
      await nodeMessagingSocketApi.post('/api/v1/users/register/email_validate', validate).then(() => {
          $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: '驗證成功'
        })

        validateMessage.value = '驗證成功'

        return $router.push({ name: 'node.messaging-socket.login'})
      }).catch(() => {
        return validateMessage.value = '驗證失敗'
      })
    })

    return {
      validateMessage
    }
  }
}
</script>
