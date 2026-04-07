<script setup lang="ts">
import { computed, ref } from 'vue'

const lastClickTime = ref<Date | null>(null)
const clickCount = ref(0)

const formattedLastClick = computed(() =>
  lastClickTime.value ? lastClickTime.value.toLocaleString() : '尚無紀錄',
)

function handleClick() {
  lastClickTime.value = new Date()
  clickCount.value++
}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="title">
        <h1>塊陶啊!!</h1>
        <h2>RunNao!!</h2>
      </div>
      <button @click="handleClick">塊陶</button>
      <div class="result">
        <div>最後點擊時間：{{ formattedLastClick }}</div>
        <div>次數：{{ clickCount }}</div>
      </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}
.title {
  text-align: center;
}
h2 {
  margin: 1rem 0;
}
button {
  border: solid 1px #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 0 auto 1rem auto;
}
button:hover {
  transform: translate(3px, 3px);
  background-color: #fff;
  color: #333;
}
</style>
