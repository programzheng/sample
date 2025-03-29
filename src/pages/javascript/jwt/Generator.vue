<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col-12">
        <h1 class="text-h4 q-mb-md">JWT 產生器</h1>
        <p class="text-body1">
          此工具可以幫助您生成 JSON Web Tokens (JWT)。請在下面填寫相關信息。
        </p>
      </div>
    </div>

    <!-- 添加 JWT 存儲開關組件 -->
    <div class="row q-mb-md">
      <div class="col-12">
        <JwtStorageToggle @config-updated="handleConfigUpdate" />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">JWT 設置</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="generateJwt">
              <q-input
                v-model="secret"
                label="密鑰 (Secret)"
                :rules="[(val) => !!val || '請輸入密鑰']"
                class="q-mb-md"
                outlined
                debounce="500"
                @update:model-value="handleSecretInput"
                type="password"
              />

              <q-select
                v-model="algorithm"
                :options="algorithmOptions"
                label="簽名算法"
                class="q-mb-md"
                outlined
              />

              <q-input
                v-model="expiresIn"
                label="過期時間 (如: 1h, 7d, 30d)"
                hint="例如: 1h (一小時), 7d (七天), 30d (三十天)"
                class="q-mb-md"
                outlined
                debounce="500"
              />

              <div class="text-h6 q-my-md">Payload (載荷)</div>

              <q-input
                v-model="subject"
                label="Subject (sub)"
                hint="JWT的主題，通常是用戶ID或唯一標識"
                class="q-mb-md"
                outlined
                debounce="500"
              />

              <q-input
                v-model="issuer"
                label="Issuer (iss)"
                hint="JWT的發行者"
                class="q-mb-md"
                outlined
                debounce="500"
              />

              <q-input
                v-model="audience"
                label="Audience (aud)"
                hint="JWT的接收者"
                class="q-mb-md"
                outlined
                debounce="500"
              />

              <div class="q-mb-md">
                <div class="text-subtitle1">自定義載荷</div>
                <div v-for="(claim, index) in customClaims" :key="index" class="row q-col-gutter-sm q-mb-sm">
                  <div class="col-5">
                    <q-input
                      v-model="claim.key"
                      label="Key"
                      dense
                      outlined
                    />
                  </div>
                  <div class="col-5">
                    <q-input
                      v-model="claim.value"
                      label="Value"
                      dense
                      outlined
                    />
                  </div>
                  <div class="col-2">
                    <q-btn
                      color="negative"
                      icon="delete"
                      dense
                      flat
                      @click="removeClaim(index)"
                    />
                  </div>
                </div>
                <q-btn
                  color="primary"
                  icon="add"
                  label="添加載荷"
                  flat
                  class="q-mt-sm"
                  @click="addClaim"
                />
              </div>

              <div class="q-mt-lg">
                <q-btn
                  type="submit"
                  color="primary"
                  label="生成 JWT"
                  :loading="loading"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">生成的 JWT</div>
          </q-card-section>

          <q-card-section v-if="jwt">
            <q-input
              v-model="jwt"
              type="textarea"
              label="JWT Token"
              readonly
              outlined
              autogrow
            />

            <q-btn
              color="secondary"
              icon="content_copy"
              label="複製 Token"
              class="q-mt-md"
              @click="copyToClipboard(jwt)"
            />
          </q-card-section>

          <q-card-section v-if="jwt">
            <div class="text-h6 q-mb-md">JWT 詳情</div>

            <div class="text-subtitle2 q-mb-sm">Header:</div>
            <q-input
              v-model="decodedHeader"
              type="textarea"
              readonly
              outlined
              autogrow
              class="q-mb-md"
            />

            <div class="text-subtitle2 q-mb-sm">Payload:</div>
            <q-input
              v-model="decodedPayload"
              type="textarea"
              readonly
              outlined
              autogrow
            />
          </q-card-section>

          <q-card-section v-else>
            <div class="text-caption">
              填寫左側表單並點擊"生成 JWT"按鈕來產生 JWT token。
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import JwtUtil from 'src/utils/jwt';
import JwtStorageToggle from '../../../components/JwtStorageToggle.vue';

interface JwtStoredConfig {
  payload: Record<string, unknown>;
  secret: string;
  algorithm: string;
  expiresIn: string;
}

export default defineComponent({
  name: 'JwtGenerator',

  components: {
    JwtStorageToggle
  },

  setup() {
    const $q = useQuasar();

    // JWT設置
    const secret = ref('');
    const displaySecret = ref(''); // 用於顯示的密鑰
    const algorithm = ref('HS256');
    const expiresIn = ref('1h');
    const subject = ref('');
    const issuer = ref('');
    const audience = ref('');
    const customClaims = ref<{ key: string; value: string; }[]>([]);

    // JWT結果
    const loading = ref(false);
    const jwt = ref('');
    const decodedHeader = ref('');
    const decodedPayload = ref('');

    // 支持的簽名算法
    const algorithmOptions = [
      { label: 'HS256 (HMAC with SHA-256)', value: 'HS256' },
      { label: 'HS384 (HMAC with SHA-384)', value: 'HS384' },
      { label: 'HS512 (HMAC with SHA-512)', value: 'HS512' }
    ];

    // 處理儲存配置更新
    const handleConfigUpdate = (config: JwtStoredConfig) => {
      if (config.secret) {
        secret.value = config.secret;
        displaySecret.value = '*'.repeat(config.secret.length);
      }
      if (config.algorithm) algorithm.value = config.algorithm;
      if (config.expiresIn) expiresIn.value = config.expiresIn;

      // 處理 payload
      if (config.payload) {
        if (config.payload.sub) subject.value = config.payload.sub as string;
        if (config.payload.iss) issuer.value = config.payload.iss as string;
        if (config.payload.aud) audience.value = config.payload.aud as string;

        // 處理自定義聲明
        const customPayload = { ...config.payload };
        delete customPayload.sub;
        delete customPayload.iss;
        delete customPayload.aud;
        delete customPayload.exp;
        delete customPayload.iat;

        customClaims.value = Object.entries(customPayload).map(([key, value]) => ({
          key,
          value: String(value)
        }));
      }
    };

    // 處理密鑰輸入
    const handleSecretInput = (value: string | number | null) => {
      if (typeof value === 'string') {
        secret.value = value;
        displaySecret.value = value ? '*'.repeat(value.length) : '';
      }
    };

    // 添加自定義載荷
    const addClaim = () => {
      customClaims.value.push({ key: '', value: '' });
    };

    // 移除自定義載荷
    const removeClaim = (index: number) => {
      customClaims.value.splice(index, 1);
    };

    // 複製到剪貼板
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        $q.notify({
          type: 'positive',
          message: '已複製到剪貼板'
        });
      }).catch(() => {
        $q.notify({
          type: 'negative',
          message: '複製失敗'
        });
      });
    };

    // 生成JWT
    const generateJwt = async () => {
      if (!secret.value) {
        $q.notify({
          type: 'negative',
          message: '請輸入密鑰'
        });
        return;
      }

      loading.value = true;

      try {
        // 構建payload
        const payload: Record<string, unknown> = {};

        if (subject.value) payload.sub = subject.value;
        if (issuer.value) payload.iss = issuer.value;
        if (audience.value) payload.aud = audience.value;

        // 添加自定義載荷
        customClaims.value.forEach(claim => {
          if (claim.key && claim.value) {
            payload[claim.key] = claim.value;
          }
        });

        // 生成JWT
        const token = await JwtUtil.generate(
          payload,
          secret.value,
          {
            algorithm: algorithm.value,
            expiresIn: expiresIn.value || undefined
          }
        );

        jwt.value = token;

        // 解碼並顯示詳情
        const decoded = JwtUtil.decode(token, { complete: true }) as { header: Record<string, unknown>; payload: Record<string, unknown> };
        decodedHeader.value = JSON.stringify(decoded.header, null, 2);
        decodedPayload.value = JSON.stringify(decoded.payload, null, 2);

        $q.notify({
          type: 'positive',
          message: 'JWT 生成成功'
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: `生成失敗: ${error instanceof Error ? error.message : '未知錯誤'}`
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      // 設置
      secret: displaySecret, // 使用顯示用的密鑰
      algorithm,
      algorithmOptions,
      expiresIn,
      subject,
      issuer,
      audience,
      customClaims,

      // 結果
      loading,
      jwt,
      decodedHeader,
      decodedPayload,

      // 方法
      addClaim,
      removeClaim,
      generateJwt,
      copyToClipboard,
      handleConfigUpdate,
      handleSecretInput
    };
  }
});
</script>
