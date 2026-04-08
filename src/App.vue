<script setup lang="ts">
import { computed, ref, unref, onMounted, onUnmounted, type MaybeRef } from 'vue'
import { quotes } from '@/data/quotes'

const offWork_HH = 15
const offWork_MM = 39

const now = ref(new Date())
const timerId = ref<number | null>(null)
const lastClickTime = ref<Date | null>(null)
const clickCount = ref(0)

// 下班時間
const offWorkTime = computed(() => {
  const baseTime = new Date(now.value)
  baseTime.setHours(offWork_HH, offWork_MM, 0, 0)
  return baseTime
})
const offWorkTimeFormat = computed(() => date2time(offWorkTime))

// 現在時間
const nowText = computed(() => date2time(now.value))

// 距離下班時間
const diffTime = computed(() => offWorkTime.value.getTime() - now.value.getTime())
const diffTimeFormat = computed(() => ms2time(diffTime.value))

// 上下班狀態
const status = computed(() => {
  if (diffTime.value > 0) return -1 // 還沒下班
  if (Math.abs(diffTime.value) <= 1000) return 0 // 剛好下班
  return 1 // 已下班
})
const countdownLabelText = computed(() => {
  const label = status.value === -1 ? '距離下班' : '已加班'
  return label
})

const resultText = computed(() => {
  if (!lastClickTime.value) return '尚無紀錄'
  const delta = lastClickTime.value.getTime() - offWorkTime.value.getTime()
  const isEarly = delta < 0
  const prefix = isEarly ? '乖乖上班! 你距離下班還有' : '辛苦了! 你已經加班了'
  return `${prefix} ${diffTimeFormat.value}`
})

// 最後點擊時間
const formattedLastClick = computed(() =>
  lastClickTime.value ? date2time(lastClickTime.value) : '尚無紀錄',
)

onMounted(() => {
  timerId.value = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timerId.value !== null) {
    clearInterval(timerId.value)
  }
})

// 語錄
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

const todayQuote = computed(() => getDailyQuote(now.value))

// new Date轉時間
function date2time(date: MaybeRef<Date>) {
  return unref(date).toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// 毫秒轉時間
function ms2time(ms: number) {
  // if (ms <= 0) return '已下班'

  const totalSeconds = Math.abs(Math.floor(ms / 1000))

  const hh = Math.floor(totalSeconds / 3600)
  const mm = Math.floor((totalSeconds % 3600) / 60)
  const ss = Math.floor(totalSeconds % 60)

  // return [hh, mm, ss].map((v) => String(v).padStart(2, '0')).join(':')

  const pad = (n: number) => n.toString().padStart(2, '0') // 不足2位數補0
  return `${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`
}
function handleClick() {
  lastClickTime.value = new Date()
  clickCount.value++
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
            <div class="px-3 py-2 mb-5 text-xs rounded-full bg-white text-[#333] inline-block">
              ⚡加班逃生中
            </div>
            <div class="whitespace-pre-line">{{ todayQuote }}</div>
          </div>
          <div
            class="profile border border-solid border-[3px] border-[#fff] rounded-[30px] bg-[#ddd] text-[#333] mt-3 pb-4"
          >
            <div class="profile-photo -mt-[30px] mx-3 overflow-hidden">
              <img
                class="block mx-auto max-w-full w-[150px] border rounded-full border-white bg-white"
                src="https://stickershop.line-scdn.net/stickershop/v1/product/29440450/LINEStorePC/main.png?v=1"
                alt="大頭貼"
              />
            </div>
            <div class="profile-info text-center">
              <div class="text-xl font-black">{{ diffTimeFormat }}</div>
              <div class="text-xs tracking-[1px] mt-1">{{ countdownLabelText }}</div>
            </div>
          </div>
        </section>
        <section>
          <div class="border border-white my-5 p-3">
            <div>代碼暫時顯示區</div>
            <hr class="my-3" />
            <div>status: {{ status }}</div>
            <div>countdownLabelText: {{ countdownLabelText }}</div>
            <div>resultText: {{ resultText }}</div>
          </div>
        </section>
        <section>
          <div class="time-wrapper grid grid-cols-2 gap-3 mb-5">
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
              <div class="text-xl font-black">{{ offWorkTimeFormat }}</div>
            </div>
          </div>
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
            <div class="text-center mt-2">{{ resultText }}</div>
          </div>
        </section>
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
/* button:hover {
  transform: translate(3px, 3px);
  background-color: #fff;
  color: #333;
} */
</style>
