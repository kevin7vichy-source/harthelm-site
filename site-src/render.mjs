import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  ADDRESS,
  CASES,
  PHONE_DISPLAY,
  PHONE_WA,
  POLICIES,
  RENEWAL_DIAGNOSIS_LABEL,
  SCHEMES,
  STR,
} from "./content.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const LANGS = [
  { id: "hant", html: "zh-Hant", prefix: "" },
  { id: "hans", html: "zh-Hans", prefix: "/zh-hans" },
  { id: "en", html: "en", prefix: "/en" },
];

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function t(lang, key) {
  const row = STR[key];
  if (!row || !row[lang]) throw new Error("Missing key " + key + " / " + lang);
  return row[lang];
}

function tx(lang, obj) {
  if (!obj || !obj[lang]) throw new Error("Missing inline " + lang + " " + JSON.stringify(obj));
  return obj[lang];
}

function urlFor(langId, route) {
  const lang = LANGS.find((item) => item.id === langId);
  if (route === "index.html") return (lang.prefix || "") + "/" || "/";
  if (route.endsWith("/index.html")) {
    return lang.prefix + "/" + route.slice(0, -"index.html".length);
  }
  return lang.prefix + "/" + route;
}

const NAV = [
  ["index.html", "nav.home"],
  ["about/index.html", "nav.about"],
  ["services/index.html", "nav.services"],
  ["insights/index.html", "nav.insights"],
  ["cases.html", "nav.cases"],
  ["asmtp/index.html", "nav.asmtp"],
  ["iang/index.html", "nav.iang"],
  ["legal/index.html", "nav.legal"],
];

function navHtml(lang, route) {
  const links = NAV.map(([itemRoute, key]) => {
    const current = itemRoute === route ? ' aria-current="page"' : "";
    return `<a href="${esc(urlFor(lang, itemRoute))}"${current}>${esc(t(lang, key))}</a>`;
  }).join("");
  const langs = LANGS.map((item) => {
    const current = item.id === lang ? ' aria-current="true"' : "";
    const label = item.id === "hant" ? "繁" : item.id === "hans" ? "简" : "EN";
    return `<a href="${esc(urlFor(item.id, route))}" hreflang="${item.html}" lang="${item.html}"${current}>${label}</a>`;
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

function alternates(route) {
  return LANGS.map((item) => {
    return `<link rel="alternate" hreflang="${item.html}" href="${esc(urlFor(item.id, route))}">`;
  }).join("\n");
}

function footer(lang, opts) {
  const legalPage = !!(opts && opts.legal);
  const entityEn = legalPage
    ? esc(tx(lang, {
        hant: "英文法定名稱：HK ESPECIALLY FOR HOME HOLDING SHARES CO., LIMITED",
        hans: "英文法定名称：HK ESPECIALLY FOR HOME HOLDING SHARES CO., LIMITED",
        en: "English legal name: HK ESPECIALLY FOR HOME HOLDING SHARES CO., LIMITED",
      }))
    : esc(t(lang, "foot.entityEn"));
  const address = legalPage && lang === "en"
    ? esc("FLAT/RM 1405B 14/F THE BELGIAN BANK BUILDING, NOS.721-725 NATHAN ROAD, MONGKOK, KL") + "<br>" + esc(ADDRESS.en)
    : esc(ADDRESS[lang]);
  const disclaimer = legalPage
    ? esc(tx(lang, {
        hant: "以上為服務範圍介紹，不構成獲批承諾；個案以香港入境事務處、新加坡人力部（MOM）及相關部門要求為準。審批由有關當局酌情決定，個別結果不同。累計接觸與服務個案 1000 餘個（不以獲批計）。個人資料依香港《個人資料（私隱）條例》（第 486 章）處理。如涉及新加坡的個人資料，亦按新加坡《個人資料保護法》（Personal Data Protection Act 2012）處理。",
        hans: "以上为服务范围介绍，不构成获批承诺；个案以香港入境事务处、新加坡人力部（MOM）及相关部门要求为准。审批由有关当局酌情决定，个别结果不同。累计接触与服务个案 1000 余个（不以获批计）。个人资料依香港《个人资料（私隐）条例》（第 486 章）处理。如涉及新加坡的个人资料，亦按新加坡《个人资料保护法》（Personal Data Protection Act 2012）处理。",
        en: "The pages describe a scope of work. They are not a promise of approval. Each case follows the requirements of Hong Kong Immigration, Singapore MOM, and any other authority involved. Those authorities decide, and individual outcomes differ. More than 1,000 cases we have come into contact with or served (not counted by approvals). Personal data we receive is handled under the Personal Data (Privacy) Ordinance (Cap. 486). Where personal data relates to Singapore, it is also handled under Singapore’s Personal Data Protection Act 2012.",
      }))
    : esc(t(lang, "foot.disclaimer"));
  const pages = NAV.map(([route, key]) => {
    return `<li><a href="${esc(urlFor(lang, route))}">${esc(t(lang, key))}</a></li>`;
  }).join("");
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="compliance"><p>${disclaimer}</p></div>
      <div class="foot-grid">
        <div>
          <h2>HARTHELM</h2>
          <p>${esc(t(lang, "foot.tagline"))}</p>
          <p>${esc(t(lang, "foot.entityLabel"))}：${esc(t(lang, "foot.entityName"))}</p>
          <p>${entityEn}</p>
        </div>
        <div>
          <h3>${esc(t(lang, "foot.contact"))}</h3>
          <p>Tel / WhatsApp <a href="https://wa.me/${PHONE_WA}">${esc(PHONE_DISPLAY)}</a></p>
          <p>Email <a href="mailto:office@harthelm.com">office@harthelm.com</a></p>
          <p>${address}</p>
        </div>
        <div>
          <h3>${esc(t(lang, "foot.quick"))}</h3>
          <ul>
            ${pages}
            <li><a href="/case.html">${esc(t(lang, "foot.scenes"))}</a></li>
            <li><a href="/b2b.html">${esc(t(lang, "b2b.cta"))}</a></li>
            <li><a href="/selfcheck/">${esc(t(lang, "dx.free.cta"))}</a></li>
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

function shell(lang, route, title, description, body, opts) {
  const meta = LANGS.find((item) => item.id === lang);
  return `<!DOCTYPE html>
<html lang="${meta.html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="icon" href="/assets/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
${alternates(route)}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+SC:wght@500;600&family=Noto+Serif+TC:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<div class="site-top">
${navHtml(lang, route)}
</div>
${body}
${footer(lang, opts)}
<script src="/assets/site.js"></script>
</body>
</html>
`;
}

function waDiagnosis(lang) {
  const text = t(lang, "dx.paid.cta") + " " + RENEWAL_DIAGNOSIS_LABEL[lang] + " HKD 1,000";
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`;
}

function home(lang) {
  const label = RENEWAL_DIAGNOSIS_LABEL[lang];
  const book = lang === "en" ? "Book" : lang === "hans" ? "预约" : "預約";
  const stages = [
    [label, t(lang, "life.s1b")],
    [t(lang, "life.s2"), t(lang, "life.s2b")],
    [t(lang, "life.s3"), t(lang, "life.s3b")],
    [t(lang, "life.s4"), t(lang, "life.s4b")],
  ];
  const cards = stages.map(([title, body], index) => {
    return `<article class="card"><div class="idx">0${index + 1}</div><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`;
  }).join("");
  const tech = [1, 2, 3].map((n) => {
    return `<article class="card"><h3>${esc(t(lang, "tech." + n + "t"))}</h3><p>${esc(t(lang, "tech." + n + "b"))}</p><p class="mono">${esc(t(lang, "tech." + n + "m"))}</p></article>`;
  }).join("");
  const scene = (id) => `<article class="card">
    <div class="idx">${esc(t(lang, "scene." + id + ".tag"))}</div>
    <h3>${esc(t(lang, "scene." + id + ".title"))}</h3>
    <p class="muted">${esc(t(lang, "scene.a.timeLabel"))} ${esc(t(lang, "scene." + id + ".time"))}</p>
    <p>${esc(t(lang, "scene." + id + ".body"))}</p>
    <p>${esc(t(lang, "scene." + id + ".out"))}</p>
  </article>`;
  const dxItems = [1, 2, 3, 4].map((n) => `<li>${esc(t(lang, "dx.i" + n))}</li>`).join("");
  const freeItems = [1, 2, 3, 4].map((n) => `<li>${esc(t(lang, "dx.f" + n))}</li>`).join("");
  const body = `<section class="hero">
    <div class="wrap">
      <p class="eyebrow">${esc(t(lang, "hero.eyebrow"))}</p>
      <h1>${esc(t(lang, "hero.l1"))}<br><span>${esc(t(lang, "hero.l2"))}</span></h1>
      <hr class="rule">
      <p class="lead">${esc(t(lang, "hero.lead"))}</p>
      <div class="hero-actions">
        <a class="btn btn-gold" href="#tech">${esc(t(lang, "hero.ctaTech"))}</a>
        <a class="btn btn-ghost" href="#diagnosis">${esc(book)} ${esc(label)}</a>
      </div>
    </div>
  </section>
  <section class="trust" aria-label="facts">
    <div class="wrap trust-grid">
      <div class="trust-item"><strong>${esc(t(lang, "trust.years"))}</strong><span>${esc(t(lang, "trust.yearsLabel"))}</span></div>
      <div class="trust-item"><strong>${esc(t(lang, "trust.seats"))}</strong><span>${esc(t(lang, "trust.seatsLabel"))}</span></div>
    </div>
    <p class="trust-cases">${esc(t(lang, "trust.cases"))}</p>
  </section>
  <section class="section section-ivory" id="lifecycle">
    <div class="wrap">
      <div class="center">
        <p class="kicker">${esc(t(lang, "life.kicker"))}</p>
        <h2>${esc(t(lang, "life.title"))}</h2>
        <p class="intro">${esc(t(lang, "life.intro"))}</p>
      </div>
      <div class="cards-4">${cards}</div>
      <p class="intro" style="margin-top:22px">${esc(t(lang, "life.caveat"))}</p>
    </div>
  </section>
  <section class="section section-paper" id="tech">
    <div class="wrap">
      <div class="center">
        <p class="kicker">${esc(t(lang, "tech.kicker"))}</p>
        <h2>${esc(t(lang, "tech.title"))}</h2>
        <p class="intro">${esc(t(lang, "tech.intro"))}</p>
      </div>
      <div class="cards-3">${tech}</div>
    </div>
  </section>
  <section class="section section-ivory" id="scenes">
    <div class="wrap">
      <div class="center">
        <h2>${esc(t(lang, "scene.title"))}</h2>
        <p class="intro">${esc(t(lang, "scene.intro"))}</p>
      </div>
      <div class="cards-2">${scene("a")}${scene("b")}</div>
      <p class="center" style="margin-top:22px">
        <a href="${esc(urlFor(lang, "cases.html"))}">${esc(t(lang, "scene.more"))}</a>
        · <a href="/case.html">${esc(t(lang, "scene.legacy"))}</a>
      </p>
    </div>
  </section>
  <section class="section section-paper" id="diagnosis">
    <div class="wrap">
      <div class="center">
        <p class="kicker">${esc(t(lang, "dx.kicker"))}</p>
        <h2>${esc(t(lang, "dx.title"))}</h2>
        <p class="intro">${esc(t(lang, "dx.intro"))}</p>
      </div>
      <div class="split">
        <article class="panel panel-navy">
          <div class="badge">${esc(t(lang, "dx.paid.badge"))}</div>
          <h3>${esc(label)}${esc(t(lang, "dx.paid.rest"))}</h3>
          <p class="price">HKD 1,000 <small>${esc(t(lang, "dx.paid.note"))}</small></p>
          <ul>${dxItems}</ul>
          <a class="btn btn-gold btn-block" href="${esc(waDiagnosis(lang))}" target="_blank" rel="noopener">${esc(t(lang, "dx.paid.cta"))}</a>
        </article>
        <article class="panel panel-light">
          <div class="badge">${esc(t(lang, "dx.free.badge"))}</div>
          <h3>${esc(t(lang, "dx.free.title"))}</h3>
          <p class="price">${esc(t(lang, "dx.free.price"))} <small>${esc(t(lang, "dx.free.note"))}</small></p>
          <ul>${freeItems}</ul>
          <a class="btn btn-line btn-block" href="/selfcheck/">${esc(t(lang, "dx.free.cta"))}</a>
        </article>
      </div>
      <div class="band">
        <div>
          <strong>${esc(t(lang, "b2b.title"))}</strong>
          <p>${esc(t(lang, "b2b.body"))}</p>
        </div>
        <a href="/b2b.html">${esc(t(lang, "b2b.cta"))} →</a>
      </div>
    </div>
  </section>`;
  return shell(lang, "index.html", t(lang, "meta.home.title"), t(lang, "meta.home.desc"), body);
}

function pageHead(lang, title, lead) {
  return `<header class="page-head"><div class="wrap-s"><p class="kicker">HARTHELM</p><h1>${esc(title)}</h1><p class="intro">${lead}</p></div></header>`;
}

function about(lang) {
  const label = RENEWAL_DIAGNOSIS_LABEL[lang];
  const body = `${pageHead(lang, t(lang, "about.title"), esc(t(lang, "about.lead")))}
  <article class="prose"><div class="wrap-s">
    <p>${esc(t(lang, "about.p1"))}</p>
    <p>${esc(t(lang, "about.p2"))}</p>
    <h2>${esc(t(lang, "about.doTitle"))}</h2>
    <ul>
      <li>${esc(label)}：${esc(t(lang, "about.do1"))}</li>
      <li>${esc(t(lang, "about.do2"))}</li>
      <li>${esc(t(lang, "about.do3"))}</li>
      <li>${esc(t(lang, "about.do4"))}</li>
    </ul>
    <h2>${esc(t(lang, "about.dontTitle"))}</h2>
    <ul>
      <li>${esc(t(lang, "about.dont1"))}</li>
      <li>${esc(t(lang, "about.dont2"))}</li>
      <li>${esc(t(lang, "about.dont3"))}</li>
      <li>${esc(t(lang, "about.dont4"))}</li>
    </ul>
    <h2>${esc(t(lang, "foot.entityLabel"))}</h2>
    <p>${esc(t(lang, "foot.entityName"))}</p>
    <p>${esc(t(lang, "foot.entityEn"))}</p>
    <p>Email <a href="mailto:office@harthelm.com">office@harthelm.com</a></p>
    <h2>${esc(t(lang, "about.factsTitle"))}</h2>
    <p>${esc(t(lang, "about.factsBody"))}</p>
    <ul>
      <li>${esc(t(lang, "trust.years"))} · ${esc(t(lang, "trust.yearsLabel"))}</li>
      <li>${esc(t(lang, "trust.seats"))} · ${esc(t(lang, "trust.seatsLabel"))}</li>
      <li>${esc(ADDRESS[lang])}</li>
      <li><a href="https://wa.me/${PHONE_WA}">${esc(PHONE_DISPLAY)}</a></li>
    </ul>
  </div></article>`;
  return shell(lang, "about/index.html", "HARTHELM · " + t(lang, "about.title"), t(lang, "about.lead"), body);
}

function services(lang) {
  const label = RENEWAL_DIAGNOSIS_LABEL[lang];
  const stages = [
    [label, t(lang, "life.s1b")],
    [t(lang, "life.s2"), t(lang, "life.s2b")],
    [t(lang, "life.s3"), t(lang, "life.s3b")],
    [t(lang, "life.s4"), t(lang, "life.s4b")],
  ].map(([title, text], index) => `<article class="card"><div class="idx">0${index + 1}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("");
  const schemes = SCHEMES.map((item) => {
    const href = item.href.startsWith("/insights/") || item.href.startsWith("/asmtp") || item.href.startsWith("/iang")
      ? urlFor(lang, item.href === "/asmtp/" ? "asmtp/index.html" : item.href === "/iang/" ? "iang/index.html" : "insights/index.html") + (item.href.includes("#") ? item.href.slice(item.href.indexOf("#")) : "")
      : item.href;
    return `<li><a href="${esc(href)}">${esc(tx(lang, item.title))}</a></li>`;
  }).join("");
  const body = `${pageHead(lang, t(lang, "svc.title"), esc(t(lang, "svc.lead")))}
  <article class="prose"><div class="wrap">
    <div class="cards-4">${stages}</div>
    <p>${esc(t(lang, "life.caveat"))}</p>
    <h2>${esc(t(lang, "svc.schemeTitle"))}</h2>
    <p>${esc(t(lang, "svc.schemeLead"))}</p>
    <ul class="link-list">${schemes}</ul>
    <p><a class="btn btn-line" href="${esc(urlFor(lang, "index.html"))}#diagnosis">${esc(label)} · HKD 1,000</a>
    <a class="btn btn-line" href="/selfcheck/">${esc(t(lang, "dx.free.cta"))}</a></p>
  </div></article>`;
  return shell(lang, "services/index.html", "HARTHELM · " + t(lang, "svc.title"), t(lang, "svc.lead"), body);
}

function insights(lang) {
  const blocks = POLICIES.map((policy) => {
    const points = policy.points.map((point) => `<li>${esc(tx(lang, point))}</li>`).join("");
    const links = policy.links.length
      ? `<ul class="link-list">${policy.links.map((link) => `<li><a href="${esc(link.href)}" rel="noopener">${esc(tx(lang, link.label))}</a></li>`).join("")}</ul>`
      : "";
    const extra = policy.id === "asmtp"
      ? `<p><a href="${esc(urlFor(lang, "asmtp/index.html"))}">${esc(t(lang, "full"))}</a></p>`
      : policy.id === "iang"
        ? `<p><a href="${esc(urlFor(lang, "iang/index.html"))}">${esc(t(lang, "full"))}</a></p>`
        : "";
    return `<article class="policy" id="${policy.id}">
      <h2>${esc(tx(lang, policy.title))}</h2>
      <p class="muted">${esc(t(lang, "ins.checked"))} ${esc(t(lang, "notLegal"))}</p>
      <ul>${points}</ul>
      ${links}
      ${extra}
    </article>`;
  }).join("");
  const body = `${pageHead(lang, t(lang, "ins.title"), esc(t(lang, "ins.lead")))}
  <article class="prose"><div class="wrap-s">${blocks}</div></article>`;
  return shell(lang, "insights/index.html", "HARTHELM · " + t(lang, "ins.title"), t(lang, "ins.lead"), body);
}

function cases(lang) {
  const blocks = CASES.map((item) => {
    return `<article class="policy" id="${item.id}">
      <h2>${esc(tx(lang, item.title))}</h2>
      <h3>${esc(t(lang, "cases.bg"))}</h3><p>${esc(tx(lang, item.background))}</p>
      <h3>${esc(t(lang, "cases.diff"))}</h3><p>${esc(tx(lang, item.difficulty))}</p>
      <h3>${esc(t(lang, "cases.how"))}</h3><p>${esc(tx(lang, item.handling))}</p>
      <h3>${esc(t(lang, "cases.result"))}</h3><p>${esc(tx(lang, item.outcome))}</p>
    </article>`;
  }).join("");
  const body = `${pageHead(lang, t(lang, "cases.title"), esc(t(lang, "cases.lead")))}
  <article class="prose"><div class="wrap-s">
    <p class="notice">${esc(t(lang, "cases.dates"))}</p>
    ${blocks}
    <p><a href="/case.html">${esc(t(lang, "scene.legacy"))}</a></p>
  </div></article>`;
  return shell(lang, "cases.html", "HARTHELM · " + t(lang, "cases.title"), t(lang, "cases.lead"), body);
}

function schemePage(lang, route, titleKey, policyId, paras) {
  const policy = POLICIES.find((item) => item.id === policyId);
  const points = policy.points.map((point) => `<li>${esc(tx(lang, point))}</li>`).join("");
  const links = policy.links.map((link) => `<li><a href="${esc(link.href)}" rel="noopener">${esc(tx(lang, link.label))}</a></li>`).join("");
  const extra = paras.slice(1).map((p) => `<p>${esc(tx(lang, p))}</p>`).join("");
  const label = RENEWAL_DIAGNOSIS_LABEL[lang];
  const body = `${pageHead(lang, t(lang, titleKey), esc(tx(lang, paras[0])))}
  <article class="prose"><div class="wrap-s">
    ${extra}
    <h2>${esc(t(lang, "more"))}</h2>
    <p class="muted">${esc(t(lang, "ins.checked"))}</p>
    <ul>${points}</ul>
    <ul class="link-list">${links}</ul>
    <p class="notice">${esc(t(lang, "dx.f1"))}</p>
    <p><a class="btn btn-line" href="${esc(urlFor(lang, "index.html"))}#diagnosis">${esc(label)} · HKD 1,000</a>
    <a class="btn btn-line" href="mailto:office@harthelm.com">office@harthelm.com</a></p>
  </div></article>`;
  return shell(lang, route, "HARTHELM · " + t(lang, titleKey), tx(lang, paras[0]), body);
}

const ASMTP_PARAS = [
  {
    hant: "輸入內地人才計劃面向已經獲得香港聘用的內地居民。它與高才通、優才不同：一般要先有真實職位，而不是申請時尚未受聘。",
    hans: "输入内地人才计划面向已经获得香港聘用的内地居民。它与高才通、优才不同：一般要先有真实职位，而不是申请时尚未受聘。",
    en: "The Admission Scheme for Mainland Talents and Professionals is for mainland residents who already have employment in Hong Kong. Unlike the Top Talent Pass and Quality Migrant Admission, a real post generally comes first.",
  },
  {
    hant: "HARTHELM 可以按已公開的服務範圍，協助整理與公司、職位和經營留痕有關的資料。職位是否真實、薪酬是否大致符合市場、申請是否批准，都由入境處判斷。本頁不報一個專才套餐價格，也不把自僱架構寫成當然符合專才的聘用要求。",
    hans: "HARTHELM 可以按已公开的服务范围，协助整理与公司、职位和经营留痕有关的资料。职位是否真实、薪酬是否大致符合市场、申请是否批准，都由入境处判断。本页不报一个专才套餐价格，也不把自雇架构写成当然符合专才的聘用要求。",
    en: "Within the scope already published, HARTHELM can help organise papers about a company, a post, and the operating record. Whether the post is genuine, whether pay is broadly in line with the market, and whether an application is approved, are for Immigration. This page does not quote an ASMTP package, and it does not treat a self-employed structure as automatically meeting the employment test.",
  },
  {
    hant: "現有的免費自測只涵蓋高才通、優才和新加坡 Employment Pass，不涵蓋專才。專才問題請用電郵，或預約下方的診斷。",
    hans: "现有的免费自测只涵盖高才通、优才和新加坡 Employment Pass，不涵盖专才。专才问题请用电邮，或预约下方的诊断。",
    en: "The free self-check covers the Top Talent Pass, Quality Migrant Admission, and the Singapore Employment Pass. It does not cover ASMTP. For ASMTP, write by email, or book the review below.",
  },
];

const IANG_PARAS = [
  {
    hant: "IANG 是非本地畢業生留港或回港就業的安排，不是學生簽證本身。在港讀全日制、經本地評審的學士或更高課程，和畢業後的這項安排，是前後兩段。入學、甚至畢業，都不等於已經取得可定居的香港身份。",
    hans: "IANG 是非本地毕业生留港或回港就业的安排，不是学生签证本身。在港读全日制、经本地评审的学士或更高课程，和毕业后的这项安排，是前后两段。入学、甚至毕业，都不等于已经取得可定居的香港身份。",
    en: "IANG is the arrangement for non-local graduates to stay or return for employment. It is not the student visa. Full-time locally accredited study at bachelor level or above, and this arrangement after graduation, are two stages. Starting the course, or even graduating, is not the same as already holding a Hong Kong status that allows settlement.",
  },
  {
    hant: "畢業後六個月內提出的應屆申請，一般無須先有聘書，首次通常是 24 個月。過了這個時間再申請，通常要已經獲聘，職位和薪酬要符合規定。其後的延長逗留，同樣要已經獲聘。合資格的大灣區校園等其他情形，以入境處頁面為準。",
    hans: "毕业后六个月内提出的应届申请，一般无须先有聘书，首次通常是 24 个月。过了这个时间再申请，通常要已经获聘，职位和薪酬要符合规定。其后的延长逗留，同样要已经获聘。合资格的大湾区校园等其他情形，以入境处页面为准。",
    en: "A fresh application filed within six months of graduation generally does not need an offer first, and the first permission is usually 24 months. After that window, an application generally needs employment already in place, with the post and pay meeting the rules. A later extension of stay also requires employment. Other cases, including eligible Greater Bay Area campuses, follow the Immigration page.",
  },
  {
    hant: "家屬不是隨入學自動取得身份，受養人申請須符合當時政策。現有免費自測不包含 IANG。空窗期的公司與辦公室支持，見首頁的服務場景，結果仍由入境處決定。",
    hans: "家属不是随入学自动取得身份，受养人申请须符合当时政策。现有免费自测不包含 IANG。空窗期的公司与办公室支持，见首页的服务场景，结果仍由入境处决定。",
    en: "Family members do not receive a status automatically because someone starts a course. A dependant application has to meet the policy then in force. The free self-check does not include IANG. Company and office support during a gap is described in the service scenes on the home page. The outcome is still for Immigration.",
  },
];

const LEGAL = [
  {
    h2: { hant: "我們是誰", hans: "我们是谁", en: "Who we are" },
    p: [
      {
        hant: "資料使用者是宜居（國際）控股股份有限公司 / HK ESPECIALLY FOR HOME HOLDING SHARES CO., LIMITED（下稱「我們」）。HARTHELM 是我們的服務品牌，不是另一個資料使用者。個人資料主任（亦為新加坡《個人資料保護法》下的資料保護主任）的業務聯絡是 office@harthelm.com。對外電郵只使用這個地址。",
        hans: "资料使用者是宜居（國際）控股股份有限公司 / HK ESPECIALLY FOR HOME HOLDING SHARES CO., LIMITED（下称「我们」）。HARTHELM 是我们的服务品牌，不是另一个资料使用者。个人资料主任（亦为新加坡《个人资料保护法》下的资料保护主任）的业务联络是 office@harthelm.com。对外电邮只使用这个地址。",
        en: "The data user is 宜居（國際）控股股份有限公司 / HK ESPECIALLY FOR HOME HOLDING SHARES CO., LIMITED (“we”). HARTHELM is our service brand, not a separate data user. The business contact for the personal data officer, who is also the data protection officer under Singapore’s Personal Data Protection Act, is office@harthelm.com. That is the only email we use publicly.",
      },
    ],
  },
  {
    h2: { hant: "資訊的性質", hans: "资讯的性质", en: "What the information is" },
    p: [
      {
        hant: "網站內容是一般資料，供閱讀用，不是法律意見，也不是香港入境事務處、人才辦、新加坡人力部或其他機關的官方文本。政策要點有整理日期，並鏈到當時所記的官方頁面。你作決定前應核對當日官網，或向合資格的顧問查詢你自己的情況。",
        hans: "网站内容是一般资料，供阅读用，不是法律意见，也不是香港入境事务处、人才办、新加坡人力部或其他机关的官方文本。政策要点有整理日期，并链到当时所记的官方页面。你作决定前应核对当日官网，或向合资格的顾问查询你自己的情况。",
        en: "The site is general information for reading. It is not legal advice, and it is not an official text of Hong Kong Immigration, Hong Kong Talent Engage, Singapore MOM, or any other authority. Policy notes carry a compilation date and link to the official page recorded then. Before you decide, check the official page that day, or ask a qualified adviser about your own facts.",
      },
      {
        hant: "本頁不排除或限制適用法律不允許排除或限制的責任，包括但不限於香港《管制免責條款條例》（第 71 章）就疏忽引致死亡或人身傷害不得排除的責任，以及該條例與新加坡 Unfair Contract Terms Act 1977 要求須符合合理性的責任限制；亦不影響你作為消費者依法享有的權利。",
        hans: "本页不排除或限制适用法律不允许排除或限制的责任，包括但不限于香港《管制免责条款条例》（第 71 章）就疏忽引致死亡或人身伤害不得排除的责任，以及该条例与新加坡 Unfair Contract Terms Act 1977 要求须符合合理性的责任限制；亦不影响你作为消费者依法享有的权利。",
        en: "This page does not exclude or limit any liability that applicable law does not allow to be excluded or limited, including liability for death or personal injury caused by negligence, which cannot be excluded under Hong Kong’s Control of Exemption Clauses Ordinance (Cap. 71), and limits of liability that must satisfy the reasonableness test under that Ordinance and under Singapore’s Unfair Contract Terms Act 1977. It does not affect rights you have as a consumer.",
      },
    ],
  },
  {
    h2: { hant: "不承諾結果", hans: "不承诺结果", en: "No outcome is promised" },
    p: [
      {
        hant: "任何簽證、准證、逗留、延期、定居或永久居民申請，都由有關當局酌情決定。符合公開條件也不表示必然受理或批准。個別結果不同。本站不寫申請結果的比例，也不把個案間隔寫成時限。",
        hans: "任何签证、准证、逗留、延期、定居或永久居民申请，都由有关当局酌情决定。符合公开条件也不表示必然受理或批准。个别结果不同。本站不写申请结果的比例，也不把个案间隔写成时限。",
        en: "Any visa, pass, stay, extension, settlement, or right-of-abode application is decided by the authority, at its discretion. Meeting a published condition does not mean the application will be accepted or approved. Individual outcomes differ. This site does not publish how often applications succeed, and it does not turn one case’s interval into a timetable.",
      },
      {
        hant: "案例頁只有四則已脫敏的公開資料整理。服務場景是服務範圍的例子，不是具名客戶的結果。累計接觸與服務個案 1000 餘個（不以獲批計）。除此之外，本站不用其他個案數字。",
        hans: "案例页只有四则已脱敏的公开资料整理。服务场景是服务范围的例子，不是具名客户的结果。累计接触与服务个案 1000 余个（不以获批计）。除此之外，本站不用其他个案数字。",
        en: "The cases page has four desensitised notes from material already published. The service scenes are examples of scope, not named clients’ results. The only case count used is: more than 1,000 cases we have come into contact with or served (not counted by approvals).",
      },
    ],
  },
  {
    h2: { hant: "個人資料", hans: "个人资料", en: "Personal data" },
    p: [
      {
        hant: "你發電郵到 office@harthelm.com，或經本站的 WhatsApp 連結聯絡我們時，我們會收到你主動提供的資料，包括電郵地址、WhatsApp 號碼和訊息文字。我們只用這些資料回覆和跟進你提出的事項。我們不出售個人資料。",
        hans: "你发电邮到 office@harthelm.com，或经本站的 WhatsApp 连结联络我们时，我们会收到你主动提供的资料，包括电邮地址、WhatsApp 号码和讯息文字。我们只用这些资料回复和跟进你提出的事项。我们不出售个人资料。",
        en: "If you email office@harthelm.com, or contact us through the WhatsApp link on this site, we receive what you choose to send, including your email address, WhatsApp number, and the text of the message. We use it only to reply and to follow up the matter you raised. We do not sell personal data.",
      },
      {
        hant: "本站由 GitHub Pages 托管。托管方可為保安目的記錄訪客的 IP 地址等技術資料。本頁載入 Google Fonts 時，你的瀏覽器會向 Google 傳送 IP 地址和瀏覽器資訊。這些服務的伺服器可能位於香港及新加坡以外。我們位於香港。",
        hans: "本站由 GitHub Pages 托管。托管方可为保安目的记录访客的 IP 地址等技术资料。本页载入 Google Fonts 时，你的浏览器会向 Google 传送 IP 地址和浏览器信息。这些服务的服务器可能位于香港及新加坡以外。我们位于香港。",
        en: "This site is hosted on GitHub Pages. The host may log a visitor’s IP address and similar technical data for security. When this page loads Google Fonts, your browser sends your IP address and browser information to Google. Those services’ servers may be outside Hong Kong and Singapore. We are in Hong Kong.",
      },
      {
        hant: "經 WhatsApp 聯絡時，相關資料由 WhatsApp／Meta 按其公開條款和私隱政策處理，並可能被轉移到香港以外。GitHub、Google 與 WhatsApp／Meta 按其公開條款處理資料；我們沒有與它們另行訂立資料處理協議。",
        hans: "经 WhatsApp 联络时，相关资料由 WhatsApp／Meta 按其公开条款和隐私政策处理，并可能被转移到香港以外。GitHub、Google 与 WhatsApp／Meta 按其公开条款处理资料；我们没有与它们另行订立资料处理协议。",
        en: "If you contact us on WhatsApp, WhatsApp / Meta processes the related data under its published terms and privacy policy, and the data may be transferred outside Hong Kong. GitHub, Google, and WhatsApp / Meta process data under their published terms. We have not entered into a separate data-processing agreement with them.",
      },
      {
        hant: "個人資料依香港《個人資料（私隱）條例》（第 486 章）處理。如涉及新加坡的個人資料，亦按新加坡《個人資料保護法》（Personal Data Protection Act 2012）處理。",
        hans: "个人资料依香港《个人资料（私隐）条例》（第 486 章）处理。如涉及新加坡的个人资料，亦按新加坡《个人资料保护法》（Personal Data Protection Act 2012）处理。",
        en: "Personal data is handled under Hong Kong’s Personal Data (Privacy) Ordinance (Cap. 486). Where it relates to Singapore, it is also handled under Singapore’s Personal Data Protection Act 2012.",
      },
      {
        hant: "你可以電郵 office@harthelm.com 撤回同意。我們會告知撤回的後果，並停止相關處理。撤回後，我們可能無法繼續回覆該項查詢或提供相關服務。撤回不影響撤回前已經進行的處理。",
        hans: "你可以电邮 office@harthelm.com 撤回同意。我们会告知撤回的后果，并停止相关处理。撤回后，我们可能无法继续回复该项查询或提供相关服务。撤回不影响撤回前已经进行的处理。",
        en: "You may withdraw consent by emailing office@harthelm.com. We will tell you the consequences and stop the processing that depends on that consent. After withdrawal, we may be unable to continue replying to that enquiry or providing the related service. Withdrawal does not affect processing already carried out.",
      },
      {
        hant: "查閱或改正，請電郵 office@harthelm.com，寫明姓名和要求，由個人資料主任（兼資料保護主任）處理。請不要在電郵中附上密碼、完整銀行帳號或身份證明文件圖像。",
        hans: "查阅或改正，请电邮 office@harthelm.com，写明姓名和要求，由个人资料主任（兼资料保护主任）处理。请不要在电邮中附上密码、完整银行账号或身份证明文件图像。",
        en: "To ask for access or correction, email office@harthelm.com, and state your name and what you are asking for. The personal data officer, who is also the data protection officer, handles that request. Do not attach passwords, full bank-account numbers, or images of identity documents.",
      },
      {
        hant: "在香港，查閱資料要求按《個人資料（私隱）條例》第 18 條提出，一般在收到後 40 日內依從（第 19(1) 條）；改正按第 22(1) 條。如需收費，我們會事先告知金額。在新加坡，你可以查閱我們持有的你的個人資料，以及過去一年的使用或披露方式（Personal Data Protection Act 第 21 條），要求更正（第 22 條），並按第 16 條撤回同意。",
        hans: "在香港，查阅资料要求按《个人资料（私隐）条例》第 18 条提出，一般在收到后 40 日内依从（第 19(1) 条）；改正按第 22(1) 条。如需收费，我们会事先告知金额。在新加坡，你可以查阅我们持有的你的个人资料，以及过去一年的使用或披露方式（Personal Data Protection Act 第 21 条），要求更正（第 22 条），并按第 16 条撤回同意。",
        en: "In Hong Kong, a data-access request is made under section 18 of the Personal Data (Privacy) Ordinance and is generally complied with within 40 days after it is received (section 19(1)). A correction request is made under section 22(1). If a fee is charged, we tell you the amount first. In Singapore, you may ask to be told what personal data of yours we hold and how it was used or disclosed in the past year (section 21 of the Personal Data Protection Act), ask for a correction (section 22), and withdraw consent (section 16).",
      },
      {
        hant: "尚未簽約的查詢資料，自最後一次聯絡起保存 24 個月，然後刪除。已簽約客戶的資料在服務期內保存，並在服務結束後再保存 7 年，包括為符合香港《公司條例》（第 622 章）第 377 條對會計記錄的保存要求。法律另有要求，或資料涉及未了結的查詢、投訴或爭議的，保存至相關事項完結。資料不再為使用目的所需時，我們會採取切實可行的步驟刪除。",
        hans: "尚未签约的查询资料，自最后一次联络起保存 24 个月，然后删除。已签约客户的资料在服务期内保存，并在服务结束后再保存 7 年，包括为符合香港《公司条例》（第 622 章）第 377 条对会计记录的保存要求。法律另有要求，或资料涉及未了结的查询、投诉或争议的，保存至相关事项完结。资料不再为使用目的所需时，我们会采取切实可行的步骤删除。",
        en: "Enquiry data from people who do not sign is kept for 24 months from the last contact, and then deleted. A client’s data is kept during the service and for 7 years after it ends, including to meet the accounting-record period in section 377 of Hong Kong’s Companies Ordinance (Cap. 622). It is kept longer where the law requires, or while an enquiry, complaint, or dispute is still open, until that matter ends. When the data is no longer needed for the purpose, we take practicable steps to delete it.",
      },
      {
        hant: "除非你另行同意，我們不會把你為查詢而提供的姓名和聯絡方式用於發送服務資訊或其他直接促銷，也不會把該等資料提供給其他機構作直接促銷。如日後擬作此用途，會事先按香港《個人資料（私隱）條例》第 6A 部（第 35C 條、第 35E 條）告知並取得同意。你可以隨時電郵 office@harthelm.com 要求停止，我們不收費。",
        hans: "除非你另行同意，我们不会把你为查询而提供的姓名和联络方式用于发送服务信息或其他直接促销，也不会把该等资料提供给其他机构作直接促销。如日后拟作此用途，会事先按香港《个人资料（私隐）条例》第 6A 部（第 35C 条、第 35E 条）告知并取得同意。你可以随时电邮 office@harthelm.com 要求停止，我们不收费。",
        en: "Unless you give a separate consent, we do not use the name and contact details you gave for an enquiry to send service information or other direct marketing, and we do not provide that data to anyone else for direct marketing. If we later propose to do so, we will first inform you and obtain consent under Part 6A of the Personal Data (Privacy) Ordinance (sections 35C and 35E). You may email office@harthelm.com at any time and ask us to stop. There is no charge.",
      },
      {
        hant: "如發生影響你個人資料的外泄，我們會盡快評估並採取補救。香港《個人資料（私隱）條例》沒有法定的外泄通報期限。如屬新加坡《個人資料保護法》第 26C 條、第 26D 條須通報的情形，我們會在評估後 3 個公曆日內通知新加坡個人資料保護委員會，並在法律要求時通知受影響的人。",
        hans: "如发生影响你个人资料的外泄，我们会尽快评估并采取补救。香港《个人资料（私隐）条例》没有法定的外泄通报期限。如属新加坡《个人资料保护法》第 26C 条、第 26D 条须通报的情形，我们会在评估后 3 个公历日内通知新加坡个人资料保护委员会，并在法律要求时通知受影响的人。",
        en: "If personal data about you is breached, we assess it and take remedial steps promptly. Hong Kong’s Personal Data (Privacy) Ordinance sets no statutory deadline for notifying a breach. Where Singapore’s Personal Data Protection Act, sections 26C and 26D, requires notification, we notify the Personal Data Protection Commission within 3 calendar days after the assessment, and we notify affected individuals when the law requires it.",
      },
      {
        hant: "準備度自測在你的瀏覽器內運行。按該頁自己的說明，它不要求上傳證件原件；若你勾選在本機保存進度，資料留在你的瀏覽器。該工具不是入境處或人力部的系統。該工具頁目前只有一種語言。",
        hans: "准备度自测在你的浏览器内运行。按该页自己的说明，它不要求上传证件原件；若你勾选在本机保存进度，资料留在你的浏览器。该工具不是入境处或人力部的系统。该工具页目前只有一种语言。",
        en: "The readiness self-check runs in your browser. On its own page, it does not ask you to upload original identity documents. If you choose to save progress on the device, that stays in your browser. The tool is not an Immigration or MOM system. That tool page is in one language only.",
      },
      {
        hant: "已合作客戶使用公司經營看板時，另有一份客戶版資料聲明，存放於本站 /legal/board-statement/。該聲明目前以中文為準，只適用於其文內所寫的看板服務，不取代本頁；本頁也不取代該聲明。",
        hans: "已合作客户使用公司经营看板时，另有一份客户版资料声明，存放于本站 /legal/board-statement/。该声明目前以中文为准，只适用于其文内所写的看板服务，不取代本页；本页也不取代该声明。",
        en: "Clients who use the company operating board have a separate customer statement at /legal/board-statement/ on this site. That statement is currently governed by its Chinese text. It applies only to the board service it describes. It does not replace this page, and this page does not replace it.",
      },
    ],
  },
  {
    h2: { hant: "外部連結", hans: "外部连结", en: "External links" },
    p: [
      {
        hant: "鏈到政府或其他機構的頁面後，內容由該機構負責。",
        hans: "链到政府或其他机构的页面后，内容由该机构负责。",
        en: "After a link leaves this site for a government or other organisation, that organisation is responsible for the page.",
      },
    ],
  },
  {
    h2: { hant: "文本", hans: "文本", en: "Text" },
    p: [
      {
        hant: "本聲明以繁體中文、簡體中文和英文一併發布。三種文本具同等效力。若含義有衝突，以繁體中文為準。生效日期：2026-11-10。頁腳所鏈的服務場景說明、渠道合作頁和準備度自測，目前各只有一種語言。",
        hans: "本声明以繁体中文、简体中文和英文一并发布。三种文本具同等效力。若含义有冲突，以繁体中文为准。生效日期：2026-11-10。页脚所链的服务场景说明、渠道合作页和准备度自测，目前各只有一种语言。",
        en: "This notice is published in Traditional Chinese, Simplified Chinese, and English together. The three texts have equal force. If they conflict, the Traditional Chinese text prevails. Effective date: 2026-11-10. The service-scenes page, the channel page, and the readiness self-check linked from the footer are each in one language only.",
      },
    ],
  },
];

function legal(lang) {
  const blocks = LEGAL.map((section) => {
    const paras = section.p.map((p) => `<p>${esc(tx(lang, p))}</p>`).join("");
    return `<h2>${esc(tx(lang, section.h2))}</h2>${paras}`;
  }).join("");
  const effective = tx(lang, {
    hant: "生效日期：2026-11-10",
    hans: "生效日期：2026-11-10",
    en: "Effective date: 2026-11-10",
  });
  const body = `${pageHead(lang, t(lang, "legal.title"), esc(effective))}
  <article class="prose"><div class="wrap-s">${blocks}</div></article>`;
  return shell(lang, "legal/index.html", "HARTHELM · " + t(lang, "legal.title"), effective, body, { legal: true });
}

function validateTree(html, file) {
  const banned = [
    /1[,，]\s*500/,
    /800\s*\+/,
    /3000\s*組家庭/,
    /3000\s*组家庭/,
    /極速獲批/,
    /极速获批/,
    /通過率超過/,
    /通过率超过/,
    /pass rate/i,
    /guaranteed approval/i,
    /NeoHarbor/i,
    /neoharbor/i,
    /新港灣/,
    /新港湾/,
    /身份獲批與診斷/,
    /身份获批与诊断/,
    /ESPECIALLY FOR HOME \(INTERNATIONAL\)/i,
    /100\s*%/,
    /href="#"/,
    /\/ops\//,
  ];
  for (const pattern of banned) {
    if (pattern.test(html)) throw new Error(file + " matched " + pattern);
  }
  if (!html.includes("office@harthelm.com")) throw new Error(file + " missing email");
  if (html.includes("pending-confirm") || html.includes("待 Kevin 确认") || html.includes("preview-ribbon") || html.includes("預覽改版") || html.includes("管家式全鏈路") || html.includes("管家式全链路") || html.includes("Steward-style delivery across the compliance chain")) {
    throw new Error(file + " still has a removed mark or line");
  }
  if (file.endsWith("legal/index.html") && (html.includes("draft-flag") || html.includes("草稿，需") || html.includes("Draft, for the owner"))) {
    throw new Error(file + " still has the draft banner");
  }
  if (!html.includes(PHONE_DISPLAY)) throw new Error(file + " missing phone");
  if (!html.includes("宜居")) throw new Error(file + " missing entity");
}

const pages = [
  ["index.html", home],
  ["about/index.html", about],
  ["services/index.html", services],
  ["insights/index.html", insights],
  ["cases.html", cases],
  ["asmtp/index.html", (lang) => schemePage(lang, "asmtp/index.html", "asmtp.meta", "asmtp", ASMTP_PARAS)],
  ["iang/index.html", (lang) => schemePage(lang, "iang/index.html", "iang.meta", "iang", IANG_PARAS)],
  ["legal/index.html", legal],
];

const used = new Set();
const realT = t;
// wrap not needed

for (const lang of LANGS) {
  for (const [route, build] of pages) {
    const html = build(lang.id);
    const rel = (lang.prefix ? lang.prefix.slice(1) + "/" : "") + (route === "index.html" ? "index.html" : route);
    const out = join(ROOT, rel);
    mkdirSync(dirname(out), { recursive: true });
    validateTree(html, rel);
    writeFileSync(out, html);
    used.add(rel);
  }
}

if (POLICIES.length !== 12) throw new Error("policy count");
const linkCount = POLICIES.reduce((sum, item) => sum + item.links.length, 0);
console.log("Wrote " + used.size + " pages, policies " + POLICIES.length + ", official links " + linkCount);
