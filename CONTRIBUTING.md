# Contributing

Thank you for helping. This project gives health-related guidance to the public, so the most important rule is:

## No claim without a source

Every new or changed medical statement (a test description, a rule, a number, a recommendation) must come with a source in the pull request: a guideline, a peer-reviewed paper, GeneReviews, ClinGen, CPIC, an Indian government programme page, or similar. Pull requests that add numbers or claims without a source will not be merged.

For prevalence figures, always give: **estimate, metric (e.g. carrier frequency, incidence), population, year, and source.**

## Ways to contribute

### Report a problem (no coding needed)
Open an issue and choose a template:
- **Rule looks wrong**: a test was recommended (or not) when it shouldn't have been.
- **Content correction**: wrong or outdated text in a test, condition or question.
- **Add a test or gene**.
- **Translation**.

### Edit content (JSON only)
1. Find the file in `data/`:
   - `tests.json`: each test's `purpose`, `who`, `detects`, `limits`, `india`, `ask`, and `refs` (keys from `references.json`).
   - `questions.json`: `text`, `sub`, and `opts` (answer labels). `when` names a condition defined in `WHEN` in `js/app.js`.
   - `genes.json`: `inheritance` is `AR` (recessive) or `XL` (X-linked).
   - `conditions.json`, `references.json`.
2. Edit it on GitHub (pencil icon) or locally.
3. Run `node scripts/check-data.js` (it also runs automatically on your pull request).
4. Open a pull request and fill in the template, including the source.

Don't change an option's **key** (e.g. `"marriage"` in `"marriage": "Planning marriage"`) unless you also update `js/app.js`, because the engine uses the keys. Changing the label is fine.

### Change the recommendation logic
The rules are in `recommend()` in `js/app.js`. Each rule calls `add(testId, tier, reason)` with a tier of `relevant`, `consider` or `notroutine`. In the pull request, describe the scenario before and after the change, and the guideline that supports it. Changes to rules need sign-off from a clinical reviewer before merging (see [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md)).

### Run it locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
node scripts/check-data.js
```
If you change any file listed in `sw.js`, bump `VERSION` in `sw.js` so installed copies update.

## Writing style
- Plain English, short sentences, for people with no science background.
- Say what a test **cannot** tell you as clearly as what it can.
- Never call a couple "compatible" or "incompatible".
- Don't promote any lab or brand.

## Privacy
The app must keep working with no sign-in, no uploads, no analytics and no third-party tracking. Pull requests that add any of these will not be accepted without discussion in an issue first.
