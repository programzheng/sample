<template>
  <q-page class="row items-center justify-evenly">
    Index
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  components: { ExampleComponent },
  setup() {

  }
});
</script>
