<script setup lang="ts">
const props = defineProps<{
  countdownLabel: string
  diffText: string
}>()
</script>

<template>
  <section
    class="profile border border-solid border-[3px] border-[#fff] rounded-[30px] bg-[#ddd] text-[#333] mt-3 pb-4"
  >
    <div class="profile-info text-center pt-6">
      <div class="text-xl font-black">{{ props.diffText }}</div>
      <div class="text-xs tracking-[1px] mt-1">{{ props.countdownLabel }}</div>
    </div>
  </section>
</template>
