import { computed, onMounted, onUnmounted, ref, unref, type MaybeRef } from 'vue'

export type EscapeTimerOptions = {
  offWorkHour: MaybeRef<number>
  offWorkMinute: MaybeRef<number>
  tickMs?: number
}

export function useEscapeTimer(options: EscapeTimerOptions) {
  const tickMs = options.tickMs ?? 1000

  const now = ref(new Date())

  function makeOffWorkTime(base: Date) {
    const d = new Date(base)
    d.setHours(unref(options.offWorkHour), unref(options.offWorkMinute), 0, 0)
    return d
  }

  function formatTime(date: Date) {
    return date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  function formatHms(ms: number) {
    const totalSeconds = Math.abs(Math.floor(ms / 1000))
    const hh = Math.floor(totalSeconds / 3600)
    const mm = Math.floor((totalSeconds % 3600) / 60)
    const ss = totalSeconds % 60
    const pad2 = (n: number) => n.toString().padStart(2, '0')
    return `${pad2(hh)}h ${pad2(mm)}m ${pad2(ss)}s`
  }

  const offWorkTime = computed(() => makeOffWorkTime(now.value))
  const diffMs = computed(() => offWorkTime.value.getTime() - now.value.getTime())

  const nowText = computed(() => formatTime(now.value))
  const offWorkTimeText = computed(() => formatTime(offWorkTime.value))
  const diffText = computed(() => formatHms(diffMs.value))

  let rafId: number | null = null
  let lastTick = 0

  function loop(ts: number) {
    if (ts - lastTick >= tickMs) {
      now.value = new Date()
      lastTick = ts
    }
    rafId = window.requestAnimationFrame(loop)
  }

  onMounted(() => {
    rafId = window.requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  return {
    now,
    offWorkTime,
    diffMs,
    nowText,
    offWorkTimeText,
    diffText,
    makeOffWorkTime,
    formatTime,
    formatHms,
  }
}
