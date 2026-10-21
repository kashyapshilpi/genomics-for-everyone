// Runs the recommendation engine in Node against tests/scenarios.json.
// Run: node scripts/run-scenarios.js
// Each scenario lists answers (as the chat would store them) and what the plan must contain.
// Expectations are partial on purpose: adding a new, unrelated suggestion should not break old scenarios.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");

// Minimal browser stand-ins so js/app.js can load. Nothing is rendered for real.
const el = () => ({ innerHTML: "", style: {}, scrollTop: 0, scrollHeight: 0, appendChild() {}, setAttribute() {}, removeAttribute() {} });
const ctx = {
  console,
  document: { querySelector: el, getElementById: el, querySelectorAll: () => [], addEventListener() {}, createElement: el },
  navigator: {},
  location: { protocol: "file:" },
  fetch: f => Promise.resolve({ ok: true, json: () => JSON.parse(fs.readFileSync(path.join(root, f), "utf8")) }),
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "js/app.js"), "utf8"), ctx, { filename: "js/app.js" });

const TIERS = { relevant: "worth discussing", consider: "if indicated", notroutine: "skip for now" };

setTimeout(() => {
  const scenarios = JSON.parse(fs.readFileSync(path.join(root, "tests/scenarios.json"), "utf8"));
  let failed = 0;
  for (const sc of scenarios) {
    ctx.__answers = sc.answers;
    const { list, cons } = vm.runInContext("recommend(__answers)", ctx);
    const diet = vm.runInContext("dietTips(__answers).map(t=>t.id)", ctx);
    const tier = Object.fromEntries(list.map(r => [r.id, r.tier]));
    const errs = [];
    for (const t of Object.keys(TIERS))
      for (const id of sc.expect[t] || []) if (tier[id] !== t) errs.push(`${id} should be "${TIERS[t]}" but is ${tier[id] ? `"${TIERS[tier[id]]}"` : "missing"}`);
    for (const id of sc.expect.absent || []) if (tier[id]) errs.push(`${id} should not appear but is "${TIERS[tier[id]]}"`);
    if (sc.expect.first && list[0]?.id !== sc.expect.first) errs.push(`first card should be ${sc.expect.first} but is ${list[0]?.id}`);
    for (const id of sc.expect.diet || []) if (!diet.includes(id)) errs.push(`food tip ${id} missing`);
    for (const txt of sc.expect.note || []) if (!cons.some(c => c.includes(txt))) errs.push(`note containing "${txt}" missing`);
    if (errs.length) { failed++; console.error(`✗ ${sc.name}\n    ${errs.join("\n    ")}`); }
    else console.log(`✓ ${sc.name}`);
  }
  console.log(`\n${scenarios.length - failed}/${scenarios.length} scenarios pass`);
  process.exit(failed ? 1 : 0);
}, 50);
