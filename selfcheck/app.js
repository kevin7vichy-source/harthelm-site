/* HARTHELM 准备度自测 · 纯本地 · 无网络请求 */
(function () {
  "use strict";

  var STORAGE_KEY = "harthelm_selfcheck_v1";
  var BRAND = "HARTHELM｜家舵";

  var STATUS_OPTS = [
    { v: "have", t: "有（仍有效）" },
    { v: "none", t: "无 / 尚未取得" },
    { v: "expired", t: "已过期或失效" },
    { v: "na", t: "不适用" }
  ];

  var HK_COMPANY = [
    { code: "C-BR-01", name: "商业登记证 BR", required: true, critical: true },
    { code: "C-CI-01", name: "公司注册证明书", required: true, critical: true },
    { code: "C-AA-01", name: "公司章程 / 法团成立表格", required: true, critical: false },
    { code: "C-DIR-01", name: "董事股东名册", required: true, critical: false },
    { code: "C-BANK-01", name: "公司银行账户证明（建议掩码）", required: true, critical: false },
    { code: "C-OFF-01", name: "办公 / 共享办公 / 租约相关证明", required: false, critical: false },
    { code: "C-EMP-01", name: "雇工相关（合约等）", required: false, critical: false },
    { code: "C-AUDIT-01", name: "审计 / 报税节点证明或进度", required: false, critical: false },
    { code: "C-TRADE-01", name: "贸易 / 业务单据样本（如适用）", required: false, critical: false },
    { code: "C-LEASE-01", name: "租约及厘印（如适用）", required: false, critical: false },
    { code: "C-SEC-01", name: "公司秘书往来记录索引", required: false, critical: false }
  ];

  var SG_COMPANY = [
    { code: "C-SG-ACRA-01", name: "ACRA 商业登记相关证明", required: true, critical: true },
    { code: "C-SG-EMP-01", name: "雇主说明 / 职位相关文件", required: true, critical: false },
    { code: "C-SG-FIN-01", name: "雇主财务或运营证明（按个案）", required: false, critical: false },
    { code: "C-BANK-01", name: "公司银行证明（掩码后，如适用）", required: false, critical: false },
    { code: "C-SG-OTHER", name: "其他雇主侧要求项", required: false, critical: false }
  ];

  var TYPES = {
    ttps: {
      id: "ttps",
      title: "高才通 TTPS",
      blurb: "香港顶尖人才通行证 · 申请或续签资料自检",
      entries: [
        {
          key: "path",
          label: "当前阶段",
          options: [
            { v: "hold", t: "已持有，关注续签准备" },
            { v: "apply", t: "计划首次申请" },
            { v: "learn", t: "仅了解" }
          ]
        },
        {
          key: "cat",
          label: "高才通类别（如知）",
          options: [
            { v: "A", t: "A 类" },
            { v: "B", t: "B 类" },
            { v: "C", t: "C 类" },
            { v: "unk", t: "暂不清楚" }
          ]
        },
        {
          key: "first",
          label: "是否已完成赴港首次入境并取得入境标签",
          hint: "只核首次入境标签（入境标签），不要求「最近一次入境标签」。",
          options: [
            { v: "yes", t: "是" },
            { v: "no", t: "否" },
            { v: "na", t: "不适用（尚未获批/入境）" }
          ]
        },
        {
          key: "surv",
          label: "人才办「专属问卷」确认通知书",
          hint: "续签网上递交前，官网要求先完成人才办问卷并保存确认通知书（以官网为准）。",
          options: [
            { v: "have", t: "已有确认通知书" },
            { v: "know", t: "知悉但尚未完成" },
            { v: "unk", t: "不了解" }
          ]
        },
        {
          key: "co",
          label: "是否已有 / 计划设立香港公司",
          options: [
            { v: "yes", t: "是" },
            { v: "no", t: "否" },
            { v: "unk", t: "不确定" }
          ]
        },
        {
          key: "dep",
          label: "是否有受养人一并规划",
          options: [
            { v: "yes", t: "是" },
            { v: "no", t: "否" }
          ]
        }
      ],
      personal: function (ans) {
        var renew = ans.path === "hold";
        var firstYes = ans.first === "yes";
        var items = [
          { code: "P-ID-01", name: "护照个人资料页", required: false, critical: false, hint: "选检；有则建议备妥且在有效期内" },
          { code: "P-ID-02", name: "香港身份证（如有）", required: false, critical: false },
          { code: "P-ID-03", name: "现签证 / e-Visa 页", required: renew, critical: renew, hint: renew ? "已持有场景必检" : "获批后请备妥" },
          { code: "P-ID-04", name: "近照（规格以官网为准）", required: true, critical: false },
          { code: "P-ID-05", name: "往来港澳通行证", required: true, critical: true, validityCover: true, hint: "默认为必检；有效期须覆盖后续逗留或批核的最长期限", shortHint: "有效期不足以覆盖后续逗留或批核的最长期限，建议尽快更新港澳通行证。", expiredHint: "已过期或失效，建议尽快更新港澳通行证。" },
          { code: "P-ID-06", name: "内地居民身份证", required: false, critical: false },
          { code: "P-TRAV-01", name: "入境标签（首次入境）", required: renew && firstYes, critical: false, hint: "只核首次入境那张；遗失须申请补发" },
          { code: "P-EDU-01", name: "学历证明", required: false, critical: false },
          { code: "P-ADDR-01", name: "住址证明", required: false, critical: false },
          { code: "P-EMP-01", name: "雇佣 / 自雇说明相关文件", required: false, critical: false },
          { code: "P-TAX-01", name: "税务相关证明（如需要）", required: false, critical: false },
          { code: "P-INTEG-01", name: "本地融入凭证（商会/展会/社团等）", required: false, critical: false },
          { code: "P-PLAN-01", name: "商业计划书 / 续签方案书", required: false, critical: false },
          { code: "P-PLAN-02", name: "合理解释信（签署件）", required: false, critical: false },
          { code: "P-SURV-01", name: "人才办专属问卷确认通知书", required: renew, critical: renew, hint: "续签场景优先核对；申请阶段可先了解" },
          { code: "P-OTHER", name: "其他入境处要求项", required: false, critical: false }
        ];
        if (ans.dep === "yes") {
          items.push({ code: "P-DEP-01", name: "受养人资料", required: true, critical: false });
        }
        return items;
      },
      company: function (ans) {
        return ans.co === "yes" ? HK_COMPANY.slice() : [];
      },
      extraGaps: function (ans) {
        var gaps = [];
        if (ans.path === "hold" && ans.surv !== "have") {
          gaps.push({
            name: "人才办专属问卷确认通知书",
            reason: "网上递交前，请按人才办要求完成专属问卷并保存确认通知书（以官网为准）。",
            priority: true,
            expired: false
          });
        }
        return gaps;
      }
    },
    qmas: {
      id: "qmas",
      title: "优才 QMAS",
      blurb: "香港优秀人才入境计划 · 申请或续签资料自检",
      entries: [
        {
          key: "stage",
          label: "优才进度",
          options: [
            { v: "prep", t: "准备递交" },
            { v: "prin", t: "已获原则性批准" },
            { v: "formal", t: "已获正式批准逗留" },
            { v: "renew", t: "续签阶段" },
            { v: "unk", t: "暂不清楚" }
          ]
        },
        {
          key: "mode",
          label: "计分制 / 成就优才（如知）",
          options: [
            { v: "points", t: "计分制" },
            { v: "achieve", t: "成就优才" },
            { v: "unk", t: "暂不清楚" }
          ]
        },
        {
          key: "co",
          label: "是否已有 / 计划设立香港公司",
          options: [
            { v: "yes", t: "是" },
            { v: "no", t: "否" },
            { v: "unk", t: "不确定" }
          ]
        },
        {
          key: "dep",
          label: "是否有受养人一并规划",
          options: [
            { v: "yes", t: "是" },
            { v: "no", t: "否" }
          ]
        }
      ],
      personal: function (ans) {
        var applyLike = ans.stage === "prep" || ans.stage === "unk" || ans.stage === "prin";
        var holdLike = ans.stage === "formal" || ans.stage === "renew";
        var items = [
          { code: "P-ID-01", name: "护照个人资料页", required: false, critical: false, hint: "选检；有则建议备妥且在有效期内" },
          { code: "P-ID-03", name: "现签证 / e-Visa / 批准文件", required: holdLike, critical: holdLike },
          { code: "P-ID-04", name: "近照", required: true, critical: false },
          { code: "P-ID-05", name: "往来港澳通行证", required: true, critical: true, validityCover: true, hint: "默认为必检；有效期须覆盖后续逗留或批核的最长期限", shortHint: "有效期不足以覆盖后续逗留或批核的最长期限，建议尽快更新港澳通行证。", expiredHint: "已过期或失效，建议尽快更新港澳通行证。" },
          { code: "P-ID-06", name: "内地居民身份证", required: false, critical: false },
          { code: "P-EDU-01", name: "学历及认证相关证明", required: applyLike, critical: applyLike },
          { code: "P-EMP-01", name: "工作履历与证明文件", required: applyLike, critical: false },
          { code: "P-PLAN-01", name: "赴港计划 / 业务计划相关", required: false, critical: false },
          { code: "P-ADDR-01", name: "住址证明", required: false, critical: false },
          { code: "P-TRAV-01", name: "入境标签（首次入境）", required: holdLike, critical: false, hint: "已入境后只核首次入境标签" },
          { code: "P-INTEG-01", name: "在港活动 / 融入类证明", required: false, critical: false },
          { code: "P-OTHER", name: "其他入境处要求项", required: false, critical: false }
        ];
        if (ans.dep === "yes") {
          items.push({ code: "P-DEP-01", name: "受养人资料", required: true, critical: false });
        }
        return items;
      },
      company: function (ans) {
        return ans.co === "yes" ? HK_COMPANY.slice() : [];
      },
      extraGaps: function () { return []; }
    },
    ep: {
      id: "ep",
      title: "新加坡 EP",
      blurb: "Employment Pass · 申请或续签/更新资料自检",
      entries: [
        {
          key: "role",
          label: "身份角色",
          options: [
            { v: "holder", t: "准证持有人" },
            { v: "employer", t: "雇主方经办" },
            { v: "learn", t: "仅了解" }
          ]
        },
        {
          key: "spath",
          label: "阶段",
          options: [
            { v: "apply", t: "计划申请" },
            { v: "hold", t: "已持有 EP" },
            { v: "renew", t: "续签或更新" },
            { v: "unk", t: "暂不清楚" }
          ]
        },
        {
          key: "sco",
          label: "是否已有新加坡雇佣实体 / 赞助雇主",
          options: [
            { v: "yes", t: "是" },
            { v: "no", t: "否" },
            { v: "unk", t: "不确定" }
          ]
        },
        {
          key: "dep",
          label: "是否有家属准证一并规划",
          options: [
            { v: "yes", t: "是" },
            { v: "no", t: "否" }
          ]
        }
      ],
      personal: function (ans) {
        var applyLike = ans.spath === "apply" || ans.spath === "unk";
        var holdLike = ans.spath === "hold" || ans.spath === "renew";
        var items = [
          { code: "P-ID-01", name: "护照个人资料页", required: false, critical: false, hint: "选检；有则建议备妥且在有效期内" },
          { code: "P-SG-EP-01", name: "现有 EP / IPA / 准证相关文件", required: holdLike, critical: holdLike },
          { code: "P-ID-04", name: "近照（规格按 MOM/官网）", required: applyLike || holdLike, critical: false },
          { code: "P-EDU-01", name: "学历证明", required: applyLike, critical: false },
          { code: "P-EMP-01", name: "简历与雇佣相关说明", required: true, critical: false },
          { code: "P-SG-SAL-01", name: "薪金 / 聘书优先页（只问有无，请勿填写金额）", required: applyLike, critical: applyLike },
          { code: "P-OTHER", name: "其他 MOM 要求项", required: false, critical: false }
        ];
        if (ans.dep === "yes") {
          items.push({ code: "P-DEP-01", name: "家属准证规划资料", required: true, critical: false });
        }
        return items;
      },
      company: function (ans) {
        return ans.sco === "yes" ? SG_COMPANY.slice() : [];
      },
      extraGaps: function () { return []; }
    }
  };

  var state = {
    type: null,
    answers: {},
    statuses: {},
    expiry: "",
    saveLocal: false
  };

  function $(id) { return document.getElementById(id); }

  function loadSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (data && typeof data === "object") {
        state.type = data.type || null;
        state.answers = data.answers || {};
        state.statuses = data.statuses || {};
        state.expiry = data.expiry || "";
        state.saveLocal = !!data.saveLocal;
      }
    } catch (e) { /* ignore */ }
  }

  function persist() {
    if (!state.saveLocal) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        type: state.type,
        answers: state.answers,
        statuses: state.statuses,
        expiry: state.expiry,
        saveLocal: true
      }));
    } catch (e) { /* ignore */ }
  }

  function clearLocal() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    state = { type: null, answers: {}, statuses: {}, expiry: "", saveLocal: false };
    $("saveLocal").checked = false;
    renderHome();
  }

  function daysUntil(dateStr) {
    if (!dateStr) return null;
    var parts = dateStr.split("-");
    if (parts.length !== 3) return null;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(d.getTime())) return null;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((d - today) / 86400000);
  }

  function renderHome() {
    $("step-home").classList.remove("hidden");
    $("step-form").classList.add("hidden");
    $("step-result").classList.add("hidden");
    document.querySelectorAll(".entry-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-type") === state.type);
    });
  }

  function chipGroup(options, selected, onPick) {
    var wrap = document.createElement("div");
    wrap.className = "choices";
    options.forEach(function (opt) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (selected === opt.v ? " selected" : "");
      b.textContent = opt.t;
      b.addEventListener("click", function () { onPick(opt.v); });
      wrap.appendChild(b);
    });
    return wrap;
  }

  function currentType() {
    return state.type ? TYPES[state.type] : null;
  }

  function renderForm() {
    var t = currentType();
    if (!t) return;
    $("step-home").classList.add("hidden");
    $("step-form").classList.remove("hidden");
    $("step-result").classList.add("hidden");
    $("form-title").textContent = t.title + " · 资料自检";
    $("form-blurb").textContent = t.blurb;

    var entryBox = $("entry-fields");
    entryBox.innerHTML = "";
    t.entries.forEach(function (field) {
      var div = document.createElement("div");
      div.className = "field";
      var lab = document.createElement("label");
      lab.innerHTML = field.label + (field.hint ? '<div class="hint">' + field.hint + "</div>" : "");
      div.appendChild(lab);
      div.appendChild(chipGroup(field.options, state.answers[field.key], function (v) {
        state.answers[field.key] = v;
        persist();
        renderForm();
      }));
      entryBox.appendChild(div);
    });

    // expiry
    var expBox = $("expiry-fields");
    expBox.innerHTML = "";
    var expField = document.createElement("div");
    expField.className = "field";
    expField.innerHTML = '<label>现签证或准证到期日<span class="hint">（可选，仅本机提示距今天数，不作官方窗口承诺）</span></label>';
    var row = document.createElement("div");
    row.className = "exp-row";
    var inp = document.createElement("input");
    inp.type = "date";
    inp.value = state.expiry || "";
    inp.addEventListener("change", function () {
      state.expiry = inp.value;
      persist();
      var n = daysUntil(state.expiry);
      tip.textContent = n === null ? "" : (n >= 0 ? ("距今约 " + n + " 天") : ("已过期约 " + Math.abs(n) + " 天"));
    });
    var tip = document.createElement("span");
    tip.className = "toolbar-note";
    var n0 = daysUntil(state.expiry);
    tip.textContent = n0 === null ? "" : (n0 >= 0 ? ("距今约 " + n0 + " 天") : ("已过期约 " + Math.abs(n0) + " 天"));
    row.appendChild(inp);
    row.appendChild(tip);
    expField.appendChild(row);
    expBox.appendChild(expField);

    var personal = t.personal(state.answers);
    var company = t.company(state.answers);
    renderItemList($("personal-list"), personal, "个人资料");
    var coCard = $("company-card");
    if (company.length) {
      coCard.classList.remove("hidden");
      renderItemList($("company-list"), company, "公司 / 雇主资料");
    } else {
      coCard.classList.add("hidden");
      $("company-list").innerHTML = "";
    }
  }

  function statusOptsFor(item) {
    var opts = STATUS_OPTS.slice();
    if (item.validityCover) {
      opts = opts.concat([
        { v: "short", t: "有，但有效期不足以覆盖后续逗留/批核最长期限" }
      ]);
    }
    return opts;
  }

  function renderItemList(container, items) {
    container.innerHTML = "";
    items.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "item-row";
      var left = document.createElement("div");
      var tags = "";
      if (item.required) tags += '<span class="tag req">必检</span>';
      else tags += '<span class="tag">选检</span>';
      if (item.critical) tags += '<span class="tag crit">优先</span>';
      left.innerHTML = '<div class="item-name">' + item.name + "</div>" +
        '<div class="item-meta">' + tags + (item.hint ? " · " + item.hint : "") + "</div>";
      var sel = document.createElement("select");
      sel.className = "select-status";
      var opts = statusOptsFor(item);
      sel.innerHTML = '<option value="">请选择</option>' +
        opts.map(function (o) {
          return '<option value="' + o.v + '">' + o.t + "</option>";
        }).join("");
      sel.value = state.statuses[item.code] || "";
      sel.addEventListener("change", function () {
        if (sel.value) state.statuses[item.code] = sel.value;
        else delete state.statuses[item.code];
        persist();
      });
      row.appendChild(left);
      row.appendChild(sel);
      container.appendChild(row);
    });
  }

  function evaluate() {
    var t = currentType();
    if (!t) return null;
    var personal = t.personal(state.answers);
    var company = t.company(state.answers);
    var all = personal.concat(company);

    var priority = [];
    var optional = [];
    var requiredTotal = 0;
    var requiredHave = 0;
    var requiredGaps = 0;
    var criticalGaps = 0;

    all.forEach(function (item) {
      var st = state.statuses[item.code] || "";
      if (item.required) {
        requiredTotal += 1;
        if (st === "have") requiredHave += 1;
        else if (st === "na") {
          /* required but marked na: treat as not a gap for tier, skip */
          requiredTotal -= 1;
        } else {
          requiredGaps += 1;
          var reason;
          if (st === "short") {
            reason = item.shortHint || "有效期不足以覆盖后续逗留或批核的最长期限，建议尽快更新。";
          } else if (st === "expired") {
            reason = item.expiredHint || "已过期或失效，建议更新。";
          } else if (st === "none") {
            reason = "尚未取得。";
          } else {
            reason = "尚未确认（未作答）。";
          }
          var gap = {
            name: item.name,
            reason: reason,
            priority: true,
            expired: st === "expired" || st === "short",
            critical: !!item.critical
          };
          priority.push(gap);
          if (item.critical && st !== "na") criticalGaps += 1;
        }
      } else {
        if (st === "none" || st === "expired" || st === "short") {
          var oReason;
          if (st === "short") oReason = item.shortHint || "有效期不足，可按情况更新。";
          else if (st === "expired") oReason = item.expiredHint || "已过期或失效，可按情况更新。";
          else oReason = "尚未取得，可按情况补充。";
          optional.push({
            name: item.name,
            reason: oReason,
            priority: false,
            expired: st === "expired" || st === "short",
            critical: false
          });
        }
      }
    });

    var extras = t.extraGaps(state.answers) || [];
    // Avoid duplicate P-SURV if already in priority by code status
    extras.forEach(function (g) {
      var dup = priority.some(function (p) { return p.name === g.name; });
      if (!dup) {
        priority.push(g);
        requiredGaps += 1;
      }
    });

    var tier;
    if (requiredTotal === 0 || requiredHave === 0 && requiredGaps >= Math.max(requiredTotal, 1)) {
      // almost nothing filled as have
      if (requiredHave === 0 && (requiredGaps > 0 || Object.keys(state.statuses).length === 0)) {
        tier = "R4";
      } else {
        tier = "R1";
      }
    }

    if (!tier) {
      if (requiredGaps === 0) tier = "R1";
      else if (requiredGaps >= 4 || criticalGaps >= 2) tier = "R3";
      else tier = "R2";
    }
    // refine R4: if user answered some have
    if (tier === "R4" && requiredHave > 0 && requiredGaps === 0) tier = "R1";
    if (tier === "R4" && requiredHave > 0 && requiredGaps > 0 && requiredGaps < 4 && criticalGaps < 2) tier = "R2";
    if (tier === "R4" && requiredHave > 0 && (requiredGaps >= 4 || criticalGaps >= 2)) tier = "R3";

    var copy = {
      R1: {
        title: "基础材料较齐",
        body: "就自测勾选结果看，基础必检材料已较齐。正式递交前仍须对照当日官网清单与顾问核对原件规格，本结果不代表可递交或可获批。"
      },
      R2: {
        title: "仍有若干缺口",
        body: "仍有若干必检材料待补齐或更新。建议按下方缺失清单逐项准备；补齐后可再跑一次自测。本结果仅为准备度参考。"
      },
      R3: {
        title: "优先材料缺口较多",
        body: "身份或公司优先材料缺口较多。建议先集中补齐清单中的优先项，再考虑时间表与顾问沟通。本工具不评估获批可能。"
      },
      R4: {
        title: "尚未开始准备",
        body: "目前多数字段尚未确认或仍为「无」。可先从往来港澳通行证等必检身份文件与公司登记证明等基础项开始收集（护照为选检）。"
      }
    };

    return {
      tier: tier,
      copy: copy[tier],
      priority: priority,
      optional: optional,
      typeTitle: t.title,
      days: daysUntil(state.expiry)
    };
  }

  function renderResult() {
    var res = evaluate();
    if (!res) return;
    $("step-home").classList.add("hidden");
    $("step-form").classList.add("hidden");
    $("step-result").classList.remove("hidden");

    var tierEl = $("result-tier");
    var tierClass = {R1:"tier-ready", R2:"tier-gaps", R3:"tier-priority", R4:"tier-start"}[res.tier] || "tier-gaps";
    tierEl.className = "result-tier " + tierClass;
    tierEl.innerHTML = "<h3>" + res.copy.title + "</h3><p>" + res.copy.body + "</p>";

    var meta = $("result-meta");
    var bits = ["身份入口：" + res.typeTitle];
    if (res.days !== null) {
      bits.push(res.days >= 0 ? ("距填写的到期日约 " + res.days + " 天（仅参考）") : ("填写的到期日已过约 " + Math.abs(res.days) + " 天（仅参考）"));
    }
    meta.textContent = bits.join(" · ");

    var pri = $("miss-priority");
    var opt = $("miss-optional");
    pri.innerHTML = "";
    opt.innerHTML = "";
    if (!res.priority.length) {
      pri.innerHTML = "<li>必检项暂无缺失（仍须以官网为准）。</li>";
    } else {
      res.priority.forEach(function (g) {
        var li = document.createElement("li");
        if (g.expired) li.className = "expired";
        li.textContent = g.name + "：" + g.reason;
        pri.appendChild(li);
      });
    }
    if (!res.optional.length) {
      opt.innerHTML = "<li>无额外选检缺口，或未勾选选检项。</li>";
    } else {
      res.optional.forEach(function (g) {
        var li = document.createElement("li");
        if (g.expired) li.className = "expired";
        li.textContent = g.name + "：" + g.reason;
        opt.appendChild(li);
      });
    }
  }

  function entriesReady() {
    var t = currentType();
    if (!t) return false;
    return t.entries.every(function (f) { return !!state.answers[f.key]; });
  }

  function bind() {
    document.querySelectorAll(".entry-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.type = btn.getAttribute("data-type");
        state.answers = {};
        state.statuses = {};
        persist();
        renderForm();
      });
    });
    $("btn-back-home").addEventListener("click", function () {
      renderHome();
    });
    $("btn-eval").addEventListener("click", function () {
      if (!entriesReady()) {
        alert("请先完成全部入口问题，再生成结果。");
        return;
      }
      persist();
      renderResult();
      window.scrollTo(0, 0);
    });
    $("btn-back-form").addEventListener("click", function () {
      renderForm();
    });
    $("btn-clear").addEventListener("click", function () {
      if (confirm("确定清除本机已保存的答卷与勾选？")) clearLocal();
    });
    $("saveLocal").addEventListener("change", function () {
      state.saveLocal = $("saveLocal").checked;
      if (state.saveLocal) persist();
      else {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      }
    });
  }

  loadSaved();
  bind();
  $("saveLocal").checked = !!state.saveLocal;
  if (state.type && TYPES[state.type]) renderForm();
  else renderHome();
})();
