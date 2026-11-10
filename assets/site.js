/* AI 零股實驗日誌 — 共用頁首、頁尾、上一篇/下一篇、首頁列表
 * 每個頁面的 <body> 需有：
 *   data-root  到網站根目錄的相對路徑（根目錄頁面 "."，days/ 與 concepts/ 內 ".."）
 *   data-page  "home" | "day" | "concept" | "about"
 *   data-date  （僅日誌頁）YYYY-MM-DD
 * 目錄資料來自 data/catalog.js 的 window.CATALOG（用 <script> 載入，本機直接開檔也能用）。
 */
(function () {
  var body = document.body;
  var root = body.dataset.root || ".";
  var page = body.dataset.page || "";
  var cat = window.CATALOG || { days: [], concepts: [], todo: [] };
  var WEEK = "日一二三四五六";

  function href(p) { return root + "/" + p; }
  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00+08:00");
    return iso.replace(/-/g, "/") + "（" + WEEK[d.getDay()] + "）";
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function verdictClass(v) {
    return { "加碼": "verdict--add", "減碼": "verdict--trim" }[v] || "verdict--hold";
  }

  // 頁首
  var nav = [
    ["home", "index.html", "日誌"],
    ["concept", "index.html#concepts", "觀念庫"],
    ["about", "about.html", "關於系統"]
  ].map(function (n) {
    var cur = n[0] === page ? ' aria-current="page"' : "";
    return '<a href="' + href(n[1]) + '"' + cur + ">" + n[2] + "</a>";
  }).join("");
  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="site-header__inner">' +
    '<a class="brand" href="' + href("index.html") + '">AI 零股實驗日誌<small>odd-lot · ai · journal</small></a>' +
    '<nav class="site-nav">' + nav + "</nav></div>";
  body.insertBefore(header, body.firstChild);

  // 日誌頁：上一篇 / 下一篇（catalog.days 為新到舊）
  if (page === "day") {
    var i = cat.days.findIndex(function (d) { return d.date === body.dataset.date; });
    var main = document.querySelector("main");
    if (i >= 0 && main) {
      var older = cat.days[i + 1], newer = cat.days[i - 1];
      var pager = document.createElement("nav");
      pager.className = "pager";
      pager.innerHTML =
        "<span>" + (older ? '<a href="' + href("days/" + older.date + ".html") + '">← ' + fmtDate(older.date) + "</a>" : "") + "</span>" +
        "<span>" + (newer ? '<a href="' + href("days/" + newer.date + ".html") + '">' + fmtDate(newer.date) + " →</a>" : "") + "</span>";
      main.appendChild(pager);
    }
    var kicker = document.querySelector(".page-kicker[data-fill='date']");
    if (kicker) kicker.textContent = "下單日 " + fmtDate(body.dataset.date);
  }

  // 首頁：日誌列表、觀念列表、待寫名詞
  var dayList = document.getElementById("day-list");
  if (dayList) {
    dayList.innerHTML = cat.days.map(function (d) {
      return "<li><span class=\"date\">" + fmtDate(d.date) + "</span>" +
        '<a href="' + href("days/" + d.date + ".html") + '">' + esc(d.title) + "</a>" +
        '<span class="verdict ' + verdictClass(d.verdict) + '">' + esc(d.verdict) + "</span>" +
        '<span class="desc">' + esc(d.summary) + "</span></li>";
    }).join("") || '<li class="placeholder">尚無日誌</li>';
  }
  var conceptList = document.getElementById("concept-list");
  if (conceptList) {
    conceptList.innerHTML = cat.concepts.map(function (c) {
      return '<li><span class="date">' + esc(c.abbr || "") + "</span>" +
        '<a href="' + href("concepts/" + c.slug + ".html") + '">' + esc(c.title) + "</a><span></span>" +
        '<span class="desc">' + esc(c.oneline) + "</span></li>";
    }).join("");
  }
  var todo = document.getElementById("todo-list");
  if (todo) {
    todo.innerHTML = cat.todo.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  }

  // 頁尾（免責聲明不可刪，見 CLAUDE.md 第 7 節）
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="site-footer__inner">本站為個人學習紀錄，內容由自建模型產生並經 AI 依 CLAUDE.md 規則整理，' +
    "<strong>不構成任何投資建議</strong>。帳戶金額依隱私規則不公開。</div>";
  body.appendChild(footer);
})();
