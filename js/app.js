/* ===================== ICONS ===================== */
const I={
 rings:`<path d="M8 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>`,
 heart:`<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/>`,
 baby:`<circle cx="12" cy="8" r="4"/><path d="M10 8h.01M14 8h.01M10.5 10c.8.6 2.2.6 3 0M6 21v-2a6 6 0 0 1 12 0v2"/>`,
 dna:`<path d="M7 3c0 6 10 6 10 12s-10 0-10 6M17 3c0 6-10 6-10 12M9 6h6M8 10h8M8 14h8M9 18h6"/>`,
 pill:`<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>`,
 flask:`<path d="M9 3h6M10 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>`,
 map:`<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>`,
 chat:`<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>`,
 chart:`<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`,
 users:`<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3 3-5 6-5s6 2 6 5M14 15.2c.6-.1 1.3-.2 2-.2 3 0 6 2 6 5"/>`,
 shield:`<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>`,
 back:`<path d="M15 6l-6 6 6 6"/>`, close:`<path d="M6 6l12 12M18 6L6 18"/>`, redo:`<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>`,
 leaf:`<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l8-8"/>`,
 chev:`<path d="M9 6l6 6-6 6"/>`, play:`<path d="M8 5v14l11-7z" fill="currentColor"/>`, copy:`<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>`
};
const ico=(n,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const helix=`<svg class="helix" viewBox="0 0 100 200" aria-hidden="true">${Array.from({length:14},(_,i)=>{const y=8+i*13,x1=50+38*Math.sin(i*.55),x2=50-38*Math.sin(i*.55);return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="${x1}" cy="${y}" r="5" fill="#fff"/><circle cx="${x2}" cy="${y}" r="5" fill="#fff" opacity=".6"/>`}).join("")}</svg>`;

/* ===================== DATA =====================
   Content lives in /data/*.json so reviewers can edit it without touching code.
   It is loaded in boot() at the bottom of this file. */
let REF, TESTS, T, SEC, Q, GENES, G, CONDS, DIET;
const CATC={Carrier:["rose","rings"],Pregnancy:["violet","heart"],Child:["sun","baby"],Targeted:["teal","flask"],Sequencing:["sky","dna"],Adult:["teal","heart"],Medicines:["sun","pill"],Personalized:["violet","chart"],Services:["sky","chat"],Food:["teal","leaf"],"Blood tests":["sky","flask"]};

/* ===================== QUESTIONS ===================== */
const isKid=a=>["child","newborn"].includes(a.stage), isRepro=a=>["marriage","preconception","pregnant"].includes(a.stage);
const hasCancer=a=>a.cancer||(a.fh||[]).includes("cancer");
// Named conditions used by "when" in data/questions.json. A question is shown only if its condition is true.
const WHEN={
 isKid, isRepro,
 isAdult:a=>a.stage==="adult",
 isPregnant:a=>a.stage==="pregnant",
 hasFamilyHistory:a=>(a.fh||[]).length>0,
 knownFamilyVariant:a=>a.known,
 childHasSeizures:a=>(a.child||[]).includes("seizures"),
 childWithConcerns:a=>isKid(a)&&(a.child||[]).length>0,
 adultWithCancerHistory:a=>a.stage==="adult"&&hasCancer(a),
 isAdultOrKid:a=>a.stage==="adult"||isKid(a),
 isAdultOrRepro:a=>a.stage==="adult"||isRepro(a),
 pregnantWithResults:a=>a.stage==="pregnant"&&!!a.screen&&a.screen!=="none",
 hadMarker:a=>(a.pregTests||[]).includes("dm"),
 hadNipt:a=>(a.pregTests||[]).includes("nipt"),
 hadScan:a=>(a.pregTests||[]).includes("scan"),
 hadInvasive:a=>(a.pregTests||[]).includes("invasive"),
 hadHbTest:a=>isRepro(a)&&["carrier","clear"].includes(a.carrierStatus),
 childHadCma:a=>(a.childTests||[]).includes("cma"),
 childHadExome:a=>(a.childTests||[]).includes("exome")
};
// Named conditions used by "when" in data/diet.json. A food tip is shown only if its condition is true.
const DIET_WHEN={
 always:()=>true,
 womanPlanningPregnancy:a=>isRepro(a)&&a.sex!=="male",
 thalOrStubbornAnaemia:a=>(a.fh||[]).includes("blood")||a.carrierStatus==="carrier"||a.anaemia==="ironNoHelp",
 celiacPossible:a=>((a.food||[]).includes("wheat")||(a.fh||[]).includes("celiac"))&&!(a.diagnosed||[]).includes("celiacDx"),
 milkTrouble:a=>(a.food||[]).includes("milk"),
 favaTrouble:a=>(a.food||[]).includes("fava"),
 highCholesterol:a=>a.ldl==="veryhigh"||(a.fh||[]).includes("highChol"),
 dnaDiet:a=>!!a.dnaDiet,
 dxPku:a=>(a.diagnosed||[]).includes("pku"),
 dxGalactosemia:a=>(a.diagnosed||[]).includes("galactosemia"),
 dxCeliac:a=>(a.diagnosed||[]).includes("celiacDx"),
 dxFh:a=>(a.diagnosed||[]).includes("fhDx"),
 dxG6pd:a=>(a.diagnosed||[]).includes("g6pdDx"),
 dxThalMajor:a=>(a.diagnosed||[]).includes("thalMajor")
};
const dietTips=a=>{const l=DIET.filter(t=>DIET_WHEN[t.when](a));return l.length>1?[...l.filter(t=>t.when!=="always"),...l.filter(t=>t.when==="always")]:l;};

/* ===================== ENGINE ===================== */
const RANK={relevant:0,consider:1,notroutine:2};
function recommend(a){
  const out=new Map(), cons=[], urgent=new Set(); // urgent: shown before other "start here" items
  const add=(id,tier,why,first)=>{let r=out.get(id);if(!r){r={id,tier,why:{relevant:[],consider:[],notroutine:[]},first:false};out.set(id,r);}if(RANK[tier]<RANK[r.tier])r.tier=tier;if(why&&!r.why[tier].includes(why))r.why[tier][urgent.has(id)?"unshift":"push"](why);if(first)r.first=true;};
  const fh=new Set(a.fh||[]),cc=new Set(a.child||[]),meds=new Set(a.meds||[]),ct=new Set(a.childTests||[]),ctype=new Set(a.cancerType||[]);
  const s=a.stage,repro=isRepro(a);
  const stageTxt={marriage:"You're planning marriage.",preconception:"You're planning a pregnancy.",pregnant:"You're pregnant. Some tests are time-limited, so talk to your obstetrician soon.",newborn:"This is about a newborn baby.",child:"This is about a child with a health or developmental concern.",adult:"You're a healthy adult curious about inherited risks."};
  if(stageTxt[s])cons.push(stageTxt[s]);
  if((a.fhWho||[]).some(x=>["parent","sibling","child"].includes(x)))cons.push("A close (first-degree) relative is affected, which makes family history more important.");
  if(a.consang==="yes")cons.push("Related partners have a higher chance of both carrying a change in the same recessive gene.");
  if(a.region&&a.region!=="OT")cons.push("Screening programmes differ by state. Ask your local hospital what is offered in "+Q.find(q=>q.id==="region").opts[a.region]+".");
  if(a.hcp)cons.push("A doctor has already suggested testing. Follow their advice; use this to prepare questions.");
  if(a.prior)cons.push("Bring earlier genetic reports. They may make new tests unnecessary, or allow reanalysis.");
  if((a.birth||[]).includes("nicu"))cons.push("A NICU stay is worth mentioning; discharge summaries help the specialist.");

  if(repro){
    add("hb","relevant","Hemoglobin disorders are among the most common inherited conditions in India. A blood count with hemoglobin analysis is the usual low-cost first step.",true);
    if(fh.has("blood"))add("hb","relevant","There's a family history of an inherited blood disorder.");
    if(a.carrierStatus==="carrier"||a.partnerStatus==="carrier"){
      add("partner","relevant","One of you is already known to be a carrier. Testing the other partner is the key next step; make sure HbS, HbE and β-thalassemia are all covered.",true);
      if(a.carrierStatus==="carrier"&&a.partnerStatus==="carrier"){
        add("gc","relevant","You are both carriers. A counsellor can explain the 1-in-4 chance per pregnancy and options such as prenatal diagnosis.");
        add("carrier","relevant","DNA testing to identify each partner's exact variant makes fast, accurate prenatal diagnosis possible later.");
        add("invasive",s==="pregnant"?"relevant":"consider","When both partners carry a hemoglobin disorder, prenatal diagnosis (usually CVS) can be planned early in pregnancy.");
      }
    }
    if(a.carrierStatus==="clear"&&a.partnerStatus==="clear")add("hb","consider","You've both been tested already. Repeat testing usually isn't needed unless results were borderline.");
    if(a.consang==="yes"||fh.has("geneticDx")||fh.has("infantDeath")||fh.has("dd")){
      add("carrier","relevant","Your family history or being related makes targeted carrier screening worth discussing.");
      add("ecs","consider","A broader panel may be discussed with a counsellor. It stays optional.");
      add("gc","relevant","A counsellor can choose which carrier tests suit your family.");
    }else{
      add("carrier","consider","Screening for selected conditions such as SMA can be discussed, guided by your family history.");
      add("ecs","consider","Optional. Most findings matter only if both partners carry a change in the same gene.");
    }
    if(fh.has("xl")&&a.sex==="female"){add("carrier","relevant","Women with affected male relatives may carry an X-linked condition. Carrier testing works best once the family's variant is known.");add("gc","relevant","X-linked conditions need specialist counselling before pregnancy.");}
    if(a.prevAffected){add("gc","relevant","After an affected child or pregnancy, counselling before the next pregnancy helps plan testing in time.");add("familial","relevant","If the affected child had a genetic diagnosis, testing for that exact change comes first.",true);add("wes","consider","If the affected child has no diagnosis, exome sequencing of the child (often with both parents) may be considered.");}
    if(fh.has("rpl"))add("karyo","consider","For repeated miscarriages, both partners' chromosomes may be checked, alongside non-genetic causes.");
    if(s!=="pregnant"){add("wes","notroutine","Exome is a diagnostic test for people with signs of a genetic condition, not pre-marital screening.");add("wgs","notroutine","Not a screening test for healthy couples.");}
  }
  if(s==="pregnant"){
    add("prenatal","relevant","Scans and maternal blood screening are part of routine antenatal care.",true);
    add("hb","relevant","If not done yet, hemoglobin screening early in pregnancy is time-sensitive.");
    if(a.screen==="high"){add("invasive","relevant","After a high-chance screening result, a diagnostic test gives a definite answer.");add("gc","relevant","Counselling helps you understand the result before deciding.");add("nipt","consider","NIPT may be offered, but it is still a screening test; diagnostic testing is needed for certainty.");}
    else if(a.screen==="scan"){add("invasive","relevant","When something is seen on a scan, diagnostic testing with microarray is often offered.");add("gc","relevant","A fetal medicine specialist and counsellor can explain the finding.");}
    else if(!a.niptResult)add("nipt","consider","A more sensitive screening option for trisomies 21, 18 and 13. A high-chance result needs a diagnostic test.");
    if(a.known||a.prevAffected)add("invasive","relevant","A family condition is known, so diagnostic testing for it can be planned with a fetal medicine specialist.");
    else add("invasive","consider","Offered after a high-chance screen, a scan finding, or a known family condition.");
    if(a.weeks==="gt20")cons.push("You're past 20 weeks. Some options are time-limited, so please speak to your obstetrician soon.");
    if(a.weeks==="w10")cons.push("You're in the window when CVS (about 10–13 weeks) and NIPT are both possible.");
    add("wgs","notroutine","Not part of routine pregnancy care.");
  }
  if(s==="newborn"){
    add("nbs","relevant","Finds treatable conditions before symptoms. Ask which conditions your hospital covers.",true);
    if(fh.has("blood"))add("hb","consider","With a family blood disorder, ask whether hemoglobin screening is included.");
    if(cc.has("anomalies")){add("cma","relevant","Babies with birth differences are usually assessed by a paediatrician or geneticist; microarray is common.");add("wes","consider","May be considered for an unwell baby with a suspected genetic cause.");add("gc","relevant","A genetics review helps choose the right test.");}
    add("wes","notroutine","Sequencing every newborn is not standard care.");add("wgs","notroutine","Reserved for selected unwell babies.");
  }
  if(s==="child"){
    const early=["lt1","1to3"].includes(a.onset), devIssue=cc.has("dd")||cc.has("regression")||a.devBefore==="no";
    if(cc.has("seizures")){
      if(devIssue||early){add("panel","relevant","Epilepsy panel: seizures that start early, especially with delay or regression, often have a genetic cause.",true);add("wes","relevant","Exome (ideally with both parents) is a common option for early-onset epilepsy with developmental concerns.");add("cma","consider","May be added when there are developmental concerns or physical differences.");}
      else add("panel","consider","Later-onset seizures with normal development are less often single-gene. A neurologist decides.");
      if(fh.has("epi"))cons.push("Epilepsy in the family is useful information for the neurologist.");
    }
    if(devIssue||cc.has("anomalies")||cc.has("autism")){
      add("wes","relevant","For unexplained developmental delay, ID or multiple anomalies, ACMG (2021) supports exome or genome sequencing as a first- or second-tier test.",true);
      add("cma",ct.has("cma")?"notroutine":"relevant",ct.has("cma")?"Microarray has already been done.":"Still widely used, especially where sequencing isn't accessible, or alongside it.");
      add("wgs","consider","In selected cases, or after a negative exome.");
    }
    if(cc.has("speech")&&!devIssue)cons.push("Isolated speech delay is common and often not genetic. A hearing test and speech assessment come first.");
    if(ct.has("cma")&&(devIssue||cc.has("anomalies")))add("wes","relevant","Microarray is already done, so exome is the usual next step.");
    if(ct.has("exome")){add("wgs","consider","An exome was already done. Genome sequencing may be considered if it was negative.");add("wes","consider","Ask the lab about reanalysing the existing exome before repeating any test; new genes are found every year.");}
    if(ct.has("panel")&&!ct.has("exome"))add("wes","relevant","A gene panel is already done. If negative, exome widens the search.");
    if(cc.has("hearing"))add("panel","consider","Hearing-loss panel after audiology review (GJB2 is often checked first).");
    if(cc.has("vision"))add("panel","consider","Retinal panel after an eye examination.");
    if(cc.has("weakness"))add("panel","consider","For weakness, first tests are specific: SMN1 for SMA, DMD deletion testing for Duchenne.");
    if(cc.has("infections"))add("panel","consider","Immunodeficiency panel after immunology blood tests.");
    if(cc.has("metabolic"))add("panel","consider",ct.has("meta")?"Metabolic tests are done; genetic testing can confirm the diagnosis.":"Biochemical blood and urine tests come first; genetic testing confirms.");
    if(cc.has("cardiac"))add("fh","consider","A paediatric cardiologist assesses first (ECG, echo); genetic and family testing may follow.");
    if(cc.has("growth"))add("cma","consider","Growth differences with other features may lead to microarray or a specific syndrome test.");
    if(cc.size)add("gc","relevant","A clinical geneticist can pick the most useful first test for your child.");
    
    add("hcp","notroutine","Adult-onset cancer gene testing is not usually done in children.");
  }
  if(s==="adult"){
    const strongCa=a.cancerYoung||ctype.has("ovarian")||ctype.has("pancreas");
    if(a.cancer)add("hcp","relevant","Your own cancer history"+(strongCa?", especially at a younger age or of these types,":"")+" can meet criteria for germline testing.");
    else if(fh.has("cancer"))add("hcp","consider",strongCa?"Relatives diagnosed young, or with ovarian or pancreatic cancer, often meet testing criteria. Usually the affected relative is tested first.":"Family history may meet testing criteria. Usually the affected relative is tested first.");
    if(ctype.has("colon"))cons.push("Colon or uterine cancer in the family can point to Lynch syndrome, which changes how early colonoscopy should start.");
    if(a.ldl==="veryhigh")add("fh","relevant","An LDL of 190 mg/dL or above in an adult is a common reason to suspect familial hypercholesterolaemia. Genetic testing helps find affected relatives.");
    else if(fh.has("heart")||fh.has("highChol"))add("fh","consider","Very high LDL or early heart attacks can point to familial hypercholesterolaemia. A lipid profile comes first.");
    if(a.ldl==="unknown"&&(fh.has("heart")||fh.has("highChol")))cons.push("Get a lipid profile; it is the first test for familial hypercholesterolaemia.");
    if(fh.has("suddenDeath"))add("fh","consider","A young unexplained sudden death in the family is a reason for cardiology review of close relatives.");
    if(meds.size){const d={clopidogrel:"CYP2C19 · clopidogrel",carbamazepine:"HLA-B*15:02 · carbamazepine",abacavir:"HLA-B*57:01 · abacavir",thiopurine:"TPMT/NUDT15 · azathioprine",fluoro:"DPYD · 5-FU/capecitabine",warfarin:"CYP2C9+VKORC1 · warfarin",antidep:"CYP2D6/CYP2C19 · some antidepressants"};
      add("pgx",[...meds].some(x=>["abacavir","carbamazepine"].includes(x))?"relevant":"consider","Guidance exists for "+[...meds].map(x=>d[x]).join("; ")+". Ask your doctor before starting. Never change a medicine yourself.");}
    if(fh.has("xl")&&a.sex==="female")add("carrier","consider","Women with affected male relatives may carry an X-linked condition; this matters for future pregnancies.");
    
    add("wes","notroutine","Without symptoms or a specific family history, exome rarely gives actionable answers and can produce uncertain results.");
    add("wgs","notroutine","Not a general health check for healthy adults.");
    if(fh.has("blood"))add("hb","consider","Knowing your carrier status helps with family planning and informs relatives.");
  }
  /* ---- results the person already has ---- */
  if(s==="pregnant"){
    const pt=new Set(a.pregTests||[]),scanBad=["structural","nt"].includes(a.scanResult);
    if(a.niptResult==="high"||a.dmResult==="high")add("invasive","relevant","A high-chance screening result needs a diagnostic test (CVS or amniocentesis) before any decision.");
    if(a.dmResult==="high"&&!pt.has("nipt"))add("nipt","consider","After a high-chance marker test, NIPT can be offered as a more accurate screen, but a diagnostic test gives the definite answer.");
    if(a.niptResult==="nocall"){add("gc","relevant","A failed NIPT ('no call') can itself go with a higher chance of some chromosome conditions. Discuss repeating it or a diagnostic test.");add("invasive","consider","Diagnostic testing may be offered after a failed NIPT.");}
    if(scanBad){
      urgent.add("invasive");
      add("invasive","relevant",(a.niptResult==="low"?"A low-risk NIPT mainly covers trisomies 21, 18 and 13. It doesn't rule out other chromosome changes or single-gene conditions that can cause what the scan shows. ":"")+"When the scan shows a structural problem or thick NT, a diagnostic test with chromosomal microarray is recommended.",true);
      if(a.niptResult==="low")cons.push("A negative NIPT does not explain a problem seen on scan. Further testing is about the scan finding, not about the NIPT.");
      add("gc","relevant","A fetal medicine specialist and genetic counsellor can explain the scan finding and testing options.");
      if(a.invasiveResult==="normal")add("pes","relevant","Microarray is normal but the scan shows a significant problem. Prenatal exome can find a single-gene cause in some of these pregnancies.");
      else add("pes","consider","If microarray from CVS or amniocentesis is normal, prenatal exome may be the next step.");
    }
    if(a.scanResult==="soft"&&a.niptResult!=="high"&&a.dmResult!=="high")cons.push("A single soft marker with low-chance screening usually doesn't need an invasive test. Your doctor may arrange a follow-up scan.");
    if(a.scanResult==="growth"){add("gc","relevant","A baby who is much smaller than expected, especially early, can sometimes have a genetic cause. A fetal medicine review comes first.");add("invasive","consider","May be offered depending on the scan findings and timing.");}
    if(a.invasiveResult==="abnormal")add("gc","relevant","A change was found in the baby's test. A genetic counsellor and fetal medicine specialist can explain what it means and your options.",true);
    if(a.invasiveResult==="vus")add("gc","relevant","An uncertain result often becomes clearer after testing both parents. Ask whether parental testing is possible.",true);
  }
  if(a.hbResult){
    if(a.hbResult==="borderline")urgent.add("carrier");
    if(a.hbResult==="borderline")add("carrier","relevant","Borderline HbA2 can hide a mild β-thalassemia trait and can be lowered by iron deficiency. DNA testing of the HBB gene gives a clear answer.",true);
    if(["trait","hbs","hbe"].includes(a.hbResult))add("partner","relevant","Your report shows a hemoglobin trait. Your partner's HPLC result is the key next step.",true);
    if(a.hbResult==="lowMcv"){add("mlpa","consider","Small red cells with normal HbA2 can be iron deficiency or α-thalassemia trait. After checking ferritin, α-globin deletion testing (gap-PCR or MLPA) can tell.");}
  }
  if(s==="child"){
    if(cc.has("weakness"))add("mlpa","relevant","For a weak or floppy child, the first genetic tests are usually SMN1 copy counting for SMA and DMD deletion testing for Duchenne. These are done by MLPA or a similar method.",true);
    if(a.cmaResult==="vus")add("gc","relevant","An uncertain microarray result is often clarified by testing both parents.");
    if(a.cmaResult==="abnormal")add("gc","relevant","Microarray found a likely cause. A geneticist can explain it, check if relatives need testing, and plan follow-up care.",true);
    if(a.exomeResult==="negative"){add("wgs","consider","Genome sequencing can find changes an exome misses.");add("rnaseq","consider","If exome and genome are negative, RNA testing in a specialist or research centre may explain some cases.");}
    if(a.exomeResult==="vus")add("gc","relevant","An uncertain exome result is often clarified by testing parents and by asking the lab to reanalyse it later.");
    if(a.exomeResult==="positive"){add("gc","relevant","A diagnosis was found. A geneticist can explain it, plan care with the right specialists, and offer testing to relatives.",true);add("familial","consider","Relatives, and future pregnancies, can be tested for the exact change found.");}
  }
  if(repro&&fh.has("xl")&&a.sex==="female")add("mlpa","consider","Most Duchenne cases are caused by deletions or duplications in the DMD gene, which MLPA detects. Testing works best once the affected relative's change is known.");
  if(repro&&(a.consang==="yes"||fh.has("infantDeath")))add("mlpa","consider","SMA carrier testing counts copies of the SMN1 gene, usually by MLPA or a similar method.");
  const dx=new Set(a.diagnosed||[]);
  if(dx.size)cons.push("You told us about a confirmed diagnosis. See the Food tab for diet guidance specific to it, and keep following your specialist's plan.");
  if(dx.has("fhDx"))add("familial","relevant","Familial hypercholesterolaemia runs in families. Parents, brothers, sisters and children should get a cholesterol test and, if the gene change is known, testing for it.");

  /* ---- routine blood tests ---- */
  const adult30=["30-34","35-39","40-59","60+"].includes(a.age), hbVariant=fh.has("blood")||["trait","hbs","hbe"].includes(a.hbResult);
  if(s==="pregnant")add("glucose","relevant","India's national guidelines advise testing every pregnant woman for gestational diabetes with a 75 g glucose test, at the first visit and again at 24–28 weeks.");
  if(s==="adult"){
    if(adult30)add("glucose","relevant","India's national NCD programme screens adults aged 30 and above for diabetes.");
    else add("glucose","consider","Worth checking if diabetes runs in the family or you are overweight.");
    if(hbVariant)cons.push("HbA1c can read wrongly with thalassemia trait or HbS/HbE. Ask your doctor whether a glucose test is better for you.");
    add("insulin","notroutine","Fasting insulin has no agreed normal range and isn't used to screen for diabetes. Fasting glucose and HbA1c are the standard tests.");
    if(a.ldl!=="veryhigh")add("lipid",fh.has("heart")||fh.has("highChol")||a.ldl==="unknown"?"relevant":"consider",fh.has("heart")||fh.has("highChol")?"Early heart disease or very high cholesterol in the family makes a lipid profile the first step.":a.ldl==="unknown"?"You don't know your cholesterol. A lipid profile is a simple, low-cost first check.":"Doctors usually check cholesterol in adults; how often depends on your other risks.");
  }
  const dxs=new Set(a.diagnosed||[]);
  if(dxs.has("fhDx"))add("lipid","relevant","Regular lipid profiles track how well treatment is working, and close relatives should have one too.");
  if(a.anaemia==="ironNoHelp"){add("ferritin","relevant","Ferritin shows whether you were actually low in iron.",true);add("b12","consider","Low B12 or folate is another cause of anaemia that iron doesn't fix.");}
  if(a.anaemia==="ironHelped"&&hbVariant)add("ferritin","consider","Check ferritin before taking iron for a long time, since thalassemia trait isn't fixed by iron.");
  if(a.hbResult==="lowMcv"){urgent.add("ferritin");add("ferritin","relevant","Iron deficiency is the commonest cause of small red cells. Check ferritin first.",true);}
  if(a.hbResult==="borderline")add("ferritin","consider","Iron deficiency can lower HbA2 and hide a β-thalassemia trait, so ferritin helps interpret the result.");
  if(dxs.has("thalMajor"))add("ferritin","relevant","Regular ferritin checks guide chelation in thalassemia major.");
  if(s==="child"){
    if(cc.has("weakness")){urgent.add("ck");add("ck","relevant","CK is a quick blood test: very high levels point to a muscular dystrophy such as Duchenne, while it is normal in SMA.",true);}
    if(cc.has("metabolic"))add("metab",ct.has("meta")?"consider":"relevant",ct.has("meta")?"Metabolic tests were done. Ask whether they were taken while your child was unwell, which matters for some disorders.":"Biochemical tests (ammonia, lactate, amino acids, urine organic acids) are the first step for a suspected metabolic disorder.",true);
    else if(cc.has("regression")||(cc.has("seizures")&&["lt1"].includes(a.onset)))add("metab","consider","Some metabolic disorders cause regression or seizures in infancy; a few have specific treatments, so they are worth ruling out.");
    if(cc.has("growth"))add("tsh","consider","Thyroid problems can slow growth. TSH is a simple first test.");
    if(cc.has("dd"))add("tsh","consider","If newborn thyroid screening wasn't done, a TSH test is a simple check.");
  }
  if(s==="pregnant"&&out.get("invasive")?.tier==="relevant")add("rapid","consider","A rapid test (QF-PCR or FISH) on the CVS or amniotic fluid sample can give an answer for the common trisomies in a day or two while microarray runs.");

  /* ---- age ---- */
  const age35=["35-39","40-59","60+"].includes(a.age);
  if(s==="pregnant"&&age35&&!["high","scan"].includes(a.screen)){
    add("nipt","relevant","At 35 or older, the chance of a chromosomal condition such as Down syndrome is higher. NIPT or combined screening is worth discussing early; a high-chance result still needs a diagnostic test.");
    cons.push("Screening for chromosomal conditions is offered to every pregnant woman, but it matters more at 35 or older.");
  }
  if(["marriage","preconception"].includes(s)&&age35&&a.sex!=="male")cons.push("If the woman will be 35 or older at pregnancy, the chance of chromosomal conditions is higher. This doesn't change carrier testing, but ask about screening early in pregnancy.");
  if(s==="adult"&&a.age==="13-17")cons.push("Testing teenagers for adult-onset conditions is usually delayed until 18, so they can decide for themselves. Testing for a condition that affects them now is different.");

  /* ---- food & diet ---- */
  const food=new Set(a.food||[]);
  if(food.has("wheat")){add("celiac","relevant","Loose motions, weight loss or low hemoglobin with wheat can be celiac disease. A blood test is the first step.",true);cons.push("Don't stop eating wheat before the celiac blood test. It can make the result falsely normal.");}
  if(fh.has("celiac"))add("celiac","consider","Close relatives of someone with celiac disease have a higher chance of it. A blood test is worth discussing, especially if you have symptoms or anaemia.");
  if(food.has("milk")){
    add("lactose","consider","Trouble with milk is usually checked with a short milk-free trial or a breath test. A gene test is rarely needed.");
    if(["0-1","1-4"].includes(a.age))cons.push("In young children, problems with milk are more often a cow's milk allergy or follow a stomach infection. See a paediatrician.");
  }
  if(food.has("fava"))add("g6pd","relevant","Dark urine or yellow eyes after fava beans or certain medicines can be a sign of G6PD deficiency. A simple blood test checks it.",true);
  if(a.anaemia==="ironNoHelp"){
    add("hb","relevant","Low hemoglobin that doesn't improve with iron can be thalassemia trait. A hemoglobin (HPLC) test tells them apart.");
    add("celiac","consider","Celiac disease is another cause of anaemia that doesn't get better with iron tablets.");
  }
  if(a.anaemia==="ironHelped"&&(fh.has("blood")||a.carrierStatus==="carrier"))cons.push("Thalassemia trait can also lower hemoglobin, and iron doesn't fix it. Check ferritin before taking iron for a long time.");
  if(a.dnaDiet)add("nutri","notroutine","DNA diet tests rarely change advice. Blood tests and a dietitian are more useful.");

  if(a.known){add("familial","relevant","Testing for the exact family variant is usually the most informative and cheapest option. Bring the relative's report.",true);add("gc","relevant","Helps you understand what a result would mean for you and others.");}
  if(fh.has("geneticDx")&&!a.known)add("gc","relevant","A relative has a genetic diagnosis. A counsellor can check if targeted testing is possible.");
  if(!out.has("gc"))add("gc","consider","Helpful whenever results could affect you or your relatives.");
  const list=[...out.values()].map(r=>({...r,reasons:r.why[r.tier].length?r.why[r.tier]:r.why.relevant.concat(r.why.consider)}));
  list.sort((x,y)=>RANK[x.tier]-RANK[y.tier]||(urgent.has(y.id)-urgent.has(x.id))||(y.first-x.first));
  return {list,cons};
}

/* ===================== STATE ===================== */
let tab="home", onb=0, showOnb=true, resultsOpen=false, resSeg="plan";
let learnSeg="tests", testQuery="", testCat="All", condFilter="all";
let hist=[], pending=[], freshFrom=0;
const answers=()=>{const a={};hist.forEach(h=>{const q=Q.find(x=>x.id===h.id);a[h.id]=q.type==="yn"?h.value==="yes":h.value;});return a;};
const applicable=a=>Q.filter(q=>!q.when||q.when(a));
const nextQ=()=>{const a=answers();return applicable(a).find(q=>!hist.some(h=>h.id===q.id));};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $=s=>document.querySelector(s);
const refsHtml=ids=>`<ul class="refs">${ids.map(i=>`<li><a href="${REF[i].u}" target="_blank" rel="noopener">${esc(REF[i].n)}</a></li>`).join("")}</ul>`;
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;$("#app").appendChild(t);setTimeout(()=>t.remove(),2000);}
function label(q,v){if(q.type==="yn")return v==="yes"?"Yes":"No";if(q.type==="multi")return v.length?v.map(x=>q.opts[x]).join(", "):q.none;return v==null?"Skipped":q.opts[v];}
const secC=q=>"c-"+SEC[q.sec][0];

/* ===================== ONBOARDING ===================== */
const ONB=[
 ["Which genetic test do I actually need?","Thalassemia, NIPT, exome, PRS… there are many tests. Gia helps you find the few worth discussing with your doctor.",`<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="rgba(255,255,255,.12)"/><circle cx="100" cy="100" r="55" fill="rgba(255,255,255,.18)"/>${[0,1,2,3,4,5].map(i=>`<circle cx="${100+70*Math.cos(i*1.047)}" cy="${100+70*Math.sin(i*1.047)}" r="10" fill="#fff" opacity="${.5+i*.08}"/>`).join("")}<path d="M80 70c0 20 40 20 40 40s-40 0-40 20M120 70c0 20-40 20-40 40" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`],
 ["Answer about 20 quick questions","Tap answers in a chat. Every question can be skipped, and you can change any answer later.",`<svg viewBox="0 0 200 200"><rect x="30" y="40" width="110" height="38" rx="19" fill="rgba(255,255,255,.9)"/><rect x="60" y="92" width="110" height="38" rx="19" fill="#fff" opacity=".35"/><rect x="30" y="144" width="80" height="38" rx="19" fill="rgba(255,255,255,.9)"/><circle cx="50" cy="59" r="6" fill="#1f4e79"/><circle cx="66" cy="59" r="6" fill="#1f4e79" opacity=".6"/><circle cx="82" cy="59" r="6" fill="#1f4e79" opacity=".3"/></svg>`],
 ["Private by design","No sign-in, no DNA upload, no name or Aadhaar. Your answers stay on your phone and disappear when you close the app.",`<svg viewBox="0 0 200 200"><path d="M100 30l55 20v40c0 35-24 60-55 70-31-10-55-35-55-70V50z" fill="rgba(255,255,255,.2)" stroke="#fff" stroke-width="6"/><path d="M75 100l18 18 34-36" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`]
];
function onbHtml(){
  if(!showOnb)return "";
  const [h,p,art]=ONB[onb];
  return `<div class="onb"><div class="onb-art">${art}</div><div class="onb-body g">
   <div class="dots">${ONB.map((_,i)=>`<i class="${i===onb?"on":""}"></i>`).join("")}</div>
   <h2>${h}</h2><p>${p}</p>
   <div class="onb-actions">${onb<2?`<button class="ghostbtn" data-onbskip="1">Skip</button><button class="cta teal" data-onbnext="1">Next ${ico("chev",18)}</button>`:`<button class="cta teal full" data-onbskip="1">Get started</button>`}</div>
   <p class="small" style="font-size:.74rem">Educational only. Not a diagnosis or medical advice.</p></div></div>`;
}

/* ===================== SCREENS ===================== */
function bar(){
  if(tab==="ask"&&resultsOpen)return `<button class="iconbtn" data-closeres="1" aria-label="Back to chat">${ico("back",22)}</button><h1>Your test plan</h1><button class="iconbtn" id="copy" aria-label="Copy summary">${ico("copy",20)}</button>`;
  if(tab==="ask"){const a=answers(),tot=applicable(a).length,done=Math.min(hist.length,tot);const q=nextQ();
    return `<span class="avatar" aria-hidden="true">G</span><h1>Gia <span class="sub">· ${q?`Question ${done+1} of ${tot}`:"Plan ready"}</span></h1>${hist.length?`<button class="iconbtn" id="restart" aria-label="Start over">${ico("redo",20)}</button>`:""}<div class="progress"><i style="width:${q?Math.round(done/tot*100):100}%"></i></div>`;}
  const t={home:"Genomics for Everyone",couple:"Couple carrier check",learn:"Learn",info:"Privacy & safety"};
  return `<h1>${t[tab]}</h1>`;
}
function sHome(){
  const tiles=[["marriage","Planning marriage","Thalassemia & carrier tests","rose","rings"],["preconception","Planning pregnancy","Before & during pregnancy","violet","heart"],["child","My child's health","Seizures, delay & more","sun","baby"],["adult","My inherited risks","Cancer, heart, medicines","teal","dna"]];
  const facts=[["f6","No DNA test needed to eat well","In a large trial, gene-based diet advice worked no better than advice based on what people actually eat."],["f1","Carrier ≠ sick","Most carriers are healthy. It matters mainly when both partners carry the same condition."],["f2","NIPT is screening","A high-chance NIPT result must be confirmed by CVS or amniocentesis before any decision."],["f3","Negative exome ≠ no cause","Exome misses some changes. Reanalysis a year or two later can find new answers."],["f4","PRS depends on who you compare with","The same genome can look average or extreme depending on the reference population."],["f5","Ask before you change medicines","Gene–drug results guide your doctor. Never stop or switch a medicine on your own."]];
  const last=hist.length&&!nextQ()?recommend(answers()):null;
  return `<div class="hero g">${helix}<div class="hero-in">
     <span class="hi">Namaste</span><p>Find the genetic tests worth discussing with your doctor, and the ones you can skip.</p>
     <button class="startcard" data-start=""><span class="pl">${ico("play",18)}</span><span><b>${last?"Start a new check":"Start your free check"}</b><span>About 20 questions · 3 minutes</span></span></button>
   </div></div>
   <div class="home-body g">
    ${last?`<button class="statcard" data-openres="1" style="text-align:left"><div class="sect-h"><h2>Your last plan</h2><span class="small">${ico("chev",18)}</span></div><div class="statrow"><div class="stat c-teal"><b style="color:var(--c)">${last.list.filter(r=>r.tier==="relevant").length}</b><span>worth discussing</span></div><div class="stat c-sun"><b style="color:var(--c)">${last.list.filter(r=>r.tier==="consider").length}</b><span>if indicated</span></div></div></button>`:""}
    <div class="sect-h"><h2>What brings you here?</h2></div>
    <div class="tiles">${tiles.map(([k,b,s,c,ic])=>`<button class="tile c-${c}" data-start="${k}"><span class="ti">${ico(ic,22)}</span><b>${b}</b><span>${s}</span><i class="blob"></i></button>`).join("")}</div>
    <div class="sect-h"><h2>Did you know?</h2></div>
    <div class="facts">${facts.map(([c,b,p])=>`<div class="fact ${c}"><span class="k">Myth buster</span><b>${b}</b><p>${p}</p></div>`).join("")}</div>
    <div class="statcard c-violet"><div class="sect-h"><h2>From our own data</h2><button data-learn="prs">Why it matters</button></div>
      <p class="small">One European-ancestry genome, scored for type 2 diabetes PRS (PGS004923) against 1000 Genomes references.</p>
      <div class="statrow"><div class="stat"><b style="color:var(--sky)">50.3</b><span>percentile vs Europeans</span></div><div class="stat"><b style="color:var(--rose)">0.2</b><span>percentile vs South Asians</span></div></div></div>
    <div class="sect-h"><h2>Explore</h2></div>
    <div class="list">
      <button class="rowi c-rose" data-tab="couple"><span class="ic">${ico("users")}</span><b>Couple carrier check</b><span class="chev">${ico("chev",18)}</span><span>See what two carrier reports mean together</span></button>
      <button class="rowi c-sky" data-learn="tests"><span class="ic">${ico("flask")}</span><b>Test library</b><span class="chev">${ico("chev",18)}</span><span>${TESTS.length} tests in plain language</span></button>
      <button class="rowi c-violet" data-learn="prs"><span class="ic">${ico("chart")}</span><b>Understand PRS</b><span class="chev">${ico("chev",18)}</span><span>What a risk score can and can't say</span></button>
      <button class="rowi c-sun" data-learn="india"><span class="ic">${ico("map")}</span><b>Genetic health in India</b><span class="chev">${ico("chev",18)}</span><span>Thalassemia, sickle cell, FH and more</span></button>
    </div>
    <p class="note">Educational only, not medical advice. Lab tests and consultations are separate, usually paid services.</p>
   </div>`;
}
function sAsk(){
  if(resultsOpen)return sResults();
  let h=`<div class="chat g">`, lastSec="";
  const div=q=>{if(q.sec!==lastSec){lastSec=q.sec;return `<div class="sec-div ${secC(q)}">${SEC[q.sec][1]}</div>`;}return "";};
  hist.forEach((x,i)=>{const q=Q.find(y=>y.id===x.id);const fr=i>=freshFrom?" fresh":"";
    h+=div(q)+`<div class="msg bot${fr}"><span class="avatar">G</span><div class="bubble">${esc(q.text)}${q.sub?`<span class="sub">${esc(q.sub)}</span>`:""}</div></div>`;
    h+=`<div class="msg me ${secC(q)}${fr}"><button class="bubble" data-edit="${i}" aria-label="Change answer">${esc(label(q,x.value))}</button><span class="edit">edit</span></div>`;
    if(x.id==="emergency"&&x.value.length)h+=`<div class="msg bot${fr}"><span class="avatar">G</span><div class="bubble alert"><b>Please get urgent care now.</b> Go to the nearest emergency department or call 112 (108 for an ambulance). Genetic testing can wait.</div></div>`;
    if(x.id==="stage"&&i>=freshFrom){const tip={marriage:"Great time to check. Most couples need only simple blood tests.",preconception:"Planning ahead gives you the most options.",pregnant:"Congratulations! Let's look at what's time-sensitive.",newborn:"Let's start with a quick safety check.",child:"I'm sorry you're dealing with this. Let's make the doctor visit easier.",adult:"Good. I'll also tell you which tests you can skip."}[x.value];if(tip)h+=`<div class="msg bot fresh"><span class="avatar">G</span><div class="bubble tip ${secC(q)}">${tip}</div></div>`;}
  });
  const q=nextQ();
  if(q)h+=div(q)+`<div class="msg bot fresh"><span class="avatar">G</span><div class="bubble">${esc(q.text)}${q.sub?`<span class="sub">${esc(q.sub)}</span>`:""}</div></div>`;
  else{const {list}=recommend(answers());h+=`<div class="msg bot fresh"><span class="avatar">G</span><div class="bubble">Thank you! Your plan is ready.</div></div>
    <div class="readycard fresh"><h3>${list.filter(r=>r.tier==="relevant").length} tests worth discussing</h3><p style="opacity:.9;font-size:.9rem">Plus a step-by-step plan and questions to ask your doctor.</p><button class="cta" data-openres="1">See my plan ${ico("chev",18)}</button></div>`;}
  return h+`</div>`;
}
function tray(){
  if(tab!=="ask"||resultsOpen)return "";
  const q=nextQ(); if(!q)return "";
  const c=secC(q); let opts="";
  if(q.type==="single")opts=Object.entries(q.opts).map(([v,l])=>`<button class="choice" data-pick="${v}">${esc(l)}</button>`).join("");
  if(q.type==="yn")opts=`<button class="choice" data-pick="yes">Yes</button><button class="choice" data-pick="no">No</button><button class="choice ghost" data-pick="no">Not sure</button>`;
  if(q.type==="multi")opts=Object.entries(q.opts).map(([v,l])=>`<button class="choice" data-toggle="${v}" aria-pressed="${pending.includes(v)}">${esc(l)}</button>`).join("")+`<button class="choice ghost" data-none="1">${esc(q.none)}</button>`;
  const foot=q.type==="multi"?`<div class="traybar"><span class="hint">${pending.length} selected</span><button class="go" data-done="1" ${pending.length?"":"disabled"}>Continue</button></div>`:q.skip?`<div class="traybar"><span></span><button class="ghostbtn" data-pick="__skip">Skip</button></div>`:"";
  return `<div class="tray g ${c}"><div class="choices">${opts}</div>${foot}</div>`;
}
function ring(n,tot,col,lab){const r=24,C=2*Math.PI*r,f=tot?n/tot:0;return `<div class="ring"><svg viewBox="0 0 58 58"><circle cx="29" cy="29" r="${r}" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="6"/><circle cx="29" cy="29" r="${r}" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C*f} ${C}" transform="rotate(-90 29 29)"/><text x="29" y="35" text-anchor="middle" font-size="18" font-weight="800" fill="#fff" font-family="Bricolage Grotesque, sans-serif">${n}</text></svg><span>${lab}</span></div>`;}
function sResults(){
  const a=answers(),{list,cons}=recommend(a),tot=list.length;
  const R=list.filter(r=>r.tier==="relevant"),C=list.filter(r=>r.tier==="consider"),N=list.filter(r=>r.tier==="notroutine");
  const goal=Q.find(q=>q.id==="goal").opts[a.goal]||Q.find(q=>q.id==="stage").opts[a.stage];
  const card=(r,c)=>`<button class="rcard c-${c}" data-rec="${r.id}"><b>${esc(T[r.id].name)}${r.first&&r.tier==="relevant"?'<span class="tag">start here</span>':""}</b><span class="chev">${ico("chev",18)}</span><span class="why">${esc(r.reasons[0])}</span></button>`;
  const first=R.filter(r=>r.first),rest=R.filter(r=>!r.first);
  const steps=[[first.length?first:rest.splice(0,1),"Start here","Usually the first and simplest step.","teal"],[rest,"Then discuss","Worth raising at the same visit.","sky"],[C,"Only if indicated","Depends on results, symptoms or more family history.","sun"],[N,"You can skip for now","No clear reason from what you shared.","rose"]].filter(s=>s[0].length);
  let body="";
  if(resSeg==="plan")body=`<div class="timeline">${steps.map(([items,h,w,c],i)=>`<div class="step c-${c}"><div class="rail"><span class="num">${i+1}</span><span class="line"></span></div><div class="content"><h3>${h}</h3><p class="what">${w}</p>${items.map(r=>card(r,c)).join("")}</div></div>`).join("")}</div>
    ${R.length===0?`<p class="note">From what you shared, there's no clear reason for genetic testing right now. That's a useful answer too.</p>`:""}`;
  if(resSeg==="ask"){const qs=[...R,...C].map(r=>T[r.id].ask).filter(Boolean);body=`<p class="small">Take these to your appointment. Screenshot or copy them.</p><div class="qlist">${qs.map(q=>`<div class="qitem"><span>${esc(q)}</span></div>`).join("")}</div>`;}
  if(resSeg==="food")body=`<p class="small">Food tips linked to your answers. Each one shows its source.</p><div class="diet">${dietTips(a).map(t=>`<div class="card"><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>${refsHtml(t.refs)}</div>`).join("")}</div>`;
  if(resSeg==="why")body=`<div class="cons">${cons.map(c=>`<div>${esc(c)}</div>`).join("")||'<p class="small">Nothing extra to note.</p>'}</div><p class="note">This is not a diagnosis and does not calculate your risk. Rules last reviewed 19 Oct 2026, not yet clinically validated.</p>`;
  return `<div class="rhead g"><p class="goal">Goal: ${esc(goal||"Understand my options")}</p><h2>Your genetic test plan</h2>
    <div class="rings">${ring(R.length,tot,"#5ff0d8","Worth discussing")}${ring(C.length,tot,"#ffc46b","If indicated")}${ring(N.length,tot,"#ff9bbd","Skip for now")}</div></div>
   <div class="rbody g"><div class="seg"><button data-rseg="plan" aria-pressed="${resSeg==="plan"}">Plan</button><button data-rseg="ask" aria-pressed="${resSeg==="ask"}">Ask doctor</button><button data-rseg="food" aria-pressed="${resSeg==="food"}">Food</button><button data-rseg="why" aria-pressed="${resSeg==="why"}">Notes</button></div>${body}
   <div class="actions"><button class="outline" data-closeres="1">Back to chat</button><button class="outline" id="restart2">New check</button></div></div>`;
}

/* ---- couple ---- */
let couple={who:"a",a:{sex:"female",genes:["HBB"]},b:{sex:"male",genes:["HBB"]}};
const punnettAR=()=>`<div class="punnett"><span></span><span class="h">A</span><span class="h">a</span><span class="h">A</span><span class="cell ok">AA<small>neither</small></span><span class="cell car">Aa<small>carrier</small></span><span class="h">a</span><span class="cell car">aA<small>carrier</small></span><span class="cell aff">aa<small>affected</small></span></div>`;
const punnettXL=()=>`<div class="punnett"><span></span><span class="h">X (mum)</span><span class="h">Xᵃ (mum)</span><span class="h">X (dad)</span><span class="cell ok">Daughter<small>unaffected</small></span><span class="cell car">Daughter<small>carrier</small></span><span class="h">Y (dad)</span><span class="cell ok">Son<small>unaffected</small></span><span class="cell aff">Son<small>affected</small></span></div>`;
function coupleResult(){
  const A=couple.a,B=couple.b,out=[];
  A.genes.filter(g=>B.genes.includes(g)&&G[g][2]==="AR").forEach(g=>out.push(`<div class="res hi"><h3>Both of you: ${g}</h3><p class="small">For a confirmed recessive condition (${esc(G[g][1])}), each pregnancy has the same chances:</p>${punnettAR()}<p class="small"><b>1 in 4</b> affected · <b>2 in 4</b> carrier · <b>1 in 4</b> neither. Every pregnancy is independent.</p>${G[g][3]?`<p class="small"><b>Note:</b> ${esc(G[g][3])}</p>`:""}<p class="small">A genetic counsellor can explain options, including early prenatal diagnosis.</p></div>`));
  [["A",A],["B",B]].forEach(([n,p])=>{if(p.sex==="female")p.genes.filter(g=>G[g][2]==="XL").forEach(g=>out.push(`<div class="res hi"><h3>Partner ${n} carries ${g} (X-linked)</h3><p class="small">For ${esc(G[g][1])}, the father's result doesn't change these chances:</p>${punnettXL()}<p class="small">Each son: 1 in 2 affected. Each daughter: 1 in 2 carrier (daughters can sometimes have mild symptoms).</p></div>`));});
  const one=[...new Set([...A.genes,...B.genes])].filter(g=>G[g][2]==="AR"&&!(A.genes.includes(g)&&B.genes.includes(g)));
  if(one.length)out.push(`<div class="res"><h3>Only one of you: ${one.join(", ")}</h3><p class="small">Usually a low chance of an affected child. Check the other partner was actually tested for this gene: "not tested" isn't "not a carrier".</p></div>`);
  if(!out.length)out.push(`<p class="note">Tap genes from each partner's lab report to see what they mean together.</p>`);
  return out.join("");
}
function sCouple(){
  const p=couple[couple.who];
  return `<div class="g pad">
   <p class="small">Each partner adds only their own lab results, with consent. Nothing is saved. We explain the chances; we never label couples "compatible" or "incompatible". Example loaded: both partners carry HBB.</p>
   <div class="partners">${["a","b"].map(k=>`<button class="pcard ${k==="a"?"c-violet":"c-teal"}" data-partner="${k}" aria-pressed="${couple.who===k}"><span class="av">${k.toUpperCase()}</span><b>Partner ${k.toUpperCase()}</b><span>${couple[k].sex} · ${couple[k].genes.length} finding${couple[k].genes.length===1?"":"s"}</span></button>`).join("")}</div>
   <div class="seg"><button data-sex="female" aria-pressed="${p.sex==="female"}">Female</button><button data-sex="male" aria-pressed="${p.sex==="male"}">Male</button></div>
   <div class="genes ${couple.who==="a"?"c-violet":"c-teal"}">${GENES.map(([g,c,inh])=>`<button class="gene" data-gene="${g}" aria-pressed="${p.genes.includes(g)}"><b>${g}</b><span>${c} · ${inh==="AR"?"recessive":"X-linked"}</span></button>`).join("")}</div>
   <div style="display:grid;gap:12px">${coupleResult()}</div></div>`;
}

/* ---- learn ---- */
const testRow=t=>{const[c,ic]=CATC[t.cat];return `<button class="rowi c-${c}" data-test="${t.id}"><span class="ic">${ico(ic)}</span><b>${esc(t.name)}</b><span class="chev">${ico("chev",18)}</span><span>${esc(t.type)} · ${esc(t.full)}</span></button>`;};
const filteredTests=()=>{const q=testQuery.toLowerCase();return TESTS.filter(t=>(testCat==="All"||t.cat===testCat)&&(!q||(t.name+t.full+t.purpose).toLowerCase().includes(q)));};
function sLearn(){
  const seg=`<div class="seg"><button data-seg="tests" aria-pressed="${learnSeg==="tests"}">Tests</button><button data-seg="prs" aria-pressed="${learnSeg==="prs"}">PRS</button><button data-seg="india" aria-pressed="${learnSeg==="india"}">India</button></div>`;
  let body="";
  if(learnSeg==="tests"){
    const cats=["All",...Object.keys(CATC)];
    body=`<label class="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="tq" type="search" placeholder="Search thalassemia, NIPT, exome…" value="${esc(testQuery)}" aria-label="Search tests"></label>
    <div class="hchips">${cats.map(c=>`<button class="hchip c-${c==="All"?"sky":CATC[c][0]}" data-cat="${c}" aria-pressed="${c===testCat}">${c}</button>`).join("")}</div>
    <div class="list" id="tlist">${filteredTests().map(testRow).join("")||'<p class="note">No tests match.</p>'}</div>`;
  }
  if(learnSeg==="prs"){
    const x=v=>40+(v+18.6)/2.2*320;
    body=`<div class="card c-violet" style="background:var(--violet-soft)"><h3>What is a PRS?</h3><p class="small">It adds up the small effects of many common variants into one number for one disease. It shows relative inherited susceptibility. It does not diagnose, and lifestyle often matters more.</p></div>
    <div class="card"><h3>Same genome, different answer</h3><p class="small">T2D metaGRS (PGS004923) scored on 1,231 1000 Genomes samples: 601 South Asian, 630 European.</p>
     <div class="numline"><svg viewBox="0 0 400 110" role="img" aria-label="Mean raw score EUR −18.06, SAS −16.97"><line x1="40" y1="60" x2="360" y2="60" stroke="var(--line)" stroke-width="6" stroke-linecap="round"/>${[-18.5,-18,-17.5,-17,-16.5].map(v=>`<text x="${x(v)}" y="84" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="IBM Plex Mono, monospace">${v.toFixed(1)}</text>`).join("")}<circle cx="${x(-18.06)}" cy="60" r="10" fill="var(--sky)"/><text x="${x(-18.06)}" y="36" text-anchor="middle" font-size="12" font-weight="800" fill="var(--sky)">EUR −18.06</text><circle cx="${x(-16.97)}" cy="60" r="10" fill="var(--rose)"/><text x="${x(-16.97)}" y="36" text-anchor="middle" font-size="12" font-weight="800" fill="var(--rose)">SAS −16.97</text><text x="200" y="104" text-anchor="middle" font-size="10.5" fill="var(--muted)">Mean raw PRS</text></svg></div>
     <div class="statrow"><div class="stat"><b style="color:var(--sky)">50.3</b><span>NA12878 vs Europeans</span></div><div class="stat"><b style="color:var(--rose)">0.2</b><span>NA12878 vs South Asians</span></div></div>
     <p class="small">Compare with the wrong population and an ordinary score can look alarming or reassuring for no reason. Scores here use a South Asian reference.</p></div>
    <div class="card"><h3>How a score is made</h3><ol class="steps">${[["Genotyping or sequencing","SNP array or low-pass WGS"],["Quality control","Sample and variant filters"],["Genotype preparation","Build, strand, format"],["Harmonisation","Match by position and alleles"],["Imputation","Fill in untyped variants"],["Validated model","Weights from PGS Catalog"],["Calculate score","Dosage × weight, summed"],["Reference comparison","Same-ancestry distribution"],["Interpret","Percentile, not destiny"]].map(([a,b])=>`<li><div><b>${a}</b><span>${b}</span></div></li>`).join("")}</ol></div>
    <div class="card"><h3>Five numbers that aren't the same</h3><div class="defs">${[["Raw PRS","The weighted sum. Meaningless alone."],["Standardised PRS","Distance from the reference mean, in SDs."],["Percentile","Rank within one reference population."],["Relative risk","Higher or lower than average, only where studies published effect sizes."],["Absolute risk","Actual chance over time. Needs age, sex and clinical factors."]].map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join("")}</div>${refsHtml(["pgs"])}</div>`;
  }
  if(learnSeg==="india"){
    const f={all:["All","sky"],mono:["Single gene","rose"],complex:["Genes + lifestyle","sun"],useful:["Testing useful","teal"],notjustified:["Testing not justified","violet"]};
    const items=CONDS.filter(c=>condFilter==="all"||c.k===condFilter||c.t===condFilter);
    body=`<div class="hchips">${Object.entries(f).map(([k,[l,c]])=>`<button class="hchip c-${c}" data-cf="${k}" aria-pressed="${k===condFilter}">${l}</button>`).join("")}</div>
    ${items.map(c=>`<div class="card ${c.k==="mono"?"c-rose":"c-sun"}"><h3>${c.n}</h3><div class="chips"><span class="chip">${c.k==="mono"?"Single gene":"Genes + lifestyle"}</span><span class="chip ${c.t==="useful"?"c-teal":"c-violet"}">${c.t==="useful"?"Testing useful":"Population testing not justified"}</span></div>
     <dl class="kv" style="background:var(--bg)"><dt>Inheritance</dt><dd>${c.inh}</dd></dl><dl class="kv" style="background:var(--bg)"><dt>Treatment</dt><dd>${c.tx}</dd></dl><dl class="kv" style="background:var(--bg)"><dt>In India</dt><dd>${c.prog}</dd></dl>
     <p class="small" style="font-size:.76rem">Indian estimate: awaiting a verified source.</p></div>`).join("")}`;
  }
  return `<div class="g pad">${seg}${body}</div>`;
}
function sInfo(){
  return `<div class="g pad">
  <div class="card c-sun" style="background:var(--sun-soft)"><h3>Not medical advice</h3><p class="small">This app provides educational information about genetic testing and is not a substitute for medical advice, diagnosis, or genetic counselling. Recommendations are preliminary and depend on the information provided. Consult a qualified healthcare professional before making medical decisions.</p></div>
  <div class="card c-teal" style="background:var(--teal-soft)"><h3>Your privacy</h3><ul><li>No account, no sign-in, no DNA upload.</li><li>Answers stay on this screen and vanish when you close it.</li><li>We never ask for name, Aadhaar, address, caste or religion.</li><li>No ads, no data selling, no access for employers or insurers.</li></ul></div>
  <div class="card c-sky" style="background:var(--sky-soft)"><h3>Independent and free</h3><p class="small">Suggestions come from transparent rules, not from labs. Lab tests and consultations are separate and usually paid.</p></div>
  <div class="card c-violet" style="background:var(--violet-soft)"><h3>Prototype status</h3><ul><li>Rules not yet clinically validated.</li><li>Indian statistics left blank until sourced.</li><li>Coming: Hindi and Telugu, counsellor finder, family tree builder.</li></ul></div>
  <div class="card"><h3>Sources</h3>${refsHtml(Object.keys(REF))}</div>
  <button class="outline" data-replayonb="1">Show the intro again</button></div>`;
}

/* ---- sheet ---- */
function openSheet(id,rec){
  const t=T[id],[c,ic]=CATC[t.cat];
  const tierTxt={relevant:"Worth discussing",consider:"If indicated",notroutine:"Skip for now"};
  $("#sheet").innerHTML=`<div class="scrim" data-close="1"></div><div class="sheet c-${c}" role="dialog" aria-modal="true" aria-label="${esc(t.name)}"><div class="grab"></div>
   <div class="sheet-head g"><span class="big">${ico(ic,24)}</span><div style="flex:1;min-width:0;display:grid;gap:6px"><h2>${esc(t.name)}</h2><div class="chips">${rec?`<span class="chip">${tierTxt[rec.tier]}</span>`:""}<span class="chip">${esc(t.type)}</span></div></div><button class="iconbtn" data-close="1" aria-label="Close">${ico("close",20)}</button></div>
   <div class="sheet-body g">
    ${rec?`<div class="card" style="background:var(--cs)"><h3>Why this came up for you</h3><ul>${rec.reasons.map(r=>`<li>${esc(r)}</li>`).join("")}</ul></div>`:""}
    <dl class="kv"><dt>What it is</dt><dd>${esc(t.full)}</dd></dl>
    <dl class="kv"><dt>What it's for</dt><dd>${esc(t.purpose)}</dd></dl>
    <dl class="kv"><dt>Who it's for</dt><dd>${esc(t.who)}</dd></dl>
    <dl class="kv"><dt>Can detect</dt><dd>${esc(t.detects)}</dd></dl>
    <dl class="kv warn"><dt>Cannot tell you</dt><dd>${esc(t.limits)}</dd></dl>
    ${t.ask?`<dl class="kv"><dt>Ask your doctor</dt><dd>“${esc(t.ask)}”</dd></dl>`:""}
    <dl class="kv"><dt>In India</dt><dd>${esc(t.india)}</dd></dl>
    <dl class="kv"><dt>Sources</dt><dd>${refsHtml(t.refs)}</dd></dl>
   </div></div>`;
}
const closeSheet=()=>{$("#sheet").innerHTML="";};

/* ===================== RENDER ===================== */
function render(scroll){
  $("#bar").innerHTML=bar();
  const S={home:sHome,ask:sAsk,couple:sCouple,learn:sLearn,info:sInfo};
  $("#screen").innerHTML=S[tab]();
  $("#tray").innerHTML=tray();
  $("#onb").innerHTML=onbHtml();
  document.querySelectorAll("#tabs button").forEach(b=>b.dataset.tab===tab?b.setAttribute("aria-current","page"):b.removeAttribute("aria-current"));
  const sc=$("#screen");
  if(scroll==="bottom"){sc.style.scrollBehavior="auto";sc.scrollTop=sc.scrollHeight;sc.style.scrollBehavior="";}
  else if(scroll==="top"){sc.style.scrollBehavior="auto";sc.scrollTop=0;sc.style.scrollBehavior="";}
}
function answer(v){const q=nextQ();freshFrom=hist.length;hist.push({id:q.id,value:v});pending=[];render("bottom");}
function startChat(stage){
  hist=[];pending=[];freshFrom=0;resultsOpen=false;resSeg="plan";
  if(stage){hist.push({id:"who",value:stage==="child"?"child":"self"});hist.push({id:"stage",value:stage});freshFrom=1;}
  tab="ask";render("bottom");
}
document.addEventListener("click",e=>{
  const b=e.target.closest("button,[data-close]");if(!b)return;const d=b.dataset;
  if(d.onbnext){onb++;render();return;}
  if(d.onbskip){showOnb=false;render();return;}
  if(d.replayonb){onb=0;showOnb=true;render();return;}
  if(d.close){closeSheet();return;}
  if(d.tab){tab=d.tab;closeSheet();render(tab==="ask"&&!resultsOpen?"bottom":"top");return;}
  if(d.start!==undefined){startChat(d.start);return;}
  if(d.learn){tab="learn";learnSeg=d.learn;render("top");return;}
  if(d.test){openSheet(d.test);return;}
  if(d.rec){openSheet(d.rec,recommend(answers()).list.find(x=>x.id===d.rec));return;}
  if(d.openres){tab="ask";resultsOpen=true;render("top");return;}
  if(d.closeres){resultsOpen=false;render("bottom");return;}
  if(d.rseg){resSeg=d.rseg;render();return;}
  if(d.pick){answer(d.pick==="__skip"?null:d.pick);return;}
  if(d.toggle){pending=pending.includes(d.toggle)?pending.filter(x=>x!==d.toggle):[...pending,d.toggle];$("#tray").innerHTML=tray();return;}
  if(d.none){answer([]);return;}
  if(d.done){answer([...pending]);return;}
  if(d.edit!==undefined){const i=+d.edit,old=hist[i];hist=hist.slice(0,i);freshFrom=hist.length;pending=Array.isArray(old.value)?[...old.value]:[];render("bottom");return;}
  if(b.id==="restart"||b.id==="restart2"){startChat("");return;}
  if(b.id==="copy"){const {list}=recommend(answers());const g=k=>list.filter(r=>r.tier===k).map(r=>"- "+T[r.id].name+": "+r.reasons[0]).join("\n")||"- none";
    const qs=list.filter(r=>r.tier!=="notroutine").map(r=>T[r.id].ask).filter(Boolean).map(q=>"- "+q).join("\n");
    const txt=`My genetic test plan (Genomics for Everyone – educational, not a diagnosis)\n\nWORTH DISCUSSING\n${g("relevant")}\n\nIF INDICATED\n${g("consider")}\n\nSKIP FOR NOW\n${g("notroutine")}\n\nQUESTIONS FOR MY DOCTOR\n${qs}`;
    (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast("Plan copied")).catch(()=>toast("Copy isn't available here"));return;}
  if(d.partner){couple.who=d.partner;render();return;}
  if(d.sex){couple[couple.who].sex=d.sex;render();return;}
  if(d.gene){const p=couple[couple.who];p.genes=p.genes.includes(d.gene)?p.genes.filter(x=>x!==d.gene):[...p.genes,d.gene];const st=$("#screen").scrollTop;render();$("#screen").scrollTop=st;return;}
  if(d.seg){learnSeg=d.seg;render("top");return;}
  if(d.cat){testCat=d.cat;render();return;}
  if(d.cf){condFilter=d.cf;render();return;}
});
document.addEventListener("input",e=>{if(e.target.id==="tq"){testQuery=e.target.value;$("#tlist").innerHTML=filteredTests().map(testRow).join("")||'<p class="note">No tests match.</p>';}});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet();});
async function boot(){
  const get=f=>fetch(f).then(r=>{if(!r.ok)throw new Error(f+" "+r.status);return r.json();});
  const [ref,tests,qs,genes,conds,diet]=await Promise.all(["data/references.json","data/tests.json","data/questions.json","data/genes.json","data/conditions.json","data/diet.json"].map(get));
  REF=ref; TESTS=tests; T=Object.fromEntries(TESTS.map(t=>[t.id,t]));
  SEC=qs.sections;
  Q=qs.questions.map(q=>{if(!q.when)return q;const fn=WHEN[q.when];if(!fn)throw new Error("Unknown condition: "+q.when);return {...q,when:fn};});
  GENES=genes.map(g=>[g.gene,g.condition,g.inheritance,g.note]); G=Object.fromEntries(GENES.map(g=>[g[0],g]));
  CONDS=conds; DIET=diet;
  render();
}
boot().catch(err=>{document.getElementById("screen").innerHTML='<p class="note" style="padding:24px">Could not load app data. If you opened index.html directly from disk, run a local server instead (see README). '+String(err.message||err).replace(/[<>&]/g,"")+'</p>';});
if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("sw.js").catch(()=>{});
