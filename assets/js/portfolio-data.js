/*
 * ALL PORTFOLIO CONTENT LIVES IN THIS FILE.
 *
 * How placeholders work:
 *   - Any text that starts with "TBC" is shown on the page with a dashed outline,
 *     so unfinished data is never mistaken for a real result.
 *   - Any link set to "" (empty) is shown as a greyed "link pending" button.
 *     Leave the `url` key out entirely when no link is intended.
 *   - A chart only draws when `trend.values` has numbers in it.
 *   - Slide images live in assets/slides/slide-NN.jpg (exported from the Canva
 *     deck "Digital Marketing Portfolio - Asela Fernando"). Refer to them by number.
 *
 * The yellow banner at the top of the page disappears once nothing is TBC
 * and every `url: ""` has been filled in.
 */
window.PORTFOLIO = {
  owner: {
    name: "Asela Fernando",
    brand: "©ASELA",
    title: "Digital Marketing Manager",
    headline: "I turn ad budgets into qualified leads and sales conversations.",
    intro:
      "12+ years in performance marketing, SEO and content across real estate, facility management, e-commerce and fintech. Based in Dubai, working B2B and B2C.",
    portrait: "assets/img/portrait.jpg",
    availability: "Open to full-time roles and freelance projects",
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
      note: "Google, Meta and LinkedIn campaigns across Al Qaisi Group, with lower cost per acquisition",
      source: { label: "Lead generation report", url: "" },
    },
    {
      label: "Increase in organic traffic",
      value: "+60%",
      note: "Technical and on-page SEO on high-intent keywords for MEBS Facility Services",
      source: { label: "SEO analysis slide", url: "assets/slides/slide-09.jpg" },
    },
    {
      label: "WhatsApp conversations started",
      value: "4,331",
      note: "Bolt's Family, UAE: Meta click-to-message campaigns, May to Nov 2026",
      source: { label: "Meta Ads Manager", url: "#bolts-family" },
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
        { type: "slide", label: "SEO analysis", url: "assets/slides/slide-09.jpg" },
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
      metrics: [
        { label: "TikTok views, 6 videos", value: "1.75M" },
        { label: "Top single video", value: "382K" },
      ],
      focus: ["Superbike content for riders", "Short-form video", "Lead generation"],
      evidence: [{ type: "slide", label: "TikTok content", url: "assets/slides/slide-19.jpg" }],
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

  // Brands worked with (shown as a scrolling strip under the hero).
  clients: [
    "MEBS Facility Services",
    "SASA Real Estate",
    "Middle East Real Estate",
    "Bolt's Family",
    "Clipnox Media Production",
    "Shiyo Bridal",
    "Rawabina Restaurant",
    "Renuka Group",
    "LR Platinum",
  ],

  // How I work: four steps, shown as a simple process row.
  process: [
    { title: "Research", text: "Audience, competitor and market analysis before any spend." },
    { title: "Strategy", text: "Channel mix, funnel, budget plan and the KPIs that matter." },
    { title: "Launch", text: "Campaigns, content and automation built to capture every lead." },
    { title: "Optimise", text: "Weekly reporting, testing and budget shifts toward what converts." },
  ],

  // In-house case studies, built from the Canva deck slides.
  caseStudies: [
    {
      id: "mebs",
      client: "MEBS Facility Services",
      outcome: "+60% organic traffic through technical SEO and content",
      tags: ["B2B", "SEO", "Brand"],
      sector: "Facility management · B2B",
      context: "Al Qaisi Group, Dubai",
      hero: 6,
      gallery: [7, 8, 9, 10],
      overview:
        "Sustainable organic growth through strategic content, SEO and audience engagement to raise brand visibility, website traffic and long-term customer relationships.",
      scope: [
        "Marketing strategy across digital and offline channels",
        "Branding, positioning, communications and PR",
        "Social media reach and engagement",
        "Campaigns for security, cleaning and maintenance services",
        "CSR activities and corporate events",
      ],
      strategy: [
        "Brand leadership: position MEBS as a trusted, professional FM partner in Dubai",
        "Digital growth: SEO, social engagement and organic visibility",
        "Content excellence: audience-focused, value-driven storytelling",
        "Performance marketing: analytics to refine campaigns and ROI",
      ],
      results: [
        { label: "Organic traffic", value: "+60%" },
        { label: "Qualified leads (group)", value: "+40%" },
      ],
      links: [
        { type: "live", label: "mebsfacility.com", url: "https://www.mebsfacility.com" },
        { type: "live", label: "@mebsfacility", url: "https://www.instagram.com/mebsfacility/" },
        { type: "press", label: "Gulf Business feature", url: "https://gulfbusiness.com/en/2024/uae/mebs-a-success-story-in-uaes-facility-mgmt-sector/" },
      ],
    },
    {
      id: "sasa",
      client: "SASA Real Estate",
      outcome: "Meta lead generation for off-plan property at a low cost per lead",
      tags: ["Real estate", "Paid social", "Lead gen"],
      sector: "Dubai off-plan real estate",
      context: "Al Qaisi Group, Dubai",
      hero: 11,
      gallery: [13, 12, 14, 26],
      overview:
        "High-quality lead generation for off-plan property: funnel optimisation, multi-channel campaigns and reporting, aligned with the sales team.",
      scope: [
        "Lead generation campaigns for off-plan properties",
        "Funnel optimisation from enquiry to qualified lead",
        "Campaign planning across Google, Meta and LinkedIn",
        "Performance tracking, analytics and reporting",
      ],
      strategy: [
        "Audience segmentation: investors, end users and international buyers",
        "Regional creatives in INR, PKR and GBP with financial and lifestyle hooks",
        "Retargeting form openers, 25%+ video viewers and WhatsApp clickers",
        "Lead nurturing through CRM-triggered email and WhatsApp",
      ],
      results: [
        { label: "Meta lead gen", value: "Low CPL" },
        { label: "Lead routing", value: "CRM + WhatsApp" },
      ],
      links: [
        { type: "live", label: "sasarealestate.com", url: "https://www.sasarealestate.com" },
        { type: "live", label: "@sasarealestate", url: "https://www.instagram.com/sasarealestate/" },
      ],
    },
    {
      id: "mere",
      client: "Middle East Real Estate",
      outcome: "360° campaigns with CRM and WhatsApp lead automation",
      tags: ["Real estate", "Automation", "Content"],
      sector: "Dubai residential sales, leasing & property management",
      context: "Al Qaisi Group, Dubai",
      hero: 15,
      gallery: [16, 17, 20, 21],
      overview:
        "360° digital marketing for a Dubai real estate brand: paid media, CRM automation, brand identity and consistent content.",
      scope: [
        "360° campaigns across Google, Meta and LinkedIn",
        "Zoho CRM and Portle integration for lead management and reporting",
        "Brand identity and consistent social and web content",
        "Events, partnerships and community engagement",
      ],
      strategy: [
        "Build trust as a reliable property partner",
        "Grow through SEO, social media and organic reach",
        "Value-driven, audience-focused content",
        "Optimise campaigns with data to maximise ROI",
      ],
      results: [
        { label: "Lead flow", value: "Automated" },
        { label: "Content", value: "Scheduled" },
      ],
      links: [
        { type: "live", label: "middleeast.ae", url: "https://www.middleeast.ae" },
        { type: "live", label: "@middleeast.ae", url: "https://www.instagram.com/middleeast.ae/" },
      ],
    },
  ],

  // Galleries of slides. Each entry: slide number + caption.
  galleries: {
    strategy: [
      { slide: 26, cat: "Paid media", title: "Meta campaign strategy", note: "Audience targeting, ad copy hooks and retargeting for Dubai property investors" },
      { slide: 21, cat: "Automation", title: "Lead generation automation", note: "Meta Ads → lead form → Zoho CRM → WhatsApp (WATI) → email + agent follow-up" },
      { slide: 22, cat: "Strategy", title: "B2B marketing action plan", note: "Strategy, LinkedIn with Sales Navigator, lead nurturing and ABM" },
      { slide: 23, cat: "Paid media", title: "Meta campaign & content strategy", note: "Guide to running Meta ads plus the social content playbook" },
      { slide: 24, cat: "Strategy", title: "Competitor analysis", note: "Major Dubai real estate agencies: web and social benchmarks" },
      { slide: 27, cat: "Strategy", title: "Annual marketing budget plan", note: "2025 month-by-month budget across search, SEO, Meta and LinkedIn" },
    ],
    content: [
      { slide: 8, cat: "Content", title: "MEBS social content", note: "Facility management thought leadership and UAE moments" },
      { slide: 14, cat: "Content", title: "SASA social content", note: "Off-plan launches and Dubai market news" },
      { slide: 17, cat: "Content", title: "Middle East Real Estate content", note: "Sales, leasing and property management posts" },
      { slide: 20, cat: "Content", title: "Content schedule", note: "Monthly calendar with carousel planning" },
      { slide: 18, cat: "Content", title: "Fintech app campaigns", note: "Sri Lanka consumer finance social creatives" },
      { slide: 19, cat: "Video", title: "TikTok: superbike showroom", note: "382K, 236K, 365K, 334K, 183K and 252K views" },
    ],
  },

  // Freelance work.
  freelance: [
    {
      id: "bolts-family",
      client: "Bolt's Family",
      category: "Pet breeder, UAE",
      period: "May 2026 to Present",
      services: ["Meta Ads", "WhatsApp click-to-message", "Instagram promotion", "Retargeting", "Website lead campaigns"],
      art: "art-ribs",
      source: "Meta Ads Manager, lifetime to 4 Nov 2026",
      challenge:
        "Turn breed-specific puppy listings (Toy Poodle, Maltipoo, English Cocker Spaniel, Dachshund, Yorkshire Terrier) into WhatsApp sales conversations across the UAE at a low cost per conversation.",
      approach: [
        "Always-on WhatsApp sales campaign for the UAE, plus a weekend / urgency variant.",
        "Warm retargeting of engaged audiences and breed-level ad sets (ABO) to see which breeds pull demand.",
        "Instagram post promotion for each new litter to drive profile visits and DMs.",
        "From October 2026, website contact campaigns to capture leads off-platform.",
      ],
      results: [
        { label: "Ad spend managed", value: "AED 30,505", detail: "45 campaigns, May to Nov 2026" },
        { label: "Messaging conversations started", value: "4,331", detail: "AED 5.54 blended; best campaigns AED 2.93 to 3.56" },
        { label: "Reach (Meta accounts)", value: "696,910", detail: "1,957,533 impressions · frequency 2.8" },
        { label: "Clicks (all)", value: "47,874", detail: "CTR 2.45% · CPM AED 15.58" },
        { label: "Instagram profile visits", value: "2,356", detail: "From promoted litter posts" },
        { label: "Website contacts", value: "52", detail: "Website lead campaigns, Oct to Nov 2026" },
      ],
      trend: {
        metric: "Monthly reach (Meta accounts)",
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov*"],
        values: [288892, 294864, 6679, 597, 5252, 202841, 29279],
        series: {
          reach: { label: "Reach", unit: "", values: [288892, 294864, 6679, 597, 5252, 202841, 29279] },
          impressions: { label: "Impressions", unit: "", values: [688997, 788260, 10941, 627, 7161, 419092, 42455] },
          spend: { label: "Spend", unit: "AED ", values: [7566, 8063, 318, 10, 276, 12981, 1292] },
        },
        footnote: "*Nov = 1 to 4 Nov. Jul to Sep: campaigns paused.",
      },
      funnel: [
        { label: "Impressions", value: 1957533 },
        { label: "Clicks", value: 47874, note: "2.45% CTR" },
        { label: "Conversations", value: 4331, note: "1 chat per 11 clicks" },
      ],
      campaigns: [
        { name: "WhatsApp UAE / Sales Gen", n: 1611, cpr: 3.51, spend: "AED 5,647", result: "1,611 conversations", cost: "AED 3.51" },
        { name: "Weekend / Urgent", n: 1587, cpr: 3.56, spend: "AED 5,644", result: "1,587 conversations", cost: "AED 3.56" },
        { name: "Retargeting, warm UAE", n: 285, cpr: 4.92, spend: "AED 1,402", result: "285 conversations", cost: "AED 4.92" },
        { name: "Sales Gen, Toy Poodle", n: 195, cpr: 2.93, spend: "AED 571", result: "195 conversations", cost: "AED 2.93" },
        { name: "Breed ad sets (ABO)", n: 154, cpr: 7.07, spend: "AED 1,089", result: "154 conversations", cost: "AED 7.07" },
        { name: "Website contact leads", n: 45, cpr: 22.46, spend: "AED 1,011", result: "45 website contacts", cost: "AED 22.46" },
      ],
      testimonial: { quote: "", author: "" },
      evidence: [
        { type: "live", label: "Bolt's Family on Facebook", url: "https://www.facebook.com/1391345590733309" },
        { type: "report", label: "Ads Manager export (PDF)", url: "" },
      ],
    },
    {
      id: "clipnox",
      client: "Clipnox Media Production",
      category: "Media production",
      pending: true,
      evidence: [
        { type: "live", label: "Clipnox page", url: "" },
        { type: "report", label: "Campaign report", url: "" },
      ],
    },
    {
      id: "shiyo-bridal",
      client: "Shiyo Bridal",
      category: "Bridal",
      pending: true,
      evidence: [
        { type: "live", label: "Shiyo Bridal page", url: "" },
        { type: "report", label: "Insights report", url: "" },
      ],
    },
  ],

  behance: {
    projectTitle: "Portfolio | Digital Marketing",
    url: "https://www.behance.net/gallery/238431633/Portfolio-Digital-Marketing",
    blurb: "The full case-study deck is also published on Behance.",
    stats: [],
    more: [],
  },

  canvaDeck: "https://www.canva.com/d/xMUTVjRKVZJESEq",

  // Name of every slide in assets/slides, used for alt text and the viewer caption.
  slideTitles: {
    1: "Portfolio cover",
    2: "About me",
    3: "Work experience",
    4: "Certifications",
    5: "Skills and tools",
    6: "MEBS Facility Services: overview, scope and strategy",
    7: "MEBS: social media analytics",
    8: "MEBS: social media content",
    9: "MEBS: SEO analysis (Semrush and Search Console)",
    10: "MEBS: brand identity",
    11: "SASA Real Estate: overview, scope and strategy",
    12: "SASA Real Estate: social media analytics",
    13: "SASA Real Estate: Meta lead generation campaign",
    14: "SASA Real Estate: social media content",
    15: "Middle East Real Estate: overview, scope and strategy",
    16: "Middle East Real Estate: social media analytics",
    17: "Middle East Real Estate: social media content",
    18: "Fintech app social campaigns",
    19: "TikTok: superbike showroom videos",
    20: "Social media content schedule",
    21: "Lead generation automation (Meta, Zoho CRM, WATI, email)",
    22: "B2B marketing strategy action plan",
    23: "Meta campaign and content strategy",
    24: "Competitor analysis: Dubai real estate",
    25: "Thank you and contact",
    26: "Meta campaign strategy: targeting, ad copy, retargeting",
    27: "Annual marketing budget plan",
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
