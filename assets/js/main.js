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

  // One link renderer for every kind of evidence. Links without a URL are left out of the public page.
  function link(ev, cls = "pill-link") {
    const url = safeUrl(ev.url);
    if (!url) return "";
    const n = slideFromUrl(url);
    if (n) return `<button type="button" class="${cls}" data-slide="${n}">${esc(ev.label)} ⤢</button>`;
    if (url.startsWith("#")) return `<a class="${cls}" href="${esc(url)}">${esc(ev.label)} ↓</a>`;
    return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${esc(ev.label)} ↗</a>`;
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
    const wa = safeUrl(o.whatsapp);
    if (wa) $("#heroWhatsApp").href = wa;
    const facts = [o.location, "12+ years", ...(o.facts || []).slice(0, 2)];
    $("#heroFacts").innerHTML = facts.map((f) => `<li>${esc(f)}</li>`).join("");
    const names = (D.clients || []).map((c) => `<span>${esc(c)}</span>`).join("");
    $("#clients").innerHTML = names + names.replace(/<span>/g, '<span aria-hidden="true">');
  }

  /* ---------- KPIs ---------- */
  function renderKpis() {
    $("#kpis").innerHTML = D.highlights
      .map((h) => {
        const src = h.source ? link(h.source, "") : "";
        return `<article class="kpi rv">
          <span class="accent" aria-hidden="true"></span>
          <div class="kpi-value" data-count="${esc(h.value)}">${esc(h.value)}</div>
          <p class="kpi-label">${esc(h.label)}</p>
          <p class="kpi-note">${esc(h.note)}</p>
          <p class="kpi-src">${src ? `Source: ${src}` : "Report available on request"}</p>
        </article>`;
      })
      .join("");
  }

  /* ---------- Work cards ---------- */
  function sparkline(values) {
    const max = Math.max(...values);
    const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${40 - (v / max) * 36}`).join(" ");
    return `<svg viewBox="0 0 100 42" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${pts}" fill="none" stroke="#7bf0a6" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
    </svg>`;
  }

  function renderWork() {
    const bolts = D.freelance.find((f) => f.id === "bolts-family");
    const cards = D.caseStudies.map(
      (c) => `<button type="button" class="work-card rv" data-case="${esc(c.id)}">
        <div class="work-media"><img src="${slideSrc(c.hero)}" alt="${esc(slideTitle(c.hero))}" width="596" height="335"></div>
        <div class="work-body">
          <p class="work-meta">${esc(c.sector)} · ${esc(c.context)}</p>
          <h3>${esc(c.client)}</h3>
          <p class="work-outcome">${esc(c.outcome)}</p>
          <div class="work-foot">
            <div class="tags">${(c.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            <span class="go" aria-hidden="true">→</span>
          </div>
        </div>
      </button>`
    );
    if (bolts) {
      cards.push(`<a class="work-card rv" href="#results">
        <div class="work-media"><div class="spark-art">
          <div><b>${esc(bolts.results[1].value)}</b><br><span>WhatsApp conversations from Meta ads</span></div>
          ${sparkline(bolts.trend.values)}
        </div></div>
        <div class="work-body">
          <p class="work-meta">${esc(bolts.category)} · Freelance</p>
          <h3>${esc(bolts.client)}</h3>
          <p class="work-outcome">AED ${esc(bolts.results[0].value.replace(/^AED\s*/, ""))} in Meta ads turned into ${esc(bolts.results[1].value)} sales chats</p>
          <div class="work-foot">
            <div class="tags"><span class="tag">Paid social</span><span class="tag">WhatsApp</span><span class="tag">Live data</span></div>
            <span class="go" aria-hidden="true">↓</span>
          </div>
        </div>
      </a>`);
    }
    $("#workGrid").innerHTML = cards.join("");
  }

  /* ---------- Case sheet ---------- */
  const sheet = $("#caseSheet");

  function openCase(id) {
    const c = D.caseStudies.find((x) => x.id === id);
    if (!c) return;
    const slides = [c.hero, ...c.gallery];
    $("#sheetBody").innerHTML = `
      <div class="sheet-top">
        <div>
          <p class="eyebrow">${esc(c.sector)} · ${esc(c.context)}</p>
          <h2 id="sheetTitle">${esc(c.client)}</h2>
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

  /* ---------- Dashboard ---------- */
  const bolts = D.freelance.find((f) => f.id === "bolts-family");
  let metric = "reach";
  let sortKey = "n";

  function renderDash() {
    if (!bolts) return;
    $("#dashSub").textContent = `${bolts.category} · ${bolts.period}. ${bolts.challenge}`;
    const r = bolts.results;
    const kpis = [
      { v: r[1].value, l: "Messaging conversations started" },
      { v: "AED 5.54", l: "Average cost per conversation" },
      { v: r[0].value, l: "Ad spend managed" },
      { v: r[2].value, l: "Meta accounts reached" },
    ];
    $("#dashKpis").innerHTML = kpis
      .map((k) => `<div class="dk rv"><div class="dk-value" data-count="${esc(k.v)}">${esc(k.v)}</div><p class="dk-label">${esc(k.l)}</p></div>`)
      .join("");

    const series = bolts.trend.series;
    $("#metricTabs").innerHTML = Object.entries(series)
      .map(([key, s]) => `<button type="button" role="tab" data-metric="${key}" aria-selected="${key === metric}">${esc(s.label)}</button>`)
      .join("");
    $("#barsNote").textContent = bolts.trend.footnote || "";
    drawBars(true);

    const f = bolts.funnel;
    const widths = [100, 72, 46];
    $("#funnel").innerHTML = f
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
        .map((v, i) => `<div class="bar${i === peak ? " peak" : ""}" title="${esc(bolts.trend.labels[i])}: ${s.unit}${v.toLocaleString("en-US")}">
            <span class="val"></span><span class="fill"></span><span class="mon">${esc(bolts.trend.labels[i])}</span>
          </div>`)
        .join("");
    }
    [...wrap.children].forEach((bar, i) => {
      const h = Math.max(1, (vals[i] / max) * 100);
      bar.classList.toggle("peak", i === peak);
      bar.style.setProperty("--h", `${h}%`);
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

  /* ---------- Process ---------- */
  function renderSteps() {
    $("#steps").innerHTML = (D.process || [])
      .map((s, i) => `<li class="step rv" style="--d:${i * 90}ms"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
      .join("");
  }

  /* ---------- Samples ---------- */
  let filter = "All";
  const samples = [...D.galleries.strategy, ...D.galleries.content];

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
      .map((g, i) => `<div class="skill rv" style="--d:${(i % 3) * 70}ms"><h3>${esc(g.group)}</h3><div class="tags">${g.items.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div></div>`)
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
    const rows = [];
    if (o.email) rows.push(`<div class="c-row"><div><small>Email</small><strong>${esc(o.email)}</strong></div><button type="button" class="btn btn-light" data-copy="${esc(o.email)}">Copy</button></div>`);
    if (o.phone) rows.push(`<div class="c-row"><div><small>Phone / WhatsApp</small><strong>${esc(o.phone)}</strong></div><button type="button" class="btn btn-light" data-copy="${esc(o.phone)}">Copy</button></div>`);
    const btns = [
      safeUrl(o.whatsapp) && `<a class="btn btn-mint" href="${esc(o.whatsapp)}" target="_blank" rel="noopener">WhatsApp ↗</a>`,
      safeUrl(o.linkedin) && `<a class="btn btn-light" href="${esc(o.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`,
      safeUrl(D.behance?.url) && `<a class="btn btn-ghost" href="${esc(D.behance.url)}" target="_blank" rel="noopener">Behance ↗</a>`,
      safeUrl(D.credentialWallet) && `<a class="btn btn-ghost" href="${esc(D.credentialWallet)}" target="_blank" rel="noopener">Certificates ↗</a>`,
      safeUrl(o.cv) && `<a class="btn btn-light" href="${esc(o.cv)}" target="_blank" rel="noopener">Download CV ↗</a>`,
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

  /* ---------- Slide viewer ---------- */
  function wireLightbox() {
    const box = $("#lightbox");
    let order = [];
    let pos = 0;
    const show = (i) => {
      pos = (i + order.length) % order.length;
      const n = order[pos];
      $("#lbImg").src = slideSrc(n);
      $("#lbImg").alt = slideTitle(n);
      $("#lbCaption").textContent = slideTitle(n);
      $("#lbCount").textContent = `${pos + 1} / ${order.length}`;
    };
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-slide]");
      if (!el || e.target.closest("#lightbox")) return;
      e.preventDefault();
      const scope = el.closest("dialog") || document.querySelector("main");
      const inSheet = scope.id === "caseSheet";
      order = inSheet
        ? $$("[data-thumb]", scope).map((b) => Number(b.dataset.thumb))
        : [...new Set($$("[data-slide]", scope).filter((x) => !x.closest(".sample.hide")).map((x) => Number(x.dataset.slide)))];
      const n = Number(el.dataset.slide);
      if (!order.includes(n)) order.unshift(n);
      show(order.indexOf(n));
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
    const dur = 1400;
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const v = target * (1 - Math.pow(1 - p, 3));
      const txt = decimals ? v.toFixed(decimals) : Math.round(v).toString();
      el.textContent = pre + (useComma ? Number(txt).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : txt) + post;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  }

  function wireMotion() {
    // Only content that starts below the fold is hidden for its entrance, so the first view is always complete.
    const fold = window.innerHeight;
    const revealables = $$(".rv, .section-head, .dash, .contact, .creds");
    if (reduceMotion) return;
    revealables.forEach((el) => {
      if (el.getBoundingClientRect().top > fold) el.classList.add("rv", "pre");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          if (el.classList.contains("pre")) {
            el.classList.remove("pre");
            el.classList.add("in");
          }
          $$("[data-count]", el).forEach((n) => { if (!n.dataset.done) { n.dataset.done = 1; countUp(n); } });
          if (el.matches("[data-count]") && !el.dataset.done) { el.dataset.done = 1; countUp(el); }
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    revealables.forEach((el) => io.observe(el));

    // Charts grow when the dashboard first scrolls into view.
    const dash = $(".dash");
    const bars = $$("#bars .bar");
    const funnelBars = $$("#funnel .f-bar");
    const resetCharts = () => {
      bars.forEach((b) => { b.dataset.h = b.style.getPropertyValue("--h"); b.style.setProperty("--h", "0%"); });
      funnelBars.forEach((b) => { b.dataset.w = b.style.getPropertyValue("--w"); b.style.setProperty("--w", "8%"); });
    };
    const playCharts = () => {
      bars.forEach((b, i) => setTimeout(() => b.style.setProperty("--h", b.dataset.h), i * 70));
      funnelBars.forEach((b, i) => setTimeout(() => b.style.setProperty("--w", b.dataset.w), 200 + i * 160));
    };
    if (dash && dash.getBoundingClientRect().top > fold) {
      resetCharts();
      const dio = new IntersectionObserver((en) => {
        if (en.some((x) => x.isIntersecting)) { playCharts(); dio.disconnect(); }
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
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar.style.width = `${p * 100}%`;
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

  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-case]");
    if (card) openCase(card.dataset.case);
  });

  renderHero();
  renderKpis();
  renderWork();
  renderDash();
  renderSteps();
  renderSamples();
  renderTimeline();
  renderSkills();
  renderContact();
  renderDraftNote();
  wireLightbox();
  wireNav();
  wireMotion();
})();
