<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const emit = defineEmits<{
  (e: 'escape'): void
}>()

function onClick() {
  emit('escape')
}
</script>

<template>
  <button
    class="block text-2xl border border-[3px] border-solid border-white rounded-3xl shadow-[3px_3px_3px_rgb(230,230,230)] w-full px-[.5rem] py-[1rem] mb-3 hover:bg-white hover:text-[#333] hover:translate-1 hover:shadow-[3px_3px_3px_rgb(255,0,0)]"
    @click="onClick"
  >
    {{ props.label }}
  </button>
</template>
