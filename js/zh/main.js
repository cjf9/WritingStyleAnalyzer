// Writing Style Analyzer — Chinese Text Analysis Engine
//
// Character-based analysis (字频) for Chinese text.
// Shared by zh-hans/ and zh-hant/ pages.
// zh-hant pages convert Traditional → Simplified before analysis via t2s().

// ── Build character → rank lookup (index 0 = most common) ──────────────
const CHAR_TO_RANK = {};
CHAR_FREQ_MAP.forEach(function(char, i) { CHAR_TO_RANK[char] = i; });

// ── Stored articles ────────────────────────────────────────────────────
let storedArticles = [];

// ── Color palette (same as English version) ────────────────────────────
const TRACE_COLORS = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];

// ── Detect if current page is Traditional Chinese ──────────────────────
const isTraditional = document.documentElement.lang === 'zh-Hant';

// ── DOM Elements ───────────────────────────────────────────────────────
const textInput = document.getElementById('textInput');
const fileInput = document.getElementById('fileInput');
const submitTextBtn = document.getElementById('submitTextBtn');
const uploadBtn = document.getElementById('uploadBtn');
const submittedList = document.getElementById('submittedList');
const analyzeBtn = document.getElementById('analyzeBtn');
const chartsSection = document.getElementById('chartsSection');
const sentenceChart = document.getElementById('sentenceChart');
const wordFreqChart = document.getElementById('wordFreqChart');

// ── Get first N characters of text as title ────────────────────────────
function getTitleFromText(text, n) {
  n = n || 12;
  var cleaned = text.trim();
  if (cleaned.length === 0) return 'Untitled';
  if (cleaned.length <= n) return cleaned;
  return cleaned.slice(0, n) + '\u2026';
}

// ── Add article to list ────────────────────────────────────────────────
function addArticle(title, text) {
  storedArticles.push({ title: title, text: text });
  renderArticleList();
}

// ── Render the submitted articles list ─────────────────────────────────
function renderArticleList() {
  submittedList.innerHTML = '';
  storedArticles.forEach(function(article, index) {
    var item = document.createElement('div');
    item.className = 'article-item';
    item.innerHTML =
      '<span class="article-title">' + article.title + '</span>' +
      '<button class="article-remove" data-index="' + index + '" title="Remove">\u2715</button>';
    submittedList.appendChild(item);
  });
}

// ── Remove article ─────────────────────────────────────────────────────
submittedList.addEventListener('click', function(e) {
  var btn = e.target.closest('.article-remove');
  if (!btn) return;
  var idx = parseInt(btn.dataset.index);
  storedArticles.splice(idx, 1);
  renderArticleList();
});

// ── Submit text button ─────────────────────────────────────────────────
if (submitTextBtn) {
  submitTextBtn.addEventListener('click', function() {
    var text = textInput.value.trim();
    if (!text) return;
    var title = getTitleFromText(text);
    addArticle(title, text);
    textInput.value = '';
  });
}

// ── Encoding detection ──────────────────────────────────────────────────
// Try multiple encodings, pick the one that yields the most CJK characters.
// Covers: UTF-8 (universal), GBK (mainland China), Big5 (Taiwan/HK/Macau).
var DETECT_ENCODINGS = ['utf-8', 'gbk', 'big5'];

function countCJKInText(text) {
  var count = 0;
  for (var i = 0; i < text.length; i++) {
    if (isCJK(text[i])) count++;
  }
  return count;
}

function detectAndDecode(buffer) {
  // Try UTF-8 with fatal=true.  If it succeeds, the file is valid UTF-8
  // (UTF-8 has strict byte-sequence rules — a legacy GBK/Big5 file will
  // throw).  Only fall back to GBK/Big5 if UTF-8 fails.
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  } catch(e) {
    // Not valid UTF-8 — try legacy encodings, pick the one with more CJK chars
    var best = '';
    var bestCount = 0;
    ['gbk', 'big5'].forEach(function(enc) {
      try {
        var text = new TextDecoder(enc).decode(buffer);
        var n = countCJKInText(text);
        if (n > bestCount) { bestCount = n; best = text; }
      } catch(e2) {}
    });
    return best || new TextDecoder('utf-8').decode(buffer);
  }
}

// ── Upload TXT files (with encoding auto-detection) ────────────────────
if (uploadBtn) {
  uploadBtn.addEventListener('click', function() {
    fileInput.click();
  });
}

if (fileInput) {
  fileInput.addEventListener('change', function() {
    var files = Array.from(fileInput.files);
    files.forEach(function(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var text = detectAndDecode(e.target.result);
        var title = file.name.replace(/\.txt$/i, '');
        addArticle(title, text);
      };
      reader.readAsArrayBuffer(file);
    });
    fileInput.value = '';
  });
}

// ============================================================
// ANALYSIS ENGINE
// ============================================================

// ── Preprocess text: clean, then optional t2s for Traditional Chinese ──
function preprocessText(text) {
  // Step 1: Clean — strip non-CJK, normalize delimiters (as English [a-z]+ does)
  var cleaned = typeof cleanChineseText === 'function' ? cleanChineseText(text) : text;
  // Step 2: Traditional → Simplified for zh-hant pages
  if (isTraditional && typeof t2s === 'function') {
    return t2s(cleaned);
  }
  return cleaned;
}

// ── Sentence length analysis (CJK character count) ─────────────────────
function analyzeSentenceLengths(text) {
  var processed = preprocessText(text);
  var sentences = splitChineseSentences(processed);

  var MAX = 30;
  var counts = new Array(MAX + 1).fill(0);

  sentences.forEach(function(sentence) {
    var len = countCJKChars(sentence);
    if (len === 0) return;
    if (len >= MAX) {
      counts[MAX]++;
    } else {
      counts[len]++;
    }
  });

  var total = sentences.length;
  if (total === 0) return new Array(MAX).fill(0);

  var cum = [];
  var running = 0;
  for (var len = 1; len <= MAX; len++) {
    running += counts[len];
    cum.push(running / total);
  }

  return cum; // array of 80 values, index 0 = length 1
}

// ── Character frequency analysis ───────────────────────────────────────
function analyzeCharFrequencies(text) {
  var processed = preprocessText(text);
  var freqMap = {}; // { rankIndex: count }

  for (var i = 0; i < processed.length; i++) {
    var ch = processed[i];
    if (!isCJK(ch)) continue;
    var rank = CHAR_TO_RANK[ch];
    if (rank !== undefined) {
      freqMap[rank] = (freqMap[rank] || 0) + 1;
    } else {
      // Characters not in the table (rare, or untranslated traditional)
      // accumulate at the catch-all bucket MAX_FREQ_RANK
      freqMap[MAX_FREQ_RANK] = (freqMap[MAX_FREQ_RANK] || 0) + 1;
    }
  }

  return freqMap;
}

// ============================================================
// CHART RENDERING
// ============================================================

function runAnalysis() {
  if (storedArticles.length === 0) {
    alert('\u8BF7\u5148\u63D0\u4EA4\u6216\u4E0A\u4F20\u81F3\u5C11\u4E00\u7BC7\u6587\u7AE0\u3002'); // 请先提交或上传至少一篇文章。
    return;
  }

  // ── Chart 1: Sentence Length CDF ─────────────────────────────────────
  var sentenceTraces = [];
  storedArticles.forEach(function(article, i) {
    var data = analyzeSentenceLengths(article.text);
    var x = [0].concat(Array.from({ length: data.length }, function(_, idx) { return idx + 1; }));
    var y = [0].concat(data);
    sentenceTraces.push({
      x: x,
      y: y,
      mode: 'lines',
      name: article.title,
      line: {
        color: TRACE_COLORS[i % TRACE_COLORS.length],
        width: 2,
        shape: 'hv'
      },
      hoverinfo: 'x+y+name'
    });
  });

  var sentenceLayout = {
    xaxis: {
      title: '\u53E5\u5B50\u957F\u5EA6\uFF08\u5B57\u6570\uFF09', // 句子长度（字数）
      range: [0, 30],
      dtick: 5
    },
    yaxis: {
      title: '\u7D2F\u79EF\u6982\u7387', // 累积概率
      range: [0, 1]
    },
    showlegend: true,
    legend: {
      x: 1,
      y: 0,
      xanchor: 'right',
      yanchor: 'bottom',
      bgcolor: 'rgba(255,255,255,0.85)',
      bordercolor: '#ddd',
      borderwidth: 1
    },
    margin: { t: 10, r: 30, b: 40, l: 55 },
    hovermode: 'closest'
  };

  var config = {
    responsive: true,
    displayModeBar: true
  };

  Plotly.newPlot(sentenceChart, sentenceTraces, sentenceLayout, config);

  // ── Chart 2: Character Frequency CDF ─────────────────────────────────
  var wordFreqTraces = [];

  // Reference curve: "25亿语料平均"
  var refX = REFERENCE_CDF.map(function(p) { return p[0]; });
  var refY = REFERENCE_CDF.map(function(p) { return p[1] / 100; }); // convert % to 0-1

  wordFreqTraces.push({
    x: refX,
    y: refY,
    mode: 'lines',
    name: '25\u4EBF\u8BED\u6599\u5E73\u5747', // 25亿语料平均
    line: {
      color: '#95a5a6',
      width: 2,
      shape: 'hv',
      dash: 'dash'
    },
    hoverinfo: 'x+y+name'
  });

  // User article curves
  storedArticles.forEach(function(article, i) {
    var freqMap = analyzeCharFrequencies(article.text);
    var indices = Object.keys(freqMap).map(Number).sort(function(a, b) { return a - b; });

    if (indices.length === 0) return;

    var color = TRACE_COLORS[(i + 1) % TRACE_COLORS.length]; // +1 to skip reference gray
    var x = [0];
    var y = [0];
    var cumulative = 0;
    var total = indices.reduce(function(sum, idx) { return sum + freqMap[idx]; }, 0);

    indices.forEach(function(idx) {
      cumulative += freqMap[idx];
      x.push(idx);
      y.push(cumulative / total);
    });

    wordFreqTraces.push({
      x: x,
      y: y,
      mode: 'lines',
      name: article.title,
      line: {
        color: color,
        width: 2,
        shape: 'hv'
      },
      hoverinfo: 'x+y+name'
    });
  });

  if (wordFreqTraces.length <= 1) {
    wordFreqChart.innerHTML = '<p style="text-align:center;color:#999;padding:2rem;">\u672A\u627E\u5230\u53EF\u8BC6\u522B\u7684\u6C49\u5B57\u3002</p>';
  } else {
    var wordFreqLayout = {
      xaxis: {
        title: '\u5B57\u9891\u6392\u540D\uFF080 = \u6700\u5E38\u89C1\uFF09',
        range: [0, MAX_FREQ_RANK]
      },
      yaxis: {
        title: '\u7D2F\u79EF\u6982\u7387', // 累积概率
        range: [0, 1]
      },
      showlegend: true,
      legend: {
        x: 1,
        y: 0,
        xanchor: 'right',
        yanchor: 'bottom',
        bgcolor: 'rgba(255,255,255,0.85)',
        bordercolor: '#ddd',
        borderwidth: 1
      },
      margin: { t: 10, r: 30, b: 40, l: 55 },
      hovermode: 'closest'
    };

    Plotly.newPlot(wordFreqChart, wordFreqTraces, wordFreqLayout, config);
  }

  if (chartsSection) {
    chartsSection.classList.remove('hidden');
    window.scrollTo({ top: chartsSection.offsetTop - 20, behavior: 'smooth' });
  }
}

// ── Analyze button ─────────────────────────────────────────────────────
if (analyzeBtn) {
  analyzeBtn.addEventListener('click', runAnalysis);
}
