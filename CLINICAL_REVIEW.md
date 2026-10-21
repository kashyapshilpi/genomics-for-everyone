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
| Celiac disease blood test (`celiac`) | Food | acgCeliac, celiacIndia | Not reviewed | | |
| Milk (lactose) intolerance check (`lactose`) | Food | lactase | Not reviewed | | |
| G6PD test (`g6pd`) | Food | cpicG6pd, gr | Not reviewed | | |
| Nutrigenomics ("DNA diet") test (`nutri`) | Personalized | food4me, acmgMthfr | Not reviewed | | |
| Deletion / duplication test (MLPA) (`mlpa`) | Targeted | grSma, grDmd, grAlphaThal | Not reviewed | | |
| Prenatal exome sequencing (`pes`) | Pregnancy | ispdEs, acogCma | Not reviewed | | |
| RNA sequencing (`rnaseq`) | Sequencing | rnaSeq | Not reviewed | | |
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
| Age: pregnancy at 35+ (NIPT/screening), woman 35+ planning pregnancy, teenagers and adult-onset testing, PRS at 60+ | Not reviewed | | |
| Results already in hand, pregnancy: high marker/NIPT → diagnostic test; NIPT no-call → counselling ± diagnostic; structural anomaly or thick NT (even with low-risk NIPT) → CVS/amnio with microarray, then prenatal exome if microarray normal; isolated soft marker → usually no invasive test; growth restriction; abnormal or VUS result → counselling / parental testing | Not reviewed | | |
| Results already in hand, carrier: borderline HbA2 → HBB DNA test; trait → partner HPLC; low MCV with normal HbA2 → ferritin then α-globin deletion test | Not reviewed | | |
| Results already in hand, child: weakness → MLPA (SMN1, DMD) first; microarray VUS/abnormal → counselling, parents; exome negative → genome, then RNA in specialist centres; exome VUS/positive | Not reviewed | | |
| MLPA for DMD carrier testing (female relatives) and SMA carrier testing (related partners, unexplained infant death) | Not reviewed | | |
| Food & diet: wheat → celiac, milk → lactose (and cow's milk allergy in under-5s), fava beans → G6PD, anaemia not responding to iron → HPLC + celiac, DNA diet tests | Not reviewed | | |

## Couple check (`data/genes.json` and Punnett-square logic)

| Item | Status | Reviewer | Date |
|---|---|---|---|
| Autosomal recessive genes and 1-in-4 explanation | Not reviewed | | |
| HBB compound heterozygosity note (β-thal with HbS / HbE) | Not reviewed | | |
| α-thalassemia note | Not reviewed | | |
| X-linked explanation (sons vs daughters) | Not reviewed | | |

## Food tips (`data/diet.json`)

| Tip | Shown when | Sources | Status | Reviewer | Date |
|---|---|---|---|---|---|
| Balanced Indian thali | Always | icmrNin | Not reviewed | | |
| Folic acid before and in early pregnancy | Woman planning or in pregnancy | whoAnc | Not reviewed | | |
| Check iron before iron tablets | Thalassemia in family, carrier, or anaemia not helped by iron | grBetaThal | Not reviewed | | |
| Don't go gluten-free before the test | Wheat symptoms or celiac in family | acgCeliac | Not reviewed | | |
| Milk trouble doesn't mean no dairy | Milk symptoms | lactase, ifct | Not reviewed | | |
| Avoid fava beans until G6PD is checked | Fava bean / medicine reaction | cpicG6pd | Not reviewed | | |
| Food helps cholesterol, but may not be enough | LDL ≥190 or very high cholesterol in family | icmrNin, easFH | Not reviewed | | |
| Skip the DNA diet test | Considering a DNA diet test | food4me | Not reviewed | | |
| PKU: the diet is the treatment | Confirmed PKU | pkuAcmg | Not reviewed | | |
| Galactosemia: no milk sugar | Confirmed galactosemia | galactosemia | Not reviewed | | |
| Celiac disease: strict gluten-free | Confirmed celiac disease | acgCeliac | Not reviewed | | |
| FH: diet plus medicine | Confirmed familial hypercholesterolaemia | easFH, icmrNin | Not reviewed | | |
| G6PD deficiency: avoid fava beans | Confirmed G6PD deficiency | cpicG6pd | Not reviewed | | |
| Thalassemia major: no extra iron | Confirmed thalassemia major | tif | Not reviewed | | |

## Known gaps
- Guideline links in `references.json` are PubMed searches, not exact DOIs. They should be replaced with the exact papers.
- Indian prevalence numbers are intentionally left out until verified sources are added.
