<template>
  <q-expansion-item
    clickable
    :icon="icon"
    :label="title"
  >
    <q-item
      v-for="children in childrens"
      :key="children.title"
      :inset-level="1"
      tag="a"
      :to="children.link"
      clickable
      @click="toggleLeftDrawer"
    >
      <q-item-section
        avatar
      >
        <q-avatar :icon="children.icon"/>
      </q-item-section>
      <q-item-section>{{children.title}}</q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    toggleLeftDrawer: Function,
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
