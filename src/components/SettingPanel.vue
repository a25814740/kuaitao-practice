<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore, type JobType } from '../stores/user'

const user = useUserStore()

const hourModel = computed({
  get: () => user.offWorkHour,
  set: (v: number) => user.setOffWorkTime(v, user.offWorkMinute),
})

const minuteModel = computed({
  get: () => user.offWorkMinute,
  set: (v: number) => user.setOffWorkTime(user.offWorkHour, v),
})

const jobOptions: JobType[] = [
  '工程師',
  '設計師',
  '行銷',
  '客服',
  '餐飲',
  '行政',
  '公職',
  '醫療',
  '其他',
]
</script>

<template>
  <section class="border border-white my-5 p-3 rounded-xl">
    <div class="text-sm font-bold mb-3">設定（Stage 5｜Pinia）</div>

    <div class="grid gap-3">
      <label class="grid gap-1">
        <span class="text-xs text-[#ddd]">暱稱</span>
        <input v-model="user.nickname" class="px-3 py-2 rounded bg-[#111] border border-[#444]" />
      </label>

      <label class="grid gap-1">
        <span class="text-xs text-[#ddd]">職業</span>
        <select v-model="user.jobType" class="px-3 py-2 rounded bg-[#111] border border-[#444]">
          <option v-for="opt in jobOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </label>

      <div class="grid gap-1">
        <span class="text-xs text-[#ddd]">下班時間</span>
        <div class="flex gap-2 items-center">
          <input
            v-model.number="hourModel"
            type="number"
            min="0"
            max="23"
            class="w-20 px-3 py-2 rounded bg-[#111] border border-[#444]"
          />
          <span>:</span>
          <input
            v-model.number="minuteModel"
            type="number"
            min="0"
            max="59"
            class="w-20 px-3 py-2 rounded bg-[#111] border border-[#444]"
          />
        </div>
      </div>

      <label class="grid gap-1">
        <span class="text-xs text-[#ddd]">收入（練習欄位）</span>
        <input
          v-model.number="user.income"
          type="number"
          min="0"
          class="px-3 py-2 rounded bg-[#111] border border-[#444]"
        />
      </label>

      <label class="grid gap-1">
        <span class="text-xs text-[#ddd]">頭像 URL</span>
        <input
          v-model="user.avatarUrl"
          class="px-3 py-2 rounded bg-[#111] border border-[#444]"
        />
      </label>
    </div>
  </section>
</template>
