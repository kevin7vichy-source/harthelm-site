/** Single place for the service name. It may still change. */
export const RENEWAL_DIAGNOSIS_LABEL = {
  hant: "續簽風險診斷",
  hans: "续签风险诊断",
  en: "Extension-of-stay risk review",
};

export const PHONE_DISPLAY = "+852 5261 2799";
export const PHONE_WA = "85252612799";
export const ADDRESS = {
  hant: "香港九龍旺角彌敦道 721-725 號比利時銀行大廈 14 樓 1405B 室",
  hans: "香港九龙旺角弥敦道 721-725 号比利时银行大厦 14 楼 1405B 室",
  en: "香港九龍旺角彌敦道 721-725 號比利時銀行大廈 14 樓 1405B 室",
};

function row(hant, hans, en) {
  if (!hant || !hans || !en) {
    throw new Error("Empty translation: " + JSON.stringify({ hant, hans, en }));
  }
  return { hant, hans, en };
}

export const STR = {
  "nav.about": row("關於我們", "关于我们", "About"),
  "nav.services": row("服務", "服务", "Services"),
  "nav.insights": row("資訊", "资讯", "Briefings"),
  "nav.cases": row("案例", "案例", "Cases"),
  "nav.asmtp": row("專才", "专才", "ASMTP"),
  "nav.iang": row("IANG", "IANG", "IANG"),
  "nav.legal": row("法律聲明", "法律声明", "Legal"),
  "nav.menu": row("開啟選單", "打开菜单", "Open menu"),
  "nav.primary": row("主要導覽", "主导航", "Primary"),
  "lang.group": row("語言", "语言", "Language"),
  "meta.home.title": row(
    "HARTHELM｜為家掌舵 · 為業遠行",
    "HARTHELM｜为家掌舵 · 为业远行",
    "HARTHELM | Where Family Finds Its Direction"
  ),
  "meta.home.desc": row(
    "HARTHELM 立足香港與新加坡，提供續簽風險診斷、企業落地與合規運營。不構成獲批承諾。",
    "HARTHELM 立足香港与新加坡，提供续签风险诊断、企业落地与合规运营。不构成获批承诺。",
    "HARTHELM, in Hong Kong and Singapore: extension-of-stay risk review, company landing, and compliance operations. No approval is promised."
  ),
  "hero.eyebrow": row(
    "Hong Kong & Singapore · Corporate & Talent Services",
    "Hong Kong & Singapore · Corporate & Talent Services",
    "Hong Kong & Singapore · Corporate & Talent Services"
  ),
  "hero.l1": row("為家掌舵", "为家掌舵", "Set the family’s course"),
  "hero.l2": row("為業遠行", "为业远行", "Take the work further"),
  "hero.lead": row(
    "立足香港與新加坡，專注身份續簽、企業落地與實體運營。我們以管家式服務與矽谷級數字底座，為高才、優才及 IANG 人士提供全週期合規護航。",
    "立足香港与新加坡，专注身份续签、企业落地与实体运营。我们以管家式服务与硅谷级数字底座，为高才、优才及 IANG 人士提供全周期合规护航。",
    "Based in Hong Kong and Singapore, we focus on stay extensions, company landing, and real operations. With steward-style service and a digital operating base, we support people under the Top Talent Pass, Quality Migrant Admission, and IANG arrangements across the cycle, on a compliance footing."
  ),
  "hero.ctaTech": row("探索數字化管家服務", "探索数字化管家服务", "Explore the digital steward tools"),
  "hero.ctaDx": row("預約續簽診斷", "预约续签诊断", "Book the risk review"),
  "trust.years": row("13 年", "13 年", "13 years"),
  "trust.yearsLabel": row("香港行業深耕", "香港行业深耕", "Working in the Hong Kong industry"),
  "trust.seats": row("200+", "200+", "200+"),
  "trust.seatsLabel": row("香港實體工位", "香港实体工位", "Physical workstations in Hong Kong"),
  "trust.cases": row(
    "累計接觸與服務個案 1000 餘個（不以獲批計）",
    "累计接触与服务个案 1000 余个（不以获批计）",
    "More than 1,000 cases we have come into contact with or served (not counted by approvals)"
  ),
  "life.kicker": row("SERVICES", "SERVICES", "SERVICES"),
  "life.title": row("全週期服務 · 長期價值輸出", "全周期服务 · 长期价值输出", "A full cycle, not a one-off"),
  "life.intro": row(
    "身份規劃不是一錘子買賣，而是長達 7 年的穩健陪伴與合規留痕。",
    "身份规划不是一锤子买卖，而是长达 7 年的稳健陪伴与合规留痕。",
    "Status planning is not a one-off sale. It is steady company, and a compliance record, over a stretch that can last seven years."
  ),
  "life.s1b": row(
    "梳理背景優勢，明確高才／優才／IANG 的申請或自僱／受僱續簽路徑，排查潛在風險盲區。",
    "梳理背景优势，明确高才／优才／IANG 的申请或自雇／受雇续签路径，排查潜在风险盲区。",
    "We sort the strengths in a background, set out application or employed / self-employed extension paths under the Top Talent Pass, Quality Migrant Admission, and IANG, and look for blind spots."
  ),
  "life.s2": row("實體落地與打厘印", "实体落地与打厘印", "A real office, and stamp duty on the lease"),
  "life.s2b": row(
    "協助註冊香港公司，租賃真實可核驗的實體辦公室（HKD 2,500／月起），簽署正式租約並加蓋印花稅（厘印）。",
    "协助注册香港公司，租赁真实可核验的实体办公室（HKD 2,500／月起），签署正式租约并加盖印花税（厘印）。",
    "Help to incorporate a Hong Kong company, lease a real office that can be checked (from HKD 2,500 a month), sign a formal tenancy, and stamp it."
  ),
  "life.s3": row("合規運營與留痕", "合规运营与留痕", "Operations, with a record"),
  "life.s3b": row(
    "建立強積金（MPF）、薪資派發、真實業務合同及法定審計底稿，供入境處核查實質經營時對照。",
    "建立强积金（MPF）、薪资派发、真实业务合同及法定审计底稿，供入境处核查实质经营时对照。",
    "Set up MPF, payroll, real commercial contracts, and statutory audit papers, so there is a record if Immigration looks at whether the business has substance."
  ),
  "life.s4": row("續簽節點與永居規劃", "续签节点与永居规划", "Extension dates, and right of abode"),
  "life.s4b": row(
    "在 T-90／T-60 關鍵時間節點進行專屬提醒與材料逐項覆核，穩步邁向 7 年轉永居。",
    "在 T-90／T-60 关键时间节点进行专属提醒与材料逐项复核，稳步迈向 7 年转永居。",
    "Reminders and a line-by-line check of papers at the T-90 and T-60 marks, toward the seven-year route to right of abode."
  ),
  "life.caveat": row(
    "是否符合入境處或人力部的要求，由當局判斷。永久居民身份須符合當時法例。以上是服務範圍，不構成任何結果承諾。",
    "是否符合入境处或人力部的要求，由当局判断。永久居民身份须符合当时法例。以上是服务范围，不构成任何结果承诺。",
    "Whether papers meet Immigration or MOM requirements is for those authorities to decide. Right of abode depends on the law then in force. The list above is a scope of work, not a promise of any result."
  ),
  "tech.kicker": row("TECHNOLOGY & TOOLS", "TECHNOLOGY & TOOLS", "TECHNOLOGY & TOOLS"),
  "tech.title": row(
    "矽谷級數字底座，傳統管家的科技武裝",
    "硅谷级数字底座，传统管家的科技武装",
    "A digital base for a traditional steward service"
  ),
  "tech.intro": row(
    "我們摒棄了傳統機構的混亂郵件與紙本記錄，自主研發了全鏈路數字化運營與合規交付系統。",
    "我们摒弃了传统机构的混乱邮件与纸本记录，自主研发了全链路数字化运营与合规交付系统。",
    "In place of scattered email and paper files, we built our own system for operations and compliance delivery."
  ),
  "tech.1t": row("加密客戶專屬看板", "加密客户专属看板", "An encrypted client board"),
  "tech.1b": row(
    "客戶憑專屬密碼即可實時查閱辦理進度與倒計時。資料在瀏覽器本地完成 PBKDF2 60 萬次迭代 + AES-256-GCM 解密。",
    "客户凭专属密码即可实时查阅办理进度与倒计时。资料在浏览器本地完成 PBKDF2 60 万次迭代 + AES-256-GCM 解密。",
    "With a client password, progress and the countdown can be read live. Decryption runs in the browser: PBKDF2 with 600,000 iterations, and AES-256-GCM."
  ),
  "tech.1m": row("> End-to-End Encrypted", "> End-to-End Encrypted", "> End-to-End Encrypted"),
  "tech.2t": row("雲端財務審計底稿", "云端财务审计底稿", "Audit working papers in the cloud"),
  "tech.2b": row(
    "自研 SME-FRS 多幣種四表聯動系統，自動匹配匯豐（HSBC）週一定盤匯率與暫記配平門禁，一鍵生成符合香港審計標準的財務底稿。",
    "自研 SME-FRS 多币种四表联动系统，自动匹配汇丰（HSBC）周一定盘汇率与暂记配平门禁，一键生成符合香港审计标准的财务底稿。",
    "Our SME-FRS tool ties the four statements across currencies, matches HSBC’s Monday fixing, and blocks a close that does not balance, so a Hong Kong audit file can be produced in one pass."
  ),
  "tech.2m": row("> Real-time Ledger & Audit", "> Real-time Ledger & Audit", "> Real-time Ledger & Audit"),
  "tech.3t": row("AI 數字專員協同矩陣", "AI 数字专员协同矩阵", "A set of AI desk roles"),
  "tech.3b": row(
    "12 大專業崗位的 AI 數字專員（法務合規、財稅核對、案卷歸檔等）無縫協同，配合人類專家顧問，提供高標準的節點提醒與品質把關。",
    "12 大专业岗位的 AI 数字专员（法务合规、财税核对、案卷归档等）无缝协同，配合人类专家顾问，提供高标准的节点提醒与品质把关。",
    "Twelve AI desk roles (compliance, tax checks, file archive, and others) work with human advisers on date reminders and review."
  ),
  "tech.3m": row("> AI Multi-Agent System", "> AI Multi-Agent System", "> AI Multi-Agent System"),
  "scene.title": row("管家式交付，源於專業與細節", "管家式交付，源于专业与细节", "Steward-style delivery, in the detail"),
  "scene.intro": row(
    "以下為服務場景的脫敏描述，不是具名客戶案例，每一個環節均按我們公開的服務範圍來寫。",
    "以下为服务场景的脱敏描述，不是具名客户案例，每一个环节均按我们公开的服务范围来写。",
    "The notes below are desensitised service scenes, not named client cases. They follow the scope we already publish."
  ),
  "scene.more": row("查看脫敏案例", "查看脱敏案例", "Read the desensitised cases"),
  "scene.legacy": row("服務場景說明（既有頁）", "服务场景说明（既有页）", "Service scenes (existing page)"),
  "scene.a.tag": row("場景 A", "场景 A", "Scene A"),
  "scene.a.title": row("高才通自僱續簽規劃", "高才通自雇续签规划", "Top Talent Pass, self-employed extension"),
  "scene.a.timeLabel": row("籌備週期", "筹备周期", "Preparation window"),
  "scene.a.time": row("3–6 個月", "3–6 个月", "3–6 months"),
  "scene.a.body": row(
    "客戶背景：在港暫無僱主，具備資金實力與真實業務構想，面臨首次續簽材料籌備壓力。",
    "客户背景：在港暂无雇主，具备资金实力与真实业务构想，面临首次续签材料筹备压力。",
    "Setting: no employer in Hong Kong yet, funds and a real business plan, and pressure to prepare papers for a first extension."
  ),
  "scene.a.out": row(
    "管家交付：協助完成香港公司註冊、真實辦公場地租賃及租約打厘印；深度梳理真實運營流水與業務單據；專屬加密看板實時同步材料進度。",
    "管家交付：协助完成香港公司注册、真实办公场地租赁及租约打厘印；深度梳理真实运营流水与业务单据；专属加密看板实时同步材料进度。",
    "What we deliver: Hong Kong incorporation, a real office lease and stamping, a close read of real operating records, and progress on the encrypted board."
  ),
  "scene.b.tag": row("場景 B", "场景 B", "Scene B"),
  "scene.b.title": row("IANG 畢業生留港銜接", "IANG 毕业生留港衔接", "IANG, after graduation"),
  "scene.b.time": row("1–2 個月", "1–2 个月", "1–2 months"),
  "scene.b.body": row(
    "客戶背景：應屆畢業生，暫未匹配到合適僱主，面臨簽證到期後的空窗期風險。",
    "客户背景：应届毕业生，暂未匹配到合适雇主，面临签证到期后的空窗期风险。",
    "Setting: a fresh graduate, no suitable employer yet, and a gap risk when the current permission ends."
  ),
  "scene.b.out": row(
    "管家交付：針對空窗期提供備用公司架構與實質運營支持；協助對接本地合規財稅服務。逗留是否可以銜接，由入境處決定。",
    "管家交付：针对空窗期提供备用公司架构与实质运营支持；协助对接本地合规财税服务。逗留是否可以衔接，由入境处决定。",
    "What we deliver: a backup company structure and real operating support for the gap, plus local accounting. Whether stay can continue is for Immigration to decide."
  ),
  "dx.paid.rest": row(" + 方案書", " + 方案书", " — written note"),
  "dx.kicker": row("DIAGNOSIS & SELF-CHECK", "DIAGNOSIS & SELF-CHECK", "DIAGNOSIS & SELF-CHECK"),
  "dx.title": row("明確您的續簽合規路徑", "明确您的续签合规路径", "See the compliance path in front of you"),
  "dx.intro": row(
    "無論您處於初步規劃還是臨近遞交，我們提供清晰的評估工具與專家診斷方案。",
    "无论您处于初步规划还是临近递交，我们提供清晰的评估工具与专家诊断方案。",
    "Whether you are early in planning or close to filing, there is a public self-check and a paid review."
  ),
  "dx.paid.badge": row("1 對 1 專家深度把關", "1 对 1 专家深度把关", "One-to-one review"),
  "dx.paid.note": row("（簽約後續服務全額抵扣）", "（签约后续服务全额抵扣）", "(credited in full against a later signed engagement)"),
  "dx.i1": row("個人背景與在港聯繫深度評估", "个人背景与在港联系深度评估", "A read of the personal background and ties to Hong Kong"),
  "dx.i2": row("受僱／自僱創業續簽路徑比選與規劃", "受雇／自雇创业续签路径比选与规划", "A comparison of employed and self-employed extension paths"),
  "dx.i3": row("現有材料清單逐項核對與缺口分析", "现有材料清单逐项核对与缺口分析", "A line-by-line check of papers already in hand, and the gaps"),
  "dx.i4": row("潛在拒批或補件風險點與時間表", "潜在拒批或补件风险点与时间表", "Points that may draw a refusal or a request for more documents, and a timetable"),
  "dx.paid.cta": row("WhatsApp 預約診斷服務", "WhatsApp 预约诊断服务", "Book the review on WhatsApp"),
  "dx.free.badge": row("公開自助工具", "公开自助工具", "Public tool"),
  "dx.free.title": row("在線續簽準備度自測", "在线续签准备度自测", "Online readiness self-check"),
  "dx.free.price": row("免費", "免费", "Free"),
  "dx.free.note": row("（數分鐘，不評分）", "（数分钟，不评分）", "(a few minutes, no score)"),
  "dx.f1": row(
    "現有工具涵蓋高才通、優才及新加坡 EP。IANG 與專才不在這個自測入口內。",
    "现有工具涵盖高才通、优才及新加坡 EP。IANG 与专才不在这个自测入口内。",
    "The live tool covers the Top Talent Pass, Quality Migrant Admission, and Singapore Employment Pass. IANG and ASMTP are not in that self-check."
  ),
  "dx.f2": row(
    "按勾選生成個人及（如適用）公司材料缺口清單。",
    "按勾选生成个人及（如适用）公司材料缺口清单。",
    "From your ticks, it builds a gap list for personal papers and, where relevant, company papers."
  ),
  "dx.f3": row(
    "只描述準備度與優先缺口，不評分、不報價、不估計結果。",
    "只描述准备度与优先缺口，不评分、不报价、不估计结果。",
    "It describes readiness and priority gaps. It does not score, quote, or estimate an outcome."
  ),
  "dx.f4": row(
    "在瀏覽器內運行，不要求上傳證件原件。頁面正文為簡體中文。",
    "在浏览器内运行，不要求上传证件原件。页面正文为简体中文。",
    "It runs in the browser and does not ask you to upload original identity documents. The page itself is in Simplified Chinese."
  ),
  "dx.free.cta": row("打開準備度自測", "打开准备度自测", "Open the self-check"),
  "b2b.title": row("致教育留學機構與渠道夥伴", "致教育留学机构与渠道伙伴", "For education agencies and channel partners"),
  "b2b.body": row(
    "學生畢業後的香港續簽與企業落地，交給專業後台承接。尊重渠道歸屬，共享雙向透明對賬系統。",
    "学生毕业后的香港续签与企业落地，交给专业后台承接。尊重渠道归属，共享双向透明对账系统。",
    "After graduation, Hong Kong extensions and company landing can sit with one back office. Channel ownership stays with the partner, with a two-way reconciliation view."
  ),
  "b2b.cta": row("了解渠道合作方案", "了解渠道合作方案", "Channel partnership"),
  "foot.disclaimer": row(
    "以上為服務範圍介紹，不構成獲批承諾；個案以香港入境事務處、新加坡人力部（MOM）及相關部門要求為準。審批由有關當局酌情決定，個別結果不同。累計接觸與服務個案 1000 餘個（不以獲批計）。個人資料依香港《個人資料（私隱）條例》（第 486 章）處理。",
    "以上为服务范围介绍，不构成获批承诺；个案以香港入境事务处、新加坡人力部（MOM）及相关部门要求为准。审批由有关当局酌情决定，个别结果不同。累计接触与服务个案 1000 余个（不以获批计）。个人资料依香港《个人资料（私隐）条例》（第 486 章）处理。",
    "The pages describe a scope of work. They are not a promise of approval. Each case follows the requirements of Hong Kong Immigration, Singapore MOM, and any other authority involved. Those authorities decide, and individual outcomes differ. More than 1,000 cases we have come into contact with or served (not counted by approvals). Personal data we receive is handled under the Personal Data (Privacy) Ordinance (Cap. 486)."
  ),
  "foot.tagline": row(
    "WHERE FAMILY FINDS ITS DIRECTION",
    "WHERE FAMILY FINDS ITS DIRECTION",
    "WHERE FAMILY FINDS ITS DIRECTION"
  ),
  "foot.entityLabel": row("服務合約主體", "服务合约主体", "Contracting entity"),
  "foot.entityName": row(
    "宜居（國際）控股股份有限公司",
    "宜居（國際）控股股份有限公司",
    "宜居（國際）控股股份有限公司"
  ),
  "foot.entityEn": row(
    "英文法定名稱：留空，待確認。",
    "英文法定名称：留空，待确认。",
    "English legal name: left blank, pending confirmation."
  ),
  "foot.contact": row("聯絡我們", "联络我们", "Contact"),
  "foot.quick": row("頁面", "页面", "Pages"),
  "foot.scenes": row("服務場景說明", "服务场景说明", "Service scenes"),
  "foot.copy": row("© 2026 HARTHELM. All rights reserved.", "© 2026 HARTHELM. All rights reserved.", "© 2026 HARTHELM. All rights reserved."),
  "wa.name": row("WhatsApp", "WhatsApp", "WhatsApp"),
  "about.title": row("關於我們", "关于我们", "About"),
  "about.lead": row(
    "HARTHELM 是服務品牌。對外品牌只用 HARTHELM，對外電郵只用 office@harthelm.com。",
    "HARTHELM 是服务品牌。对外品牌只用 HARTHELM，对外电邮只用 office@harthelm.com。",
    "HARTHELM is the service brand. The public brand is HARTHELM only, and the public email is office@harthelm.com only."
  ),
  "about.p1": row(
    "我們立足香港與新加坡，把身份安排之後的公司落地、實體辦公室、財稅留痕和節點提醒放在同一條服務線上。對象包括高才通、優才、IANG，以及另頁說明的輸入內地人才計劃。",
    "我们立足香港与新加坡，把身份安排之后的公司落地、实体办公室、财税留痕和节点提醒放在同一条服务线上。对象包括高才通、优才、IANG，以及另页说明的输入内地人才计划。",
    "From Hong Kong and Singapore, one line of work covers company landing after a permission is in view, a real office, an accounting record, and date reminders. That includes the Top Talent Pass, Quality Migrant Admission, IANG, and the Admission Scheme for Mainland Talents and Professionals, which has its own page."
  ),
  "about.p2": row(
    "我們不是香港入境事務處、人才辦或新加坡人力部。頁面上的政策要點鏈到官方頁面，整理日期見資訊頁，不能代替當日官網。",
    "我们不是香港入境事务处、人才办或新加坡人力部。页面上的政策要点链到官方页面，整理日期见资讯页，不能代替当日官网。",
    "We are not Hong Kong Immigration, the Hong Kong Talent Engage office, or Singapore MOM. Policy notes link to official pages and carry the date they were compiled. They do not replace the official site on the day you read them."
  ),
  "about.doTitle": row("服務範圍", "服务范围", "Scope"),
  "about.do1": row("續簽材料的風險梳理，以及受僱與自僱路徑的對照。", "续签材料的风险梳理，以及受雇与自雇路径的对照。", "A risk read of extension papers, and a comparison of employed and self-employed paths."),
  "about.do2": row("香港公司註冊、可核驗的實體辦公室、租約厘印。", "香港公司注册、可核验的实体办公室、租约厘印。", "Hong Kong incorporation, an office that can be checked, and stamping of the lease."),
  "about.do3": row("強積金、薪資、合同與審計底稿一類的經營留痕。", "强积金、薪资、合同与审计底稿一类的经营留痕。", "An operating record: MPF, payroll, contracts, and audit papers."),
  "about.do4": row("T-90／T-60 節點提醒。數字看板與財務底稿工具供已合作客戶使用。", "T-90／T-60 节点提醒。数字看板与财务底稿工具供已合作客户使用。", "T-90 / T-60 reminders. The board and accounting tools are for clients already engaged."),
  "about.dontTitle": row("我們不這樣說", "我们不这样说", "What we do not say"),
  "about.dont1": row("不承諾獲批、不寫申請結果的比例、不把單一個案寫成可複製結果。", "不承诺获批、不写申请结果的比例、不把单一个案写成可复制结果。", "We do not promise approval, we do not publish how often applications succeed, and we do not treat one case as a result you can copy."),
  "about.dont2": row("不把工作准證或學生入境寫成已經取得永久居民或公民身份。", "不把工作准证或学生入境写成已经取得永久居民或公民身份。", "A work pass or a student entry is not written up as permanent residence or citizenship."),
  "about.dont3": row("不使用其他品牌、其他電郵或其他簽約主體。", "不使用其他品牌、其他电邮或其他签约主体。", "We do not use another brand, another email, or another contracting entity."),
  "about.dont4": row("牌照、協會會員和「上市公司背景」一類表述，未經核驗證件，不寫進本站。", "牌照、协会会员和「上市公司背景」一类表述，未经核验证件，不写进本站。", "Licences, association memberships, and any “listed-company” claim stay off this site unless the underlying record has been checked."),
  "about.factsTitle": row("年期、工位與聯絡", "年期、工位与联络", "Years, workstations, and contact"),
  "about.factsBody": row(
    "以下為本站使用的年期、香港實體工位數、辦公室地址與電話。",
    "以下为本站使用的年期、香港实体工位数、办公室地址与电话。",
    "The years in the industry, the number of physical workstations in Hong Kong, the office address, and the phone number used on this site are below."
  ),
  "svc.title": row("服務", "服务", "Services"),
  "svc.lead": row(
    "主業在香港與新加坡：身份安排之後的落地、實體運營，以及延長逗留前的材料梳理。每項是否受理、是否批准，由當局決定。",
    "主业在香港与新加坡：身份安排之后的落地、实体运营，以及延长逗留前的材料梳理。每项是否受理、是否批准，由当局决定。",
    "The work is in Hong Kong and Singapore: landing after a permission is in view, real operations, and a paper review before any extension of stay. Whether an application is accepted or approved is for the authority."
  ),
  "svc.schemeTitle": row("計劃說明", "计划说明", "Schemes, in brief"),
  "svc.schemeLead": row(
    "下面只指向核對為現行的公開計劃。細則、官方連結和限制寫在資訊頁；專才與 IANG 另有專頁。本站不把已變更或未核實的產品包裝列作服務。",
    "下面只指向核对为现行的公开计划。细则、官方链接和限制写在资讯页；专才与 IANG 另有专页。本站不把已变更或未核实的产品包装列作服务。",
    "The links below point only at schemes checked as current. Detail, official links, and limits sit on the briefings page. ASMTP and IANG have their own pages. Packaging that has changed, or was not verified, is not offered here."
  ),
  "ins.title": row("資訊", "资讯", "Briefings"),
  "ins.lead": row(
    "以下 12 則只收錄 2026-11-10 核對時標為現行的公開要點，每則附該次整理所記的官方連結。已變更或未核實的說法不收進本頁。本頁不是法律意見，當日以官方頁面為準。",
    "以下 12 则只收录 2026-11-10 核对时标为现行的公开要点，每则附该次整理所记的官方链接。已变更或未核实的说法不收进本页。本页不是法律意见，当日以官方页面为准。",
    "These 12 notes are only the points marked current at the 10 November 2026 check, each with the official link recorded then. Points marked changed or unverified are not on this page. This is not legal advice. The official page on the day you read it controls."
  ),
  "ins.checked": row("整理日期：2026-11-10。狀態：現行。", "整理日期：2026-11-10。状态：现行。", "Compiled 10 November 2026. Status: current."),
  "cases.title": row("案例", "案例", "Cases"),
  "cases.lead": row(
    "以下四則來自已公開資料的脫敏整理，已去掉姓名、姓氏字首、公司名和其他可識別細節。舊資料裡的結果寫法只說明該則當時如何描述，不是同類申請可以得到相同結果的保證。審批由有關當局決定，個別情況不同。",
    "以下四则来自已公开资料的脱敏整理，已去掉姓名、姓氏字首、公司名和其他可识别细节。旧资料里的结果写法只说明该则当时如何描述，不是同类申请可以得到相同结果的保证。审批由有关当局决定，个别情况不同。",
    "These four notes are desensitised from material already published. Names, initials, company names, and other identifying detail are removed. How a source described an outcome is not a promise that another application will end the same way. The authority decides, and situations differ."
  ),
  "cases.dates": row(
    "原始日期有互相矛盾的年份，本頁不採用年份。間隔只按資料所寫轉述，且不是時限承諾。",
    "原始日期有互相矛盾的年份，本页不采用年份。间隔只按资料所写转述，且不是时限承诺。",
    "The source dates used conflicting years, so this page uses none. Intervals are only what the source wrote, and they are not a promised timetable."
  ),
  "cases.bg": row("背景", "背景", "Background"),
  "cases.diff": row("資料所寫的難點", "资料所写的难点", "What the source said was difficult"),
  "cases.how": row("資料所寫的處理", "资料所写的处理", "What the source said was done"),
  "cases.result": row("資料所寫的結果類型", "资料所写的结果类型", "How the source described the outcome"),
  "asmtp.meta": row("輸入內地人才計劃（專才）", "输入内地人才计划（专才）", "Admission Scheme for Mainland Talents and Professionals"),
  "iang.meta": row("非本地畢業生留港／回港就業安排（IANG）", "非本地毕业生留港／回港就业安排（IANG）", "Immigration Arrangements for Non-local Graduates (IANG)"),
  "legal.title": row("法律聲明", "法律声明", "Legal"),
  "legal.draft": row(
    "草稿，需負責人審閱。本頁不是已定稿的私隱政策或免責條款。在審閱完成前，不應視為公司已確認的法律文本。",
    "草稿，需负责人审阅。本页不是已定稿的隐私政策或免责条款。在审阅完成前，不应视为公司已确认的法律文本。",
    "Draft, for the owner to review. This page is not a finished privacy policy or disclaimer. Until that review is done, do not treat it as the company’s confirmed legal text."
  ),
  "scheme.ttps": row("高端人才通行證計劃（高才通）", "高端人才通行证计划（高才通）", "Top Talent Pass Scheme"),
  "scheme.qmas": row("優秀人才入境計劃（優才）", "优秀人才入境计划（优才）", "Quality Migrant Admission Scheme"),
  "scheme.cies": row("新資本投資者入境計劃", "新资本投资者入境计划", "New Capital Investment Entrant Scheme"),
  "scheme.study": row("非本地學生來港就讀", "非本地学生来港就读", "Entry for study"),
  "scheme.owp": row("內地居民赴港澳定居（單程證）四類條件", "内地居民赴港澳定居（单程证）四类条件", "Exit endorsement for settlement in Hong Kong or Macao"),
  "scheme.ep": row("新加坡 Employment Pass", "新加坡 Employment Pass", "Singapore Employment Pass"),
  "scheme.csp": row("新加坡公司服務供應商與視頻驗證", "新加坡公司服务供应商与视频验证", "Singapore corporate service providers and video checks"),
  "scheme.tr": row("土耳其投資入籍：房地產門檻", "土耳其投资入籍：房地产门槛", "Türkiye investment citizenship: property threshold"),
  "scheme.mt": row("馬耳他永久居留計劃（MPRP）法律框架", "马耳他永久居留计划（MPRP）法律框架", "Malta Permanent Residence Programme, legal framework"),
  "scheme.eb1": row("美國 EB-1A 基本框架", "美国 EB-1A 基本框架", "US EB-1A, basic framework"),
  "more": row("本頁要點", "本页要点", "On this page"),
  "full": row("專頁", "专页", "Full page"),
  "notLegal": row("不構成法律意見。", "不构成法律意见。", "Not legal advice."),
};

export const POLICIES = [
  {
    id: "ttps",
    title: STR["scheme.ttps"],
    points: [
      row("申請時無須已經在港覓得工作。", "申请时无须已经在港觅得工作。", "A job in Hong Kong is not required at the time of application."),
      row("A 類：緊接申請前一年全年收入達港幣 250 萬元或以上。", "A 类：紧接申请前一年全年收入达港币 250 万元或以上。", "Category A: annual income of HK$2.5 million or above in the year immediately before the application."),
      row("B 類：合資格大學學士學位，並在緊接申請前五年內累積至少三年工作經驗。", "B 类：合资格大学学士学位，并在紧接申请前五年内累积至少三年工作经验。", "Category B: a bachelor’s degree from an eligible university, and at least three years of work experience in the five years immediately before the application."),
      row("C 類：近五年內取得合資格大學學士學位，工作經驗少於三年，受年度配額及先到先得限制。", "C 类：近五年内取得合资格大学学士学位，工作经验少于三年，受年度配额及先到先得限制。", "Category C: a bachelor’s degree from an eligible university within the past five years, with less than three years of work experience. An annual quota and first-come handling apply."),
      row("首次逗留一般為 A 類 36 個月、B／C 類 24 個月。", "首次逗留一般为 A 类 36 个月、B／C 类 24 个月。", "The first period of stay is generally 36 months for Category A and 24 months for Categories B and C."),
      row("入境處在收齊文件及申請費後，一般約四星期處理。即使符合資格，處長仍保留拒絕個別申請的絕對決定權。", "入境处在收齐文件及申请费后，一般约四星期处理。即使符合资格，处长仍保留拒绝个别申请的绝对决定权。", "Immigration generally takes about four weeks after the documents and the fee are in. Meeting the criteria does not remove the Director’s absolute discretion to refuse an individual application."),
      row("延長逗留須證明已在港受聘並有穩定收入，或已在港開辦或參與業務。", "延长逗留须证明已在港受聘并有稳定收入，或已在港开办或参与业务。", "An extension of stay requires proof of employment in Hong Kong with a stable income, or of having established or joined a business in Hong Kong."),
      row("合資格大學名單按年更新，2026-01-01 起生效的公布見下方政府新聞連結。本站不把辦理速度寫成承諾。", "合资格大学名单按年更新，2026-01-01 起生效的公布见下方政府新闻链接。本站不把办理速度写成承诺。", "The list of eligible universities is updated yearly. The government notice effective 1 January 2026 is linked below. This site does not turn processing speed into a promise."),
    ],
    links: [
      { href: "https://www.immd.gov.hk/hks/services/visas/TTPS.html", label: row("入境處：高端人才通行證計劃", "入境处：高端人才通行证计划", "Immigration: Top Talent Pass Scheme") },
      { href: "https://www.immd.gov.hk/pdforms/ID(C)1026.pdf", label: row("指南 ID(C)1026（標註 04/2026）", "指南 ID(C)1026（标注 04/2026）", "Guide ID(C)1026 (marked 04/2026)") },
      { href: "https://www.info.gov.hk/gia/general/202512/28/P2025122400227.htm", label: row("合資格大學名單（2026-01-01 生效）", "合资格大学名单（2026-01-01 生效）", "Eligible universities (effective 1 January 2026)") },
    ],
  },
  {
    id: "qmas",
    title: STR["scheme.qmas"],
    points: [
      row("計劃仍由入境處運作。", "计划仍由入境处运作。", "The scheme is still run by Immigration."),
      row("申請人一般須年滿 18 歲、有經濟能力、良好品格，並通常持有認可學位。", "申请人一般须年满 18 岁、有经济能力、良好品格，并通常持有认可学位。", "An applicant is generally at least 18, able to support himself or herself, of good character, and usually holds a recognised degree."),
      row("綜合計分制須符合訂明準則。現行為須符合 12 項中的 6 項，以官方指南為準。", "综合计分制须符合订明准则。现行为须符合 12 项中的 6 项，以官方指南为准。", "The General Points Test uses published criteria. The current test is 6 items out of 12, and the official guide controls."),
      row("成就計分制須有傑出成就。申請時無須已經獲得聘用。", "成就计分制须有杰出成就。申请时无须已经获得聘用。", "The Achievement-based Points Test requires exceptional achievement. A job offer is not required at application."),
      row("逗留期限的模式及頂尖人才安排，以入境處最新頁面為準。市場上流傳的月數不是官方時限，本站不寫成時限。", "逗留期限的模式及顶尖人才安排，以入境处最新页面为准。市场上流传的月数不是官方时限，本站不写成时限。", "Patterns of stay, and any arrangement for top-tier talent, follow Immigration’s latest page. Month-counts circulating in the market are not an official limit, and this site does not present them as one."),
    ],
    links: [
      { href: "https://www.immd.gov.hk/hkt/services/visas/quality_migrant_admission_scheme.html", label: row("入境處：優秀人才入境計劃", "入境处：优秀人才入境计划", "Immigration: Quality Migrant Admission Scheme") },
      { href: "https://www.immd.gov.hk/pdforms/id(c)982.pdf", label: row("指南 id(c)982", "指南 id(c)982", "Guide id(c)982") },
    ],
  },
  {
    id: "asmtp",
    title: STR["asmtp.meta"],
    points: [
      row("面向已經獲得香港聘用的內地居民。", "面向已经获得香港聘用的内地居民。", "For mainland residents who already have an offer of employment in Hong Kong."),
      row("申請人須具備香港所需、而本地不易覓得的技能或經驗。", "申请人须具备香港所需、而本地不易觅得的技能或经验。", "The applicant needs skills or experience that Hong Kong requires and that are not readily available locally."),
      row("通常須有相關學士學位；特殊情況可以專業能力或經驗證明。", "通常须有相关学士学位；特殊情况可以专业能力或经验证明。", "A relevant bachelor’s degree is usually required. In special cases, professional ability or experience may be shown instead."),
      row("職位須真實，工作與學歷或經驗相關，薪酬福利須與市場水平大致相同。", "职位须真实，工作与学历或经验相关，薪酬福利须与市场水平大致相同。", "The post must be genuine, the work related to the degree or experience, and the package broadly in line with the market."),
      row("與高才通、優才不同，一般須事先獲得聘用。專頁見本站「專才」。", "与高才通、优才不同，一般须事先获得聘用。专页见本站「专才」。", "Unlike the Top Talent Pass and Quality Migrant Admission, employment is generally required first. See the ASMTP page on this site."),
    ],
    links: [
      { href: "https://www.immd.gov.hk/hks/services/visas/ASMTP.html", label: row("入境處：輸入內地人才計劃", "入境处：输入内地人才计划", "Immigration: Admission Scheme for Mainland Talents and Professionals") },
      { href: "https://www.immd.gov.hk/pdforms/ID(C)991.pdf", label: row("入境指南 ID(C)991", "入境指南 ID(C)991", "Guide ID(C)991") },
    ],
  },
  {
    id: "iang",
    title: STR["iang.meta"],
    points: [
      row("適用於在港修讀全日制、經本地評審課程並取得學士或更高資歷的非本地學生。合資格大灣區校園等其他安排以官網為準。", "适用于在港修读全日制、经本地评审课程并取得学士或更高资历的非本地学生。合资格大湾区校园等其他安排以官网为准。", "For non-local students who have studied full-time in Hong Kong on a locally accredited programme and obtained a bachelor’s degree or higher. Other arrangements, including eligible Greater Bay Area campuses, follow the official page."),
      row("畢業後六個月內申請的應屆畢業生，一般無須先有聘書，首次通常可獲准逗留 24 個月。", "毕业后六个月内申请的应届毕业生，一般无须先有聘书，首次通常可获准逗留 24 个月。", "Fresh graduates who apply within six months of graduation generally do not need an offer first, and are usually granted 24 months on the first permission."),
      row("逾期再申請，通常須已經獲聘，且職位與薪酬須符合規定。延長逗留須已經獲聘。", "逾期再申请，通常须已经获聘，且职位与薪酬须符合规定。延长逗留须已经获聘。", "A later application generally requires employment already secured, with the post and pay meeting the rules. An extension of stay also requires employment."),
      row("赴港就讀的學生簽證與 IANG 是前後兩段安排。入學不等於已經取得香港身份。專頁見本站「IANG」。", "赴港就读的学生签证与 IANG 是前后两段安排。入学不等于已经取得香港身份。专页见本站「IANG」。", "A student entry and IANG are two arrangements, one after the other. Starting a course is not the same as already holding a Hong Kong status. See the IANG page."),
    ],
    links: [
      { href: "https://www.immd.gov.hk/hks/services/visas/IANG.html", label: row("入境處：IANG", "入境处：IANG", "Immigration: IANG") },
    ],
  },
  {
    id: "cies",
    title: STR["scheme.cies"],
    points: [
      row("申請人須先向投資推廣署證明：在遞交淨資產評估前六個月，持續擁有不少於港幣 3,000 萬元等值的淨資產。", "申请人须先向投资推广署证明：在递交净资产评估前六个月，持续拥有不少于港币 3,000 万元等值的净资产。", "The applicant must first show Invest Hong Kong that, for the six months before the net-asset assessment is filed, net assets of at least HK$30 million (or equivalent) were held throughout."),
      row("再按計劃規則投資不少於港幣 3,000 萬元於准許投資資產。其中包含向香港投資管理有限公司管理的投資組合投放港幣 300 萬元等安排，以官網為準。", "再按计划规则投资不少于港币 3,000 万元于准许投资资产。其中包含向香港投资管理有限公司管理的投资组合投放港币 300 万元等安排，以官网为准。", "The applicant then invests at least HK$30 million in permissible assets under the scheme rules. That includes a HK$3 million placement into the portfolio managed by the Hong Kong Investment Corporation, and related rules, as the official site states them."),
      row("合資格範圍、以訪客身份入境完成投資、原則性批准後再作正式批准，都是多步程序。", "合资格范围、以访客身份入境完成投资、原则性批准后再作正式批准，都是多步程序。", "Eligibility, entering as a visitor to complete the investment, approval in principle, and later formal approval are separate steps."),
      row("延長逗留仍須符合計劃規則，包括維持投資等要求。不能理解成沒有任何後續要求。", "延长逗留仍须符合计划规则，包括维持投资等要求。不能理解成没有任何后续要求。", "An extension of stay still has to meet the scheme rules, including maintaining the investment. It is not a status with no later conditions."),
      row("內地中國居民通常不在適用範圍。適用者一般為外國國民、已在外國取得永久居民身份的中國國民，或澳門居民、台灣居民等，以官網為準。", "内地中国居民通常不在适用范围。适用者一般为外国国民、已在外国取得永久居民身份的中国国民，或澳门居民、台湾居民等，以官网为准。", "Mainland Chinese residents are generally outside the scheme. It is generally for foreign nationals, Chinese nationals who have permanent residence abroad, and Macao or Taiwan residents, among others, as the official site states."),
      row("2026-03-01 起私營控股公司安排有更新，見家庭辦公室香港的頁面。", "2026-03-01 起私营控股公司安排有更新，见家庭办公室香港的页面。", "From 1 March 2026 there is an update on private holding-company arrangements. See the FamilyOfficeHK page."),
    ],
    links: [
      { href: "https://www.immd.gov.hk/eng/services/visas/newcies.html", label: row("入境處：新資本投資者入境計劃", "入境处：新资本投资者入境计划", "Immigration: New CIES") },
      { href: "https://www.newcies.gov.hk/en/application-procedures/application-to-investhk/investment-requirement/", label: row("新 CIES：投資規定", "新 CIES：投资规定", "New CIES: investment requirement") },
      { href: "https://www.familyofficehk.gov.hk/en/new-capital-investment-entrant-scheme/index.html", label: row("家庭辦公室香港：2026-03-01 起的安排", "家庭办公室香港：2026-03-01 起的安排", "FamilyOfficeHK: arrangements from 1 March 2026") },
    ],
  },
  {
    id: "study",
    title: STR["scheme.study"],
    points: [
      row("赴港攻讀全日制課程，須按入境處的非本地學生入學安排申請。", "赴港攻读全日制课程，须按入境处的非本地学生入学安排申请。", "Full-time study in Hong Kong is applied for under Immigration’s entry arrangement for non-local students."),
      row("獲院校錄取，不等於已經取得可工作或定居的身份。", "获院校录取，不等于已经取得可工作或定居的身份。", "An offer from a school is not itself permission to work or to settle."),
      row("家屬如申請受養人，須符合當時的政策。", "家属如申请受养人，须符合当时的政策。", "A dependant application has to meet the policy in force at the time."),
      row("個別院校的入學要求以該院校官網為準。本站不轉述未經該次整理逐項核對的招生細節。", "个别院校的入学要求以该院校官网为准。本站不转述未经该次整理逐项核对的招生细节。", "A school’s own admission rules are on that school’s site. This site does not repeat admission details that were not checked item by item."),
    ],
    links: [
      { href: "https://www.immd.gov.hk/hks/useful_information/admission-schemes-talents-professionals-entrepreneurs.html", label: row("入境處：人才、專業人士及企業家入境計劃總覽", "入境处：人才、专业人士及企业家入境计划总览", "Immigration: overview of admission schemes") },
      { href: "https://www.eduhk.hk/acadprog/zh-hans/postgrad/index.html", label: row("香港教育大學研究生課程（院校頁，只作入學要求的官方入口）", "香港教育大学研究生课程（院校页，只作入学要求的官方入口）", "EdUHK postgraduate programmes (the school’s own page for its requirements)") },
    ],
  },
  {
    id: "owp",
    title: STR["scheme.owp"],
    points: [
      row("自 2026-07-01 起，公告所列審批條件為四類。", "自 2026-07-01 起，公告所列审批条件为四类。", "From 1 July 2026, the notice sets out four categories of conditions."),
      row("一、夫妻團聚及偕行子女：與港澳配偶分居時間滿 3 年。", "一、夫妻团聚及偕行子女：与港澳配偶分居时间满 3 年。", "1. Reunion of husband and wife, and accompanying children: separation from the spouse settled in Hong Kong or Macao for three years."),
      row("二、子女投靠父母：申請人未滿 18 週歲，父母均在港澳定居。", "二、子女投靠父母：申请人未满 18 周岁，父母均在港澳定居。", "2. A child joining parents: the applicant is under 18, and both parents are settled in Hong Kong or Macao."),
      row("三、子女照顧父母：申請人 18–59 週歲，父母均在港澳定居、均已滿 60 週歲，且在港澳無子女。", "三、子女照顾父母：申请人 18–59 周岁，父母均在港澳定居、均已满 60 周岁，且在港澳无子女。", "3. A child caring for parents: the applicant is 18 to 59, both parents are settled in Hong Kong or Macao, both are 60 or over, and they have no children there."),
      row("四、父母投靠子女：申請人 60 週歲以上且在內地無子女，港澳定居子女年滿 18 週歲。", "四、父母投靠子女：申请人 60 周岁以上且在内地无子女，港澳定居子女年满 18 周岁。", "4. A parent joining a child: the applicant is over 60 and has no children on the mainland, and the child settled in Hong Kong or Macao is 18 or over."),
      row("公安機關仍根據定居名額和審批條件依法審批。公告沒有寫「符合條件必然批准」。", "公安机关仍根据定居名额和审批条件依法审批。公告没有写「符合条件必然批准」。", "The public security authorities still decide according to the quota and the conditions. The notice does not say that meeting the conditions means approval."),
    ],
    links: [
      { href: "https://www.nia.gov.cn/n794014/n794021/c1788325/content.html", label: row("國家移民管理局公告", "国家移民管理局公告", "National Immigration Administration notice") },
      { href: "https://www.hmo.gov.cn/2026/09/01/ARTIr7Tl2AvuIWBBAfIzNZzi260901.shtml", label: row("國務院港澳事務辦公室轉載頁", "国务院港澳事务办公室转载页", "Hong Kong and Macao Affairs Office reprint") },
    ],
  },
  {
    id: "ep",
    title: STR["scheme.ep"],
    points: [
      row("Employment Pass 是外籍專業人員的工作准證，不是永久居民或公民身份。", "Employment Pass 是外籍专业人员的工作准证，不是永久居民或公民身份。", "An Employment Pass is a work pass for foreign professionals. It is not permanent residence or citizenship."),
      row("家屬如符合條件可另申請家屬准證。這不等於全家取得新加坡居留身份。", "家属如符合条件可另申请家属准证。这不等于全家取得新加坡居留身份。", "Family members who qualify may apply for a dependant’s pass. That is not the same as the family holding Singapore residence status."),
      row("申請人須達到按年齡和行業遞進的最低合格薪資，並通過 COMPASS（40 分），或屬於豁免情形。", "申请人须达到按年龄和行业递进的最低合格薪资，并通过 COMPASS（40 分），或属于豁免情形。", "The applicant must meet the qualifying salary, which rises with age and differs by sector, and pass COMPASS (40 points), or fall within an exemption."),
      row("整理當日所見、適用於 2027-01-01 前新申請的公開最低合格薪資：非金融服務業每月 5,600 新元起，隨年齡遞增至 45 歲及以上 10,700 新元；金融服務業每月 6,200 新元起，至 11,800 新元。2027-01-01 起新申請門檻還將上調。以 MOM 頁面為準。", "整理当日所见、适用于 2027-01-01 前新申请的公开最低合格薪资：非金融服务业每月 5,600 新元起，随年龄递增至 45 岁及以上 10,700 新元；金融服务业每月 6,200 新元起，至 11,800 新元。2027-01-01 起新申请门槛还将上调。以 MOM 页面为准。", "As published at the time of this note, for new applications before 1 January 2027: from S$5,600 a month in non-financial services, rising to S$10,700 at age 45 and above; from S$6,200 in financial services, rising to S$11,800. From 1 January 2027 the bar for new applications rises further. MOM’s page controls."),
      row("僱主一般仍須符合公平考慮框架等招聘要求。薪資不能為了湊分而隨意填寫。", "雇主一般仍须符合公平考虑框架等招聘要求。薪资不能为了凑分而随意填写。", "Employers generally still have to meet the Fair Consideration Framework and related hiring rules. Salary is not a figure to be chosen in order to collect points."),
      row("永久居民是另一項審批。持有 Employment Pass 滿一定年期，並不保證可以獲得永久居民。", "永久居民是另一项审批。持有 Employment Pass 满一定年期，并不保证可以获得永久居民。", "Permanent residence is a separate decision. Holding an Employment Pass for a period of years does not guarantee it."),
    ],
    links: [
      { href: "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility/", label: row("MOM：Employment Pass 資格", "MOM：Employment Pass 资格", "MOM: Employment Pass eligibility") },
      { href: "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility/compass-c1-salary-benchmarks", label: row("MOM：COMPASS 薪資基準", "MOM：COMPASS 薪资基准", "MOM: COMPASS salary benchmarks") },
    ],
  },
  {
    id: "csp",
    title: STR["scheme.csp"],
    points: [
      row("《公司服務供應商法 2024》於 2025-06-09 生效。在新加坡提供公司服務的機構須向 ACRA 註冊。", "《公司服务供应商法 2024》于 2025-06-09 生效。在新加坡提供公司服务的机构须向 ACRA 注册。", "The Corporate Service Providers Act 2024 took effect on 9 June 2025. A business providing corporate services in Singapore must register with ACRA."),
      row("名義董事須由註冊公司服務供應商安排，並遵守反洗錢等義務。", "名义董事须由注册公司服务供应商安排，并遵守反洗钱等义务。", "A nominee director must be arranged by a registered corporate service provider, and anti-money-laundering duties apply."),
      row("遠程註冊等情形下，公司服務供應商須與擬任董事（不包括名義董事）、持股不少於 50% 的成員，或其授權代表，進行即時視頻通話並保存記錄。", "远程注册等情形下，公司服务供应商须与拟任董事（不包括名义董事）、持股不少于 50% 的成员，或其授权代表，进行即时视频通话并保存记录。", "For remote registration and similar cases, the provider must hold a real-time video call, and keep the record, with a proposed director who is not a nominee, with a member holding at least 50%, or with an authorised representative."),
      row("《公司與有限責任合夥人（雜項修訂）法》的生效日期，官方公布為 2025-06-16。兩套新規不是同一日生效。", "《公司与有限责任合伙人（杂项修订）法》的生效日期，官方公布为 2025-06-16。两套新规不是同一日生效。", "The corporate and LLP miscellaneous amendments were announced as effective on 16 June 2025. The two sets of rules did not start on the same day."),
      row("罰款上限本頁不引用，因為該次整理沒有逐條對上法例條文。", "罚款上限本页不引用，因为该次整理没有逐条对上法例条文。", "This page does not quote maximum fines. That check did not match them line by line to the statute."),
    ],
    links: [
      { href: "https://www.acra.gov.sg/news-events/news-announcements/865/", label: row("ACRA 公告 865", "ACRA 公告 865", "ACRA announcement 865") },
      { href: "https://sso.agc.gov.sg/Act/CSPA2024", label: row("Corporate Service Providers Act 2024 文本", "Corporate Service Providers Act 2024 文本", "Corporate Service Providers Act 2024") },
      { href: "https://www.acra.gov.sg/news-events/news-announcements/872/", label: row("ACRA 公告 872（雜項修訂生效）", "ACRA 公告 872（杂项修订生效）", "ACRA announcement 872 (miscellaneous amendments)") },
    ],
  },
  {
    id: "tr",
    title: STR["scheme.tr"],
    points: [
      row("公開的土耳其官方投資入籍說明仍列有房地產投資 40 萬美元，以及一定年限內不得出售等條件。", "公开的土耳其官方投资入籍说明仍列有房地产投资 40 万美元，以及一定年限内不得出售等条件。", "The public Turkish official note on citizenship by investment still lists real-estate investment of USD 400,000, and a period during which the property may not be sold."),
      row("本頁只寫這一門檻。與門檻無關的市場主張不轉載，也不把入籍寫成可以預期的結果。", "本页只写这一门槛。与门槛无关的市场主张不转载，也不把入籍写成可以预期的结果。", "This page states that threshold only. Marketing claims that sit beside it are not repeated, and citizenship is not written as an expected result."),
    ],
    links: [
      { href: "https://www.yourkeyturkiye.gov.tr/en/acquisition-of-citizenship", label: row("土耳其官方：取得公民身份", "土耳其官方：取得公民身份", "Official Türkiye page: acquisition of citizenship") },
    ],
  },
  {
    id: "mt",
    title: STR["scheme.mt"],
    points: [
      row("馬耳他 Legal Notice 146 of 2025 修訂了永久居留計劃（MPRP）。Residency Malta 的官方頁面提供該法律通知。", "马耳他 Legal Notice 146 of 2025 修订了永久居留计划（MPRP）。Residency Malta 的官方页面提供该法律通知。", "Malta Legal Notice 146 of 2025 amended the Permanent Residence Programme. The Residency Malta page carries that notice."),
      row("費用與資格以該官方頁面及法律通知原文為準。本站不另列一套費用，也不把任何時點寫成應當入場的時機。", "费用与资格以该官方页面及法律通知原文为准。本站不另列一套费用，也不把任何时点写成应当入场的时机。", "Fees and eligibility follow that page and the text of the notice. This site does not publish a second fee table, or call any moment the time to enter."),
    ],
    links: [
      { href: "https://residencymalta.gov.mt/legal-framework-mprp-2/", label: row("Residency Malta：MPRP 法律框架", "Residency Malta：MPRP 法律框架", "Residency Malta: MPRP legal framework") },
      { href: "https://legislation.mt/eli/ln/2025/146/eng/pdf", label: row("Legal Notice 146 of 2025（英文 PDF）", "Legal Notice 146 of 2025（英文 PDF）", "Legal Notice 146 of 2025 (English PDF)") },
    ],
  },
  {
    id: "eb1",
    title: STR["scheme.eb1"],
    points: [
      row("EB-1A 是美國職業移民中的傑出人才類別。基本框架仍是：在十項標準中至少滿足三項，並接受整體傑出性審查。", "EB-1A 是美国职业移民中的杰出人才类别。基本框架仍是：在十项标准中至少满足三项，并接受整体杰出性审查。", "EB-1A is the extraordinary-ability category in US employment-based immigration. The basic framework is still at least three of the ten criteria, plus a final review of the record as a whole."),
      row("申請人須證明傑出性，並將在美國繼續從事該領域。", "申请人须证明杰出性，并将在美国继续从事该领域。", "The applicant must show extraordinary ability and that he or she will continue to work in that field in the United States."),
      row("審理和加急的具體週期會調整。該次整理沒有對上 USCIS 當時的處理時間表，因此本頁不寫週期。", "审理和加急的具体周期会调整。该次整理没有对上 USCIS 当时的处理时间表，因此本页不写周期。", "Processing and premium-processing times change. That check did not match them to the USCIS timetable then current, so this page states none."),
      row("多準備一份申請，並不構成額外的結果保障。", "多准备一份申请，并不构成额外的结果保障。", "Filing another application is not an extra assurance of a result."),
      row("該次整理沒有記錄一條具體的 USCIS 網址，本則因此不附連結，避免寫入未經該次整理核對的地址。請在 uscis.gov 查閱當時的 EB-1 頁面。", "该次整理没有记录一条具体的 USCIS 网址，本则因此不附链接，避免写入未经该次整理核对的地址。请在 uscis.gov 查阅当时的 EB-1 页面。", "That note did not record a specific USCIS URL, so this item has no link, rather than a URL that was not part of the check. Read the EB-1 page then on uscis.gov."),
    ],
    links: [],
  },
];

export const CASES = [
  {
    id: "c1",
    title: row("案例 1｜新加坡 Employment Pass", "案例 1｜新加坡 Employment Pass", "Case 1 | Singapore Employment Pass"),
    background: row(
      "約 30 歲出頭至 40 歲前；本科學歷；跨境電商從業。",
      "约 30 岁出头至 40 岁前；本科学历；跨境电商从业。",
      "Early thirties to under forty; a bachelor’s degree; cross-border e-commerce."
    ),
    difficulty: row(
      "原始資料沒有寫需要克服的特殊障礙，只強調從遞交到出結果的間隔較短。",
      "原始资料没有写需要克服的特殊障碍，只强调从递交到出结果的间隔较短。",
      "The source did not describe a particular obstacle. It only stressed a short gap between filing and a result."
    ),
    handling: row(
      "原始資料沒有披露具體的材料策略，只呈現為提交申請後等待結果。",
      "原始资料没有披露具体的材料策略，只呈现为提交申请后等待结果。",
      "The source did not disclose a document strategy. It only showed an application, then a wait."
    ),
    outcome: row(
      "資料把結果寫成工作准證獲得批准，並把間隔寫成約 18 日。Employment Pass 是工作准證，不是永久居民或公民身份。約 18 日不是時限，其他申請沒有理由期待相同間隔。",
      "资料把结果写成工作准证获得批准，并把间隔写成约 18 日。Employment Pass 是工作准证，不是永久居民或公民身份。约 18 日不是时限，其他申请没有理由期待相同间隔。",
      "The source described the outcome as approval of a work pass, and the gap as about 18 days. An Employment Pass is a work pass, not permanent residence or citizenship. Eighteen days is not a timetable, and another application has no reason to expect the same gap."
    ),
  },
  {
    id: "c2",
    title: row("案例 2｜香港高才通 A 類", "案例 2｜香港高才通 A 类", "Case 2 | Hong Kong Top Talent Pass, Category A"),
    background: row(
      "本科學歷；內地科技企業的創辦人。企業名稱和上市地不寫。",
      "本科学历；内地科技企业的创办人。企业名称和上市地不写。",
      "A bachelor’s degree; founder of a technology company on the mainland. The company name and any listing venue are omitted."
    ),
    difficulty: row(
      "原始資料沒有說明收入證明或其他資格如何對上 A 類門檻。",
      "原始资料没有说明收入证明或其他资格如何对上 A 类门槛。",
      "The source did not explain how income evidence, or any other criterion, met the Category A threshold."
    ),
    handling: row(
      "原始資料沒有寫具體的論證方法，也沒有材料清單。",
      "原始资料没有写具体的论证方法，也没有材料清单。",
      "The source did not describe a method of argument, or a document list."
    ),
    outcome: row(
      "資料把結果寫成獲得批准，並把周期寫成約兩個半月。不能由此認為創辦人申請高才通 A 類都會在約兩個半月得到批准。A 類收入門檻以入境處頁面為準：緊接申請前一年全年收入達港幣 250 萬元或以上。",
      "资料把结果写成获得批准，并把周期写成约两个半月。不能由此认为创办人申请高才通 A 类都会在约两个半月得到批准。A 类收入门槛以入境处页面为准：紧接申请前一年全年收入达港币 250 万元或以上。",
      "The source described the outcome as an approval, and the period as about two and a half months. That does not mean a founder’s Category A application is approved in about two and a half months. The Category A income test, on the Immigration page, is annual income of HK$2.5 million or above in the year immediately before the application."
    ),
  },
  {
    id: "c3",
    title: row("案例 3｜新加坡 Employment Pass", "案例 3｜新加坡 Employment Pass", "Case 3 | Singapore Employment Pass"),
    background: row(
      "30 歲出頭；本科學歷；服裝貿易。",
      "30 岁出头；本科学历；服装贸易。",
      "Early thirties; a bachelor’s degree; garment trade."
    ),
    difficulty: row(
      "原始資料沒有寫難點，只給出很短的遞交與出結果間隔。",
      "原始资料没有写难点，只给出很短的递交与出结果间隔。",
      "The source did not describe a difficulty. It only gave a very short gap between filing and a result."
    ),
    handling: row(
      "未披露。",
      "未披露。",
      "Not disclosed."
    ),
    outcome: row(
      "資料把結果寫成獲得批准。按其所寫的遞交與結果日期，間隔約 7 日。同一則又出現另一套年份，前後矛盾，本頁不採用該時間線。約 7 日不是時限。Employment Pass 不是永久居民或公民身份。",
      "资料把结果写成获得批准。按其所写的递交与结果日期，间隔约 7 日。同一则又出现另一套年份，前后矛盾，本页不采用该时间线。约 7 日不是时限。Employment Pass 不是永久居民或公民身份。",
      "The source described an approval. On the filing and result dates it wrote, the gap was about seven days. The same note also used another set of years, which conflict, so this page does not adopt that timeline. Seven days is not a timetable. An Employment Pass is not permanent residence or citizenship."
    ),
  },
  {
    id: "c4",
    title: row("案例 4｜香港高才通 A 類", "案例 4｜香港高才通 A 类", "Case 4 | Hong Kong Top Talent Pass, Category A"),
    background: row(
      "約 40 歲；上市公司的高級管理人員。公司名、職位全稱和行業細分不寫。",
      "约 40 岁；上市公司的高级管理人员。公司名、职位全称和行业细分不写。",
      "About 40; a senior manager at a listed company. The company, the full job title, and the industry niche are omitted."
    ),
    difficulty: row(
      "須以固定薪資、年終績效和項目獎金等合計，證明達到高才通 A 類收入門檻。官方標準為緊接申請前一年全年收入達港幣 250 萬元或以上。原始資料把綜合年收入達標寫成關鍵。",
      "须以固定薪资、年终绩效和项目奖金等合计，证明达到高才通 A 类收入门槛。官方标准为紧接申请前一年全年收入达港币 250 万元或以上。原始资料把综合年收入达标写成关键。",
      "Fixed salary, year-end performance pay, and project bonuses had to be added together to show the Category A income test. The official test is annual income of HK$2.5 million or above in the year immediately before the application. The source treated combined annual income as the key point."
    ),
    handling: row(
      "原始資料沒有材料清單，只強調一次提交。本頁不把「一次提交」寫成可以照做的方法。",
      "原始资料没有材料清单，只强调一次提交。本页不把「一次提交」写成可以照做的方法。",
      "The source gave no document list. It only stressed a single filing. This page does not turn “file once” into a method to copy."
    ),
    outcome: row(
      "資料把結果寫成獲得批准，並把周期寫成 38 日。38 日不是承諾，也不能理解成可以保證無須補件。",
      "资料把结果写成获得批准，并把周期写成 38 日。38 日不是承诺，也不能理解成可以保证无须补件。",
      "The source described an approval and a period of 38 days. Thirty-eight days is not a promise, and it is not an assurance that no further documents will be asked for."
    ),
  },
];

export const SCHEMES = [
  { href: "/insights/#ttps", title: STR["scheme.ttps"] },
  { href: "/insights/#qmas", title: STR["scheme.qmas"] },
  { href: "/asmtp/", title: STR["asmtp.meta"] },
  { href: "/iang/", title: STR["iang.meta"] },
  { href: "/insights/#cies", title: STR["scheme.cies"] },
  { href: "/insights/#study", title: STR["scheme.study"] },
  { href: "/insights/#ep", title: STR["scheme.ep"] },
  { href: "/insights/#owp", title: STR["scheme.owp"] },
  { href: "/insights/#csp", title: STR["scheme.csp"] },
  { href: "/insights/#tr", title: STR["scheme.tr"] },
  { href: "/insights/#mt", title: STR["scheme.mt"] },
  { href: "/insights/#eb1", title: STR["scheme.eb1"] },
];

const langs = ["hant", "hans", "en"];
for (const [key, value] of Object.entries(STR)) {
  for (const lang of langs) {
    if (typeof value[lang] !== "string" || value[lang].trim() === "") {
      throw new Error("Missing " + lang + " for " + key);
    }
  }
}
for (const lang of langs) {
  if (!RENEWAL_DIAGNOSIS_LABEL[lang]) throw new Error("label missing " + lang);
}
if (POLICIES.length !== 12) throw new Error("Expected 12 current policies, got " + POLICIES.length);
if (CASES.length !== 4) throw new Error("Expected 4 cases");
