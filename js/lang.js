(function () {
  var root = document.body;
  var toggle = document.getElementById("lang-toggle");
  var storageKey = "pekal-lang";

  var titles = {
    zh: "张智 / Pekal · IT 项目管理工程师",
    en: "Pekal Z · IT Project Management Engineer"
  };

  var descriptions = {
    zh: "张智（Pekal），IT 项目管理工程师。电子制造与 Apple 供应链，涵盖 EDI、OMS/PPS、SAP/MES、API 对接与 RPA 报表自动化。",
    en: "Pekal Z (张智), an IT project management engineer in electronics manufacturing and the Apple supply chain. EDI, OMS/PPS, SAP/MES, API integration, and RPA report automation."
  };

  function apply(lang) {
    var next = lang === "en" ? "en" : "zh";
    root.dataset.lang = next;
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    document.title = titles[next];
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", descriptions[next]);
    if (toggle) {
      toggle.setAttribute("aria-pressed", next === "en" ? "true" : "false");
      toggle.setAttribute("aria-label", next === "en" ? "Switch to Chinese" : "切换为英文");
    }
  }

  var params = new URLSearchParams(location.search);
  var fromQuery = params.get("lang");
  var initial = "zh";
  if (fromQuery === "en" || fromQuery === "zh") {
    initial = fromQuery;
  } else {
    try {
      var stored = localStorage.getItem(storageKey);
      if (stored === "en" || stored === "zh") initial = stored;
    } catch (err) {
      initial = "zh";
    }
  }

  apply(initial);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.lang === "en" ? "zh" : "en";
      apply(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch (err) {
        /* Storage can be blocked; the visible language still updates. */
      }
      var url = new URL(location.href);
      if (next === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      history.replaceState(null, "", url);
    });
  }

  document.querySelectorAll(".site-menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      var menu = link.closest("details");
      if (menu) menu.removeAttribute("open");
    });
  });
})();
