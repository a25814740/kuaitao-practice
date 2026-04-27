<script setup lang="ts">
import { computed, ref } from 'vue'
import { quotes } from '@/data/quotes'

import EscapeButton from '@/components/EscapeButton.vue'
import TimeCards from '@/components/TimeCards.vue'
import ProfilePanel from '@/components/ProfilePanel.vue'
import ResultCard from '@/components/ResultCard.vue'
import RecordHistory from '@/components/RecordHistory.vue'

import { useEscapeTimer } from './composables/useEscapeTimer'
import { useOffDutyStatus } from './composables/useOffDutyStatus'

const OFF_WORK_HOUR = 15
const OFF_WORK_MINUTE = 39

const { now, diffMs, diffText, offWorkTimeText, nowText, makeOffWorkTime, formatTime, formatHms } =
  useEscapeTimer({
    offWorkHour: OFF_WORK_HOUR,
    offWorkMinute: OFF_WORK_MINUTE,
    tickMs: 1000,
  })

const { status, countdownLabelText } = useOffDutyStatus(diffMs)

const lastClickTime = ref<Date | null>(null)
const lastClickDeltaMs = ref<number | null>(null) // clickTime - offWorkTime(at click day)
const clickCount = ref(0)
const records = ref<Array<{ clickTime: Date; deltaMs: number }>>([])

function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / 86400000) + 1
}

function getDailyQuote(date: Date) {
  const dayOfYear = getDayOfYear(date)
  const index = (dayOfYear - 1) % quotes.length
  return quotes[index]
}

const statusText = computed(() => (status.value === 'before' ? '🏃等待陶跑中' : '⚡命苦加班中'))
const todayQuote = computed(() => getDailyQuote(now.value))

const timeCards = computed(() => [
  { title: '現在時間', value: nowText.value },
  { title: '下班時間', value: offWorkTimeText.value },
])

const formattedLastClick = computed(() =>
  lastClickTime.value ? formatTime(lastClickTime.value) : '尚無紀錄',
)

const resultText = computed(() => {
  if (!lastClickTime.value || lastClickDeltaMs.value === null) return '尚無紀錄'
  const delta = lastClickDeltaMs.value
  const prefix = delta < 0 ? '乖乖上班! 你距離下班還有' : '辛苦了! 你已經加班了'
  return `${prefix} ${formatHms(delta)}`
})

const recordItems = computed(() =>
  records.value.map((r) => {
    const prefix = r.deltaMs < 0 ? '提早' : '延後'
    return {
      timeText: formatTime(r.clickTime),
      deltaText: `${prefix} ${formatHms(r.deltaMs)}`,
    }
  }),
)

function handleClick() {
  // 用 now 的時間戳記，確保顯示與倒數是同一個「現在」
  const clickTime = new Date(now.value.getTime())
  const offWorkAtClick = makeOffWorkTime(clickTime)

  lastClickTime.value = clickTime
  lastClickDeltaMs.value = clickTime.getTime() - offWorkAtClick.getTime()
  clickCount.value += 1

  records.value.unshift({ clickTime, deltaMs: lastClickDeltaMs.value })
  if (records.value.length > 10) records.value.length = 10
}
</script>

<template>
  <div class="wrapper">
    <div class="container min-w-[375px] max-w-[576px] mx-auto">
      <header>
        <div class="title mb-3">
          <h2 class="text-sm uppercase tracking-[2px] text-shadow-[0_3px_3px_rgb(255_0_0)]">
            RunNao!!
          </h2>
          <h1 class="text-3xl font-black text-shadow-[0_3px_3px_rgb(255_0_0)] text-shadow-red-300">
            塊陶啊!!
          </h1>
        </div>
      </header>

      <main class="border border-solid rounded-2xl p-5">
        <section class="flex pt-3 mb-5 grid grid-cols-2 gap-3">
          <div class="flex-1">
            <div
              class="px-3 py-2 mb-5 text-xs rounded-full bg-white text-[#333] inline-block"
              :class="[status == 'after' ? 'border border-[red]' : '']"
            >
              {{ statusText }}
            </div>
            <div class="whitespace-pre-line">{{ todayQuote }}</div>
          </div>

          <div
            class="profile border border-solid border-[3px] border-[#fff] rounded-[30px] bg-[#ddd] text-[#333] mt-3 pb-4"
            :class="[status == 'after' ? 'border-[red]' : '']"
          >
            <div class="profile-photo -mt-[30px] mb-2 mx-3 overflow-hidden">
              <img
                class="block mx-auto max-w-full w-[150px] border rounded-full border-white bg-white"
                src="https://stickershop.line-scdn.net/stickershop/v1/product/29440450/LINEStorePC/main.png?v=1"
                alt="大頭貼"
              />
            </div>
            <ProfilePanel
              :countdown-label="countdownLabelText"
              :diff-text="diffText"
              :status="status"
            />
          </div>
        </section>

        <TimeCards :items="timeCards" />

        <EscapeButton label="塊陶 !! 🏃‍♂️💨" @escape="handleClick" />

        <ResultCard
          :formattedLastClick="formattedLastClick"
          :clickCount="clickCount"
          :resultText="resultText"
          :lastClickTime="lastClickTime"
        />

        <RecordHistory :items="recordItems"></RecordHistory>
      </main>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #333;
  color: #fff;
  height: 100vh;
}
.container {
  padding: 2rem 1rem;
}
</style>
