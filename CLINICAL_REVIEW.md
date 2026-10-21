# Clinical review status

Nothing in this app has been reviewed by a clinical geneticist yet. This file tracks review so users and contributors can see what has been checked.

**How to review:** pick a row, check it against current guidelines (and Indian practice), then open a pull request that updates the row with your name, qualification, date and any changes. If something is wrong, open a "Rule looks wrong" or "Content correction" issue.

Status values: `Not reviewed` · `Reviewed – OK` · `Reviewed – changes needed` · `Reviewed – changed`

## Tests (`data/tests.json`)

| Test | Category | Sources cited | Status | Reviewer | Date |
|---|---|---|---|---|---|
| Blood count + hemoglobin test (`hb`) | Carrier | nhm, icmr, gr | Not reviewed | | |
| Targeted carrier screening (`carrier`) | Carrier | acmgCS, gr | Not reviewed | | |
| Expanded carrier screening (`ecs`) | Carrier | acmgCS | Not reviewed | | |
| Partner testing (`partner`) | Carrier | acmgCS, gr | Not reviewed | | |
| Known family variant test (`familial`) | Targeted | gr, clinvar | Not reviewed | | |
| Karyotype (`karyo`) | Targeted | gr | Not reviewed | | |
| Ultrasound + maternal blood screening (`prenatal`) | Pregnancy | acog | Not reviewed | | |
| NIPT (`nipt`) | Pregnancy | acog | Not reviewed | | |
| CVS or amniocentesis (`invasive`) | Pregnancy | acog, gr | Not reviewed | | |
| Newborn screening (`nbs`) | Child | nhm, gr | Not reviewed | | |
| Chromosomal microarray (`cma`) | Child | acmgES, gr | Not reviewed | | |
| Targeted gene panel (`panel`) | Targeted | gr, clingen, ilae | Not reviewed | | |
| Whole-exome sequencing (`wes`) | Sequencing | acmgES, clinvar, gr | Not reviewed | | |
| Whole-genome sequencing (`wgs`) | Sequencing | acmgES | Not reviewed | | |
| Hereditary cancer panel (`hcp`) | Adult | nccn, gr | Not reviewed | | |
| Inherited heart condition testing (`fh`) | Adult | gr, clingen | Not reviewed | | |
| Pharmacogenomic test (`pgx`) | Medicines | cpic, pharmgkb | Not reviewed | | |
| Polygenic risk score (`prs`) | Personalized | pgs | Not reviewed | | |
| Genetic counselling (`gc`) | Services | nsgc | Not reviewed | | |

## Recommendation logic (`recommend()` in `js/app.js`)

| Pathway | Status | Reviewer | Date |
|---|---|---|---|
| Planning marriage / pregnancy (carrier screening, partner testing, consanguinity) | Not reviewed | | |
| Pregnant (screening, NIPT, CVS/amniocentesis, timing by weeks) | Not reviewed | | |
| Newborn (newborn screening) | Not reviewed | | |
| Child with seizures / developmental delay / birth differences (CMA, panel, exome, genome) | Not reviewed | | |
| Child emergency safety check | Not reviewed | | |
| Adult: hereditary cancer | Not reviewed | | |
| Adult: high LDL / familial hypercholesterolaemia | Not reviewed | | |
| Adult: medicines (pharmacogenomics) | Not reviewed | | |
| Polygenic risk scores (always "not routine") | Not reviewed | | |
| Known family variant | Not reviewed | | |

## Couple check (`data/genes.json` and Punnett-square logic)

| Item | Status | Reviewer | Date |
|---|---|---|---|
| Autosomal recessive genes and 1-in-4 explanation | Not reviewed | | |
| HBB compound heterozygosity note (β-thal with HbS / HbE) | Not reviewed | | |
| α-thalassemia note | Not reviewed | | |
| X-linked explanation (sons vs daughters) | Not reviewed | | |

## Known gaps
- Guideline links in `references.json` are PubMed searches, not exact DOIs. They should be replaced with the exact papers.
- Indian prevalence numbers are intentionally left out until verified sources are added.
