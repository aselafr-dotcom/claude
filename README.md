# Digital Marketing Portfolio

A one-page portfolio site styled after a black / mint / forest-green "annual report" slide deck. Sections:

1. **Hero**: name, title, summary, headline stat
2. **Table of contents**: tiles linking to every section and case study
3. **Key achievements**: headline numbers, each with a source link
4. **Work experience**: role cards with responsibilities, measured impact and report links
5. **Freelance projects**: Bolt's Family, Clipnox Media Production, Shiyo Bridal (challenge, approach, results, monthly report chart, testimonial, evidence links)
6. **Reports & evidence library**: every report, live link and case study collected into one table, marked Linked or Pending
7. **Behance**: the [Portfolio | Digital Marketing](https://www.behance.net/gallery/238431633/Portfolio-Digital-Marketing) project, its stats and other projects
8. **Skills, tools & certifications**
9. **Contact**

Plain HTML, CSS and JavaScript. No build step.

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
