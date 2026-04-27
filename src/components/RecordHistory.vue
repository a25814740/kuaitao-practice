<script lang="ts" setup>
const props = defineProps<{
  items: Array<{
    deltaText: string
    timeText: string
  }>
}>()
</script>

<template>
  <section class="border border-white my-5 p-3">
    <div class="text-sm font-bold mb-2">歷史紀錄（最近10筆）</div>
    <ol class="text-sm space-y-1" v-if="props.items.length">
      <li v-for="(item, idx) in props.items" :key="idx">
        {{ item.timeText }} | {{ item.deltaText }}
      </li>
    </ol>
    <section class="border border-white my-5 p-3 text-sm" v-else>
      <div>歷史紀錄：尚無</div>
    </section>
  </section>
</template>
