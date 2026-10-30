import sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

OUT = sys.argv[1]

# Indicative revenue per employee (AED per year), used only where no figure is published
RATE = {"FM": (75_000, 110_000), "Security": (72_000, 100_000), "Cleaning": (45_000, 65_000)}

def est(cat, lo_emp, hi_emp):
    if not lo_emp:
        return "Cannot estimate (headcount unknown)"
    a = lo_emp * RATE[cat][0] / 1e6
    b = (hi_emp or lo_emp) * RATE[cat][1] / 1e6
    return f"approx. AED {a:,.0f}M to {b:,.0f}M"

COLS = ["#", "Company", "Core services", "Owner / parent group", "Owner nationality",
        "Ownership type", "Founded", "Head office", "Coverage",
        "Employees (reported)", "Company capacity / scale", "Revenue (published or third-party)",
        "Indicative revenue (our estimate*)", "Licences / certifications", "Notable clients / contracts",
        "Why they compete with MEBS", "Data confidence", "Main sources"]

FM = [
 dict(name="Farnek Services LLC", svc="Integrated FM: MEP/hard services, cleaning, security (Farnek Security), hospitality staffing, smart/green FM",
      owner="Private. Group CEO Markus Oberlin. Per The National, Farnek was acquired by Prioria Facility Management (ex-Swissair property arm bought out by private investors). Company calls itself Swiss-owned and independent",
      nat="Swiss (owner/management)", own="Private", year="1980", hq="Al Quoz, Dubai", cov="UAE (all emirates), regional projects",
      emp="8,000+ (company); 10,000+ (ZoomInfo)", e=(8000,10000),
      cap="Won contracts worth AED 607M+ in 2023 (company); mobilised 800 cleaning staff for Dubai Airports contract",
      rev="Not published. ZoomInfo estimate US$211M (approx. AED 775M)", lic="SIRA (security arm)", cli="Dubai Airports",
      why="Same Dubai base and same mix of security + cleaning + MEP. Ranked #2 in FM Middle East Power List 2025", conf="Medium",
      src="farnek.com/about-us; thenationalnews.com (Oberlin profile); farnek.com (AED 607M 2023 release); i-fm.net (Dubai Airports)"),
 dict(name="EFS Facilities Services Group", svc="Integrated FM: hard/soft services, security (acquired SecurePlus 2016 and Guardian Safety & Security), cleaning, energy",
      owner="Private shareholders; co-founder & Group CEO Tariq Chauhan. Shareholders bought out EMCOR's stake in 2009",
      nat="Indian (co-founder/CEO), UAE-incorporated", own="Private", year="2006 (EFS brand since 2009)", hq="Dubai", cov="25 countries, 40 operating companies (Middle East, Africa, Asia, Europe)",
      emp="approx. 32,000 group-wide (EFS newsroom); 20,000 to 25,000 in earlier reports", e=(20000,32000),
      cap="50M+ sqm under management; US$1bn international order book milestone",
      rev="Approx. US$270M in 2021 (Forbes ME). A separate Forbes ME profile cites US$900M for 2021, so figures conflict",
      lic="SIRA (security subsidiaries)", cli="Large government-related and corporate portfolios across GCC",
      why="Full IFM incl. in-house security, Dubai HQ, competes for the same commercial and community contracts", conf="Medium",
      src="forbesmiddleeast.com (Tariq Chauhan); gulfbusiness.com (EMCOR buyout); zawya.com (SecurePlus, Guardian acquisitions); newsroom.efsme.com"),
 dict(name="Enova by Veolia", svc="Facility & energy management: MEP, soft services, energy performance contracts (Hubgrade monitoring centre)",
      owner="JV: Majid Al Futtaim (private Emirati family conglomerate) + Veolia (French, listed)",
      nat="Emirati / French", own="Private JV", year="2002", hq="Deira City Centre complex, Dubai", cov="UAE, KSA, Egypt, Oman, Qatar, Türkiye",
      emp="3,000+ (company)", e=(3000,3000),
      cap="Malls and retail portfolios; Hubgrade remote energy monitoring centre",
      rev="Not published (third-party estimates unreliable)", lic="ISO-certified (per company)", cli="MAF malls (City Centre, Mall of the Emirates), Dubai Airports Emiratisation partnership, Saudi malls",
      why="Strong in retail, mall and commercial FM where MEBS sells security and cleaning", conf="Medium",
      src="enova-me.com; Enova corporate brochure (emiratesgbc.org); zawya.com (Saudi malls contract)"),
 dict(name="Al Shirawi Facilities Management LLC", svc="Integrated FM: MEP, civil, cleaning, landscaping, pest control",
      owner="Al Shirawi Group. Chairman Mohamed Al Shirawi; co-founders Abdulla Al Shirawi and Mohan Valrani",
      nat="Emirati / Indian", own="Private family group", year="Group 1971 (FM operations from 1974 per MEFMA listing)", hq="Dubai", cov="UAE",
      emp="1,500+ (FM company, 2016); Group 10,500 to 11,000", e=(1500,2000),
      cap="Part of 30+ company group; awards from RTA; ISO 41001 (BSI); BICSc certified",
      rev="Not published", lic="ISO 41001, BICSc", cli="Dubai Design District, Dubai International Humanitarian City, RTA, IT Plaza (HOAM)",
      why="Private Emirati-backed Dubai IFM, similar commercial/community client base", conf="Medium",
      src="mefma.org (Al Shirawi FM); zawya.com (d3, ISO 41001 releases); wikipedia (Mohan Valrani); entrepreneur.com"),
 dict(name="INAYA Facilities Management Services", svc="Integrated FM: MEP, cleaning, soft services, helpdesk",
      owner="Belhasa Group. Chairman Ahmed Saif Belhasa",
      nat="Emirati", own="Private family group", year="December 2010", hq="Dubai", cov="UAE, wider GCC",
      emp="501 to 1,000 (aggregator, unverified)", e=(500,1000),
      cap="Mall and commercial portfolios", rev="Not published", lic="ISO 14001, OHSAS 18001 (2014)", cli="Ibn Battuta Mall",
      why="Closest size peer to MEBS; Emirati family-owned Dubai IFM", conf="Low to medium",
      src="gulfnews.com (INAYA launch); zawya.com (ISO award, Ibn Battuta); prospeo.io"),
 dict(name="Delight International Facilities Management LLC", svc="Integrated FM: cleaning (origin), MEP maintenance, soft services",
      owner="Private (Delight group of companies). Owner name not published",
      nat="Not published", own="Private", year="1991", hq="Dubai", cov="Dubai, Abu Dhabi",
      emp="500+ (company)", e=(500,700),
      cap="Started as a cleaning company and grew into IFM", rev="Not published", lic="ISO certified (per company)", cli="Not published",
      why="Size peer that also grew from one service line into IFM, as MEBS did", conf="Low",
      src="delightifm.com/about; devex.com; enggpro.com"),
 dict(name="Dulsco Group", svc="Manpower outsourcing (People Solutions), waste management (Environmental Solutions), FM services, recruitment",
      owner="Private shareholders incl. Sheikh Mana bin Khalifa Al Maktoum (founder WAFI Group, private capacity) and Abdul Rahman Sharif Al Baidhaei (ARMS Group). Group CEO David Stockton",
      nat="Emirati", own="Private (note: one shareholder is a royal family member in a private capacity, not a government entity)", year="1935", hq="Dubai", cov="UAE, GCC, UK (acquired Advance Global Recruitment)",
      emp="14,000+ (company)", e=(14000,14000),
      cap="Workers deployed across 75 job categories; 90-year history", rev="Not published (aggregator estimates range from US$400M to US$6.7B, unreliable)",
      lic="Not published", cli="Large corporate and real estate clients",
      why="Supplies cleaning and FM manpower in the same Dubai market", conf="Medium",
      src="zawya.com (90 years release); khaleejtimes.com (AGR acquisition); gulftalent.com"),
 dict(name="ServeU LLC", svc="Integrated FM: MEP, cleaning, housekeeping, disinfection, logistics; domestic workers unit",
      owner="Union Properties PJSC (Dubai Financial Market listed; approx. 90% held by the general public)",
      nat="Emirati (listed parent)", own="Subsidiary of a listed private-sector company", year="1985", hq="Dubai", cov="UAE + 4 other countries",
      emp="8,900+ (Gulf News)", e=(8900,8900),
      cap="Expo 2020 pavilions FM contracts (AED 18M); acquired House Keeping LLC for AED 100M", rev="Not published separately (Union Properties H1 2025 revenue AED 316M, group level)",
      lic="Not published", cli="Expo 2020 pavilions, Dubai towers, Ayedh Hussein Bin Dejem Real Estate",
      why="Dubai IFM with large cleaning and housekeeping workforce", conf="Medium",
      src="gulfnews.com (House Keeping deal); khaleejtimes.com; simplywall.st (UPP ownership)"),
]

SEC = [
 dict(name="G4S Secure Solutions UAE", svc="Manned guarding, event security, cash services, electronic security, risk consulting",
      owner="Allied Universal (USA, private; backed by Warburg Pincus and Canada's CDPQ). UAE local shareholding not published",
      nat="American (parent)", own="Private (foreign multinational)", year="Operating in UAE for decades (G4S acquired 2021 by Allied Universal)", hq="Dubai", cov="UAE (5 branches), wider region approx. 30,000 staff",
      emp="9,000 (2021 report) to 12,000+ (G4S case study)", e=(9000,12000),
      cap="6,000+ SIRA/ASSD certified guards; 35 nationalities", rev="Not published for UAE",
      lic="SIRA (Dubai), ASSD (Abu Dhabi)", cli="Real estate developers, government-related venues, events",
      why="Largest private guarding competitor for MEBS security division", conf="Medium",
      src="g4s.com (UAE case study); securitymagazine.com (Allied deal); propertyfinder.ae"),
 dict(name="First Security Group (FSG)", svc="Manned guarding, security & H&S training (FSG Training Centre), investigations, due diligence",
      owner="Private; founded by 10 retired Dubai Police major generals. CEO Ret. Maj. Gen. Abdul Aziz Al Bannai",
      nat="Emirati", own="Private (100% local)", year="2004 (start-up capital AED 20M)", hq="Dubai", cov="UAE",
      emp="1,001 to 5,000 (GulfTalent/Naukri)", e=(1000,5000),
      cap="Dubai Police-registered training centre", rev="Not published",
      lic="SIRA; training registered with Dubai Police and Dubai Ambulance", cli="Corporate and government-related clients",
      why="Emirati-owned Dubai guarding firm, direct overlap with MEBS's origin business", conf="Medium",
      src="gulfnews.com (ex-police officers launch FSG; 'We know the meaning of security'); gulftalent.com"),
 dict(name="Securitas UAE LLC", svc="Specialised guarding, mobile patrol, security receptionists, electronic security, monitoring",
      owner="Securitas AB (Sweden; Nasdaq Stockholm listed)",
      nat="Swedish (parent)", own="Private (listed multinational)", year="2009 (UAE)", hq="Dubai", cov="UAE",
      emp="1,400+ (company); 201 to 1,000 (directories)", e=(1000,1400),
      cap="400+ clients; 37% growth in 2014", rev="Not published for UAE",
      lic="SIRA", cli="Corporate offices, community sponsorship (Dubai Exiles RFC)",
      why="Competes on premium corporate guarding in Dubai", conf="Medium",
      src="tradearabia.com (37% growth 2014); zawya.com; dubaiexiles.com"),
 dict(name="Magnum Security", svc="Security guards, consulting, VIP/close protection, security chauffeurs, CCTV monitoring",
      owner="Private. Managing Director Jimmy Singh (owner not published)",
      nat="Not published", own="Private", year="2003", hq="Dubai (new facility planned in Jebel Ali)", cov="UAE",
      emp="1,000+ (company); 501 to 1,000 (ZoomInfo)", e=(500,1000),
      cap="SIRA and SGS ISO 9001:2015 certified", rev="Approx. US$44.5M (ZoomInfo estimate, unverified)",
      lic="SIRA, ISO 9001:2015", cli="Residential and commercial buildings",
      why="Similar-size Dubai guarding firm, direct price competitor", conf="Medium",
      src="khaleejtimes.com ('Security that matters', 'Think safety with Magnum'); magnumsecurity.ae; zoominfo.com"),
 dict(name="Landmark Security Services", svc="Manned guarding for residential and corporate clients",
      owner="Private. MD Rashid Almoosa, founder Salim Nahfaoui (third-party data, unverified)",
      nat="Not confirmed", own="Private", year="2004", hq="Al Sufouh, Dubai", cov="UAE",
      emp="800+ (company/ZoomInfo)", e=(800,1000),
      cap="SIRA certified", rev="Not published", lic="SIRA", cli="Residential communities, corporate",
      why="Size peer of MEBS in Dubai guarding", conf="Low to medium",
      src="landmarksecurity.ae; dubizzle.com (security companies); zoominfo.com; prospeo.io"),
 dict(name="Guardforce Security Services UAE", svc="SIRA-licensed manned guarding for retail, education, hospitality, commercial and industrial",
      owner="Private. CEO Mick Iqbal (Indeed listing). Ultimate owner not published",
      nat="Not confirmed", own="Private", year="April 2007 (Dubai office)", hq="Jumeirah Village Circle, Dubai", cov="UAE",
      emp="201 to 500 (aggregator)", e=(200,500),
      cap="Multi-sector guarding", rev="Not published", lic="SIRA", cli="Retail, schools, hotels",
      why="Smaller Dubai guarding competitor in the same segments", conf="Low",
      src="guardforce.ae; ae.indeed.com; prospeo.io"),
]

CLN = [
 dict(name="Cleanco Group", svc="Industrial & commercial cleaning (hospitals, airports, aircraft, universities), pest control, hazardous/medical waste (Cleanco Waste Treatment)",
      owner="Private Emirati group (website hosted under Sarhan Co. domain). Owner name not published; Group CEO reported as Jamal Abdulla Lootah",
      nat="Emirati", own="Private", year="1980", hq="Abu Dhabi", cov="UAE",
      emp="10,000+ (company)", e=(10000,10000),
      cap="Guinness World Record for largest hazardous waste management lesson", rev="Not published",
      lic="Not published", cli="Hospitals, airports, aircraft, industrial sites",
      why="Largest cleaning-focused competitor; strong in Abu Dhabi", conf="Medium",
      src="gulftalent.com (Cleanco); mefma.org (Cleanco Group); zawya.com (Guinness record); sustainabilitymenews.com"),
 dict(name="Berkeley Services UAE (Klüh Group)", svc="Maintenance cleaning, high-rise facade/window cleaning, some FM",
      owner="Wholly owned by Klüh Service Management GmbH (Düsseldorf, family company founded 1911)",
      nat="German", own="Private family-owned multinational", year="Klüh 1911; Burj Khalifa cleaning since 2010", hq="Dubai (also Abu Dhabi)", cov="UAE",
      emp="approx. 8,000 (2020 company release)", e=(8000,8000),
      cap="Named one of top 3 FM providers in UAE by Klüh; 'Cleaning Company of the Year' Dubai 2018", rev="Not published for UAE",
      lic="Not published", cli="Burj Khalifa (contract renewed 4 times), Cayan Tower",
      why="Premium tower cleaning competitor in Dubai", conf="Medium",
      src="klueh.de (Burj Khalifa extension 2020; Cleaning Company of the Year 2018; UAE page)"),
 dict(name="Dussmann Gulf LLC", svc="Cleaning & housekeeping, disinfection, healthcare facility cleaning, pest control (plus some FM)",
      owner="Dussmann Group (Germany, family/foundation-owned)",
      nat="German", own="Private (sole-proprietorship subsidiary)", year="2005", hq="Abu Dhabi", cov="UAE",
      emp="534 to 3,000+ (sources conflict)", e=(900,3000),
      cap="Healthcare cleaning specialist", rev="Not published",
      lic="Not published", cli="Hospitals and healthcare facilities",
      why="Competes for healthcare and institutional cleaning contracts", conf="Low to medium",
      src="dussmann.ae; reveliolabs.com; mefma.org"),
 dict(name="White Spot Facilities Management Services LLC (Whitespot)", svc="Commercial & residential cleaning, housekeeping, maintenance",
      owner="Private. Owner not published",
      nat="Not published", own="Private", year="2017", hq="Dubai", cov="UAE",
      emp="1,001 to 5,000 (Naukri); 51 to 200 (ZoomInfo)", e=(1000,3000),
      cap="Fast-growing cleaning workforce, regular mass hiring", rev="Not published",
      lic="Not published", cli="Commercial buildings, residential",
      why="Fast-growing Dubai cleaning rival for building and housekeeping contracts", conf="Low",
      src="naukrigulf.com; zoominfo.com; mefma.org (White Spot FM)"),
 dict(name="Justlife (formerly Justmop)", svc="On-demand home cleaning, plus beauty, maintenance and home healthcare",
      owner="Founders Kerem Kuyucu and Ali Cagatay Ozcan; VC-backed",
      nat="Turkish (founders)", own="Private (VC-backed)", year="2015", hq="Dubai", cov="UAE, KSA",
      emp="500 to 1,000 (aggregators)", e=(500,1000),
      cap="App-based booking platform", rev="Estimates range from under US$5M (ZoomInfo) to US$47.7M (Prospeo)",
      lic="Not applicable", cli="Residential consumers",
      why="Competes only for residential cleaning; relevant if MEBS targets home services", conf="Low to medium",
      src="bitscale.ai; wamda.com; zoominfo.com; prospeo.io"),
 dict(name="Total Care Cleaning Services (Al Bwardy Investments)", svc="Commercial and residential cleaning",
      owner="Al Bwardy Investments (Emirati family business group)",
      nat="Emirati", own="Private family group", year="Not published", hq="Dubai", cov="UAE",
      emp="Not published", e=None,
      cap="Part of a diversified Emirati group", rev="Not published",
      lic="Not published", cli="Not published",
      why="Emirati-owned cleaning contractor in Dubai", conf="Low",
      src="albwardy.com (Total Care Cleaning Services page)"),
]

EXCL = [
 ("Transguard Group", "Part of the Emirates Group, owned by the Investment Corporation of Dubai (Dubai Government)"),
 ("Imdaad LLC", "Owned by the Investment Corporation of Dubai (Dubai Government)"),
 ("Emrill Services", "50% owned by Emaar Properties (Investment Corporation of Dubai is a major Emaar shareholder); 50% Al-Futtaim"),
 ("Ejadah Asset Management", "Part of Dubai Holding Real Estate (Dubai Government-owned)"),
 ("Securiguard Middle East", "Owned by Palms Sports, a subsidiary of International Holding Company (IHC), which is state-linked"),
 ("Khidmah", "Aldar Properties subsidiary; Aldar has major state-linked shareholders"),
 ("Deyaar Facilities Management", "Deyaar Development, linked to Dubai Islamic Bank (government shareholding)"),
 ("Musanada / Tadweer / Bee'ah", "Government entities (Abu Dhabi / Sharjah)"),
 ("ENGIE Cofely UAE", "ENGIE is partially owned by the French State"),
]

MEBS = ["MEBS Facility Services (Middle East Building Security)",
        "Security guarding (SIRA licensed), cleaning, MEP maintenance, HVAC, plumbing, pest control, lifeguards",
        "Al Qaisi Group. Founder Salem Ahmed Salem Al Qaisi", "Emirati", "Private", "2000 (security); IFM since 2019",
        "Business Bay, Dubai", "UAE", "501 to 1,000 (Indeed)", "SIRA, ISO 9001 / 14001 / 45001 (directory listing)"]

thin = Side(style="thin", color="BFBFBF")
border = Border(left=thin, right=thin, top=thin, bottom=thin)
HEAD = PatternFill("solid", fgColor="1F3864")
FILLS = {"FM": "DDEBF7", "Security": "FCE4D6", "Cleaning": "E2EFDA"}
wrap = Alignment(wrap_text=True, vertical="top")
WIDTHS = [4, 26, 38, 42, 16, 18, 16, 20, 24, 24, 36, 32, 22, 22, 30, 34, 12, 46]

wb = Workbook()
ws = wb.active
ws.title = "Read me"
lines = [
 ("MEBS Facility Services: 20 private-sector competitors (UAE)", True),
 ("Prepared 30 Oct 2026 from public web sources. Government-owned or government-linked companies are excluded (see 'Excluded' sheet).", False),
 ("", False),
 ("Sheets", True),
 ("1. FM Companies (8)  2. Security Only (6)  3. Cleaning Only (6)  4. MEBS benchmark  5. Excluded (gov-linked)", False),
 ("", False),
 ("How to read the data", True),
 ("Employees: as reported by the company or a named source. Where sources disagree, the range is shown.", False),
 ("Revenue: private UAE companies do not publish accounts. Published figures are used when available; third-party database estimates are labelled.", False),
 ("*Indicative revenue (our estimate) = reported headcount x typical billing per employee per year:", False),
 ("    FM: AED 75k to 110k | Security: AED 72k to 100k | Cleaning: AED 45k to 65k. Use only for rough sizing, not as fact.", False),
 ("Data confidence: High = audited/official; Medium = company releases and reputable press; Low = directories/aggregators only.", False),
 ("Owner names marked 'not published' should be confirmed via the Dubai DET / Abu Dhabi ADDED trade licence registers.", False),
]
for i, (t, b) in enumerate(lines, 1):
    c = ws.cell(row=i, column=1, value=t)
    c.font = Font(bold=b, size=14 if i == 1 else 11)
ws.column_dimensions["A"].width = 130

def sheet(title, cat, rows):
    s = wb.create_sheet(title)
    for j, h in enumerate(COLS, 1):
        c = s.cell(row=1, column=j, value=h)
        c.font = Font(bold=True, color="FFFFFF"); c.fill = HEAD; c.alignment = wrap; c.border = border
        s.column_dimensions[get_column_letter(j)].width = WIDTHS[j - 1]
    fill = PatternFill("solid", fgColor=FILLS[cat])
    for i, r in enumerate(rows, 1):
        e = r["e"] or (None, None)
        vals = [i, r["name"], r["svc"], r["owner"], r["nat"], r["own"], r["year"], r["hq"], r["cov"],
                r["emp"], r["cap"], r["rev"], est(cat, *e), r["lic"], r["cli"], r["why"], r["conf"], r["src"]]
        for j, v in enumerate(vals, 1):
            c = s.cell(row=i + 1, column=j, value=v)
            c.alignment = wrap; c.border = border
            if j == 2:
                c.font = Font(bold=True); c.fill = fill
    s.freeze_panes = "C2"
    s.auto_filter.ref = f"A1:{get_column_letter(len(COLS))}{len(rows) + 1}"

sheet("FM Companies", "FM", FM)
sheet("Security Only", "Security", SEC)
sheet("Cleaning Only", "Cleaning", CLN)

s = wb.create_sheet("MEBS benchmark")
hdr = ["Company", "Services", "Owner", "Nationality", "Ownership", "Founded", "Head office", "Coverage", "Employees", "Licences"]
for j, (h, v) in enumerate(zip(hdr, MEBS), 1):
    a = s.cell(row=j, column=1, value=h); a.font = Font(bold=True); a.border = border
    b = s.cell(row=j, column=2, value=v); b.alignment = wrap; b.border = border
s.column_dimensions["A"].width = 16; s.column_dimensions["B"].width = 90

s = wb.create_sheet("Excluded (gov-linked)")
for j, h in enumerate(["Company", "Reason excluded"], 1):
    c = s.cell(row=1, column=j, value=h); c.font = Font(bold=True, color="FFFFFF"); c.fill = HEAD
for i, (n, why) in enumerate(EXCL, 2):
    s.cell(row=i, column=1, value=n).border = border
    c = s.cell(row=i, column=2, value=why); c.alignment = wrap; c.border = border
s.column_dimensions["A"].width = 32; s.column_dimensions["B"].width = 100

wb.save(OUT)
print("saved", OUT, len(FM) + len(SEC) + len(CLN), "companies")
