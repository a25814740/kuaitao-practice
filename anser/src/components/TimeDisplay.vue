<script setup lang="ts">
const props = defineProps<{
  countdownLabel: string
  diffText: string
  nowText: string
  offWorkTimeText: string
}>()
</script>

<template>
  <section class="time-wrapper grid grid-cols-2 gap-3 mb-5">
    <div class="border border-solid border-[3px] border-[#fff] rounded-2xl bg-[#ddd] text-[#333] p-3">
      <div class="text-xs tracking-[1px] mb-2">現在時間</div>
      <div class="text-xl font-black">{{ props.nowText }}</div>
    </div>
    <div class="border border-solid border-[3px] border-[#fff] rounded-2xl bg-[#ddd] text-[#333] p-3">
      <div class="text-xs tracking-[1px] mb-2">下班時間</div>
      <div class="text-xl font-black">{{ props.offWorkTimeText }}</div>
    </div>
  </section>

  <section class="profile border border-solid border-[3px] border-[#fff] rounded-[30px] bg-[#ddd] text-[#333] mt-3 pb-4">
    <div class="profile-info text-center pt-6">
      <div class="text-xl font-black">{{ props.diffText }}</div>
      <div class="text-xs tracking-[1px] mt-1">{{ props.countdownLabel }}</div>
    </div>
  </section>
</template>

