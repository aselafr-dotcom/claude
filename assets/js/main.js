(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = (u) => (typeof u === "string" && /^(https?:|mailto:|tel:|#|assets\/)/i.test(u.trim()) ? u.trim() : "");
  const pad = (n) => String(n).padStart(2, "0");
  const slideSrc = (n) => `assets/slides/slide-${pad(n)}.jpg`;
  const slideTitle = (n) => (D.slideTitles && D.slideTitles[n]) || `Slide ${n}`;
  const slideFromUrl = (u) => {
    const m = /^assets\/slides\/slide-(\d+)\.jpg$/.exec(u || "");
    return m ? Number(m[1]) : null;
  };
  const compact = (v) => (v >= 1e6 ? `${(v / 1e6).toFixed(2)}M` : v >= 1e4 ? `${Math.round(v / 1e3)}K` : v >= 1e3 ? `${(v / 1e3).toFixed(1)}K` : String(v));

  /* ---------- Icons (24px line icons, drawn inline) ---------- */
  const ICONS = {
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 3v4M17 5h4"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    bar: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
    trending: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>',
    grad: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    up: '<path d="M7 17 17 7M7 7h10v10"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    paw: '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.05Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M8 16H3v5"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  };
  const icon = (name) =>
    ICONS[name]
      ? `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`
      : "";
  // Bare placeholders become the icon itself; styled wrappers (with a class) keep their box and get the icon inside.
  const fillIcons = (root = document) =>
    $$("[data-icon]", root).forEach((el) => {
      if (el.firstChild) return;
      if (el.className) el.innerHTML = icon(el.dataset.icon);
      else el.outerHTML = icon(el.dataset.icon);
    });

  const SKILL_ICONS = ["compass", "target", "megaphone", "wallet", "monitor", "zap", "bar", "users", "camera"];
  const STEP_ICONS = ["search", "compass", "rocket", "refresh"];

  // One link renderer for every kind of evidence. Links without a URL are left out of the public page.
  function link(ev, cls = "pill-link") {
    const url = safeUrl(ev.url);
    if (!url) return "";
    const n = slideFromUrl(url);
    if (n) return `<button type="button" class="${cls}" data-slide="${n}">${esc(ev.label)} ⤢</button>`;
    if (url.startsWith("#")) return `<a class="${cls}" href="${esc(url)}">${esc(ev.label)} ↓</a>`;
    const ic = /instagram/i.test(url) ? icon("instagram") : icon("globe");
    return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${cls ? ic : ""}${esc(ev.label)} ↗</a>`;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const o = D.owner;
    document.title = `${o.name} Portfolio`;
    $$('[data-bind="name"]').forEach((el) => (el.textContent = o.name));
    $("#availability").textContent = o.availability;
    $("#heroName").textContent = `${o.name} · ${o.title}`;
    $("#heroHeadline").textContent = o.headline;
    $("#heroIntro").textContent = o.intro;
    $("#portrait").src = o.portrait;
    const facts = [o.location, "12+ years", ...(o.facts || []).slice(0, 2)];
    $("#heroFacts").innerHTML = facts.map((f) => `<li>${esc(f)}</li>`).join("");
  }

  /* ---------- Logos ---------- */
  function renderLogos() {
    const tile = (l, freelance) => {
      if (freelance) {
        return `<div class="logo-tile"><span class="mono">${icon(l.icon || "briefcase")}</span><div><div class="wm">${esc(l.name)}</div><small>${esc(l.note)}</small></div></div>`;
      }
      return l.logo
        ? `<div class="logo-tile" title="${esc(l.name)}"><img src="${esc(l.logo)}" alt="${esc(l.name)} logo"><small>${esc(l.note)}</small></div>`
        : `<div class="logo-tile"><div class="wm">${esc(l.name)}</div><small>${esc(l.note)}</small></div>`;
    };
    $("#logosCompany").innerHTML = D.logos.company.map((l) => tile(l, false)).join("");
    $("#logosFreelance").innerHTML = D.logos.freelance.map((l) => tile(l, true)).join("");
  }

  /* ---------- KPIs ---------- */
  const SCOPE_LABEL = { career: "Career", company: "Company", freelance: "Freelance" };
  function renderKpis() {
    $("#kpis").innerHTML = D.highlights
      .map((h) => {
        const src = h.source ? link(h.source, "") : "";
        return `<article class="kpi rv">
          <div class="kpi-top"><span class="kpi-icon">${icon(h.icon || "trending")}</span><span class="scope ${esc(h.scope)}">${esc(SCOPE_LABEL[h.scope] || "")}</span></div>
          <div class="kpi-value" data-count="${esc(h.value)}">${esc(h.value)}</div>
          <p class="kpi-label">${esc(h.label)}</p>
          <p class="kpi-note">${esc(h.note)}</p>
          <p class="kpi-src">${src ? `Source: ${src}` : "Report available on request"}</p>
        </article>`;
      })
      .join("");
  }

  /* ---------- Company: case cards ---------- */
  function renderCases() {
    $("#caseGrid").innerHTML = D.caseStudies
      .map((c, i) => `<button type="button" class="case-card rv" data-case="${esc(c.id)}" style="--d:${i * 80}ms">
        <div class="case-photo">
          <img src="${esc(c.cover)}" alt="${esc(c.client)} website and campaign visuals" width="320" height="295">
          <span class="case-logo"><img src="${esc(c.logo)}" alt="${esc(c.client)} logo"></span>
        </div>
        <div class="case-body">
          <p class="case-meta">${esc(c.sector)}</p>
          <h3>${esc(c.client)}</h3>
          <p class="case-outcome">${esc(c.outcome)}</p>
          <div class="case-foot">
            <div class="tags">${(c.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            <span class="go" aria-hidden="true">${icon("arrow")}</span>
          </div>
        </div>
      </button>`)
      .join("");
  }

  /* ---------- Company: earlier role photo story ---------- */
  function renderStory() {
    const s = D.earlierWork;
    if (!s) return;
    $("#earlierCompany").textContent = s.company;
    $("#story").innerHTML = `
      <div class="story-copy rv">
        <p class="eyebrow on-dark">${icon("video")}${esc(s.role)}</p>
        <h4>${esc(s.title)}</h4>
        <p>${esc(s.text)}</p>
        <div class="story-stat"><b data-count="${esc(s.stat.value)}">${esc(s.stat.value)}</b><span>${esc(s.stat.label)}</span></div>
        <button type="button" class="pill-link" data-slide="${s.slide}" style="align-self:flex-start;background:transparent;color:#fff;border-color:rgba(255,255,255,.25)">${icon("eye")}See all six videos</button>
      </div>
      <div class="story-photos">${s.photos
        .map((p, i) => `<button type="button" class="photo rv" style="--d:${i * 90}ms" data-src="${esc(p.src)}" data-caption="${esc(s.company)} TikTok: ${esc(p.views)} views">
            <img src="${esc(p.src)}" alt="${esc(s.company)} TikTok video still" width="157" height="200">
            <span class="views">${icon("play")}${esc(p.views)}</span>
          </button>`)
        .join("")}</div>`;
  }

  /* ---------- Company: samples ---------- */
  let filter = "All";
  const samples = [...D.galleries.strategy, ...D.galleries.content].filter((s) => s.slide !== (D.earlierWork && D.earlierWork.slide));
  function renderSamples() {
    const cats = ["All", ...new Set(samples.map((s) => s.cat))];
    $("#filters").innerHTML = cats
      .map((c) => `<button type="button" role="tab" data-filter="${esc(c)}" aria-selected="${c === filter}">${esc(c)}</button>`)
      .join("");
    $("#sampleGrid").innerHTML = samples
      .map((s) => `<figure class="sample rv" data-cat="${esc(s.cat)}">
          <button type="button" class="shot" data-slide="${s.slide}" aria-label="View: ${esc(s.title)}">
            <img src="${slideSrc(s.slide)}" alt="${esc(slideTitle(s.slide))}" width="596" height="335">
            <span class="zoom" aria-hidden="true">⤢</span>
          </button>
          <figcaption><span class="cat">${esc(s.cat)}</span><b>${esc(s.title)}</b><span>${esc(s.note)}</span></figcaption>
        </figure>`)
      .join("");
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    filter = b.dataset.filter;
    $$("#filters button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    $$("#sampleGrid .sample").forEach((el, i) => {
      const show = filter === "All" || el.dataset.cat === filter;
      el.classList.toggle("hide", !show);
      el.classList.remove("pre", "in", "enter");
      if (show && !reduceMotion) {
        void el.offsetWidth;
        el.style.animationDelay = `${(i % 6) * 50}ms`;
        el.classList.add("enter");
      }
    });
  });

  /* ---------- Case sheet ---------- */
  const sheet = $("#caseSheet");
  function openCase(id) {
    const c = D.caseStudies.find((x) => x.id === id);
    if (!c) return;
    const slides = [c.hero, ...c.gallery];
    $("#sheetBody").innerHTML = `
      <div class="sheet-top">
        <div style="display:flex;gap:16px;align-items:center">
          <span class="case-logo" style="position:static;box-shadow:0 0 0 1px var(--line)"><img src="${esc(c.logo)}" alt=""></span>
          <div>
            <p class="eyebrow">${icon("building")}Company work · ${esc(c.context)}</p>
            <h2 id="sheetTitle">${esc(c.client)}</h2>
          </div>
        </div>
        <button type="button" class="icon-btn sheet-close" data-close aria-label="Close">✕</button>
      </div>
      <p class="hero-intro" style="color:var(--text);margin:0;max-width:none">${esc(c.overview)}</p>
      <div class="sheet-results">${c.results.map((r) => `<div class="sr"><b>${esc(r.value)}</b><span>${esc(r.label)}</span></div>`).join("")}</div>
      <div class="viewer">
        <div class="viewer-main"><img id="viewerImg" src="${slideSrc(slides[0])}" alt="${esc(slideTitle(slides[0]))}" data-slide="${slides[0]}"></div>
        <div class="thumbs">${slides
          .map((n, i) => `<button type="button" data-thumb="${n}" aria-current="${i === 0}" aria-label="${esc(slideTitle(n))}"><img src="${slideSrc(n)}" alt=""></button>`)
          .join("")}</div>
      </div>
      <div class="sheet-cols">
        <div><h4>Scope of work</h4><ul class="ticks">${c.scope.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div><h4>Strategy</h4><ul class="ticks">${c.strategy.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
      ${c.links?.length ? `<div><h4>Live links</h4><div class="sheet-links">${c.links.map((l) => link(l)).join("")}</div></div>` : ""}`;
    sheet.showModal();
    sheet.scrollTop = 0;
  }
  sheet.addEventListener("click", (e) => {
    if (e.target === sheet || e.target.closest("[data-close]")) return sheet.close();
    const th = e.target.closest("[data-thumb]");
    if (th) {
      const n = Number(th.dataset.thumb);
      const img = $("#viewerImg");
      img.src = slideSrc(n);
      img.alt = slideTitle(n);
      img.dataset.slide = n;
      $$("[data-thumb]", sheet).forEach((b) => b.setAttribute("aria-current", String(b === th)));
    }
  });
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-case]");
    if (card) openCase(card.dataset.case);
  });

  /* ---------- Freelance: Bolt's Family ---------- */
  const bolts = D.freelance.find((f) => f.id === "bolts-family");
  let metric = "reach";
  let sortKey = "n";

  function renderBolts() {
    if (!bolts) return;
    $("#boltsHead").innerHTML = `
      <span class="mono">${icon(bolts.icon)}</span>
      <div><h3>${esc(bolts.client)}</h3><p>${esc(bolts.category)} · ${esc(bolts.period)}</p></div>
      <div class="tags"><span class="tag tag-ico">${icon("code")}Website + SEO</span><span class="tag tag-ico">${icon("megaphone")}Meta Ads</span></div>`;

    const w = bolts.website;
    if (w) {
      const url = safeUrl(w.url);
      $("#boltsWeb").innerHTML = `
        <button type="button" class="web-shot rv" data-src="${esc(w.image)}" data-caption="${esc(w.title)}"><img src="${esc(w.image)}" alt="Bolt's Family website project overview" width="376" height="532"></button>
        <div class="web-copy rv">
          <p class="eyebrow">${icon("monitor")}Website design & development</p>
          <h4>${esc(w.title)}</h4>
          <p>${esc(w.text)}</p>
          <ul class="feature-list">${w.features.map((f) => `<li>${icon("check")}<span>${esc(f)}</span></li>`).join("")}</ul>
          ${url ? `<div><a class="btn btn-ink" href="${esc(url)}" target="_blank" rel="noopener">${icon("globe")}Visit boltsfamily.ae ↗</a></div>` : ""}
        </div>`;
    }

    $("#dashSub").textContent = bolts.challenge;
    const r = bolts.results;
    const kpis = [
      { v: r[1].value, l: "Messaging conversations started", i: "message" },
      { v: "AED 5.54", l: "Average cost per conversation", i: "wallet" },
      { v: r[0].value, l: "Ad spend managed", i: "bar" },
      { v: r[2].value, l: "Meta accounts reached", i: "users" },
    ];
    $("#dashKpis").innerHTML = kpis
      .map((k) => `<div class="dk rv"><span class="dk-ic">${icon(k.i)}</span><div class="dk-value" data-count="${esc(k.v)}">${esc(k.v)}</div><p class="dk-label">${esc(k.l)}</p></div>`)
      .join("");

    const series = bolts.trend.series;
    $("#metricTabs").innerHTML = Object.entries(series)
      .map(([key, s]) => `<button type="button" role="tab" data-metric="${key}" aria-selected="${key === metric}">${esc(s.label)}</button>`)
      .join("");
    $("#barsNote").textContent = bolts.trend.footnote || "";
    drawBars(true);

    const widths = [100, 72, 46];
    $("#funnel").innerHTML = bolts.funnel
      .map((s, i) => `<div class="f-step">
          <div class="f-bar" style="--w:${widths[i]}%"><span>${esc(s.label)}</span><b>${s.value.toLocaleString("en-US")}</b></div>
          ${s.note ? `<p class="f-note">↓ ${esc(s.note)}</p>` : ""}
        </div>`)
      .join("");
    drawCamps();
  }

  function drawBars(initial) {
    const s = bolts.trend.series[metric];
    const vals = s.values;
    const max = Math.max(...vals);
    const peak = vals.indexOf(max);
    const wrap = $("#bars");
    wrap.setAttribute("aria-label", `${s.label} by month: ${vals.map((v, i) => `${bolts.trend.labels[i]} ${s.unit}${v.toLocaleString("en-US")}`).join(", ")}`);
    if (initial || wrap.children.length !== vals.length) {
      wrap.innerHTML = vals
        .map((v, i) => `<div class="bar"><span class="val"></span><span class="fill"></span><span class="mon">${esc(bolts.trend.labels[i])}</span></div>`)
        .join("");
    }
    [...wrap.children].forEach((bar, i) => {
      bar.classList.toggle("peak", i === peak);
      bar.style.setProperty("--h", `${Math.max(1, (vals[i] / max) * 100)}%`);
      bar.title = `${bolts.trend.labels[i]}: ${s.unit}${vals[i].toLocaleString("en-US")}`;
      $(".val", bar).textContent = `${s.unit}${compact(vals[i])}`;
    });
  }

  function drawCamps() {
    const list = [...bolts.campaigns].sort((a, b) => (sortKey === "n" ? b.n - a.n : a.cpr - b.cpr));
    const maxN = Math.max(...list.map((c) => c.n));
    const box = $("#camps");
    box.innerHTML = list
      .map((c) => `<div class="camp">
          <div><p class="camp-name">${esc(c.name)}</p><p class="camp-spend">${esc(c.spend)} spent</p></div>
          <div class="camp-meter"><div class="camp-track"><div class="camp-fill" style="--w:0%" data-w="${(c.n / maxN) * 100}"></div></div><p class="camp-res">${esc(c.result)}</p></div>
          <div class="camp-cost"><b>${esc(c.cost)}</b>per result</div>
        </div>`)
      .join("");
    requestAnimationFrame(() => requestAnimationFrame(() => $$(".camp-fill", box).forEach((el) => el.style.setProperty("--w", `${el.dataset.w}%`))));
  }
  $("#metricTabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-metric]");
    if (!b) return;
    metric = b.dataset.metric;
    $$("#metricTabs button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    drawBars(false);
  });
  $("#sortTabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sort]");
    if (!b) return;
    sortKey = b.dataset.sort;
    $$("#sortTabs button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    drawCamps();
  });

  /* ---------- Freelance: other clients ---------- */
  function renderOtherClients() {
    const others = D.freelance.filter((f) => f.id !== "bolts-family");
    $("#otherClients").innerHTML = others
      .map((f) => {
        if (f.image) {
          return `<article class="client-card rv" id="${esc(f.id)}">
            <button type="button" class="photo" data-src="${esc(f.image)}" data-caption="${esc(f.title)}"><img src="${esc(f.image)}" alt="${esc(f.client)} Instagram grid with concert photos" width="400" height="332"></button>
            <div class="client-card-body">
              <div class="client-head" style="gap:12px"><span class="mono">${icon(f.icon)}</span><div><h3>${esc(f.client)}</h3><p class="sub">${esc(f.category)}</p></div></div>
              <h4>${esc(f.title)}</h4>
              <p>${esc(f.text)}</p>
              <div class="tags">${(f.services || []).map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
            </div>
          </article>`;
        }
        return `<article class="client-card compact rv" id="${esc(f.id)}">
          <div class="client-head" style="gap:12px"><span class="mono">${icon(f.icon || "briefcase")}</span><div><h3 style="font-size:22px">${esc(f.client)}</h3><p class="sub" style="font-size:13.5px;color:var(--muted)">${esc(f.category)} · Freelance client</p></div></div>
          <p style="color:var(--muted);font-size:15px">Work samples and results for this client are shared on request.</p>
          <a class="pill-link" href="#contact" style="justify-self:start">${icon("message")}Ask about this project</a>
        </article>`;
      })
      .join("");
  }

  /* ---------- Process ---------- */
  function renderSteps() {
    $("#steps").innerHTML = (D.process || [])
      .map((s, i) => `<li class="step rv" style="--d:${i * 90}ms"><span class="step-ic">${icon(STEP_ICONS[i] || "check")}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
      .join("");
  }

  /* ---------- Timeline ---------- */
  function renderTimeline() {
    $("#timeline").innerHTML = D.experience
      .map((e, i) => {
        const hl = e.metrics?.length ? `${e.metrics[0].value} ${e.metrics[0].label}` : e.focus?.[0] || "";
        const ev = (e.evidence || []).map((x) => link(x)).filter(Boolean).join("");
        return `<details class="role rv" ${i === 0 ? "open" : ""}>
          <summary>
            <span class="role-when">${esc(e.period)}</span>
            <div class="role-what">
              <h3>${esc(e.role)}</h3>
              <p>${esc(e.company)} · ${esc(e.location)}</p>
              ${hl ? `<span class="role-highlight">${esc(hl)}</span>` : ""}
            </div>
            <span class="plus" aria-hidden="true">+</span>
          </summary>
          <div class="role-body">
            <div></div>
            <div>
              <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
              ${e.brands?.length ? `<div class="brands">${e.brands.map((b) => `<span class="tag">${esc(b)}</span>`).join("")}</div>` : ""}
              ${ev ? `<div class="ev-row">${ev}</div>` : ""}
            </div>
          </div>
        </details>`;
      })
      .join("");
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    $("#skillGrid").innerHTML = D.skills
      .map((g, i) => `<div class="skill rv" style="--d:${(i % 3) * 70}ms"><h3><span class="skill-ic">${icon(SKILL_ICONS[i] || "check")}</span>${esc(g.group)}</h3><div class="tags">${g.items.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div></div>`)
      .join("");
    $("#certList").innerHTML = D.certifications.map((c) => `<li><b>${esc(c.title)}</b><span>${esc(c.issuer)}</span></li>`).join("");
    $("#eduList").innerHTML = (D.education || [])
      .map((e) => `<li><b>${esc(e.title)}</b><span>${esc(e.institution)}</span>${e.status ? `<span class="${/progress/i.test(e.status) ? "now" : ""}">${esc(e.status)}</span>` : ""}</li>`)
      .join("");
    const w = safeUrl(D.credentialWallet);
    if (w) $("#walletLink").href = w;
    else $("#walletLink").remove();
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    const o = D.owner;
    $("#contactSub").textContent = `${o.availability}. Based in ${o.location}.`;
    $("#contactFacts").innerHTML = (o.facts || []).map((f) => `<li>${esc(f)}</li>`).join("");
    const row = (ic, label, value) =>
      `<div class="c-row"><div class="c-left"><span class="c-ic">${icon(ic)}</span><div><small>${esc(label)}</small><strong>${esc(value)}</strong></div></div><button type="button" class="btn btn-light" data-copy="${esc(value)}">${icon("copy")}Copy</button></div>`;
    const rows = [];
    if (o.email) rows.push(row("mail", "Email", o.email));
    if (o.phone) rows.push(row("phone", "Phone / WhatsApp", o.phone));
    const btns = [
      safeUrl(o.whatsapp) && `<a class="btn btn-mint" href="${esc(o.whatsapp)}" target="_blank" rel="noopener">${icon("message")}WhatsApp</a>`,
      safeUrl(o.linkedin) && `<a class="btn btn-light" href="${esc(o.linkedin)}" target="_blank" rel="noopener">${icon("linkedin")}LinkedIn</a>`,
      safeUrl(D.behance?.url) && `<a class="btn btn-ghost" href="${esc(D.behance.url)}" target="_blank" rel="noopener">${icon("layers")}Behance</a>`,
      safeUrl(D.credentialWallet) && `<a class="btn btn-ghost" href="${esc(D.credentialWallet)}" target="_blank" rel="noopener">${icon("award")}Certificates</a>`,
      safeUrl(o.cv) && `<a class="btn btn-light" href="${esc(o.cv)}" target="_blank" rel="noopener">Download CV</a>`,
    ].filter(Boolean);
    $("#contactActions").innerHTML = rows.join("") + `<div class="c-btns">${btns.join("")}</div>`;
    $("#footerText").textContent = `© ${o.year} ${o.name} · ${o.title} · ${o.location}`;
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 2200);
  }
  document.addEventListener("click", async (e) => {
    const c = e.target.closest("[data-copy]");
    if (!c) return;
    const text = c.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      toast(`Copied ${text}`);
    } catch {
      const strong = c.parentElement.querySelector("strong");
      if (strong) {
        const r = document.createRange();
        r.selectNodeContents(strong);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
      toast("Selected. Press Ctrl+C or ⌘C to copy");
    }
  });

  /* ---------- Image viewer: slides and photos ---------- */
  function wireLightbox() {
    const box = $("#lightbox");
    let items = [];
    let pos = 0;
    const toItem = (el) =>
      el.dataset.slide
        ? { src: slideSrc(Number(el.dataset.slide)), caption: slideTitle(Number(el.dataset.slide)), key: `s${el.dataset.slide}` }
        : { src: el.dataset.src, caption: el.dataset.caption || "", key: el.dataset.src };
    const show = (i) => {
      pos = (i + items.length) % items.length;
      $("#lbImg").src = items[pos].src;
      $("#lbImg").alt = items[pos].caption;
      $("#lbCaption").textContent = items[pos].caption;
      $("#lbCount").textContent = `${pos + 1} / ${items.length}`;
    };
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-slide], [data-src]");
      if (!el || e.target.closest("#lightbox")) return;
      e.preventDefault();
      if (el.closest("#caseSheet")) {
        items = $$("[data-thumb]", sheet).map((b) => ({ src: slideSrc(Number(b.dataset.thumb)), caption: slideTitle(Number(b.dataset.thumb)), key: `s${b.dataset.thumb}` }));
      } else {
        const section = el.closest("section") || document;
        const seen = new Set();
        items = $$("[data-slide], [data-src]", section)
          .filter((x) => !x.closest(".sample.hide"))
          .map(toItem)
          .filter((it) => (seen.has(it.key) ? false : seen.add(it.key)));
      }
      const cur = toItem(el);
      let idx = items.findIndex((it) => it.key === cur.key);
      if (idx < 0) { items.unshift(cur); idx = 0; }
      show(idx);
      box.showModal();
    });
    $("#lbClose").addEventListener("click", () => box.close());
    $("#lbPrev").addEventListener("click", () => show(pos - 1));
    $("#lbNext").addEventListener("click", () => show(pos + 1));
    box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(pos - 1);
      if (e.key === "ArrowRight") show(pos + 1);
    });
  }

  /* ---------- Motion ---------- */
  function countUp(el) {
    const raw = el.dataset.count || el.textContent;
    const m = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/.exec(raw);
    if (!m || reduceMotion) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const useComma = num.includes(",") || target >= 10000;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / 1400);
      const v = target * (1 - Math.pow(1 - p, 3));
      const txt = decimals ? v.toFixed(decimals) : Math.round(v).toString();
      el.textContent = pre + (useComma ? Number(txt).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : txt) + post;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  }

  function wireMotion() {
    if (reduceMotion) return;
    // Only content that starts below the fold is hidden for its entrance, so the first view is always complete.
    const fold = window.innerHeight;
    const revealables = $$(".rv, .section-head, .part-head, .sub-head, .dash, .contact, .creds, .logo-group");
    revealables.forEach((el) => {
      if (el.getBoundingClientRect().top > fold) el.classList.add("rv", "pre");
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        if (el.classList.contains("pre")) { el.classList.remove("pre"); el.classList.add("in"); }
        $$("[data-count]", el).forEach((n) => { if (!n.dataset.done) { n.dataset.done = 1; countUp(n); } });
        io.unobserve(el);
      }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    revealables.forEach((el) => io.observe(el));

    const dash = $(".dash");
    const bars = $$("#bars .bar");
    const funnelBars = $$("#funnel .f-bar");
    if (dash && dash.getBoundingClientRect().top > fold) {
      bars.forEach((b) => { b.dataset.h = b.style.getPropertyValue("--h"); b.style.setProperty("--h", "0%"); });
      funnelBars.forEach((b) => { b.dataset.w = b.style.getPropertyValue("--w"); b.style.setProperty("--w", "8%"); });
      const dio = new IntersectionObserver((en) => {
        if (!en.some((x) => x.isIntersecting)) return;
        bars.forEach((b, i) => setTimeout(() => b.style.setProperty("--h", b.dataset.h), i * 70));
        funnelBars.forEach((b, i) => setTimeout(() => b.style.setProperty("--w", b.dataset.w), 200 + i * 160));
        dio.disconnect();
      }, { threshold: 0.2 });
      dio.observe(dash);
    }
  }

  /* ---------- Nav ---------- */
  function wireNav() {
    const nav = $("#nav");
    const btn = $("#menuBtn");
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close" : "Menu";
    });
    $$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Menu";
    }));
    const bar = $("#progress");
    const onScroll = () => {
      const h = document.documentElement;
      bar.style.width = `${(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100}%`;
      nav.classList.toggle("scrolled", h.scrollTop > 8);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const links = $$("#navLinks a");
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
      }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    $$("main section[id]").forEach((s) => spy.observe(s));
  }

  /* ---------- Draft note for the owner (open the page with #draft) ---------- */
  function renderDraftNote() {
    if (location.hash !== "#draft") return;
    let links = 0;
    (function walk(v, key) {
      if (typeof v === "string") { if (key === "url" && !v.trim()) links++; }
      else if (Array.isArray(v)) v.forEach((x) => walk(x));
      else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walk(x, k));
    })(D);
    const note = $("#dataNote");
    note.hidden = false;
    note.textContent = `Draft view: ${links} links are still empty in assets/js/portfolio-data.js. Empty links are hidden from visitors.`;
  }

  fillIcons();
  renderHero();
  renderLogos();
  renderKpis();
  renderCases();
  renderStory();
  renderSamples();
  renderBolts();
  renderOtherClients();
  renderSteps();
  renderTimeline();
  renderSkills();
  renderContact();
  renderDraftNote();
  wireLightbox();
  wireNav();
  wireMotion();
})();
