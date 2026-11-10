# AI 零股實驗日誌（odd-lot-ai-journal）

把自建「台股零股 AI 交易系統」每天的執行輸出，整理成人看得懂的**每日日誌**與**觀念知識庫**的靜態網站。

- 網站：https://g167114005.github.io/odd-lot-ai-journal/
- 規則（給 AI 的員工手冊）：[CLAUDE.md](./CLAUDE.md)（其他 AI 工具讀 [AGENTS.md](./AGENTS.md)）

## 怎麼新增一天的日誌

1. 把當天系統輸出摘錄存成 `raw/YYYY-MM-DD.md`（金額請先刪除）
2. 對 AI 說：「請先讀 CLAUDE.md。依 `raw/YYYY-MM-DD.md` 新增當天的日誌。」
3. 檢查後 commit、push，GitHub Pages 自動更新

## 結構

```
CLAUDE.md / AGENTS.md   規則
index.html / about.html 首頁、關於
assets/                 style.css、site.js（共用）
data/catalog.js         全站目錄
raw/                    原始輸入（只讀）
days/                   每日日誌
concepts/               觀念頁
templates/              新頁面模板
```

純 HTML / CSS / JS，不需要建置工具；本機直接開 `index.html` 即可預覽。

> 個人學習紀錄，不構成投資建議。
