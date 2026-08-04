import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import githubDark from "shiki/themes/github-dark-default.mjs";
import csharp from "shiki/langs/csharp.mjs";
import json from "shiki/langs/json.mjs";
import bash from "shiki/langs/bash.mjs";

/**
 * Shared Shiki singleton. Fine-grained imports keep the bundle to exactly the
 * three grammars the site needs (plus the oniguruma wasm engine).
 */
let highlighterPromise: Promise<HighlighterCore> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [githubDark],
      langs: [csharp, json, bash],
      engine: createOnigurumaEngine(() => import("shiki/wasm")),
    });
  }
  return highlighterPromise;
}
