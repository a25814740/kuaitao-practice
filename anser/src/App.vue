<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { quotes } from '@/data/quotes'

import EscapeButton from './components/EscapeButton.vue'
import RecordHistory from './components/RecordHistory.vue'
import ResultCard from './components/ResultCard.vue'
import TimeDisplay from './components/TimeDisplay.vue'

const OFF_WORK_HOUR = 15
const OFF_WORK_MINUTE = 39

type WorkStatus = 'before' | 'on' | 'after'

const now = ref(new Date())
const lastClickTime = ref<Date | null>(null)
const lastClickDeltaMs = ref<number | null>(null) // clickTime - offWorkTime(at click day)
const clickCount = ref(0)
const records = ref<Array<{ clickTime: Date; deltaMs: number }>>([])

let timerId: number | null = null

function formatHms(ms: number) {
  const totalSeconds = Math.abs(Math.floor(ms / 1000))
  const hh = Math.floor(totalSeconds / 3600)
  const mm = Math.floor((totalSeconds % 3600) / 60)
  const ss = totalSeconds % 60
  const pad2 = (n: number) => n.toString().padStart(2, '0')
  return `${pad2(hh)}h ${pad2(mm)}m ${pad2(ss)}s`
}

function makeOffWorkTime(base: Date) {
  const d = new Date(base)
  d.setHours(OFF_WORK_HOUR, OFF_WORK_MINUTE, 0, 0)
  return d
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

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

const offWorkTime = computed(() => makeOffWorkTime(now.value))
const diffMs = computed(() => offWorkTime.value.getTime() - now.value.getTime())

const status = computed<WorkStatus>(() => {
  if (diffMs.value > 0) return 'before'
  if (Math.abs(diffMs.value) <= 1000) return 'on'
  return 'after'
})

const nowText = computed(() => formatTime(now.value))
const offWorkTimeText = computed(() => formatTime(offWorkTime.value))
const diffText = computed(() => formatHms(diffMs.value))
const countdownLabelText = computed(() => (status.value === 'before' ? '距離下班' : '已加班'))
const todayQuote = computed(() => getDailyQuote(now.value))

const formattedLastClick = computed(() =>
  lastClickTime.value ? formatTime(lastClickTime.value) : '尚無紀錄'
)

const resultText = computed(() => {
  if (!lastClickTime.value || lastClickDeltaMs.value === null) return '尚無紀錄'
  const delta = lastClickDeltaMs.value
  const prefix = delta < 0 ? '提早' : '延後'
  return `${prefix} ${formatHms(delta)}`
})

const recordItems = computed(() =>
  records.value.map((r) => {
    const prefix = r.deltaMs < 0 ? '提早' : '延後'
    return {
      timeText: formatTime(r.clickTime),
      deltaText: `${prefix} ${formatHms(r.deltaMs)}`,
    }
  })
)

function handleEscape() {
  // 用 now 的時間戳記，確保顯示與倒數是同一個「現在」
  const clickTime = new Date(now.value.getTime())
  const offWorkAtClick = makeOffWorkTime(clickTime)

  lastClickTime.value = clickTime
  lastClickDeltaMs.value = clickTime.getTime() - offWorkAtClick.getTime()
  clickCount.value += 1

  records.value.unshift({ clickTime, deltaMs: lastClickDeltaMs.value })
  if (records.value.length > 10) records.value.length = 10
}

onMounted(() => {
  timerId = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timerId !== null) {
    window.clearInterval(timerId)
    timerId = null
  }
})
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
            <div class="px-3 py-2 mb-5 text-xs rounded-full bg-white text-[#333] inline-block">
              ⚡加班逃生中
            </div>
            <div class="whitespace-pre-line">{{ todayQuote }}</div>
          </div>
        </section>

        <TimeDisplay
          :countdown-label="countdownLabelText"
          :diff-text="diffText"
          :now-text="nowText"
          :off-work-time-text="offWorkTimeText"
        />

        <EscapeButton label="塊陶 !! 🏃‍♂️💨" @escape="handleEscape" />

        <ResultCard
          :click-count="clickCount"
          :formatted-last-click="formattedLastClick"
          :result-text="resultText"
        />

        <RecordHistory :items="recordItems" />
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
