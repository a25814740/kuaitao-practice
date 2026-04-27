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

## 2026-04-21｜Stage 3 元件化
- 做了什麼：把首頁拆成多個元件並改為組裝式頁面：`EscapeButton`（按鈕互動）、`TimeCards`（現在/下班時間卡片，使用 `v-for`）、`ProfilePanel`（倒數與狀態顯示）、`ResultCard`（最後點擊與結果）、`RecordHistory`（最近紀錄）。
- 改了哪些檔案：`src/App.vue`、`src/components/EscapeButton.vue`、`src/components/TimeCards.vue`、`src/components/ProfilePanel.vue`、`src/components/ResultCard.vue`、`src/components/RecordHistory.vue`。
- 為什麼這樣做：把「顯示」與「資料/計算」分開，讓 `App.vue` 專心管理狀態與 `computed`，子元件專心渲染，檔案更好讀、也更像真實專案結構。
- 與 Stage 2 差異：Stage 2 主要在時間邏輯與條件渲染；Stage 3 開始把 UI 區塊拆成元件，建立父子資料流（props 下傳、emits 上拋）。
- 學到的概念：`defineProps`、`defineEmits`、父子元件資料流、元件責任切分與重用（例如時間卡片用 `v-for` 產生）。

## 2026-04-28｜Stage 4 Composables 與邏輯抽離
- 做了什麼：把時間更新、下班時間計算、倒數差距、時間格式化抽到 `useEscapeTimer`；把 `before/on/after` 狀態判斷與倒數標籤抽到 `useOffDutyStatus`；`App.vue` 只保留接線與點擊事件，UI 行為不變。
- 改了哪些檔案：新增 `anser/src/composables/useEscapeTimer.ts`、`anser/src/composables/useOffDutyStatus.ts`，並更新 `anser/src/App.vue` 改用 composables。
- 為什麼這樣做：把「UI」跟「可重用邏輯」切開，讓同一套時間/狀態邏輯未來可以給不同頁面或不同元件使用，也讓 `App.vue` 更像真實專案的頁面組裝層。
- 與 Stage 3 差異：Stage 3 是 UI 拆元件；Stage 4 是把元件中的共用邏輯再抽到 composables。
- 學到的概念：composable 的責任切分、`onMounted/onUnmounted` 放在 composable 內管理副作用、以及用 `requestAnimationFrame` 做時間更新迴圈（並用 tick 間隔控制更新頻率）。
