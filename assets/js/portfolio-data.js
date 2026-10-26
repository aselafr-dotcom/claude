/*
 * ALL PORTFOLIO CONTENT LIVES IN THIS FILE.
 *
 * How placeholders work:
 *   - Any text that starts with "TBC" is shown on the page with a dashed outline,
 *     so unfinished data is never mistaken for a real result.
 *   - Any link set to "" (empty) is shown as a greyed "link pending" button.
 *     Leave the `url` key out entirely when no link is intended.
 *   - A chart only draws when `trend.values` has numbers in it.
 *
 * The yellow banner at the top of the page disappears once nothing is TBC
 * and every `url: ""` has been filled in.
 */
window.PORTFOLIO = {
  owner: {
    name: "Asela Fernando",
    brand: "©ASELA",
    title: "Digital Marketing Manager",
    tagline: ["Digital Marketing", "Performance Marketing", "AI & Automation"],
    location: "Al Quoz, Dubai, UAE",
    year: "2026",
    summary:
      "Results-driven digital marketing professional with 12+ years of experience, including 3+ years in Dubai, across digital, social media and integrated marketing. Performance marketing, lead generation, SEO, brand strategy and marketing automation for B2B and B2C brands.",
    facts: [
      "Employment Visa",
      "UAE Driving License",
      "English (Professional)",
      "Sinhala (Native)",
    ],
    email: "asela.fr@gmail.com",
    phone: "+971 54 436 1193",
    whatsapp: "https://wa.me/971544361193",
    linkedin: "https://www.linkedin.com/in/aselafr/",
    behanceProfile: "",
    cv: "", // link to a PDF CV (Google Drive, Dropbox, or a file in this repo)
  },

  // Headline numbers on the hero + "Key Achievements" slide.
  highlights: [
    {
      label: "Years in digital marketing",
      value: "12+",
      note: "Since 2014, including 3+ years in Dubai, UAE",
      source: { label: "LinkedIn profile", url: "https://www.linkedin.com/in/aselafr/" },
    },
    {
      label: "Increase in qualified leads",
      value: "+40%",
      note: "Google, Meta and LinkedIn campaigns at MEBS Facility Services, with lower cost per acquisition",
      source: { label: "Lead generation report", url: "" },
    },
    {
      label: "Increase in organic traffic",
      value: "+60%",
      note: "Technical and on-page SEO on high-intent keywords at MEBS Facility Services",
      source: { label: "SEO / GA4 report", url: "" },
    },
    {
      label: "Industry certifications",
      value: "8",
      note: "Google, LinkedIn, HubSpot, Semrush, Ahrefs and eMinds",
      source: { label: "Credential wallet", url: "https://www.credential.net/profile/aselafernando249698/wallet" },
    },
  ],

  // Work experience, newest first.
  // `metrics`, `brands`, `focus` and `evidence` are optional.
  experience: [
    {
      company: "MEBS Facility Services",
      role: "Marketing Manager",
      period: "Sep 2023 to Present",
      location: "Dubai, UAE",
      summary:
        "Lead marketing strategy and execution across Al Qaisi Group businesses.",
      brands: ["MEBS Facility Services", "Middle East Real Estate", "SASA Real Estate", "Rawabina Restaurant"],
      bullets: [
        "Marketing strategy & lead generation: integrated B2B and B2C campaigns across Google, Meta and LinkedIn, achieving a 40% increase in qualified leads while reducing cost per acquisition.",
        "SEO & organic growth: technical and on-page SEO focused on high-intent keywords, driving a 60% increase in organic traffic and stronger search visibility.",
        "Website & conversion optimisation: website enhancements, landing pages, forms and conversion journeys to lift inbound enquiries.",
        "Budget & ROI management: budget allocation across multiple business sectors, optimised on campaign performance, CPA and ROI.",
        "Integrated brand & PR: brand, PR and corporate marketing initiatives with consistent positioning across the group.",
        "AI & marketing automation: AI-powered campaign optimisation and reusable ChatGPT / Claude workflows for content, reporting, planning and operations.",
        "Agency & vendor management: media agencies, production partners, print suppliers and external vendors.",
      ],
      metrics: [
        { label: "Qualified leads", value: "+40%" },
        { label: "Organic traffic", value: "+60%" },
        { label: "Group businesses", value: "4" },
        { label: "Ad platforms", value: "3" },
      ],
      evidence: [
        { type: "report", label: "Lead & SEO results report", url: "" },
        {
          type: "press",
          label: "Gulf Business: MEBS feature",
          url: "https://gulfbusiness.com/en/2024/uae/mebs-a-success-story-in-uaes-facility-mgmt-sector/",
        },
      ],
    },
    {
      company: "LR Platinum (Pvt) Ltd.",
      role: "Digital Marketing Manager",
      period: "Jul 2020 to Jul 2023",
      location: "Sri Lanka",
      summary: "Owned digital strategy for brand awareness, customer engagement and lead generation.",
      bullets: [
        "Developed and executed digital marketing strategies focused on brand awareness, customer engagement and lead generation.",
        "Planned audience-specific content, campaigns and promotions for target customer segments, supporting lead generation and sales.",
        "Managed and optimised social media campaigns across multiple platforms to strengthen engagement and brand visibility.",
        "Analysed customer insights, campaign performance and market trends to refine digital strategies and improve ROI.",
        "Directed content development, campaign execution and ongoing performance optimisation.",
      ],
      focus: ["Brand awareness", "Lead generation", "Multi-platform social", "Customer insights", "ROI optimisation"],
    },
    {
      company: "A V Business Solutions (Pvt) Ltd.",
      role: "Digital Marketing Coordinator",
      period: "May 2018 to Jul 2020",
      location: "Sri Lanka",
      summary: "Ran digital strategy and content operations alongside the sales team.",
      bullets: [
        "Developed and carried out digital marketing strategies to strengthen brand presence and generate leads.",
        "Established a content scheduling system that improved consistency, engagement and campaign performance across platforms.",
        "Monitored and evaluated key marketing KPIs, optimising campaigns for higher ROI and conversion.",
        "Coordinated with sales on lead generation, client communication and follow-ups, directly supporting revenue growth.",
        "Developed marketing materials and presentations for sales efforts and client pitches.",
        "Handled customer enquiries on social media and email.",
        "Researched industry trends and competitor activity to keep strategies competitive.",
      ],
      focus: ["Content scheduling system", "KPI tracking", "Sales enablement", "Competitor research"],
    },
    {
      company: "Renuka Group PLC",
      role: "Senior Social Media & IT Executive",
      period: "Mar 2015 to Apr 2018",
      location: "Sri Lanka",
      summary: "Led corporate social media and online advertising for a listed group, bridging marketing and IT.",
      bullets: [
        "Led social media strategy to strengthen brand presence and engagement across multiple platforms.",
        "Managed corporate social media accounts with consistent branding and timely promotion of products and services.",
        "Created and curated content for target audiences, driving stronger engagement and follower growth.",
        "Reviewed social performance metrics and delivered actionable insights to improve effectiveness and ROI.",
        "Led online advertising (Google Ads and social ads) to increase website traffic and generate qualified leads.",
        "Collaborated with marketing and IT teams to integrate digital strategy with technology initiatives.",
        "Provided IT infrastructure support, including network management, troubleshooting and software updates.",
      ],
      focus: ["Corporate social media", "Google Ads", "Social ads", "Marketing + IT integration"],
      evidence: [{ type: "live", label: "Renuka Group website", url: "https://www.renukagroup.com" }],
    },
    {
      company: "Cyber Concepts (Pvt) Ltd.",
      role: "Social Media Executive",
      period: "Feb 2014 to Mar 2015",
      location: "Sri Lanka",
      summary: "Community management, paid social and competitor analysis.",
      bullets: [
        "Monitored social channels to track trends, customer feedback and enquiries, ensuring timely engagement.",
        "Analysed performance metrics to measure campaign effectiveness and optimise strategy.",
        "Worked with marketing and design teams on visually engaging, on-brand content.",
        "Supervised social advertising focused on targeted outreach and conversion optimisation.",
        "Ran competitor analysis to identify industry trends and refine positioning.",
        "Engaged the community through interactive content, contests and customer support.",
      ],
      focus: ["Community management", "Paid social", "Contests & engagement", "Competitor analysis"],
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
    {
      group: "Marketing Strategy & Growth",
      items: ["Integrated Marketing Strategy", "B2B / B2C Marketing", "Lead Generation", "Campaign Planning", "Market & Competitor Analysis"],
    },
    {
      group: "Performance Marketing",
      items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "SEO / SEM", "Paid Media", "CRO", "CPA & ROI Optimisation"],
    },
    {
      group: "Brand, PR & Communications",
      items: ["Brand Strategy", "PR Campaign Planning", "Corporate Communications", "Media & Public Relations", "Content Strategy", "Brand Governance", "Marketing Collateral"],
    },
    {
      group: "Budget & Commercial",
      items: ["Marketing Budget Allocation", "ROI Management", "Campaign Performance", "Vendor & Agency Management"],
    },
    {
      group: "Digital & Web Strategy",
      items: ["Website Optimisation", "Landing Pages", "Technical SEO", "Conversion Optimisation", "UX / UI Improvement"],
    },
    {
      group: "AI & Marketing Automation",
      items: ["ChatGPT", "Claude", "Gemini", "AI Campaign Optimisation", "Prompt Engineering", "Workflow Automation"],
    },
    {
      group: "Analytics & MarTech",
      items: ["Google Analytics (GA4)", "Google Tag Manager", "Looker Studio", "HubSpot", "Zoho CRM", "Ahrefs", "Semrush"],
    },
    {
      group: "Social Media & Content",
      items: ["Monthly Content Calendars", "Content Scheduling", "Social Media Strategy", "Community Engagement", "Content Performance Analysis"],
    },
    {
      group: "Creative Production",
      items: ["Photography", "Videography", "Video Editing", "Reels & Short-Form Video", "Adobe Premiere Pro", "Adobe Photoshop", "Adobe Lightroom"],
    },
  ],

  education: [
    {
      title: "Master of Business Administration (MBA), Digital Marketing",
      institution: "Anglia Ruskin University, Cambridge, United Kingdom",
      status: "In progress, expected graduation March 2027",
    },
    { title: "Diploma in Digital Marketing (CPD UK Certified)", institution: "eMinds Academy Australia" },
    { title: "Diploma in Graphic Designing & Desktop Publishing", institution: "Vocational Training Authority, Sri Lanka" },
    { title: "Diploma in 3D Animation and Nonlinear Video Editing", institution: "Vocational Training Authority, Sri Lanka" },
    { title: "Diploma in Computer Hardware & Network", institution: "Vocational Training Authority, Sri Lanka" },
    { title: "Advanced Level (Commerce Stream)", institution: "S.De.S. Jayasinghe College, Colombo, Sri Lanka", status: "Completed" },
  ],

  credentialWallet: "https://www.credential.net/profile/aselafernando249698/wallet",

  certifications: [
    { title: "Certification in Practical Digital Marketing", issuer: "eMinds Academy Australia" },
    { title: "Google Ads Search Certification", issuer: "Google Digital Academy (Skillshop)" },
    { title: "Google AI-Powered Performance Ads Certification", issuer: "Google Digital Academy (Skillshop)" },
    { title: "Technical SEO and AI Search Essentials", issuer: "Semrush Academy" },
    { title: "LinkedIn Marketing Strategy Certification", issuer: "LinkedIn Marketing Labs" },
    { title: "Certified Specialist in Ahrefs Marketing Intelligence", issuer: "Ahrefs" },
    { title: "LinkedIn Marketing Measurement Certification", issuer: "LinkedIn Marketing Labs" },
    { title: "HubSpot Marketing Hub Software", issuer: "HubSpot Academy" },
  ],
};
