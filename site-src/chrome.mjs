import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  ADDRESS,
  PHONE_DISPLAY,
  PHONE_WA,
  STR,
} from "./content.mjs";

export const LANGS = [
  { id: "hant", html: "zh-Hant", prefix: "" },
  { id: "hans", html: "zh-Hans", prefix: "/zh-hans" },
  { id: "en", html: "en", prefix: "/en" },
];

export const NAV = [
  ["index.html", "nav.home"],
  ["about/index.html", "nav.about"],
  ["services/index.html", "nav.services"],
  ["insights/index.html", "nav.insights"],
  ["cases.html", "nav.cases"],
  ["asmtp/index.html", "nav.asmtp"],
  ["iang/index.html", "nav.iang"],
  ["legal/index.html", "nav.legal"],
];

export const FOOT_EXTRAS = [
  ["case.html", "foot.scenes"],
  ["b2b.html", "b2b.cta"],
  ["selfcheck/index.html", "dx.free.cta"],
];

export const EMAIL = "office@harthelm.com";

export function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function t(lang, key) {
  const row = STR[key];
  if (!row || !row[lang]) throw new Error("Missing key " + key + " / " + lang);
  return row[lang];
}

export function tx(lang, obj) {
  if (!obj || !obj[lang]) throw new Error("Missing inline " + lang + " " + JSON.stringify(obj));
  return obj[lang];
}

export function urlFor(langId, route) {
  if (route === "selfcheck/index.html" || route === "/selfcheck/") return "/selfcheck/";
  const lang = LANGS.find((item) => item.id === langId);
  if (!lang) throw new Error("Unknown lang " + langId);
  if (route === "index.html") return (lang.prefix || "") + "/" || "/";
  if (route.endsWith("/index.html")) {
    return lang.prefix + "/" + route.slice(0, -"index.html".length);
  }
  return lang.prefix + "/" + route;
}

function langSwitchHref(item, route, opts) {
  if (opts && opts.fixedPath) return opts.fixedPath;
  return urlFor(item.id, route);
}

export function navHtml(lang, route, opts) {
  const links = NAV.map(([itemRoute, key]) => {
    const current = itemRoute === route ? ' aria-current="page"' : "";
    return `<a href="${esc(urlFor(lang, itemRoute))}"${current}>${esc(t(lang, key))}</a>`;
  }).join("");
  const langs = LANGS.map((item) => {
    const current = item.id === lang ? ' aria-current="true"' : "";
    const label = item.id === "hant" ? "繁" : item.id === "hans" ? "简" : "EN";
    return `<a href="${esc(langSwitchHref(item, route, opts))}" hreflang="${item.html}" lang="${item.html}"${current}>${label}</a>`;
  }).join("");
  return `<header class="site-nav">
    <div class="nav-inner">
      <a class="brand" href="${esc(urlFor(lang, "index.html"))}"><img src="/assets/logo-horizontal-reversed.svg" alt="HARTHELM" width="176" height="52"></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-panel" aria-label="${esc(t(lang, "nav.menu"))}"><span></span><span></span><span></span></button>
      <div id="nav-panel" class="nav-panel">
        <nav class="nav-links" aria-label="${esc(t(lang, "nav.primary"))}">${links}</nav>
        <div class="lang-switch" aria-label="${esc(t(lang, "lang.group"))}">${langs}</div>
      </div>
    </div>
  </header>`;
}

export function alternates(route, opts) {
  return LANGS.map((item) => {
    const href = opts && opts.fixedPath ? opts.fixedPath : urlFor(item.id, route);
    return `<link rel="alternate" hreflang="${item.html}" href="${esc(href)}">`;
  }).join("\n");
}

function legalDisclaimer(lang) {
  return tx(lang, {
    hant: "以上為服務範圍介紹，不構成獲批承諾；個案以香港入境事務處、新加坡人力部（MOM）及相關部門要求為準。審批由有關當局酌情決定，個別結果不同。累計接觸與服務個案 1000 餘個（不以獲批計）。個人資料依香港《個人資料（私隱）條例》（第 486 章）處理。如涉及新加坡的個人資料，亦按新加坡《個人資料保護法》（Personal Data Protection Act 2012）處理。",
    hans: "以上为服务范围介绍，不构成获批承诺；个案以香港入境事务处、新加坡人力部（MOM）及相关部门要求为准。审批由有关当局酌情决定，个别结果不同。累计接触与服务个案 1000 余个（不以获批计）。个人资料依香港《个人资料（私隐）条例》（第 486 章）处理。如涉及新加坡的个人资料，亦按新加坡《个人资料保护法》（Personal Data Protection Act 2012）处理。",
    en: "The pages describe a scope of work. They are not a promise of approval. Each case follows the requirements of Hong Kong Immigration, Singapore MOM, and any other authority involved. Those authorities decide, and individual outcomes differ. More than 1,000 cases we have come into contact with or served (not counted by approvals). Personal data we receive is handled under the Personal Data (Privacy) Ordinance (Cap. 486). Where personal data relates to Singapore, it is also handled under Singapore’s Personal Data Protection Act 2012.",
  });
}

export function footer(lang, opts) {
  const legalPage = !!(opts && opts.legal);
  const entityLines = lang === "en"
    ? `<p>${esc(t(lang, "foot.entityEn"))}</p>`
    : `<p>${esc(t(lang, "foot.entityLabel"))}：${esc(t(lang, "foot.entityName"))}</p>
          <p>${esc(t(lang, "foot.entityEn"))}</p>`;
  const address = legalPage && lang === "en"
    ? esc("FLAT/RM 1405B 14/F THE BELGIAN BANK BUILDING, NOS.721-725 NATHAN ROAD, MONGKOK, KL") + "<br>" + esc(ADDRESS.en)
    : esc(ADDRESS[lang]);
  const disclaimer = legalPage ? esc(legalDisclaimer(lang)) : esc(t(lang, "foot.disclaimer"));
  const pages = NAV.map(([route, key]) => {
    return `<li><a href="${esc(urlFor(lang, route))}">${esc(t(lang, key))}</a></li>`;
  }).join("");
  const extras = FOOT_EXTRAS.map(([route, key]) => {
    return `<li><a href="${esc(urlFor(lang, route))}">${esc(t(lang, key))}</a></li>`;
  }).join("");
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="compliance"><p>${disclaimer}</p></div>
      <div class="foot-grid">
        <div>
          <h2>HARTHELM</h2>
          <p>${esc(t(lang, "foot.tagline"))}</p>
          ${entityLines}
        </div>
        <div>
          <h3>${esc(t(lang, "foot.contact"))}</h3>
          <p>Tel / WhatsApp <a href="https://wa.me/${PHONE_WA}">${esc(PHONE_DISPLAY)}</a></p>
          <p>Email <a href="mailto:${EMAIL}">${EMAIL}</a></p>
          <p>${address}</p>
        </div>
        <div>
          <h3>${esc(t(lang, "foot.quick"))}</h3>
          <ul>
            ${pages}
            ${extras}
          </ul>
        </div>
      </div>
      <p class="subfoot">${esc(t(lang, "foot.copy"))}</p>
    </div>
  </footer>
  <a class="wa-float" style="background:#25D366;color:#fff" href="https://wa.me/${PHONE_WA}" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    <span>${esc(t(lang, "wa.name"))}</span>
    <span class="wa-num">${esc(PHONE_DISPLAY)}</span>
  </a>`;
}

export function shell(lang, route, title, description, body, opts) {
  const meta = LANGS.find((item) => item.id === lang);
  const extraHead = (opts && opts.extraHead) || "";
  const extraScripts = (opts && opts.extraScripts) || "";
  const bodyClass = opts && opts.bodyClass ? ` class="${opts.bodyClass}"` : "";
  const robots = opts && opts.robots ? `<meta name="robots" content="${esc(opts.robots)}">\n` : "";
  return `<!DOCTYPE html>
<html lang="${meta.html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${robots}<link rel="icon" href="/assets/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
${alternates(route, opts)}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+SC:wght@500;600&family=Noto+Serif+TC:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
${extraHead}</head>
<body${bodyClass}>
<div class="site-top">
${navHtml(lang, route, opts)}
</div>
${body}
${footer(lang, opts)}
<script src="/assets/chrome.js"></script>
<script src="/assets/site.js"></script>
${extraScripts}</body>
</html>
`;
}

export function chromeData() {
  const nav = NAV.map(([route, key]) => ({
    route,
    href: Object.fromEntries(LANGS.map((lang) => [lang.id, urlFor(lang.id, route)])),
    label: STR[key],
  }));
  const extras = FOOT_EXTRAS.map(([route, key]) => ({
    route,
    href: Object.fromEntries(LANGS.map((lang) => [lang.id, urlFor(lang.id, route)])),
    label: STR[key],
  }));
  const footerStrings = {};
  for (const lang of LANGS) {
    const id = lang.id;
    footerStrings[id] = {
      tagline: t(id, "foot.tagline"),
      entityLabel: t(id, "foot.entityLabel"),
      entityName: t(id, "foot.entityName"),
      entityEn: t(id, "foot.entityEn"),
      contact: t(id, "foot.contact"),
      quick: t(id, "foot.quick"),
      copy: t(id, "foot.copy"),
      disclaimer: t(id, "foot.disclaimer"),
      legalDisclaimer: legalDisclaimer(id),
      wa: t(id, "wa.name"),
      address: ADDRESS[id],
      menu: t(id, "nav.menu"),
      primary: t(id, "nav.primary"),
      langGroup: t(id, "lang.group"),
    };
  }
  return {
    brand: "HARTHELM",
    email: EMAIL,
    phoneDisplay: PHONE_DISPLAY,
    phoneWa: PHONE_WA,
    logo: "/assets/logo-horizontal-reversed.svg",
    langs: LANGS,
    nav,
    extras,
    footer: footerStrings,
  };
}

export function emitChromeJs(root) {
  const data = chromeData();
  const js = `/* Generated from site-src/chrome.mjs. Do not edit by hand. Header and footer are also stamped into HTML at build time. */
(function (global) {
  var CHROME = ${JSON.stringify(data, null, 2)};
  function fillPlaceholders() {
    if (typeof document === "undefined") return;
    var slots = document.querySelectorAll("[data-harthelm-chrome]");
    if (!slots.length) return;
    /* Pages already have stamped chrome. Placeholders are a fallback only. */
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fillPlaceholders);
    } else {
      fillPlaceholders();
    }
  }
  global.HARTHELM_CHROME = CHROME;
})(typeof window !== "undefined" ? window : globalThis);
`;
  writeFileSync(join(root, "assets/chrome.js"), js);
}
