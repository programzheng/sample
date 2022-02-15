<template>
  <q-page class="column items-center justify-evenly">
    <div>
      請至電子郵件信箱收取驗證信進行驗證後再執行登入
    </div>
    <div>
      <router-link :to="{name: 'node.messaging-socket.login'}">
        返回登入
      </router-link>
    </div>
  </q-page>
</template>

<script lang="ts">

export default{
  setup () {
    return {
    }
  }
}
</script>
