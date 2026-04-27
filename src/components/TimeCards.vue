<script setup lang="ts">
const props = defineProps<{
  items: Array<{
    title: string
    value: string
  }>
}>()
</script>

<template>
  <section class="time-wrapper grid grid-cols-2 gap-3 mb-5">
    <div
      v-for="item in props.items"
      :key="item.title"
      class="border border-solid border-[3px] border-[#fff] rounded-2xl bg-[#ddd] text-[#333] p-3"
    >
      <div class="text-xs tracking-[1px] mb-2">{{ item.title }}</div>
      <div class="text-xl font-black">{{ item.value }}</div>
    </div>
  </section>
</template>
