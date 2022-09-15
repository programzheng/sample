<template>
  <q-page class="column items-center justify-evenly">
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
            type="text"
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
  interface LoginResponse {
    code: string;
    value: {
      token: string;
      exp: number;
    }
  }

  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar'
  import { goBaseAdminApi, goBaseAdminApiUserTokenKey } from 'boot/axios'

export default{
	setup () {
		const $q = useQuasar()
		const $router = useRouter()

		const account = ref('')
		const password = ref('')

		const onSubmit = async () => {
			//login request
			return await goBaseAdminApi.post<LoginResponse>('/api/v1/admins/login', {
				account: account.value,
				password: password.value,
			}).then((response) => {
				const token = response.data.value.token
				$q.localStorage.set(goBaseAdminApiUserTokenKey, token)
				$q.notify({
					color: 'green-4',
					textColor: 'white',
					icon: 'cloud_done',
					message: '登入成功'
				})
				return $router.push({ name: 'go.base.admin.index'})
			})
		}

		const onReset = () => {
			account.value = ''
			password.value = ''
		}

		return {
			account,
			password,

			onSubmit,
			onReset
		}
	}
}
</script>
