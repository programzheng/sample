<template>
  <q-page padding>
    <div class="row q-mb-xl">
      <div class="col-12">
        <h1 class="text-h3 q-mb-md">JWT</h1>
        <p class="text-body1">
          JSON Web Token (JWT) 是一種開放標準 (RFC 7519)，它定義了一種緊湊且自包含的方式，用於在各方之間以 JSON 物件的形式安全地傳輸信息。此信息可以被驗證和信任，因為它是數字簽名的。
        </p>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-6">
        <q-card class="full-height">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">JWT 產生器</div>
          </q-card-section>
          <q-card-section>
            <p class="text-body2 q-mt-sm">
              使用此工具可以生成 JSON Web Tokens (JWT)。您可以設置標準聲明如簽發者、受眾、主題、過期時間等，也可以添加自定義聲明。
            </p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              color="primary"
              label="開始使用"
              :to="{ name: 'javascript.jwt.generator' }"
            />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="full-height">
          <q-card-section class="bg-secondary text-white">
            <div class="text-h6">JWT 驗證器</div>
          </q-card-section>
          <q-card-section>
            <p class="text-body2 q-mt-sm">
              使用此工具可以解碼和驗證 JSON Web Tokens (JWT)。您可以檢查 JWT 是否有效，查看其標頭和載荷，以及查詢其過期狀態。
            </p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              color="secondary"
              label="開始使用"
              :to="{ name: 'javascript.jwt.verifier' }"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="row q-mt-xl">
      <div class="col-12">
        <h2 class="text-h5 q-mb-md">什麼是 JWT？</h2>
        <p class="text-body1">
          JWT由三部分組成，以點（.）分隔：
        </p>
        <ul>
          <li>標頭 (Header)</li>
          <li>載荷 (Payload)</li>
          <li>簽名 (Signature)</li>
        </ul>
        <p class="text-body1">
          因此，JWT通常形如：<code>xxxxx.yyyyy.zzzzz</code>
        </p>

        <h3 class="text-h6 q-mt-lg">標頭 (Header)</h3>
        <p class="text-body1">
          標頭通常由兩部分組成：令牌類型（即JWT）和所使用的簽名算法，如HMAC SHA256或RSA。
        </p>
        <q-markup-table flat bordered>
          <thead>
            <tr>
              <th>屬性</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>alg</td>
              <td>簽名使用的算法，例如 HS256, RS256</td>
            </tr>
            <tr>
              <td>typ</td>
              <td>令牌類型，固定為 JWT</td>
            </tr>
          </tbody>
        </q-markup-table>

        <h3 class="text-h6 q-mt-lg">載荷 (Payload)</h3>
        <p class="text-body1">
          載荷包含了聲明。聲明是關於實體（通常是用戶）和其他數據的聲明。聲明有三種類型：註冊聲明、公共聲明和私有聲明。
        </p>
        <q-markup-table flat bordered>
          <thead>
            <tr>
              <th>標準聲明</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>iss (issuer)</td>
              <td>簽發人</td>
            </tr>
            <tr>
              <td>exp (expiration time)</td>
              <td>過期時間</td>
            </tr>
            <tr>
              <td>sub (subject)</td>
              <td>主題</td>
            </tr>
            <tr>
              <td>aud (audience)</td>
              <td>受眾</td>
            </tr>
            <tr>
              <td>nbf (not before)</td>
              <td>生效時間</td>
            </tr>
            <tr>
              <td>iat (issued at)</td>
              <td>簽發時間</td>
            </tr>
            <tr>
              <td>jti (JWT ID)</td>
              <td>編號</td>
            </tr>
          </tbody>
        </q-markup-table>

        <h3 class="text-h6 q-mt-lg">簽名 (Signature)</h3>
        <p class="text-body1">
          簽名用於驗證消息在傳輸過程中是否被更改，並且，對於使用私鑰簽名的令牌，它還可以驗證JWT的發送方是否為它所聲稱的發送方。
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JwtIndex'
});
</script>
