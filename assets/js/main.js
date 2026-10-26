(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const isTbc = (v) => typeof v === "string" && /^TBC\b/i.test(v.trim());

  // Text that is still a placeholder gets a dashed outline so it is never read as a real result.
  const t = (v) => (isTbc(v) ? `<span class="tbc" title="Placeholder: update portfolio-data.js">${esc(v)}</span>` : esc(v));

  const safeUrl = (u) => (typeof u === "string" && /^(https?:|mailto:|tel:|\.?\/|assets\/)/i.test(u.trim()) ? u.trim() : "");

  const EV_ICON = { report: "R", live: "L", behance: "Be", dashboard: "D", doc: "D", video: "V" };
  const EV_NAME = { report: "Report", live: "Live link", behance: "Behance", dashboard: "Dashboard", doc: "Document", video: "Video" };

  function evLink(ev) {
    const url = safeUrl(ev.url);
    const ico = `<span class="ico">${EV_ICON[ev.type] || "↗"}</span>`;
    if (!url) return `<span class="ev pending" title="Link pending: add the URL in portfolio-data.js">${ico}${esc(ev.label)}</span>`;
    return `<a class="ev" href="${esc(url)}" target="_blank" rel="noopener">${ico}${esc(ev.label)} ↗</a>`;
  }

  function sourceLink(src) {
    if (!src) return "";
    const url = safeUrl(src.url);
    return url
      ? `<a class="small" href="${esc(url)}" target="_blank" rel="noopener">Source: ${esc(src.label)} ↗</a>`
      : `<span class="small">Source: ${esc(src.label)} (link pending)</span>`;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const o = D.owner;
    document.title = `${o.name} | ${o.title}`;
    document.querySelectorAll('[data-bind="owner.brand"]').forEach((el) => (el.textContent = o.brand));
    document.querySelectorAll('[data-bind="owner.year"]').forEach((el) => (el.textContent = o.year));
    $("#heroTitle").innerHTML = `${esc(o.name)}<br>${esc(o.title)}`;
    $("#heroSummary").innerHTML = t(o.summary);

    const h = D.highlights;
    $("#heroRow").innerHTML = `
      <div class="card mint">
        <h3>Strategy, content and paid media, measured end to end</h3>
        <p class="small" style="color:#1b1b1b">${t(o.location)}</p>
      </div>
      <div class="card">
        <div class="stat">${t(h[1]?.value)}</div>
        <p class="small">${esc(h[1]?.label || "")}</p>
      </div>
      <div class="card forest">
        <h3>Freelance clients</h3>
        <p class="small">${D.freelance.map((f) => esc(f.client)).join(" · ")}</p>
      </div>`;
  }

  /* ---------- Contents ---------- */
  function renderToc() {
    const items = [
      { href: "#achievements", title: "Key Achievements", text: "Headline results with sources" },
      { href: "#experience", title: "Work Experience", text: `${D.experience.length} roles, newest first` },
      ...D.freelance.map((f) => ({ href: `#${f.id}`, title: f.client, text: "Freelance case study" })),
      { href: "#evidence", title: "Reports & Evidence", text: "Every report in one table" },
      { href: "#behance", title: "Behance", text: "Published project work" },
      { href: "#contact", title: "Get in Touch", text: "Contact and CV" },
    ];
    $("#tocGrid").innerHTML = items
      .map((it, i) => {
        const tone = i === 2 ? "mint" : i === 5 ? "forest" : "";
        return `<a href="${it.href}"><div class="card ${tone}">
          <span class="time">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(it.title)}</h3>
          <p class="small">${esc(it.text)}</p>
        </div></a>`;
      })
      .join("");
  }

  /* ---------- Achievements ---------- */
  function renderAchievements() {
    const tones = ["", "mint", "forest", "line"];
    $("#achieveGrid").innerHTML = D.highlights
      .map(
        (h, i) => `<div class="card ${tones[i % tones.length]}">
          <p style="font-weight:600">${esc(h.label)}</p>
          <div class="stat">${t(h.value)}</div>
          <p class="small">${t(h.note)}</p>
          ${sourceLink(h.source)}
        </div>`
      )
      .join("");
  }

  /* ---------- Experience ---------- */
  function renderExperience() {
    $("#expList").innerHTML = D.experience
      .map(
        (e, i) => `<article class="exp">
          <div class="card ${i === 0 ? "mint" : ""}">
            <span class="small" style="color:inherit;opacity:.7">${String(i + 1).padStart(2, "0")} · ${t(e.period)}</span>
            <h3 class="role">${t(e.role)}</h3>
            <p style="font-weight:600">${t(e.company)}</p>
            <p class="small" style="color:inherit;opacity:.7">${t(e.location)}</p>
          </div>
          <div class="card">
            <p>${t(e.summary)}</p>
            <ul>${e.bullets.map((b) => `<li>${t(b)}</li>`).join("")}</ul>
          </div>
          <div class="card forest">
            <p class="small">Measured impact</p>
            <div class="metrics">${e.metrics
              .map((m) => `<div class="metric"><b>${t(m.value)}</b><span class="small">${t(m.label)}</span></div>`)
              .join("")}</div>
            <div class="evidence">${e.evidence.map(evLink).join("")}</div>
          </div>
        </article>`
      )
      .join("");
  }

  /* ---------- Report chart ---------- */
  function chart(trend) {
    const vals = (trend?.values || []).map(Number).filter((n) => Number.isFinite(n));
    if (vals.length < 2) {
      return `<div class="card line chart-card">
        <p style="font-weight:600">${t(trend?.metric || "Monthly trend")}</p>
        <p class="small">Report chart appears here once monthly figures are added to <code>trend.values</code>.</p>
      </div>`;
    }
    const labels = trend.labels || [];
    const W = 560, H = 200, P = 28;
    const max = Math.max(...vals), min = Math.min(0, ...vals);
    const x = (i) => P + (i * (W - P * 2)) / (vals.length - 1);
    const y = (v) => H - P - ((v - min) / (max - min || 1)) * (H - P * 2);
    const bw = Math.min(34, (W - P * 2) / vals.length - 8);
    const bars = vals
      .map((v, i) => `<rect x="${x(i) - bw / 2}" y="${y(v)}" width="${bw}" height="${H - P - y(v)}" rx="6" fill="${i === vals.length - 1 ? "#1d4a31" : "#7bf0a6"}"><title>${esc(labels[i] || "")}: ${v.toLocaleString()}</title></rect>`)
      .join("");
    const line = vals.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v) - 10}`).join(" ");
    const ticks = labels.map((l, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#6d6d6a">${esc(l)}</text>`).join("");
    const first = vals[0], last = vals[vals.length - 1];
    const change = first ? Math.round(((last - first) / first) * 100) : null;
    return `<div class="card line chart-card">
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <p style="font-weight:600">${t(trend.metric)}</p>
        ${change !== null ? `<span class="pill ${change >= 0 ? "mint" : ""}">${change >= 0 ? "+" : ""}${change}% first to last month</span>` : ""}
      </div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(trend.metric)} chart">
        <line x1="${P}" x2="${W - P}" y1="${H - P}" y2="${H - P}" stroke="#e2e2de"/>
        ${bars}
        <path d="${line}" fill="none" stroke="#0f0f0f" stroke-width="1.5" stroke-dasharray="3 4"/>
        ${ticks}
      </svg>
    </div>`;
  }

  /* ---------- Freelance ---------- */
  function renderFreelance() {
    $("#caseList").innerHTML = D.freelance
      .map((f, i) => {
        const quote = f.testimonial?.quote
          ? `<div class="card mint"><p class="quote">“${esc(f.testimonial.quote)}”</p><p class="small" style="color:#1b1b1b">${esc(f.testimonial.author)}</p></div>`
          : "";
        return `<article class="case" id="${esc(f.id)}">
          <div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span class="pill dark">Client ${String(i + 1).padStart(2, "0")}</span>
              <span class="pill">${t(f.category)}</span>
              <span class="pill outline">${t(f.period)}</span>
            </div>
            <h3 class="case-title">${esc(f.client)}</h3>
            <div class="tags">${f.services.map((s) => `<span class="chip">${t(s)}</span>`).join("")}</div>
            <div class="phone" style="min-height:220px;margin-top:18px"><div class="art ${esc(f.art || "art-ribs")}"></div></div>
            <div class="evidence">${f.evidence.map(evLink).join("")}</div>
          </div>
          <div>
            <div class="case-block"><h4>Challenge</h4><p>${t(f.challenge)}</p></div>
            <div class="case-block"><h4>Approach</h4><ol>${f.approach.map((a) => `<li>${t(a)}</li>`).join("")}</ol></div>
            <div class="case-block"><h4>Results</h4>
              <div class="kpis">${f.results
                .map((r) => `<div class="kpi"><span class="label">${t(r.label)}</span><span class="value">${t(r.value)}</span><span class="small">${t(r.detail)}</span></div>`)
                .join("")}</div>
              ${chart(f.trend)}
            </div>
            ${quote ? `<div class="case-block">${quote}</div>` : ""}
          </div>
        </article>`;
      })
      .join("");
  }

  /* ---------- Evidence library ---------- */
  function renderEvidence() {
    const rows = [];
    D.experience.forEach((e) => e.evidence.forEach((ev) => rows.push({ project: `${e.company}`, sub: e.role, ev })));
    D.freelance.forEach((f) => f.evidence.forEach((ev) => rows.push({ project: f.client, sub: "Freelance", ev })));
    D.highlights.forEach((h) => h.source && rows.push({ project: "Key achievements", sub: h.label, ev: { type: "report", ...h.source } }));
    rows.push({ project: "Behance", sub: D.behance.projectTitle, ev: { type: "behance", label: D.behance.projectTitle, url: D.behance.url } });

    $("#evidenceRows").innerHTML = rows
      .map(({ project, sub, ev }) => {
        const url = safeUrl(ev.url);
        const tone = ev.type === "report" ? "mint" : ev.type === "behance" ? "dark" : "";
        return `<tr>
          <td class="type"><span class="pill ${tone}">${esc(EV_NAME[ev.type] || ev.type)}</span></td>
          <td><b>${t(project)}</b><br><span class="small">${t(sub)}</span></td>
          <td>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(ev.label)} ↗</a>` : esc(ev.label)}</td>
          <td>${url ? '<span class="pill forest">Linked</span>' : '<span class="pill outline" style="color:#9a9a96">Pending</span>'}</td>
        </tr>`;
      })
      .join("");
  }

  /* ---------- Behance ---------- */
  function renderBehance() {
    const b = D.behance;
    $("#behanceBlurb").innerHTML = t(b.blurb);
    $("#behanceStats").innerHTML = b.stats
      .map((s, i) => `<div class="card ${i === 0 ? "mint" : ""}"><div class="stat" style="font-size:32px">${t(s.value)}</div><p class="small">${esc(s.label)}</p></div>`)
      .join("");
    $("#behanceMore").innerHTML = (b.more || [])
      .map((m) => {
        const url = safeUrl(m.url);
        const inner = `<div class="card line"><h3>${t(m.title)}</h3><div class="chips">${m.tags.map((x) => `<span class="chip">${t(x)}</span>`).join("")}</div><span class="small">${url ? "Open on Behance ↗" : "Link pending"}</span></div>`;
        return url ? `<a href="${esc(url)}" target="_blank" rel="noopener" style="text-decoration:none">${inner}</a>` : inner;
      })
      .join("");
    const cta = $("#behanceCta");
    cta.href = safeUrl(b.url) || "#";
    cta.textContent = `View “${b.projectTitle}” on Behance ↗`;
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    $("#skillGroups").innerHTML = D.skills
      .map((g) => `<div class="skill-group"><p style="font-weight:600">${esc(g.group)}</p><div class="chips">${g.items.map((x) => `<span class="chip">${t(x)}</span>`).join("")}</div></div>`)
      .join("");
    $("#certList").innerHTML = D.certifications
      .map((c, i) => {
        const url = safeUrl(c.url);
        return `<div class="card ${i % 2 ? "" : "mint"}">
          <span class="small" style="color:inherit;opacity:.7">${t(c.issuer)} · ${t(c.year)}</span>
          <h3>${t(c.title)}</h3>
          ${url ? `<a class="small" href="${esc(url)}" target="_blank" rel="noopener" style="color:inherit">Verify credential ↗</a>` : '<span class="small" style="color:inherit;opacity:.7">Credential link pending</span>'}
        </div>`;
      })
      .join("");
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    const o = D.owner;
    $("#contactLead").innerHTML = `Available for full-time roles and freelance projects. ${t(o.location)}`;
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
      note.innerHTML = `<b>Draft</b><span>${tbc} placeholder values and ${links} evidence links still need real data. Edit <code>assets/js/portfolio-data.js</code>; this banner disappears when everything is filled in.</span>`;
    }
  }

  /* ---------- Behaviour ---------- */
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
      { threshold: 0.08 }
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
  renderToc();
  renderAchievements();
  renderExperience();
  renderFreelance();
  renderEvidence();
  renderBehance();
  renderSkills();
  renderContact();
  renderDataNote();
  wireUi();
})();
