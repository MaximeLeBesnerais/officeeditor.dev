// Post-build guard: the PPTX generation vocabulary schema is referenced by
// `$id` (https://officeeditor.dev/schemas/deck-2.0.json) from the OfficeEditor
// libraries. This script fails the build if the file did not survive the
// Vite build verbatim.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const digest = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");

const src = "public/schemas/deck-2.0.json";
const out = "dist/schemas/deck-2.0.json";

let srcHash, outHash;
try {
  srcHash = digest(src);
  outHash = digest(out);
} catch {
  console.error(`✗ schema check failed: ${src} or ${out} is missing`);
  process.exit(1);
}

if (srcHash !== outHash) {
  console.error("✗ schema check failed: dist copy differs from public source");
  process.exit(1);
}
console.log(`✓ schema intact: ${out} (sha256 ${outHash.slice(0, 12)}…)`);
