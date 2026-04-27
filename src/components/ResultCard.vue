<script setup lang="ts">
const props = defineProps<{
  clickCount: number
  formattedLastClick: string
  resultText: string
  lastClickTime: Date | null
}>()
</script>

<template>
  <div class="result">
    <div class="flex justify-between">
      <div>最後點擊時間：{{ props.formattedLastClick }}</div>
      <div>次數：{{ props.clickCount }}</div>
    </div>
    <div class="text-center mt-2" v-if="props.lastClickTime">{{ props.resultText }}</div>
  </div>
</template>
