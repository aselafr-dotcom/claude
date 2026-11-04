# Digital Marketing Portfolio

A one-page, image-led portfolio styled after a black / mint / forest-green "annual report" slide deck. Every slide image opens full size in a built-in viewer. Sections:

1. **Hero**: name, summary, the About slide and four headline results with sources
2. **Selected work**: image tiles linking to each case study
3. **Case studies**: MEBS Facility Services, SASA Real Estate and Middle East Real Estate, each with overview, scope, strategy, results, live links and a strip of portfolio slides
4. **Freelance projects**: Bolt's Family (live Meta Ads Manager data: spend, conversations, reach, monthly chart, top campaigns), plus Clipnox Media Production and Shiyo Bridal in progress
5. **Strategy, systems & planning**: Meta strategy, lead automation, B2B action plan, competitor analysis, budget plan
6. **Social media content**: content slides across real estate, facility management, fintech and TikTok
7. **Work experience**, **skills, education & certifications**
8. **Reports & evidence library**: every link and slide in one table, plus Behance and the Canva deck
9. **Contact**

Plain HTML, CSS and JavaScript. No build step.

## Slide images

`assets/slides/slide-01.jpg` to `slide-27.jpg` are the 27 pages of the Canva deck "Digital Marketing Portfolio - Asela Fernando", at 596 px wide. To use sharper versions, export the deck from Canva as JPG (1600 px wide works well) and overwrite these files with the same names.

## Editing content

All content is in **`assets/js/portfolio-data.js`**. You don't need to touch the HTML.

- Text starting with `TBC` shows up with a dashed outline so a placeholder is never mistaken for a real figure.
- A link left as `""` shows up as a greyed "pending" button and as **Pending** in the evidence library.
- A freelance chart draws once `trend.values` holds monthly numbers, for example:
  ```js
  trend: { metric: "Monthly reach", labels: ["Jan", "Feb", "Mar"], values: [1200, 1850, 2400] }
  ```
- The yellow "Draft" banner counts what is still missing. It disappears when everything is filled in.

Good evidence links include Google Drive or Looker Studio reports (shared as "anyone with the link"), Meta Ad Library pages, the live Instagram, Facebook or TikTok posts, and Behance case studies. You can also drop PDFs into an `assets/reports/` folder and link them as `assets/reports/your-file.pdf`.

## Preview locally

Open `index.html` in a browser, or run:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Publish with GitHub Pages

Repository **Settings → Pages → Deploy from a branch**, then pick the branch and `/ (root)`.
