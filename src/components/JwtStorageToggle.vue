<template>
  <div class="q-pa-md">
    <q-card class="jwt-storage-toggle">
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <div class="text-h6">JWT 本地存儲</div>
            <div class="text-caption text-grey-7">
              開啟後會將 JWT 相關設定儲存在瀏覽器中，方便下次使用
            </div>
          </div>
          <div class="col-auto">
            <q-toggle
              v-model="isEnabled"
              color="primary"
              @update:model-value="handleToggle"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section v-if="isEnabled">
        <div class="text-caption text-grey-7">
          <q-icon name="info" size="xs" class="q-mr-xs" />
          已儲存的設定：
        </div>
        <div class="q-mt-sm">
          <template v-if="hasStoredConfig">
            <div class="row q-gutter-sm">
              <q-chip
                v-if="storedConfig.algorithm"
                size="sm"
                color="primary"
                text-color="white"
              >
                演算法: {{ storedConfig.algorithm }}
              </q-chip>
              <q-chip
                v-if="storedConfig.expiresIn"
                size="sm"
                color="primary"
                text-color="white"
              >
                過期時間: {{ storedConfig.expiresIn }}
              </q-chip>
              <q-chip
                v-if="Object.keys(storedConfig.payload).length"
                size="sm"
                color="primary"
                text-color="white"
              >
                已儲存 Payload
              </q-chip>
            </div>
          </template>
          <template v-else>
            <div class="text-grey-6">
              尚未儲存任何設定
            </div>
          </template>
        </div>
      </q-card-section>

      <q-card-actions v-if="isEnabled && hasStoredConfig" align="right">
        <q-btn
          flat
          color="negative"
          label="清除設定"
          @click="clearConfig"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import JwtUtil from 'src/utils/jwt';

export default defineComponent({
  name: 'JwtStorageToggle',

  emits: ['config-updated'],

  setup(props, { emit }) {
    const isEnabled = ref(false);
    const storedConfig = ref(JwtUtil.getStoredConfig());

    // 檢查是否有已儲存的設定
    const hasStoredConfig = computed(() => {
      return storedConfig.value.secret !== '' ||
        storedConfig.value.algorithm !== 'HS256' ||
        storedConfig.value.expiresIn !== '' ||
        Object.keys(storedConfig.value.payload).length > 0;
    });

    // 處理開關切換
    const handleToggle = (value: boolean) => {
      if (value) {
        JwtUtil.enableStorage();
      } else {
        JwtUtil.disableStorage();
      }
      // 更新顯示的設定
      storedConfig.value = JwtUtil.getStoredConfig();
      emit('config-updated', storedConfig.value);
    };

    // 清除設定
    const clearConfig = () => {
      JwtUtil.clearStoredConfig();
      storedConfig.value = JwtUtil.getStoredConfig();
      emit('config-updated', storedConfig.value);
    };

    // 組件掛載時檢查開關狀態
    onMounted(() => {
      isEnabled.value = JwtUtil.isStorageEnabled();
      emit('config-updated', storedConfig.value);
    });

    return {
      isEnabled,
      storedConfig,
      hasStoredConfig,
      handleToggle,
      clearConfig
    };
  }
});
</script>

<style scoped>
.jwt-storage-toggle {
  max-width: 600px;
}
</style>
