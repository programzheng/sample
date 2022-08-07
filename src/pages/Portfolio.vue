<style lang="scss" scoped>
.left-box{
  width: 80%;
}
.icon-link{
  margin: 5px;
  color: inherit;
  text-decoration: none;
}
.column + .column{
  margin-top: 1rem;
}
</style>

<template>
  <q-page class="column items-center justify-evenly fit">
    <div class="row items-center justify-around left-box">
      <div class="col-5">
        <q-card flat bordered>
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Golang</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">Base</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gin</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GRPC</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gorm</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <a class="icon-link" href="https://github.com/programzheng/base">
              <q-icon name="ion-logo-github" size="md"></q-icon>
            </a>

            <q-space />

            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">Base</div>
          <div class="text-caption text-grey">

          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Portfolio',
  setup () {
    return {
      expanded: ref(false)
    }
  }
});
</script>
