/**
 * Chinese Sentence Splitter
 *
 * Splits Chinese text into sentences based on Chinese and English punctuation.
 * Handles half-width → full-width normalization before splitting.
 * Only CJK Unified Ideographs characters are counted for sentence length.
 *
 * Delimiters (sentence-ending): 。！？. ! ? — … —— ...
 * Delimiters (clause, also split): ， , ； ; ： :
 *
 * Pure JS, zero dependencies.
 */

// ── CJK Unified Ideographs Unicode range ────────────────────────────────
// U+4E00–U+9FFF (CJK Unified Ideographs)
// U+3400–U+4DBF (CJK Unified Ideographs Extension A)
// U+20000–U+2A6DF (CJK Unified Ideographs Extension B) — rarely used
function isCJK(c) {
  const cp = c.codePointAt(0);
  return (cp >= 0x4E00 && cp <= 0x9FFF) ||
         (cp >= 0x3400 && cp <= 0x4DBF) ||
         (cp >= 0x20000 && cp <= 0x2A6DF);
}

// ── Half-width → Full-width punctuation normalization ──────────────────
// Normalize ASCII punctuation to full-width equivalents so splitting
// is consistent regardless of input style.
var HALF_TO_FULL = {
  ',': '\uFF0C', // ，
  ';': '\uFF1B', // ；
  ':': '\uFF1A', // ：
  '!': '\uFF01', // ！
  '?': '\uFF1F', // ？
  '.': '\u3002', // 。
  '(': '\uFF08', // （
  ')': '\uFF09', // ）
  '...': '\u2026\u2026', // …… (treat triple dots as Chinese ellipsis)
};

function normalizePunctuation(text) {
  // Handle triple dots first (before single dot)
  var t = text.replace(/\.\.\./g, '\u2026\u2026');
  t = t.replace(/---/g, '\u2014\u2014');
  // Single character mappings
  t = t.replace(/[,;:!?]/g, function(m) { return HALF_TO_FULL[m]; });
  // Period: only convert when it looks like sentence-ending punctuation
  // (followed by space/newline, end of string, or before Chinese char)
  t = t.replace(/\.(?=\s|$|[\u4E00-\u9FFF\u3400-\u4DBF\uFF00-\uFFEF])/g, '\u3002');
  return t;
}

// ── Allowed delimiters (full-width only, after normalization) ──────────
// These survive the cleaning step; everything else non-CJK is stripped.
var ALLOWED_DELIM = '\u3002\uFF01\uFF1F\uFF0C\uFF1B\uFF1A\u2026\u2014\u2015';
//   。！？，；：…——

// ── Text cleaning ───────────────────────────────────────────────────────
// Strip everything except CJK characters and the allowed delimiters above.
// Runs BEFORE t2s conversion — same philosophy as English lemmatizer's
// [a-z]+ extraction: only keep what matters for analysis.
function cleanChineseText(text) {
  var t = normalizePunctuation(text);
  var result = '';
  for (var i = 0; i < t.length; i++) {
    var ch = t[i];
    if (isCJK(ch) || ALLOWED_DELIM.indexOf(ch) !== -1) {
      result += ch;
    }
  }
  return result;
}

// ── Sentence splitting ──────────────────────────────────────────────────
//
// We split on TWO tiers of delimiters:
//
//   Tier 1 (sentence-ending): 。！？… —— (break followed by space or other
//   content starts fresh)
//
//   Tier 2 (clause-separating): ，；： — these are weaker breaks but still
//   treated as sentence boundaries for analysis purposes (since Chinese
//   comma usage is closer to English sentence boundaries)
//
// After splitting, we filter out empty/whitespace-only results.

var SENTENCE_DELIM = /[。！？\u2026\u2014\u2015]/;
var CLAUSE_DELIM  = /[，；：]/;

function splitChineseSentences(text) {
  if (!text || text.trim().length === 0) return [];

  // Text is already cleaned by cleanChineseText() — no extra normalization needed

  // Step 1: Mark all split positions with a sentinel (\n)
  // Strong boundaries first, then clause boundaries
  text = text.replace(/([。！？\u2026\u2014\u2015])/g, '$1\n');
  text = text.replace(/([，；：])/g, '$1\n');

  // Step 2: Split and clean
  var segments = text.split('\n')
    .map(function(s) { return s.trim(); })
    .filter(function(s) { return s.length > 0; });

  // Step 3: Merge consecutive lone delimiters into adjacent sentences
  var merged = [];
  for (var i = 0; i < segments.length; i++) {
    var s = segments[i];

    // If this segment is ONLY a delimiter, attach it to the previous sentence
    if (/^[。！？，；：\u2026\u2014\u2015]+$/.test(s)) {
      if (merged.length > 0) {
        merged[merged.length - 1] += s;
        continue;
      }
      // If no previous sentence, attach to next
      if (i + 1 < segments.length) {
        segments[i + 1] = s + segments[i + 1];
        continue;
      }
    }

    merged.push(s);
  }

  return merged;
}

// ── Count CJK characters in a sentence ──────────────────────────────────
function countCJKChars(sentence) {
  var count = 0;
  for (var i = 0; i < sentence.length; i++) {
    if (isCJK(sentence[i])) {
      count++;
    }
  }
  return count;
}

// ── Export for browser use ──────────────────────────────────────────────
// Functions are exposed globally so main.js can use them.
