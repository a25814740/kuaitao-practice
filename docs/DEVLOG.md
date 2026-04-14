# DEVLOG

## 2026-04-07｜Stage 1 Vue 3 基礎響應式
- 做了什麼：重寫 `src/App.vue`，加入 `ref` 的 `clickCount`、`lastClickTime`，用 `@click` 觸發更新，並用 `computed` 顯示格式化時間。
- 改了哪些檔案：`src/App.vue`。
- 遇到問題：預設顯示 Date 物件不好讀，改成 `toLocaleString()` 顯示。
- 與上一階段差異：從模板示範頁變成可互動的自訂首頁，建立基本資料流。
- 學到的概念：`ref`、事件綁定、模板綁定、`computed`、scoped style。

## 2026-04-10｜Stage 2 條件渲染與計算邏輯
- 做了什麼：加入固定下班時間（時/分）、每秒更新 `now` 的計時器、倒數/加班差距計算、狀態 `before/on/after` 判斷；點擊按鈕後記錄時間並顯示提早或加班多久；依狀態切換文案與樣式（加班時紅色提示）。
- 改了哪些檔案：`src/App.vue`。
- 為什麼這樣做：把「唯一會變的來源」收斂成 `now`，其餘用 `computed` 推導（`offWorkTime`、`diffMs`、`diffText`、`status`、文案），模板只負責顯示與最少量條件。
- 與 Stage 1 差異：Stage 1 只有點擊記錄；Stage 2 多了時間流與狀態切換（倒數、加班、條件渲染/動態 class）。
- 學到的概念：`computed` 的衍生資料、`onMounted/onUnmounted` 的計時器管理、`v-if`、動態 class 綁定（包含 Tailwind 的 arbitrary value 用法）、如何解釋 `computed` vs `watch`（本次主要用 `computed`）。
