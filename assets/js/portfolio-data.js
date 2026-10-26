/*
 * ALL PORTFOLIO CONTENT LIVES IN THIS FILE.
 *
 * How placeholders work:
 *   - Any text that starts with "TBC" is shown on the page with a dashed outline,
 *     so unfinished data is never mistaken for a real result.
 *   - Any link set to "" (empty) is shown as a greyed "link pending" button.
 *   - A chart only draws when `trend.values` has numbers in it.
 *
 * Replace every "TBC" with your real figures and paste the real URLs for
 * reports, live posts, ad-library pages, Google Drive / Looker Studio reports, etc.
 * The yellow banner at the top of the page disappears once nothing is TBC.
 */
window.PORTFOLIO = {
  owner: {
    name: "Asela",
    brand: "©ASELA",
    title: "Digital Marketing Specialist",
    location: "TBC: City, Country",
    year: "2026",
    summary:
      "TBC: Two or three lines about you. Example structure: what you do (performance + social + content), who you do it for (brands, agencies, local businesses), and the result you are known for.",
    email: "",          // e.g. "hello@yourdomain.com"
    phone: "",          // e.g. "+94 7X XXX XXXX"
    whatsapp: "",       // e.g. "https://wa.me/947XXXXXXXX"
    linkedin: "",       // e.g. "https://www.linkedin.com/in/your-handle"
    behanceProfile: "", // e.g. "https://www.behance.net/your-handle"
    cv: "",             // link to a PDF CV (Google Drive, Dropbox, or a file in this repo)
  },

  // Headline numbers on the hero + "Key Achievements" slide.
  // Each one should point at proof (a report, screenshot, or dashboard).
  highlights: [
    { label: "Years in digital marketing", value: "TBC", note: "TBC: since 20XX", source: { label: "CV", url: "" } },
    { label: "Ad spend managed", value: "TBC", note: "TBC: Meta + Google, lifetime", source: { label: "Ads Manager export", url: "" } },
    { label: "Average ROAS", value: "TBC", note: "TBC: across paid campaigns", source: { label: "Campaign report", url: "" } },
    { label: "Organic reach generated", value: "TBC", note: "TBC: all social accounts", source: { label: "Insights report", url: "" } },
  ],

  // Work experience, newest first. Copy a block to add another role.
  experience: [
    {
      company: "TBC: Company name",
      role: "TBC: Job title",
      period: "TBC: Mon 20XX to Present",
      location: "TBC: City / Remote",
      summary: "TBC: One line on the team, the brands you handled and your remit.",
      bullets: [
        "TBC: Responsibility or project, with the tool or channel used.",
        "TBC: A result written as action + metric + timeframe.",
        "TBC: Something you built or improved (process, reporting, funnel).",
      ],
      metrics: [
        { label: "TBC: KPI", value: "TBC" },
        { label: "TBC: KPI", value: "TBC" },
      ],
      evidence: [
        { type: "report", label: "Performance report", url: "" },
        { type: "live", label: "Live campaign", url: "" },
      ],
    },
    {
      company: "TBC: Company name",
      role: "TBC: Job title",
      period: "TBC: Mon 20XX to Mon 20XX",
      location: "TBC: City / Remote",
      summary: "TBC: One line on the team, the brands you handled and your remit.",
      bullets: [
        "TBC: Responsibility or project, with the tool or channel used.",
        "TBC: A result written as action + metric + timeframe.",
      ],
      metrics: [
        { label: "TBC: KPI", value: "TBC" },
        { label: "TBC: KPI", value: "TBC" },
      ],
      evidence: [
        { type: "report", label: "Performance report", url: "" },
      ],
    },
    {
      company: "TBC: Company name",
      role: "TBC: Job title",
      period: "TBC: Mon 20XX to Mon 20XX",
      location: "TBC: City / Remote",
      summary: "TBC: One line on the team, the brands you handled and your remit.",
      bullets: [
        "TBC: Responsibility or project, with the tool or channel used.",
        "TBC: A result written as action + metric + timeframe.",
      ],
      metrics: [
        { label: "TBC: KPI", value: "TBC" },
        { label: "TBC: KPI", value: "TBC" },
      ],
      evidence: [
        { type: "behance", label: "Behance case study", url: "" },
      ],
    },
  ],

  // Freelance case studies. Each follows: challenge > approach > results > proof.
  freelance: [
    {
      id: "bolts-family",
      client: "Bolt's Family",
      category: "TBC: Industry",
      period: "TBC: Mon 20XX to Mon 20XX",
      services: ["TBC: Social media management", "TBC: Paid ads", "TBC: Content"],
      art: "art-ribs",
      challenge: "TBC: What the client needed. Starting point in numbers (followers, sales, leads, cost per result).",
      approach: [
        "TBC: Audit / research step.",
        "TBC: Strategy (audiences, content pillars, offer).",
        "TBC: Execution (channels, posting cadence, ad structure).",
        "TBC: Optimisation and reporting rhythm.",
      ],
      results: [
        { label: "TBC: Reach", value: "TBC", detail: "TBC: period + source" },
        { label: "TBC: Engagement rate", value: "TBC", detail: "TBC: period + source" },
        { label: "TBC: Leads / sales", value: "TBC", detail: "TBC: period + source" },
      ],
      // Monthly values for the report chart, e.g. { labels: ["Jan","Feb",...], values: [1200, 1850, ...] }
      trend: { metric: "TBC: Monthly reach", labels: [], values: [] },
      testimonial: { quote: "", author: "" },
      evidence: [
        { type: "report", label: "Monthly report (PDF)", url: "" },
        { type: "live", label: "Facebook page", url: "" },
        { type: "live", label: "Instagram", url: "" },
        { type: "behance", label: "Behance case study", url: "" },
      ],
    },
    {
      id: "clipnox",
      client: "Clipnox Media Production",
      category: "Media production",
      period: "TBC: Mon 20XX to Mon 20XX",
      services: ["TBC: Brand content", "TBC: Video promotion", "TBC: Lead generation"],
      art: "art-dark",
      challenge: "TBC: What the client needed. Starting point in numbers (followers, enquiries, bookings, cost per lead).",
      approach: [
        "TBC: Audit / research step.",
        "TBC: Strategy (showreel, audiences, offer).",
        "TBC: Execution (channels, ad formats, cadence).",
        "TBC: Optimisation and reporting rhythm.",
      ],
      results: [
        { label: "TBC: Video views", value: "TBC", detail: "TBC: period + source" },
        { label: "TBC: Enquiries", value: "TBC", detail: "TBC: period + source" },
        { label: "TBC: Cost per lead", value: "TBC", detail: "TBC: period + source" },
      ],
      trend: { metric: "TBC: Monthly enquiries", labels: [], values: [] },
      testimonial: { quote: "", author: "" },
      evidence: [
        { type: "report", label: "Campaign report (PDF)", url: "" },
        { type: "live", label: "YouTube / TikTok", url: "" },
        { type: "live", label: "Meta Ad Library", url: "" },
        { type: "behance", label: "Behance case study", url: "" },
      ],
    },
    {
      id: "shiyo-bridal",
      client: "Shiyo Bridal",
      category: "Bridal",
      period: "TBC: Mon 20XX to Mon 20XX",
      services: ["TBC: Social media management", "TBC: Paid ads", "TBC: Photo / reel direction"],
      art: "art-wave",
      challenge: "TBC: What the client needed. Starting point in numbers (followers, bookings, DMs, cost per message).",
      approach: [
        "TBC: Audit / research step.",
        "TBC: Strategy (seasonality, audiences, offer).",
        "TBC: Execution (reels, carousels, messaging ads).",
        "TBC: Optimisation and reporting rhythm.",
      ],
      results: [
        { label: "TBC: Followers gained", value: "TBC", detail: "TBC: period + source" },
        { label: "TBC: Messaging conversations", value: "TBC", detail: "TBC: period + source" },
        { label: "TBC: Bookings", value: "TBC", detail: "TBC: period + source" },
      ],
      trend: { metric: "TBC: Monthly conversations", labels: [], values: [] },
      testimonial: { quote: "", author: "" },
      evidence: [
        { type: "report", label: "Insights report (PDF)", url: "" },
        { type: "live", label: "Instagram", url: "" },
        { type: "live", label: "Facebook page", url: "" },
        { type: "behance", label: "Behance case study", url: "" },
      ],
    },
  ],

  behance: {
    projectTitle: "Portfolio | Digital Marketing",
    url: "https://www.behance.net/gallery/238431633/Portfolio-Digital-Marketing",
    blurb:
      "TBC: Short description of what the Behance project covers (campaign creatives, social grids, ad results, brand work).",
    // Copy these from the Behance project page.
    stats: [
      { label: "Project views", value: "TBC" },
      { label: "Appreciations", value: "TBC" },
      { label: "Published", value: "TBC" },
    ],
    // Other Behance projects worth linking.
    more: [
      { title: "TBC: Project title", url: "", tags: ["TBC"] },
      { title: "TBC: Project title", url: "", tags: ["TBC"] },
    ],
  },

  skills: [
    { group: "Performance marketing", items: ["Meta Ads", "Google Ads", "TBC"] },
    { group: "Social & content", items: ["Content strategy", "Community management", "TBC"] },
    { group: "Analytics & reporting", items: ["Google Analytics 4", "Looker Studio", "TBC"] },
    { group: "Design & production", items: ["TBC"] },
  ],

  certifications: [
    { title: "TBC: Certification name", issuer: "TBC: Issuer", year: "TBC", url: "" },
  ],
};
