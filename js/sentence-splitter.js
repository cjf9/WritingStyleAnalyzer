/**
 * Sentence Splitter — splits English text into sentences, one per line.
 *
 * Handles:
 *   - Title abbreviations: Mr. Mrs. Ms. Dr. Prof. Sr. Jr. Rev. Hon. St.
 *   - Multi-dot abbreviations: U.S. U.K. e.g. i.e. a.m. p.m. Ph.D.
 *   - URLs and emails (periods inside are never boundaries)
 *   - Quoted speech / dialogue
 *   - Numbers with decimals ($3.14) and dates (2026.)
 *
 * Pure JS, zero dependencies.
 */

function splitSentences(text) {

  // ── 0. Placeholder helpers ────────────────────────────────────────────
  //
  //  We use two sentinel characters for two categories of protected text:
  //
  //   \x01 — "never-split": URL, email, e.g., i.e.
  //          These are never a sentence boundary, even when followed by a
  //          capital letter.
  //
  //   \x02 — "may-split":   U.S., U.K., a.m., p.m., Ph.D., etc.
  //          These can end a sentence. When followed by whitespace + a
  //          capital letter we treat it as a boundary.

  var neverSplit = [];   // stash for \x01
  var maySplit   = [];   // stash for \x02

  function saveNever(m) { neverSplit.push(m); return '\x01' + (neverSplit.length - 1) + '\x01'; }
  function saveMay(m)   { maySplit.push(m);   return '\x02' + (maySplit.length - 1)   + '\x02'; }

  function restoreAll(s) {
    s = s.replace(/\x01(\d+)\x01/g, function (_, i) { return neverSplit[parseInt(i, 10)]; });
    s = s.replace(/\x02(\d+)\x02/g, function (_, i) { return maySplit[parseInt(i, 10)];   });
    return s;
  }

  var t = text;

  // ── 1. Protect URLs & emails  [never-split] ──────────────────────────

  t = t.replace(
    /(?:(?:https?|ftp):\/\/|www\.)[^\s<>"'`\u4e00-\u9fff]*/gi,
    function (m) {
      // Strip trailing sentence punctuation from the URL itself …
      var stripped = m.replace(/[.!?]+$/, '');
      // … but put it back after the placeholder so it remains a real
      // sentence-boundary character that step 6 can split on.
      var punct = m.slice(stripped.length);
      return saveNever(stripped) + punct;
    }
  );
  t = t.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    saveNever
  );

  // ── 2. Protect multi-dot abbreviations ────────────────────────────────
  //
  //  Category A — never a sentence boundary (always followed by their content):
  //    e.g.   i.e.
  //
  //  Category B — can end a sentence:
  //    U.S.   U.K.   U.F.O.   U.N.   E.U.
  //    a.m.   p.m.
  //    Ph.D.  M.D.   B.A.    M.A.   B.C.   A.D.

  var neverSplitAbbr = ['e\\.g\\.', 'i\\.e\\.'];
  var maySplitAbbr   = [
    'U\\.S\\.', 'U\\.K\\.', 'U\\.F\\.O\\.', 'U\\.N\\.', 'E\\.U\\.',
    'a\\.m\\.', 'p\\.m\\.',
    'Ph\\.D\\.', 'M\\.D\\.', 'B\\.A\\.', 'M\\.A\\.', 'B\\.C\\.', 'A\\.D\\.',
  ];

  neverSplitAbbr.forEach(function (abbr) {
    t = t.replace(new RegExp('\\b' + abbr, 'gi'), saveNever);
  });
  maySplitAbbr.forEach(function (abbr) {
    t = t.replace(new RegExp('\\b' + abbr, 'gi'), saveMay);
  });

  // ── 3. Protect single-word abbreviations ──────────────────────────────
  //
  //  Title-honorific abbreviations whose period is never a sentence
  //  boundary UNLESS the title is used as a common noun (preceded by a
  //  determiner: a, an, the, his, her, etc.).  When used as a noun we
  //  leave the period alone so the normal split can detect the boundary.
  //
  //  e.g.  "Dr. Smith is here"  → protect   (title before name)
  //        "I am a Dr."         → NO protect (noun, sentence ends)
  //
  //  We protect with \x01 (never-split) because these titles are, by
  //  definition in this branch, NOT at the end of a sentence.

  var titles = [
    'Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Sr', 'Jr', 'Rev', 'Hon', 'St',
    'Capt', 'Gen', 'Col', 'Maj', 'Lt', 'Sgt', 'Messrs', 'Mmes', 'Msgr',
  ];
  var detWord = '(?:a|an|the|his|her|my|your|our|their)';

  titles.forEach(function (tWord) {
    // Protect ONLY when NOT preceded by determiner
    var re = new RegExp(
      '(?<!\\b' + detWord + '\\s)\\b' + tWord + '\\.', 'gi'
    );
    t = t.replace(re, saveNever);
  });

  // ── 4. Other common single-word abbreviations [may-split] ─────────────
  //
  //  "etc.", "Corp.", "Inc.", etc. — these CAN end sentences, so we
  //  protect them with \x02 (may-split).

  var generalAbbr = [
    'etc', 'Corp', 'Inc', 'Ltd', 'Co', 'No', 'Vol', 'Ed', 'Esq',
    'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  generalAbbr.forEach(function (abbr) {
    t = t.replace(new RegExp('\\b' + abbr + '\\.', 'gi'), saveMay);
  });

  // ── 5. "vs." — special case [never-split] ─────────────────────────────
  //
  //  "vs." is virtually always followed by the comparison target, so its
  //  period is never a sentence boundary.

  t = t.replace(/\bvs\./gi, saveNever);

  // ── 6. Split on genuine sentence-ending punctuation ──────────────────
  //
  //  [!?] are almost always sentence boundaries.
  //  [.] followed by space + capital letter is a candidate.
  //
  //  The lookahead also accepts \x01 and \x02 — our placeholder sentinels.
  //  Why: after protecting an abbreviation like "Dr.", the text becomes
  //  "late. \x01N\x01 Smith".  Without \x01 in the lookahead the regex
  //  doesn't see the uppercase 'S' of "Smith" and misses the split.
  //
  //  Insert a newline at each boundary gap.

  t = t.replace(/([.!?])(["')\]}]*)\s+(?=[A-Z\x01\x02"])/g, '$1$2\n');

  // ── 7. Split after "may-split" placeholders at sentence end ───────────
  //
  //  A \x02 placeholder could be the last word of a sentence.
  //  When followed by whitespace + capital letter (or opening quote),
  //  we insert a split.

  t = t.replace(/(\x02\d+\x02)\s+(?=[A-Z"'])/g, '$1\n');

  // ── 8. Build sentence array, restore placeholders ─────────────────────

  var sentences = t.split('\n')
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return s.length > 0; })
    .map(restoreAll);

  // ── 9. Post-process: rejoin false splits ──────────────────────────────
  //
  //  Case A — Title abbreviation incorrectly split from its name:
  //    "Mr." / "Johnson arrived..."  →  rejoin
  //
  //    Heuristic: if the previous segment ends with a bare title word
  //    (without its period, since the period was the split point), AND
  //    that title is NOT preceded by a determiner, rejoin.
  //
  //  Case B — "vs." split from its target (if it wasn't protected):
  //    "...U.S. vs." / "Canada match..."  →  rejoin

  var titleWords = '(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|Rev|Hon|St|Capt|Gen|Col|Maj|Lt|Sgt|Messrs|Mmes|Msgr)';
  var titleEndRe = new RegExp('^(.+)\\s+(' + titleWords + ')$', 'i');

  var merged = [];

  for (var i = 0; i < sentences.length; i++) {
    var s = sentences[i];

    if (merged.length > 0) {
      var prev = merged[merged.length - 1];

      // — Check for title abbreviation at end of previous segment —
      var m = prev.match(titleEndRe);
      if (m) {
        var wordsBefore = m[1].split(/\s+/).filter(Boolean);
        var hasDet = false;
        if (wordsBefore.length > 0) {
          var last = wordsBefore[wordsBefore.length - 1].toLowerCase();
          if (/^(a|an|the|his|her|my|your|our|their)$/.test(last)) {
            hasDet = true;
          }
        }
        // If title is NOT noun-use AND the preceding text is short (≤ 4 words
        // before the title), it's almost certainly a title before a name.
        if (!hasDet && wordsBefore.length <= 4) {
          merged[merged.length - 1] = prev + ' ' + s;
          continue;
        }
      }

      // — Check for "vs" at end of previous segment —
      if (/\bvs$/.test(prev)) {
        merged[merged.length - 1] = prev + ' ' + s;
        continue;
      }
    }

    merged.push(s);
  }

  // ── 10. Final cleanup: trim each sentence ─────────────────────────────
  return merged.map(function (s) { return s.trim(); });
}

// ── Convenience: return text with one sentence per line ─────────────────
function splitSentencesToText(text) {
  return splitSentences(text).join('\n');
}

// Export for Node / browser module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { splitSentences, splitSentencesToText };
}
