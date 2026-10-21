// Checks that the files in /data are consistent with each other and with js/app.js.
// Run: node scripts/check-data.js
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const read = f => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));
const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");

const errors = [];
const fail = m => errors.push(m);

const refs = read("data/references.json");
const tests = read("data/tests.json");
const { sections, questions } = read("data/questions.json");
const genes = read("data/genes.json");
const conds = read("data/conditions.json");

const categories = Object.keys(Function("return " + app.match(/const CATC=(\{.*?\});/)[1])());
const whenNames = [...app.match(/const WHEN=\{([\s\S]*?)\n\};/)[1].matchAll(/^\s*(?:(\w+)\s*,\s*(\w+)\s*,|(\w+):)/gm)]
  .flatMap(m => [m[1], m[2], m[3]]).filter(Boolean);

const testIds = new Set();
for (const t of tests) {
  for (const k of ["id", "name", "full", "cat", "purpose", "who", "detects", "limits", "india", "refs"])
    if (!t[k] || (Array.isArray(t[k]) && !t[k].length)) fail(`test "${t.id}": missing ${k}`);
  if (testIds.has(t.id)) fail(`test "${t.id}": duplicate id`);
  testIds.add(t.id);
  if (!categories.includes(t.cat)) fail(`test "${t.id}": unknown category "${t.cat}" (known: ${categories.join(", ")})`);
  for (const r of t.refs || []) if (!refs[r]) fail(`test "${t.id}": unknown reference "${r}"`);
}
for (const [k, r] of Object.entries(refs)) if (!r.n || !/^https:\/\//.test(r.u || "")) fail(`reference "${k}": needs a name and an https URL`);

// Every test id the engine recommends must exist in tests.json.
for (const m of app.matchAll(/add\("(\w+)"/g)) if (!testIds.has(m[1])) fail(`js/app.js recommends unknown test "${m[1]}"`);

const qIds = new Set();
for (const q of questions) {
  if (qIds.has(q.id)) fail(`question "${q.id}": duplicate id`);
  qIds.add(q.id);
  if (!sections[q.sec]) fail(`question "${q.id}": unknown section "${q.sec}"`);
  if (!["single", "multi", "yn"].includes(q.type)) fail(`question "${q.id}": unknown type "${q.type}"`);
  if (q.type !== "yn" && !Object.keys(q.opts || {}).length) fail(`question "${q.id}": needs opts`);
  if (q.when && !whenNames.includes(q.when)) fail(`question "${q.id}": unknown condition "${q.when}" (known: ${whenNames.join(", ")})`);
}

for (const g of genes) {
  if (!g.gene || !g.condition) fail(`gene entry missing gene or condition: ${JSON.stringify(g)}`);
  if (!["AR", "XL"].includes(g.inheritance)) fail(`gene "${g.gene}": inheritance must be AR or XL`);
}
for (const c of conds) for (const k of ["n", "k", "t", "inh", "tx", "prog"]) if (!c[k]) fail(`condition "${c.n}": missing ${k}`);

if (errors.length) {
  console.error(errors.map(e => "✗ " + e).join("\n"));
  process.exit(1);
}
console.log(`✓ ${tests.length} tests, ${questions.length} questions, ${genes.length} genes, ${conds.length} conditions, ${Object.keys(refs).length} references`);
