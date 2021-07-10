<template>
  <q-expansion-item
    clickable
    expansion-separator
    :icon="icon"
    :label="title"
  >
    <q-expansion-item
      v-for="children in childrens"
      :key="children.title"
      :header-inset-level="1"
      :icon="children.icon"
      :label="children.title"
      :to="children.link"
    >
    </q-expansion-item>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    childrens: {
      type: Array,
      default: () => [
        {
          type: Object,
          default: () => ({
            title: {
              type: String,
              required: true
            },

            caption: {
              type: String,
              default: ''
            },

            link: {
              type: String,
              default: '#'
            },

            icon: {
              type: String,
              default: ''
            }
          })
        },
      ]
    }
  }
})
</script>
