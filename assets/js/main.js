(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const isTbc = (v) => typeof v === "string" && /^TBC\b/i.test(v.trim());

  // Text that is still a placeholder gets a dashed outline so it is never read as a real result.
  const t = (v) => (isTbc(v) ? `<span class="tbc" title="Placeholder: update portfolio-data.js">${esc(v)}</span>` : esc(v));

  const safeUrl = (u) => (typeof u === "string" && /^(https?:|mailto:|tel:|#|\.?\/|assets\/)/i.test(u.trim()) ? u.trim() : "");

  const pad = (n) => String(n).padStart(2, "0");
  const slideSrc = (n) => `assets/slides/slide-${pad(n)}.jpg`;
  const slideTitle = (n) => (D.slideTitles && D.slideTitles[n]) || `Slide ${n}`;
  const slideFromUrl = (u) => {
    const m = /^assets\/slides\/slide-(\d+)\.jpg$/.exec(u || "");
    return m ? Number(m[1]) : null;
  };

  // A clickable slide image; the viewer opens it full size.
  const shot = (n, cls = "") =>
    `<button class="shot-btn ${cls}" type="button" data-open-slide="${n}" aria-label="View: ${esc(slideTitle(n))}">
      <img src="${slideSrc(n)}" alt="${esc(slideTitle(n))}" decoding="async" width="596" height="335">
      <span class="zoom" aria-hidden="true">⤢</span>
    </button>`;

  const EV_ICON = { report: "R", live: "L", behance: "Be", dashboard: "D", doc: "D", video: "V", press: "P", profile: "in", credential: "C", slide: "S", ads: "M" };
  const EV_NAME = { report: "Report", live: "Live link", behance: "Behance", dashboard: "Dashboard", doc: "Document", video: "Video", press: "Press", profile: "Profile", credential: "Credential", slide: "Slide", ads: "Ad account" };

  // "Label: detail" bullets get a bold label.
  const bullet = (b) => {
    const m = /^([^:]{3,48}):\s(.+)$/.exec(b);
    return m && !isTbc(b) ? `<b>${esc(m[1])}:</b> ${esc(m[2])}` : t(b);
  };

  function evLink(ev) {
    const url = safeUrl(ev.url);
    const ico = `<span class="ico">${EV_ICON[ev.type] || "↗"}</span>`;
    if (!url) return `<span class="ev pending" title="Link pending: add the URL in portfolio-data.js">${ico}${esc(ev.label)}</span>`;
    const n = slideFromUrl(url);
    if (n) return `<button class="ev" type="button" data-open-slide="${n}">${ico}${esc(ev.label)} ⤢</button>`;
    if (url.startsWith("#")) return `<a class="ev" href="${esc(url)}">${ico}${esc(ev.label)} ↓</a>`;
    return `<a class="ev" href="${esc(url)}" target="_blank" rel="noopener">${ico}${esc(ev.label)} ↗</a>`;
  }

  function sourceLink(src) {
    if (!src) return "";
    const url = safeUrl(src.url);
    if (!url) return `<span class="small">Source: ${esc(src.label)} (link pending)</span>`;
    const n = slideFromUrl(url);
    if (n) return `<button class="link-btn small" type="button" data-open-slide="${n}">Source: ${esc(src.label)} ⤢</button>`;
    if (url.startsWith("#")) return `<a class="small" href="${esc(url)}">Source: ${esc(src.label)} ↓</a>`;
    return `<a class="small" href="${esc(url)}" target="_blank" rel="noopener">Source: ${esc(src.label)} ↗</a>`;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const o = D.owner;
    document.title = `${o.name} Portfolio`;
    document.querySelectorAll('[data-bind="owner.brand"]').forEach((el) => (el.textContent = o.brand));
    document.querySelectorAll('[data-bind="owner.year"]').forEach((el) => (el.textContent = o.year));
    $("#heroTitle").innerHTML = `${esc(o.name)}<br>${esc(o.title)}`;
    $("#heroTags").innerHTML = (o.tagline || [])
      .map((x, i) => `<span class="pill ${i === 0 ? "mint" : "outline on-dark"}">${esc(x)}</span>`)
      .join("");
    $("#heroSummary").innerHTML = t(o.summary);
    $("#heroShot").innerHTML = shot(2);

    const tones = ["", "mint", "forest", "line"];
    $("#heroStats").innerHTML = D.highlights
      .map(
        (h, i) => `<div class="card ${tones[i % tones.length]}">
          <div class="stat">${t(h.value)}</div>
          <p style="font-weight:600">${esc(h.label)}</p>
          <p class="small">${t(h.note)}</p>
          ${sourceLink(h.source)}
        </div>`
      )
      .join("");
  }

  /* ---------- Work index ---------- */
  function renderIndex() {
    const bolts = D.freelance.find((f) => f.id === "bolts-family");
    const tiles = [
      ...D.caseStudies.map((c) => ({ href: `#${c.id}`, title: c.client, text: c.sector, slide: c.hero })),
      bolts && { href: "#bolts-family", title: bolts.client, text: "Freelance · Meta Ads", stat: bolts.results[1]?.value, statLabel: "WhatsApp conversations" },
      { href: "#strategy", title: "Strategy & Systems", text: "Campaign plans, automation, budgets", slide: D.galleries.strategy[0]?.slide },
      { href: "#content", title: "Social Content", text: "Real estate, FM, fintech, retail", slide: 19 },
    ].filter(Boolean);
    $("#workIndex").innerHTML = tiles
      .map((it, i) => {
        const media = it.slide
          ? `<img src="${slideSrc(it.slide)}" alt="" decoding="async" width="596" height="335">`
          : `<div class="stat-media"><span class="stat">${esc(it.stat)}</span><span class="small">${esc(it.statLabel)}</span></div>`;
        return `<a class="work-tile ${it.slide ? "" : "forest"}" href="${it.href}">
          <div class="work-media">${media}</div>
          <div class="work-label">
            <span class="time">${pad(i + 1)}</span>
            <h3>${esc(it.title)}</h3>
            <p class="small">${esc(it.text)}</p>
          </div>
        </a>`;
      })
      .join("");
  }

  /* ---------- In-house case studies ---------- */
  function renderCaseStudies() {
    $("#caseStudies").innerHTML = D.caseStudies
      .map(
        (c, i) => `<article class="study" id="${esc(c.id)}">
          <div class="study-head">
            <div class="tag-row">
              <span class="pill dark">Case ${pad(i + 1)}</span>
              <span class="pill">${esc(c.sector)}</span>
              <span class="pill outline">${esc(c.context)}</span>
            </div>
            <h3 class="case-title">${esc(c.client)}</h3>
          </div>
          <div class="study-body">
            <div class="study-hero">${shot(c.hero, "framed")}</div>
            <div class="study-text">
              <p class="quote">${esc(c.overview)}</p>
              <div class="grid cols-2 study-results">${c.results
                .map((r, j) => `<div class="card ${j ? "forest" : "mint"}"><div class="stat" style="font-size:30px">${esc(r.value)}</div><p class="small">${esc(r.label)}</p></div>`)
                .join("")}</div>
              <div class="case-block"><h4>Scope of work</h4><ul class="ticks">${c.scope.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
              <div class="case-block"><h4>Strategy</h4><ul class="ticks">${c.strategy.map((x) => `<li>${bullet(x)}</li>`).join("")}</ul></div>
              ${c.links?.length ? `<div class="evidence">${c.links.map(evLink).join("")}</div>` : ""}
            </div>
          </div>
          <div class="strip">${c.gallery.map((n) => `<figure>${shot(n)}<figcaption>${esc(slideTitle(n).replace(/^[^:]+:\s*/, ""))}</figcaption></figure>`).join("")}</div>
        </article>`
      )
      .join("");
  }

  /* ---------- Galleries ---------- */
  function renderGallery(sel, items) {
    $(sel).innerHTML = items
      .map((g, i) => `<figure class="${i === 0 ? "feature" : ""}">
          ${shot(g.slide)}
          <figcaption><b>${esc(g.title)}</b><span class="small">${esc(g.note)}</span></figcaption>
        </figure>`)
      .join("");
  }

  /* ---------- Experience ---------- */
  function renderExperience() {
    $("#expList").innerHTML = D.experience
      .map((e, i) => {
        const metrics = e.metrics?.length
          ? `<p class="small">Measured impact</p>
             <div class="metrics">${e.metrics
               .map((m) => `<div class="metric"><b>${t(m.value)}</b><span class="small">${t(m.label)}</span></div>`)
               .join("")}</div>`
          : "";
        const focus = e.focus?.length
          ? `<p class="small">Key focus</p>
             <div class="chips">${e.focus.map((f) => `<span class="chip on-forest">${t(f)}</span>`).join("")}</div>`
          : "";
        const evidence = e.evidence?.length ? `<div class="evidence">${e.evidence.map(evLink).join("")}</div>` : "";
        return `<article class="exp">
          <div class="card ${i === 0 ? "mint" : ""}">
            <span class="small" style="color:inherit;opacity:.7">${pad(i + 1)} · ${t(e.period)}</span>
            <h3 class="role">${t(e.role)}</h3>
            <p style="font-weight:600">${t(e.company)}</p>
            <p class="small" style="color:inherit;opacity:.7">${t(e.location)}</p>
            ${e.brands?.length ? `<div class="chips">${e.brands.map((x) => `<span class="chip" style="background:rgba(255,255,255,.55)">${esc(x)}</span>`).join("")}</div>` : ""}
          </div>
          <div class="card">
            <p style="font-weight:600">${t(e.summary)}</p>
            <ul>${e.bullets.map((x) => `<li>${bullet(x)}</li>`).join("")}</ul>
          </div>
          <div class="card forest">
            ${metrics}${focus}${evidence}
          </div>
        </article>`;
      })
      .join("");
  }

  /* ---------- Report chart ---------- */
  const compact = (v) => (v >= 1e6 ? `${(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `${Math.round(v / 1e3)}K` : String(v));

  function chart(trend) {
    const vals = (trend?.values || []).map(Number).filter((n) => Number.isFinite(n));
    if (vals.length < 2) {
      return `<div class="card line chart-card">
        <p style="font-weight:600">${t(trend?.metric || "Monthly trend")}</p>
        <p class="small">Report chart appears here once monthly figures are added to <code>trend.values</code>.</p>
      </div>`;
    }
    const labels = trend.labels || [];
    const W = 560, H = 220, P = 28, TOP = 24;
    const max = Math.max(...vals);
    const x = (i) => P + (i + 0.5) * ((W - P * 2) / vals.length);
    const y = (v) => H - P - (v / (max || 1)) * (H - P - TOP);
    const bw = Math.min(40, (W - P * 2) / vals.length - 14);
    const peak = vals.indexOf(max);
    const bars = vals
      .map((v, i) => {
        const top = y(v);
        return `<rect x="${x(i) - bw / 2}" y="${top}" width="${bw}" height="${Math.max(1, H - P - top)}" rx="6" fill="${i === peak ? "#1d4a31" : "#7bf0a6"}"><title>${esc(labels[i] || "")}: ${v.toLocaleString()}</title></rect>
          <text x="${x(i)}" y="${top - 6}" text-anchor="middle" font-size="11" fill="#2a2a2a">${compact(v)}</text>`;
      })
      .join("");
    const ticks = labels.map((l, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#6d6d6a">${esc(l)}</text>`).join("");
    return `<div class="card line chart-card">
      <p style="font-weight:600">${t(trend.metric)}</p>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(trend.metric)} chart">
        <line x1="${P}" x2="${W - P}" y1="${H - P}" y2="${H - P}" stroke="#e2e2de"/>
        ${bars}
        ${ticks}
      </svg>
      ${trend.footnote ? `<p class="small">${esc(trend.footnote)}</p>` : ""}
    </div>`;
  }

  /* ---------- Freelance ---------- */
  function renderFreelance() {
    const full = D.freelance.filter((f) => !f.pending);
    const pending = D.freelance.filter((f) => f.pending);

    const fullHtml = full
      .map((f, i) => {
        const quote = f.testimonial?.quote
          ? `<div class="card mint"><p class="quote">“${esc(f.testimonial.quote)}”</p><p class="small" style="color:#1b1b1b">${esc(f.testimonial.author)}</p></div>`
          : "";
        const table = f.campaigns?.length
          ? `<div class="case-block"><h4>Top campaigns</h4><div class="table-scroll"><table class="evidence-table camp-table">
              <thead><tr><th>Campaign</th><th>Spend</th><th>Result</th><th>Cost per result</th></tr></thead>
              <tbody>${f.campaigns.map((c) => `<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.spend)}</td><td>${esc(c.result)}</td><td><span class="pill mint">${esc(c.cost)}</span></td></tr>`).join("")}</tbody>
            </table></div></div>`
          : "";
        return `<article class="case" id="${esc(f.id)}">
          <div>
            <div class="tag-row">
              <span class="pill dark">Client ${pad(i + 1)}</span>
              <span class="pill">${t(f.category)}</span>
              <span class="pill outline">${t(f.period)}</span>
            </div>
            <h3 class="case-title">${esc(f.client)}</h3>
            <div class="tags">${f.services.map((s) => `<span class="chip">${t(s)}</span>`).join("")}</div>
            <div class="case-block" style="margin-top:20px"><h4>Challenge</h4><p>${t(f.challenge)}</p></div>
            <div class="case-block"><h4>Approach</h4><ol>${f.approach.map((a) => `<li>${t(a)}</li>`).join("")}</ol></div>
            ${f.source ? `<p class="source-note"><span class="pill forest">Live data</span> ${esc(f.source)}</p>` : ""}
            <div class="evidence">${f.evidence.map(evLink).join("")}</div>
          </div>
          <div>
            <div class="case-block"><h4>Results</h4>
              <div class="kpis">${f.results
                .map((r) => `<div class="kpi"><span class="label">${t(r.label)}</span><span class="value">${t(r.value)}</span><span class="small">${t(r.detail)}</span></div>`)
                .join("")}</div>
              ${chart(f.trend)}
            </div>
            ${quote ? `<div class="case-block">${quote}</div>` : ""}
          </div>
          <div class="case-wide">${table}</div>
        </article>`;
      })
      .join("");

    const pendingHtml = pending.length
      ? `<div class="pending-row">${pending
          .map((f) => `<article class="card line pending-card" id="${esc(f.id)}">
              <div class="tag-row"><span class="pill">${esc(f.category)}</span><span class="pill outline">Case study in progress</span></div>
              <h3 class="case-title" style="font-size:28px">${esc(f.client)}</h3>
              <p class="small">Results, creatives and reports for this client are being added.</p>
              <div class="evidence">${f.evidence.map(evLink).join("")}</div>
            </article>`)
          .join("")}</div>`
      : "";

    $("#caseList").innerHTML = fullHtml + pendingHtml;
  }

  /* ---------- Evidence library ---------- */
  function renderEvidence() {
    const rows = [];
    rows.push({ project: D.owner.name, sub: "Career history and recommendations", ev: { type: "profile", label: "LinkedIn profile", url: D.owner.linkedin } });
    if (D.credentialWallet) rows.push({ project: "Certifications", sub: `${D.certifications.length} verified credentials`, ev: { type: "credential", label: "Credential wallet", url: D.credentialWallet } });
    D.caseStudies.forEach((c) => {
      (c.links || []).forEach((ev) => rows.push({ project: c.client, sub: c.sector, ev }));
      [c.hero, ...c.gallery].forEach((n) => rows.push({ project: c.client, sub: "Portfolio slide", ev: { type: "slide", label: slideTitle(n), url: slideSrc(n) } }));
    });
    D.freelance.forEach((f) => {
      if (f.source) rows.push({ project: f.client, sub: "Freelance", ev: { type: "ads", label: f.source, url: `#${f.id}` } });
      (f.evidence || []).forEach((ev) => rows.push({ project: f.client, sub: "Freelance", ev }));
    });
    D.experience.forEach((e) => (e.evidence || []).forEach((ev) => rows.push({ project: e.company, sub: e.role, ev })));
    const seen = new Set(rows.map((r) => safeUrl(r.ev.url)).filter(Boolean));
    D.highlights.forEach((h) => {
      if (!h.source || seen.has(safeUrl(h.source.url))) return;
      rows.push({ project: "Key achievements", sub: `${h.value} ${h.label}`, ev: { type: "report", ...h.source } });
    });
    rows.push({ project: "Behance", sub: D.behance.projectTitle, ev: { type: "behance", label: D.behance.projectTitle, url: D.behance.url } });

    $("#evidenceRows").innerHTML = rows
      .map(({ project, sub, ev }) => {
        const url = safeUrl(ev.url);
        const tone = ev.type === "report" || ev.type === "ads" ? "mint" : ev.type === "behance" || ev.type === "profile" ? "dark" : ev.type === "credential" ? "forest" : "";
        const n = slideFromUrl(url);
        const doc = !url
          ? esc(ev.label)
          : n
          ? `<button class="link-btn" type="button" data-open-slide="${n}">${esc(ev.label)} ⤢</button>`
          : url.startsWith("#")
          ? `<a href="${esc(url)}">${esc(ev.label)} ↓</a>`
          : `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(ev.label)} ↗</a>`;
        return `<tr>
          <td class="type"><span class="pill ${tone}">${esc(EV_NAME[ev.type] || ev.type)}</span></td>
          <td><b>${t(project)}</b><br><span class="small">${t(sub)}</span></td>
          <td>${doc}</td>
          <td>${url ? '<span class="pill forest">Linked</span>' : '<span class="pill outline" style="color:#9a9a96">Pending</span>'}</td>
        </tr>`;
      })
      .join("");

    $("#deckLinks").innerHTML = `
      <a class="behance-cta" href="${esc(safeUrl(D.behance.url))}" target="_blank" rel="noopener">View on Behance ↗</a>
      ${safeUrl(D.canvaDeck) ? `<a class="behance-cta dark" href="${esc(D.canvaDeck)}" target="_blank" rel="noopener">Open the full Canva deck ↗</a>` : ""}`;
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    const tones = ["mint", "", "", "", "forest", "", "", "", "ink"];
    $("#skillGroups").innerHTML = D.skills
      .map((g, i) => {
        const tone = tones[i % tones.length];
        const chipBg = tone === "mint" ? "rgba(255,255,255,.5)" : tone ? "rgba(255,255,255,.18)" : "#fff";
        return `<div class="card ${tone}">
          <h3>${esc(g.group)}</h3>
          <div class="chips">${g.items.map((x) => `<span class="chip" style="background:${chipBg}">${t(x)}</span>`).join("")}</div>
        </div>`;
      })
      .join("");
  }

  function renderEducation() {
    $("#eduList").innerHTML = (D.education || [])
      .map((e, i) => `<div class="card ${i === 0 ? "forest" : "line"}">
          ${e.status ? `<span class="small" style="color:inherit;opacity:.7">${esc(e.status)}</span>` : ""}
          <h3 style="font-size:17px">${esc(e.title)}</h3>
          <span class="small" style="color:inherit;opacity:.7">${esc(e.institution)}</span>
        </div>`)
      .join("");
    $("#certList").innerHTML = D.certifications
      .map((c, i) => {
        const url = safeUrl(c.url);
        return `<div class="card ${i === 0 ? "mint" : ""}" style="padding:14px 18px;gap:4px">
          <h3 style="font-size:16px">${t(c.title)}</h3>
          <span class="small" style="color:inherit;opacity:.7">${t(c.issuer)}${c.year ? ` · ${t(c.year)}` : ""}</span>
          ${url ? `<a class="small" href="${esc(url)}" target="_blank" rel="noopener" style="color:inherit">Verify credential ↗</a>` : ""}
        </div>`;
      })
      .join("");
    const wallet = safeUrl(D.credentialWallet);
    $("#walletCta").innerHTML = wallet
      ? `<a class="behance-cta" href="${esc(wallet)}" target="_blank" rel="noopener">Verify credentials in wallet ↗</a>`
      : "";
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    const o = D.owner;
    $("#contactLead").innerHTML = `Available for full-time roles and freelance projects. Based in ${t(o.location)}.`;
    $("#contactFacts").innerHTML = (o.facts || []).map((f) => `<span class="pill outline on-dark">${esc(f)}</span>`).join("");
    const links = [
      { label: "Email", value: o.email, url: o.email ? `mailto:${o.email}` : "" },
      { label: "Phone", value: o.phone, url: o.phone ? `tel:${o.phone.replace(/\s+/g, "")}` : "" },
      { label: "WhatsApp", value: o.whatsapp ? "Message me" : "", url: o.whatsapp },
      { label: "LinkedIn", value: o.linkedin ? "View profile" : "", url: o.linkedin },
      { label: "Behance", value: "View portfolio", url: o.behanceProfile || D.behance.url },
      { label: "Download CV", value: o.cv ? "PDF" : "", url: o.cv },
    ];
    $("#contactLinks").innerHTML = links
      .map((l, i) => {
        const url = safeUrl(l.url);
        const tone = i === 0 ? "mint" : i === 4 ? "forest" : "";
        const inner = `<div class="card ${tone}"><span class="small" style="color:inherit;opacity:.7">${esc(l.label)}</span><h3>${url ? esc(l.value) + " ↗" : '<span class="tbc">TBC</span>'}</h3></div>`;
        return url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${inner}</a>` : inner;
      })
      .join("");
    $("#footerName").textContent = `${o.brand} · ${o.title} · ${o.year}`;
  }

  /* ---------- Static slide slots in the HTML ---------- */
  function fillSlots() {
    document.querySelectorAll("figure.shot[data-slide]").forEach((fig) => {
      fig.innerHTML = shot(Number(fig.dataset.slide));
    });
  }

  /* ---------- Missing-data banner ---------- */
  function renderDataNote() {
    let tbc = 0, links = 0;
    (function walk(v, key) {
      if (typeof v === "string") {
        if (isTbc(v)) tbc++;
        if (key === "url" && !v.trim()) links++;
      } else if (Array.isArray(v)) v.forEach((x) => walk(x));
      else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walk(x, k));
    })(D);
    const note = $("#dataNote");
    if (tbc || links) {
      note.hidden = false;
      note.innerHTML = `<b>Draft</b><span>${tbc ? `${tbc} placeholder values and ` : ""}${links} evidence links still need real data. Edit <code>assets/js/portfolio-data.js</code>; this banner disappears when everything is filled in.</span>`;
    }
  }

  /* ---------- Slide viewer ---------- */
  function wireLightbox() {
    const box = $("#lightbox");
    const img = $("#lbImg");
    const cap = $("#lbCaption");
    const count = $("#lbCount");
    let order = [];
    let pos = 0;

    const show = (i) => {
      pos = (i + order.length) % order.length;
      const n = order[pos];
      img.src = slideSrc(n);
      img.alt = slideTitle(n);
      cap.textContent = slideTitle(n);
      count.textContent = `${pos + 1} / ${order.length}`;
    };

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-slide]");
      if (!btn) return;
      e.preventDefault();
      order = [...new Set([...document.querySelectorAll("main [data-open-slide]")].map((b) => Number(b.dataset.openSlide)))];
      show(order.indexOf(Number(btn.dataset.openSlide)));
      if (typeof box.showModal === "function") box.showModal();
      else box.setAttribute("open", "");
    });
    const close = () => (typeof box.close === "function" ? box.close() : box.removeAttribute("open"));
    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", () => show(pos - 1));
    $("#lbNext").addEventListener("click", () => show(pos + 1));
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(pos - 1);
      if (e.key === "ArrowRight") show(pos + 1);
    });
  }

  /* ---------- Behaviour ---------- */
  function numberSlides() {
    const slides = [...document.querySelectorAll("main > section.slide:not(.contact)")];
    const total = pad(slides.length);
    slides.forEach((sec, i) => {
      const el = sec.querySelector(".slide-num");
      if (el) el.textContent = `${pad(i + 1)} / ${total}`;
    });
  }

  function wireUi() {
    const bar = $("#topbar"), btn = $("#menuBtn");
    btn.addEventListener("click", () => {
      const open = bar.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll("#nav a").forEach((a) => a.addEventListener("click", () => bar.classList.remove("open")));

    const navLinks = [...document.querySelectorAll("#nav a")];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.04 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main > section[id]").forEach((s) => spy.observe(s));
  }

  renderHero();
  renderIndex();
  renderCaseStudies();
  renderFreelance();
  renderGallery("#strategyGallery", D.galleries.strategy);
  renderGallery("#contentGallery", D.galleries.content);
  renderExperience();
  renderSkills();
  renderEducation();
  renderEvidence();
  renderContact();
  fillSlots();
  renderDataNote();
  numberSlides();
  wireLightbox();
  wireUi();
})();
