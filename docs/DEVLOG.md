# DEVLOG.md

> 用途：
> - 記錄每一階段實際做了什麼
> - 記錄學到什麼、改了哪些檔案、遇到哪些問題
> - 讓未來的自己可以快速複習專案演進過程
> - 也讓 Codex 在下一階段能延續上下文

---

# 專案基本資訊

- 專案名稱：塊陶啊!!
- 專案類型：Vue 3 求職練功 side project
- 學習目標：從 Vue 2 經驗銜接到 Vue 3 實戰
- 開發策略：分階段完成，從簡單到困難，不跳級
- 文件來源：
  - `docs/kuaitao_codex_spec.md`
  - `docs/STAGE_CHECKLIST.md`
  - `docs/DEVLOG.md`

---

# 撰寫規則

每完成一個階段，都要補一筆紀錄，至少包含：

1. 本階段做了什麼
2. 修改了哪些檔案
3. 使用了哪些 Vue 3 概念
4. 與上一階段差異
5. 遇到的問題與解法
6. 驗收方式
7. 下一步建議

---

# Stage 1｜Vue 3 基礎響應式

## 日期
- YYYY-MM-DD

## 本階段目標
- 建立 Vue 3 + Vite 專案
- 完成首頁單頁版
- 做出「塊陶啊!!」按鈕
- 點擊後記錄當下時間
- 顯示最後一次點擊時間

## 本次完成內容
- [ ] 建立專案基礎
- [ ] 建立首頁畫面
- [ ] 新增按鈕互動
- [ ] 顯示最後一次下班記錄

## 修改檔案
- `README.md`
- `src/App.vue`
- `src/assets/...`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 概念
- `<script setup>`
- `ref`
- `@click`
- 模板中的響應式資料顯示

## 與上一階段差異
- 第一階段，無前一階段

## 遇到的問題
- 範例：
  - 剛開始不確定時間格式要怎麼顯示
  - 不確定按鈕點擊後資料更新方式是否符合 Vue 3 寫法

## 解法
- 範例：
  - 先用最簡單的 `new Date()` 顯示結果
  - 先以可運作為主，後續再優化格式

## 驗收方式
- `npm run dev` 可啟動
- 首頁可正常顯示
- 點擊按鈕後畫面會即時更新時間

## 目前心得
- 例如：
  - Vue 3 的 `<script setup>` 比 Vue 2 精簡很多
  - `ref` 的概念不難，但需要重新習慣寫法

## 下一步建議
- 進入 Stage 2
- 加入固定下班時間、倒數與狀態判斷

---

# Stage 2｜條件渲染與計算邏輯

## 日期
- YYYY-MM-DD

## 本階段目標
- 設定固定下班時間
- 顯示倒數
- 根據時間變化改變按鈕狀態與提示文字

## 本次完成內容
- [ ] 新增下班時間設定
- [ ] 新增倒數顯示
- [ ] 新增未到下班 / 已到下班狀態
- [ ] 新增按鈕樣式切換

## 修改檔案
- `src/App.vue`
- `src/components/...`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 概念
- `computed`
- `watch`
- `v-if`
- 條件樣式切換

## 與上一階段差異
- Stage 1 只有基本按鈕與時間記錄
- Stage 2 開始有商業邏輯與狀態判斷

## 遇到的問題
- 例如：
  - 倒數時間格式要不要每秒更新
  - 如何優雅處理「已過下班時間」的狀態

## 解法
- 例如：
  - 先用簡單 interval 更新時間
  - 將顯示邏輯明確分為未到 / 已到 / 已記錄

## 驗收方式
- 可看到倒數
- 到時間前後畫面狀態會改變
- 點擊後結果顯示正確

## 目前心得
- `computed` 很適合整理畫面狀態
- 相較 Vue 2，Vue 3 在邏輯整理上更直觀

## 下一步建議
- 進入 Stage 3
- 將頁面拆成多個元件

---

# Stage 3｜元件化

## 日期
- YYYY-MM-DD

## 本階段目標
- 將首頁拆成可維護的元件
- 建立 props / emits 流程

## 本次完成內容
- [ ] EscapeButton 元件
- [ ] TimeDisplay 元件
- [ ] ResultCard 元件
- [ ] RecordHistory 元件
- [ ] App.vue 精簡

## 修改檔案
- `src/App.vue`
- `src/components/EscapeButton.vue`
- `src/components/TimeDisplay.vue`
- `src/components/ResultCard.vue`
- `src/components/RecordHistory.vue`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 概念
- `defineProps`
- `defineEmits`
- component 拆分
- 父子元件通訊

## 與上一階段差異
- Stage 2 仍以單頁集中邏輯為主
- Stage 3 開始正式進入元件化架構

## 遇到的問題
- 例如：
  - 哪些資料該放父層
  - 哪些動作該由子元件 emit 出來

## 解法
- 例如：
  - 將狀態集中在父層
  - 子元件負責顯示與事件觸發

## 驗收方式
- 首頁功能維持正常
- 元件切分合理
- 程式碼比 Stage 2 更清楚

## 目前心得
- 元件化後更像正式專案
- props / emits 比 Vue 2 更直接，但也更需要命名清楚

## 下一步建議
- 進入 Stage 4
- 把時間與狀態邏輯抽成 composables

---

# Stage 4｜Composables 與邏輯抽離

## 日期
- YYYY-MM-DD

## 本階段目標
- 抽離時間與狀態邏輯
- 讓 UI 與邏輯分離

## 本次完成內容
- [ ] 建立 `useEscapeTimer`
- [ ] 建立 `useOffDutyStatus`
- [ ] 將邏輯從畫面元件搬出

## 修改檔案
- `src/composables/useEscapeTimer.js`
- `src/composables/useOffDutyStatus.js`
- `src/views/...`
- `src/components/...`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 概念
- composables
- `onMounted`
- `onUnmounted`
- 邏輯複用
- 畫面層與邏輯層分離

## 與上一階段差異
- Stage 3 是元件拆分
- Stage 4 是邏輯抽離與進一步架構整理

## 遇到的問題
- 例如：
  - 邏輯抽太早會不會太複雜
  - composable 回傳哪些內容才剛好

## 解法
- 例如：
  - 只抽重複或明顯可獨立的邏輯
  - composable 先保持單一責任

## 驗收方式
- 畫面功能不變
- composables 可被重複使用
- 頁面與元件更專注在 UI

## 目前心得
- 這是 Vue 3 與 Vue 2 體感差異很大的地方
- 抽完之後程式碼更接近實戰開發思維

## 下一步建議
- 進入 Stage 5
- 加入 Pinia 與設定頁

---

# Stage 5｜Pinia 全域狀態

## 日期
- YYYY-MM-DD

## 本階段目標
- 建立 user store
- 完成設定頁
- 讓首頁與設定頁共用同一份資料

## 本次完成內容
- [ ] 安裝 Pinia
- [ ] 建立 user store
- [ ] 完成基本設定頁
- [ ] 首頁讀取 store 資料

## 修改檔案
- `src/stores/user.js`
- `src/views/SettingsView.vue`
- `src/views/HomeView.vue`
- `src/main.js`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 概念
- Pinia
- 全域狀態管理
- 跨頁資料共享

## 與上一階段差異
- Stage 4 仍以局部狀態與 composables 為主
- Stage 5 開始處理整個 App 的共用資料

## 遇到的問題
- 例如：
  - 資料該放 composable 還是 store
  - 設定變更如何即時反映到首頁

## 解法
- 例如：
  - 使用者資料放 store
  - 工具邏輯留在 composables

## 驗收方式
- 修改設定後首頁同步更新
- store 結構清楚
- 設定頁可正常操作

## 目前心得
- Pinia 比 Vuex 更簡潔
- 很適合做中小型專案的全域狀態管理

## 下一步建議
- 進入 Stage 6
- 導入 Vue Router 與多頁面結構

---

# Stage 6｜Vue Router 與多頁面

## 日期
- YYYY-MM-DD

## 本階段目標
- 建立多頁面 SPA 結構
- 加入導覽與頁面切換

## 本次完成內容
- [ ] 安裝 Router
- [ ] 建立 routes
- [ ] 首頁 / 排行榜 / 社交牆 / 成就 / 設定頁骨架
- [ ] 完成導覽元件

## 修改檔案
- `src/router/index.js`
- `src/views/HomeView.vue`
- `src/views/RankingView.vue`
- `src/views/SocialView.vue`
- `src/views/AchievementsView.vue`
- `src/views/SettingsView.vue`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 概念
- Vue Router
- route config
- page-level component
- layout / navigation

## 與上一階段差異
- Stage 5 偏資料管理
- Stage 6 開始建立真正的產品頁面結構

## 遇到的問題
- 例如：
  - 導覽應該放頂部還是底部
  - 首頁與其他頁面的共用 layout 怎麼安排

## 解法
- 例如：
  - 先採最簡單清楚的 navigation
  - 先以作品集展示性為主

## 驗收方式
- 頁面可正常跳轉
- 各 view 結構清楚
- App 已具有完整 SPA 骨架

## 目前心得
- 專案終於有產品感
- Router 加進來後更像真實前端專案

## 下一步建議
- 進入 Stage 7
- 用假資料完成排行榜與社交牆內容

---

# Stage 7｜假資料、排行榜、社交牆 UI

## 日期
- YYYY-MM-DD

## 本階段目標
- 先不接 API，完成主要內容畫面
- 做出可展示的作品集版本

## 本次完成內容
- [ ] 排行榜清單
- [ ] 行業 / 地區分類
- [ ] 社交貼文列表
- [ ] 留言 UI
- [ ] 成就 / 任務列表

## 修改檔案
- `src/mock/...`
- `src/views/RankingView.vue`
- `src/views/SocialView.vue`
- `src/views/AchievementsView.vue`
- `src/components/...`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 概念
- `v-for`
- 假資料管理
- 列表渲染
- 篩選 / 排序
- UI 結構設計

## 與上一階段差異
- Stage 6 是頁面骨架
- Stage 7 開始讓產品內容變得完整

## 遇到的問題
- 例如：
  - 假資料格式怎麼設計才方便未來接 API
  - 排行榜與社交牆要先做哪個層級

## 解法
- 例如：
  - 資料結構先盡量貼近未來 API 格式
  - 先完成列表與卡片畫面，再補細節

## 驗收方式
- 不接後端也能完整展示產品感
- 排行榜 / 社交牆 / 成就畫面都有內容
- 篩選與清單顯示邏輯正常

## 目前心得
- 這一階段很適合拿去當作品集截圖
- 專案開始有「可展示」的價值

## 下一步建議
- 進入 Stage 8
- 串接 Supabase，把假資料換成真實資料

---

# Stage 8｜Supabase 串接與真實資料流

## 日期
- YYYY-MM-DD

## 本階段目標
- 完成真實資料儲存與讀取
- 將 demo 升級為可用版

## 本次完成內容
- [ ] 建立 Supabase 專案
- [ ] 串接使用者資料
- [ ] 串接下班記錄
- [ ] 串接排行榜
- [ ] 串接社交貼文 / 留言
- [ ] 補錯誤處理

## 修改檔案
- `src/lib/supabase.js`
- `src/services/...`
- `src/stores/...`
- `src/views/...`
- `docs/STAGE_CHECKLIST.md`
- `docs/DEVLOG.md`

## 本階段學到的 Vue 3 / 實戰概念
- API 串接
- CRUD
- 非同步資料處理
- 狀態同步
- 前後端資料流

## 與上一階段差異
- Stage 7 仍是本地展示版
- Stage 8 才是真正的可用產品版本

## 遇到的問題
- 例如：
  - client state 與 remote data 如何同步
  - 假資料轉真資料時結構不一致

## 解法
- 例如：
  - 建立 service 層
  - 統一資料格式與欄位命名

## 驗收方式
- 可成功新增資料
- 可成功讀取資料
- 重新整理後資料仍存在
- 畫面正常顯示遠端資料

## 目前心得
- 這一階段已經接近正式作品
- 可以開始思考 auth、部署、作品集介紹

## 下一步建議
- 規劃部署
- 補 README 截圖
- 準備作品集說明與面試講法

---

# 補充：每次更新都建議補的簡短摘要

每次 Codex 完成一輪工作後，可在最上方追加這種摘要：

## Quick Update Template

- 本次階段：
- 完成重點：
- 修改檔案：
- 學到的 Vue 3 概念：
- 與上一階段差異：
- 是否可驗收：
- 下一步：

---

# 面試複習用總結區

> 這一區可在專案接近完成時補上

## 我透過這個專案熟悉了什麼
- Vue 3 基礎響應式
- computed / watch / 條件渲染
- component 設計
- composables
- Pinia
- Vue Router
- 假資料到真實 API 的遷移
- 前端專案分階段演進方式

## 我可以怎麼講這個專案
- 這不是一次做完的作品，而是刻意設計成 Vue 3 練功路線
- 每一階段都對應一個明確的學習主題
- 從基本互動、元件化、composables、狀態管理，到 Router 與資料串接，逐步完成
- 這讓我不只是做出功能，也能清楚說明技術演進與設計決策