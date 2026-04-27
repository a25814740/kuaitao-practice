<script setup lang="ts">
const props = defineProps<{
  countdownLabel: string
  diffText: string
  status: string
  nickname?: string
  jobType?: string
}>()
</script>

<template>
  <div class="profile-info text-center">
    <div class="text-xl font-black" :class="[props.status == 'after' ? 'text-[red]' : '']">
      {{ props.diffText }}
    </div>
    <div class="text-xs tracking-[1px] mt-1" :class="[props.status == 'after' ? 'text-[red]' : '']">
      {{ props.countdownLabel }}
    </div>
    <div class="text-xs mt-2 text-[#444]" v-if="props.nickname">
      {{ props.nickname }}<span v-if="props.jobType">・{{ props.jobType }}</span>
    </div>
  </div>
</template>
