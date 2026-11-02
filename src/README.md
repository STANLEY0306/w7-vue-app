# 變魔術日記（Vue 3 + Vite）

一個關於魔術的單頁網站：三個可互動的魔術、關於興趣的三段文字，以及一個可以留 Email 和問題的提問區。
練習紀錄只存在記憶體，重新整理會清空；提問送出後只會顯示感謝訊息，都不會儲存到資料庫。

## 執行
    npm install
    npm run dev

## 對照作業要求
| 作業 | 對應內容 |
|---|---|
| 拆元件 + props + 模擬資料 | `SiteNav`、`ResourceCard`、`TabBar`、`TrickSection`、`FormField`、`AskForm`、`PracticeLog`；`links`、`resources`、`tricks`、`moves` 陣列放在 `App.vue`，用 `v-for` 傳入 |
| ref / computed / v-model | `PracticeLog.vue`：`ref`（records、moveId、minutes）、`computed`（total、average、hours、canAdd）、`v-model`（手法下拉、分鐘數）；另外 `AskForm.vue`：`ref`（email、question、sent）、`computed`（emailOk、left、canSubmit）、`v-model`（`FormField` 與 `TabBar` 皆用 `defineModel`） |
