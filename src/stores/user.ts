import { defineStore } from 'pinia'
import { ref } from 'vue'

export type JobType =
  | '工程師'
  | '設計師'
  | '行銷'
  | '客服'
  | '餐飲'
  | '行政'
  | '公職'
  | '醫療'
  | '其他'

export const useUserStore = defineStore('user', () => {
  const nickname = ref('匿名逃跑者')
  const avatarUrl = ref(
    'https://stickershop.line-scdn.net/stickershop/v1/product/29440450/LINEStorePC/main.png?v=1',
  )
  const jobType = ref<JobType>('工程師')

  const offWorkHour = ref(18)
  const offWorkMinute = ref(0)
  const income = ref(0)

  function setOffWorkTime(hour: number, minute: number) {
    offWorkHour.value = hour
    offWorkMinute.value = minute
  }

  return {
    nickname,
    avatarUrl,
    jobType,
    offWorkHour,
    offWorkMinute,
    income,
    setOffWorkTime,
  }
})
