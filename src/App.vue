<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { quotes } from '@/data/quotes'

const OFF_WORK_HOUR = 15
const OFF_WORK_MINUTE = 39

type WorkStatus = 'before' | 'on' | 'after'

const now = ref(new Date())
const lastClickTime = ref<Date | null>(null)
const lastClickDeltaMs = ref<number | null>(null) // clickTime - offWorkTime(at click day)
const clickCount = ref(0)

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
const statusText = computed(() => (status.value === 'before' ? '🏃等待陶跑中' : '⚡命苦加班中'))
const countdownLabelText = computed(() => (status.value === 'before' ? '距離下班' : '已加班'))
const todayQuote = computed(() => getDailyQuote(now.value))

const formattedLastClick = computed(() =>
  lastClickTime.value ? formatTime(lastClickTime.value) : '尚無紀錄',
)

const resultText = computed(() => {
  if (!lastClickTime.value || lastClickDeltaMs.value === null) return '尚無紀錄'
  const delta = lastClickDeltaMs.value
  const prefix = delta < 0 ? '乖乖上班! 你距離下班還有' : '辛苦了! 你已經加班了'
  return `${prefix} ${formatHms(delta)}`
})

function handleClick() {
  // 用 now 的時間戳記，確保顯示與倒數是同一個「現在」
  const clickTime = new Date(now.value.getTime())
  const offWorkAtClick = makeOffWorkTime(clickTime)

  lastClickTime.value = clickTime
  lastClickDeltaMs.value = clickTime.getTime() - offWorkAtClick.getTime()
  clickCount.value += 1
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
            <div class="profile-info text-center">
              <div class="text-xl font-black" :class="[status == 'after' ? 'text-[red]' : '']">
                {{ diffText }}
              </div>
              <div
                class="text-xs tracking-[1px] mt-1"
                :class="[status == 'after' ? 'text-[red]' : '']"
              >
                {{ countdownLabelText }}
              </div>
            </div>
          </div>
        </section>

        <section class="time-wrapper grid grid-cols-2 gap-3 mb-5">
          <div
            class="border border-solid border-[3px] border-[#fff] rounded-2xl bg-[#ddd] text-[#333] p-3"
          >
            <div class="text-xs tracking-[1px] mb-2">現在時間</div>
            <div class="text-xl font-black">{{ nowText }}</div>
          </div>
          <div
            class="border border-solid border-[3px] border-[#fff] rounded-2xl bg-[#ddd] text-[#333] p-3"
          >
            <div class="text-xs tracking-[1px] mb-2">下班時間</div>
            <div class="text-xl font-black">{{ offWorkTimeText }}</div>
          </div>
        </section>

        <button
          class="block text-2xl border border-[3px] border-solid border-white rounded-3xl shadow-[3px_3px_3px_rgb(230,230,230)] w-full px-[.5rem] py-[1rem] mb-3 hover:bg-white hover:text-[#333] hover:translate-1 hover:shadow-[3px_3px_3px_rgb(255,0,0)]"
          @click="handleClick"
        >
          塊陶 !! 🏃‍♂️💨
        </button>

        <div class="result">
          <div class="flex justify-between">
            <div>最後點擊時間：{{ formattedLastClick }}</div>
            <div>次數：{{ clickCount }}</div>
          </div>
          <div class="text-center mt-2" v-if="lastClickTime">{{ resultText }}</div>
        </div>
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
