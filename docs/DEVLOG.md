# DEVLOG

## 2026-04-07｜Stage 1 Vue 3 基礎響應式
- 做了什麼：重寫 `src/App.vue`，加入 `ref` 的 `clickCount`、`lastClickTime`，用 `@click` 觸發更新，並用 `computed` 顯示格式化時間。
- 改了哪些檔案：`src/App.vue`。
- 遇到問題：預設顯示 Date 物件不好讀，改成 `toLocaleString()` 顯示。
- 與上一階段差異：從模板示範頁變成可互動的自訂首頁，建立基本資料流。
- 學到的概念：`ref`、事件綁定、模板綁定、`computed`、scoped style。
