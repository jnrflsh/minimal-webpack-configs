<template>
    <h1>vue 3 typescript minimal webpack example</h1>
    <button @click="increase">Increase {{ count }}</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const increase = () => count.value++

    return { count, increase }
  }
})
</script>

