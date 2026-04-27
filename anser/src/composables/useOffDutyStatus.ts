import { computed, type ComputedRef, type Ref } from 'vue'

export type WorkStatus = 'before' | 'on' | 'after'

type MaybeRefNumber = Ref<number> | ComputedRef<number>

export function useOffDutyStatus(diffMs: MaybeRefNumber) {
  const status = computed<WorkStatus>(() => {
    if (diffMs.value > 0) return 'before'
    if (Math.abs(diffMs.value) <= 1000) return 'on'
    return 'after'
  })

  const countdownLabelText = computed(() => (status.value === 'before' ? '距離下班' : '已加班'))

  return {
    status,
    countdownLabelText,
  }
}

