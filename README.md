# Genomics for Everyone

A free, private, phone-friendly guide that helps people in India work out **which genetic tests may be worth discussing with their doctor**, and which ones they probably don't need yet.

> ⚠️ **Prototype. Not clinically validated. Educational use only.**
> This app does not diagnose, treat or prevent any condition, and it is not a medical device. Its rules have **not yet been reviewed by a clinical geneticist**. Always talk to a doctor or genetic counsellor before deciding on a test.

## What it does

| Tab | What you can do |
|---|---|
| **Home** | Pick a journey: planning marriage, pregnancy, a child's health, or your own risks. Myth-buster cards. |
| **Check** | Chat with "Gia", who asks about 14–20 short questions (29 in total, depending on your answers) and builds a plan: *Worth discussing → If indicated → Skip for now*, plus ready-made questions to ask your doctor. |
| **Couple** | Carrier check for two partners with a Punnett square, for recessive (HBB, SMN1, CFTR…) and X-linked (G6PD, DMD, F8/F9) genes. It explains chances and never labels a couple "compatible" or "incompatible". |
| **Learn** | 19 tests explained (what they detect, what they can't tell you, sources), a short guide to polygenic risk scores, and 10 conditions relevant in India. |
| **Privacy** | No sign-in, no DNA upload, no name or Aadhaar. Answers stay in the browser and are not saved. |

It works offline after the first visit and can be installed to the home screen ("Add to Home Screen") like an app.

## Try it

**Live demo:** _turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) and put the link here._

To run it on your own computer:

```bash
git clone <this repo>
cd genomics-for-everyone
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly (double-click) won't work, because the browser blocks loading the `data/*.json` files from disk.

## How it's organised

```
index.html            app shell
css/app.css           styles (light + dark)
js/app.js             screens and the recommendation engine (recommend())
data/
  tests.json          the 19 tests: purpose, who, can/cannot detect, India notes, sources
  questions.json      Gia's questions, the section each belongs to, and when it is shown
  genes.json          genes for the Couple check (AR = recessive, XL = X-linked)
  conditions.json     conditions in the Learn → India tab
  references.json     sources cited by tests
manifest.json, sw.js  install-to-home-screen and offline support
scripts/check-data.js checks the data files are consistent (also runs on every pull request)
```

**Most content can be edited without touching code.** To fix a test description, add a source, reword a question or add a gene, edit the JSON file and open a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).

The rules that decide *which* tests are recommended are currently in `recommend()` in `js/app.js`. Moving them into a reviewable `data/rules.json` is an open task.

## We need help from

- **Clinical geneticists and genetic counsellors**: review the recommendation logic and test descriptions. Review status is tracked in [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md).
- **People with Indian data**: verified prevalence figures (with source, year and population) for the conditions in the Learn tab.
- **Translators**: Hindi, Telugu, Tamil, Bengali and other languages.
- **Developers and designers**: accessibility, moving rules to JSON, tests for the engine.

## Roadmap

- [ ] Clinical review of all rules and test descriptions
- [ ] Rules moved from code into `data/rules.json`
- [ ] Hindi and other Indian languages
- [ ] Family tree (pedigree) builder
- [ ] Verified Indian prevalence data
- [ ] Android / iOS app (Capacitor wrapper of this same code)

## Licence

- Code (`index.html`, `css/`, `js/`, `scripts/`, `sw.js`): [MIT](LICENSE)
- Medical and educational content (`data/`): [CC BY 4.0](LICENSE-CONTENT). You can reuse it with credit.
