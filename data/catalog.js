/* 全站目錄 — 新增或刪除頁面時「一定要」同步更新（CLAUDE.md 第 3 節）
 * days：新的放最前面；verdict 只能是 "觀望" | "加碼" | "減碼"
 * concepts：slug 對應 concepts/<slug>.html
 * todo：日誌中出現、但還沒寫觀念頁的名詞
 */
window.CATALOG = {
  days: [
    {
      date: "2026-11-10",
      title: "跌深兩成仍未見轉折，一萬元先留著",
      verdict: "觀望",
      summary: "大盤自 60 日高點回落 20.3%，V 轉與 W 底條件皆未成立；轉折模型機率 22%。"
    }
  ],
  concepts: [
    { slug: "walk-forward", abbr: "WF", title: "Walk-forward 樣本外驗證", oneline: "用「過去」訓練、在「沒看過的未來」考試，一段一段往前滾。" },
    { slug: "information-coefficient", abbr: "IC", title: "資訊係數（IC）", oneline: "模型排名和隔天真實漲跌排名有多像。" },
    { slug: "v-reversal-w-bottom", abbr: "V / W", title: "V 轉低點與 W 底右腳", oneline: "大盤跌深後最常見的兩種止跌型態。" }
  ],
  todo: ["Active Share", "最大回檔（MDD）", "報酬/回檔比", "延遲停利（dTP）"]
};
