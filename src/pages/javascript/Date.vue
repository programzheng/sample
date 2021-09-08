<style lang="scss">
.title-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  margin-bottom: 20px;
}
.title{
  font-size: 30px;
}
.input-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
}
.date-input-tag{
  font-size: 30px;
}
.date-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  margin-top: 100px;
}
.date{
  font-size: 56px;
}
</style>

<template>
  <div class="q-pa-md">
    <div class="title-box">
      <p class="title">Date轉換</p>
    </div>
    <div class="input-box">
      <q-input
        class="date"
        filled
        v-model="inputDate"
        input-class="date-input-tag">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="inputDate" mask="YYYY-MM-DD HH:mm:ss">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="inputDate" mask="YYYY-MM-DD HH:mm:ss" with-seconds format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="date-box">
      <p class="date">{{ inputTimestamp }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
name: 'Date',
setup() {
  const inputDate = ref('')
  const inputTimestamp = computed(() => {
    let timestamp = new Date(inputDate.value).getTime() / 1000
    return timestamp
  })
  return {
    inputDate,
    inputTimestamp
  }
}
});
</script>