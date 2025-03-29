<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col-12">
        <h1 class="text-h4 q-mb-md">JWT 驗證器</h1>
        <p class="text-body1">
          此工具可以幫助您驗證和解碼 JSON Web Tokens (JWT)。
        </p>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">JWT 輸入</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="verifyJwt">
              <q-input
                v-model="jwt"
                type="textarea"
                label="JWT Token"
                :rules="[(val) => !!val || '請輸入JWT']"
                class="q-mb-md"
                outlined
                autogrow
              />

              <q-input
                v-model="secret"
                label="密鑰 (Secret)"
                hint="如果您想驗證簽名，請輸入密鑰"
                class="q-mb-md"
                outlined
                debounce="500"
              />

              <div class="q-mt-lg">
                <q-btn
                  type="submit"
                  color="primary"
                  label="驗證 JWT"
                  :loading="loading"
                  class="q-mr-md"
                />
                <q-btn
                  color="secondary"
                  label="僅解碼"
                  @click="decodeJwt"
                  :disabled="!jwt"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">JWT 詳情</div>
          </q-card-section>

          <q-card-section v-if="decodedHeader || decodedPayload">
            <div class="text-subtitle2 q-mb-sm">
              <div class="row items-center">
                <div>Header:</div>
                <q-space />
                <q-btn
                  size="sm"
                  flat
                  dense
                  color="primary"
                  icon="content_copy"
                  @click="copyToClipboard(decodedHeader)"
                />
              </div>
            </div>
            <q-input
              v-model="decodedHeader"
              type="textarea"
              readonly
              outlined
              autogrow
              class="q-mb-md"
            />

            <div class="text-subtitle2 q-mb-sm">
              <div class="row items-center">
                <div>Payload:</div>
                <q-space />
                <q-btn
                  size="sm"
                  flat
                  dense
                  color="primary"
                  icon="content_copy"
                  @click="copyToClipboard(decodedPayload)"
                />
              </div>
            </div>
            <q-input
              v-model="decodedPayload"
              type="textarea"
              readonly
              outlined
              autogrow
              class="q-mb-md"
            />

            <div class="text-subtitle2 q-mb-sm">簽名:</div>
            <div class="text-body2 q-mb-md">{{ signature }}</div>

            <div class="q-mt-md" v-if="verificationResult !== null">
              <q-chip
                :color="verificationResult ? 'positive' : 'negative'"
                text-color="white"
                icon="verified"
                v-if="verificationResult"
              >
                簽名有效
              </q-chip>
              <q-chip
                color="negative"
                text-color="white"
                icon="dangerous"
                v-else
              >
                簽名無效
              </q-chip>
            </div>

            <div class="q-mt-md" v-if="isExpired !== null">
              <q-chip
                :color="!isExpired ? 'positive' : 'negative'"
                text-color="white"
                :icon="!isExpired ? 'schedule' : 'alarm_off'"
              >
                {{ !isExpired ? 'Token 未過期' : 'Token 已過期' }}
              </q-chip>
            </div>

            <div class="q-mt-md" v-if="expiresIn !== null">
              <div class="text-subtitle2">過期時間:</div>
              <div class="text-body2">{{ expiresIn }}</div>
            </div>
          </q-card-section>

          <q-card-section v-else>
            <div class="text-caption">
              輸入JWT並點擊"驗證JWT"按鈕解碼和驗證。
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

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export default defineComponent({
  name: 'JwtVerifier',

  setup() {
    const $q = useQuasar();
    
    // 輸入
    const jwt = ref('');
    const secret = ref('');
    
    // 結果
    const loading = ref(false);
    const decodedHeader = ref('');
    const decodedPayload = ref('');
    const signature = ref('');
    const verificationResult = ref<boolean | null>(null);
    const isExpired = ref<boolean | null>(null);
    const expiresIn = ref<string | null>(null);

    // 從JWT中獲取簽名部分
    const extractSignature = (token: string): string => {
      const parts = token.split('.');
      return parts.length === 3 ? parts[2] : '';
    };

    // 計算過期時間的可讀格式
    const formatExpiryDate = (exp: number | undefined): string => {
      if (!exp) return '無過期時間';
      
      const expiryDate = new Date(exp * 1000);
      return `${expiryDate.toLocaleDateString()} ${expiryDate.toLocaleTimeString()}`;
    };

    // 驗證JWT
    const verifyJwt = async () => {
      if (!jwt.value) {
        $q.notify({
          type: 'negative',
          message: '請輸入JWT'
        });
        return;
      }

      if (!secret.value) {
        $q.notify({
          type: 'warning',
          message: '未提供密鑰，只進行解碼而不驗證簽名'
        });
        decodeJwt();
        return;
      }

      loading.value = true;

      try {
        // 驗證JWT簽名
        const verified = await JwtUtil.verify(jwt.value, secret.value);
        verificationResult.value = !!verified;
        
        // 解碼JWT
        decodeJwtInternal();
        
        $q.notify({
          type: verificationResult.value ? 'positive' : 'negative',
          message: verificationResult.value ? 'JWT簽名有效' : 'JWT簽名無效'
        });
      } catch (error) {
        console.error('JWT驗證錯誤:', error);
        $q.notify({
          type: 'negative',
          message: `JWT驗證失敗: ${error instanceof Error ? error.message : '未知錯誤'}`
        });
        verificationResult.value = false;
      } finally {
        loading.value = false;
      }
    };

    // 僅解碼JWT
    const decodeJwt = () => {
      if (!jwt.value) {
        $q.notify({
          type: 'negative',
          message: '請輸入JWT'
        });
        return;
      }

      loading.value = true;

      try {
        decodeJwtInternal();
        
        $q.notify({
          type: 'positive',
          message: 'JWT解碼成功'
        });
      } catch (error) {
        console.error('JWT解碼錯誤:', error);
        $q.notify({
          type: 'negative',
          message: `JWT解碼失敗: ${error instanceof Error ? error.message : '未知錯誤'}`
        });
      } finally {
        loading.value = false;
      }
    };

    // 解碼JWT內部實現
    const decodeJwtInternal = () => {
      try {
        // 解碼JWT
        const decoded = JwtUtil.decode(jwt.value, { complete: true }) as DecodedJwt;
        decodedHeader.value = JSON.stringify(decoded.header, null, 2);
        decodedPayload.value = JSON.stringify(decoded.payload, null, 2);
        
        // 獲取簽名
        signature.value = extractSignature(jwt.value);
        
        // 檢查過期
        isExpired.value = JwtUtil.isExpired(jwt.value);
        
        // 格式化過期時間
        if (decoded.payload.exp) {
          expiresIn.value = formatExpiryDate(decoded.payload.exp as number);
        } else {
          expiresIn.value = null;
        }
      } catch (error) {
        // 重置所有結果
        decodedHeader.value = '';
        decodedPayload.value = '';
        signature.value = '';
        isExpired.value = null;
        expiresIn.value = null;
        throw error;
      }
    };

    // 複製到剪貼板
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        $q.notify({
          type: 'positive',
          message: '已複製到剪貼板'
        });
      }).catch((err: Error) => {
        $q.notify({
          type: 'negative',
          message: `複製失敗: ${err.message}`
        });
      });
    };

    return {
      // 輸入
      jwt,
      secret,
      
      // 結果
      loading,
      decodedHeader,
      decodedPayload,
      signature,
      verificationResult,
      isExpired,
      expiresIn,
      
      // 方法
      verifyJwt,
      decodeJwt,
      copyToClipboard
    };
  }
});
</script>
