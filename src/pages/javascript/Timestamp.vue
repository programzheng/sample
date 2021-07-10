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
.timestamp-input-tag{
  font-size: 30px;
}
.timestamp{
  width: 60%;
  font-size: 20px;
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
      <p class="title">Timestamp轉換</p>
    </div>
    <div class="input-box">
      <q-input class="timestamp"
        type="number"
        v-model="inputTimestamp"
        label="timestamp"
        standout
        input-class="timestamp-input-tag"
      />
    </div>
    <div class="date-box">
      <p class="date">{{ inputDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
name: 'Timestamp',
setup() {
  const inputTimestamp = ref(0)
  const inputDate = computed(() => {
    console.log(inputTimestamp.value)
    let date = new Date(inputTimestamp.value*1000).toLocaleString()
    return date
  })
  return {
    inputTimestamp,
    inputDate
  }
}
});
</script>