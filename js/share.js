// Share functionality for Writing Style Analyzer
// Generates chart images, composites a share card, and handles
// per-platform sharing (Web Share API on mobile, download + URL on desktop).

var SHARE_TEXT = window.SHARE_TEXT_OVERRIDE || 'I just mapped my writing style. What does yours look like?';
var SHARE_TITLE = window.SHARE_TITLE_OVERRIDE || 'Writing Style Analyzer';
var SHARE_CARD_LINE1 = window.SHARE_CARD_LINE1_OVERRIDE || 'I just mapped my writing style.';
var SHARE_CARD_LINE2 = window.SHARE_CARD_LINE2_OVERRIDE || 'What does yours look like?';
var SHARE_CARD_LINE2_INDENT = window.SHARE_CARD_LINE2_INDENT_OVERRIDE;

// ── Toast ──────────────────────────────────────────────────────────────
function showToast(msg) {
  var el = document.getElementById('shareToast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timeout);
  el._timeout = setTimeout(function () { el.classList.remove('show'); }, 2800);
}

// ── Chart → Image ──────────────────────────────────────────────────────
function chartToImage(chartId, width, height) {
  var el = document.getElementById(chartId);
  if (!el || !el.querySelector('svg')) return Promise.resolve(null);
  return Plotly.toImage(el, { format: 'png', width: width, height: height });
}

// ── Composite Share Card ───────────────────────────────────────────────
function buildShareCard(plotUrl1, plotUrl2, owlImg) {
  var W = 1200;
  var H = 1400;
  var pad = 36;
  var chartH = 540;

  var canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  var ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  var currentY = pad;

  // Chart 1 — Sentence Length
  if (plotUrl1) {
    return loadImage(plotUrl1).then(function (img) {
      ctx.drawImage(img, pad, currentY, W - pad * 2, chartH);
      currentY += chartH + pad;

      // Chart 2 — Word Frequency
      if (plotUrl2) {
        return loadImage(plotUrl2).then(function (img2) {
          ctx.drawImage(img2, pad, currentY, W - pad * 2, chartH);
          currentY += chartH + pad;
          finishCard(ctx, W, H, currentY, owlImg);
          return canvas;
        });
      }
      finishCard(ctx, W, H, currentY);
      return canvas;
    });
  }
  finishCard(ctx, W, H, currentY);
  return Promise.resolve(canvas);
}

function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () { resolve(img); };
    img.onerror = function () { reject(new Error('Failed to load chart image')); };
    img.src = url;
  });
}

function finishCard(ctx, W, H, y, owlImg) {
  var pad = 36;

  // Divider line
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(W - pad, y);
  ctx.stroke();
  y += pad;

  var bottomEdge = H - pad;

  // ── Centered owl + URL stack ───────────────────────────────────────
  var owlSize = 90;
  var urlFontSize = 20;
  var owlGap = 10;
  ctx.font = '400 ' + urlFontSize + 'px Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif';
  var urlText = 'WritingStyleAnalyzer.com';
  var stackH = owlSize + owlGap + urlFontSize + 4;

  var centerY = y + (bottomEdge - y) / 2;
  var stackTop = centerY - stackH / 2;

  ctx.textAlign = 'center';

  if (owlImg) {
    // Owl icon, horizontally centered
    var owlX = (W - owlSize) / 2;
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.drawImage(owlImg, owlX, stackTop, owlSize, owlSize);
    ctx.restore();

    // URL centered under the owl
    ctx.fillStyle = '#3498db';
    ctx.font = '400 ' + urlFontSize + 'px Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif';
    ctx.fillText(urlText, W / 2, stackTop + owlSize + owlGap + urlFontSize);
  } else {
    // No owl — just the URL, centered
    ctx.fillStyle = '#3498db';
    ctx.font = '400 ' + urlFontSize + 'px Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif';
    ctx.fillText(urlText, W / 2, centerY + urlFontSize / 2);
  }

  ctx.textAlign = 'start';
}

function wrapText(ctx, text, maxWidth) {
  var words = text.split(' ');
  var lines = [];
  var line = '';
  for (var i = 0; i < words.length; i++) {
    var test = line ? line + ' ' + words[i] : words[i];
    if (ctx.measureText(test).width > maxWidth && line.length > 0) {
      lines.push(line);
      line = words[i];
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ── Generate & download ────────────────────────────────────────────────
function generateShareImage() {
  return Promise.all([
    chartToImage('sentenceChart', 1200, 540),
    chartToImage('wordFreqChart', 1200, 540),
    loadImage(window.OWL_IMG_PATH || 'favicon-180.png').catch(function () { return null; })
  ]).then(function (results) {
    return buildShareCard(results[0], results[1], results[2]);
  });
}

function canvasToBlob(canvas) {
  return new Promise(function (resolve) {
    canvas.toBlob(function (blob) { resolve(blob); }, 'image/png');
  });
}

function downloadBlob(blob, filename) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
}

// ── Platform share URLs (desktop fallback) ─────────────────────────────
function getShareUrl(platform) {
  var text = encodeURIComponent(SHARE_TEXT);
  var url = encodeURIComponent(window.location.href);

  switch (platform) {
    case 'X':
      return 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url;
    case 'facebook':
      return 'https://www.facebook.com/sharer/sharer.php?quote=' + text + '&u=' + url;
    case 'linkedin':
      return 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
    case 'reddit':
      return 'https://www.reddit.com/submit?url=' + url + '&title=' + text;
    case 'tumblr':
      return 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' + url + '&caption=' + text;
    case 'weibo':
      return 'https://service.weibo.com/share/share.php?url=' + url + '&title=' + text;
    case 'qzone':
      return 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&title=' + text;
    case 'xiaohongshu':
      return 'https://www.xiaohongshu.com/explore';
    case 'zhihu':
      return 'https://www.zhihu.com/';
    default:
      return null;
  }
}

// ── Copy image to clipboard ────────────────────────────────────────────
function copyImageToClipboard(blob) {
  // Firefox doesn't support ClipboardItem
  if (typeof ClipboardItem === 'undefined') {
    return Promise.reject(new Error('ClipboardItem not supported'));
  }
  try {
    return navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  } catch (e) {
    return Promise.reject(e);
  }
}

// ── Device detection ───────────────────────────────────────────────────
function isMobile() {
  return /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
}

// ── Main share handler ─────────────────────────────────────────────────
function shareToPlatform(platform) {
  var sentenceEl = document.getElementById('sentenceChart');
  if (!sentenceEl || !sentenceEl.querySelector('svg')) {
    showToast('Please run the analysis first.');
    return;
  }

  showToast('Generating share image...');

  generateShareImage().then(function (canvas) {
    return canvasToBlob(canvas).then(function (blob) {
      var file = new File([blob], 'writing-analysis.png', { type: 'image/png' });

      // Mobile: use Web Share API → native share sheet with image + text
      if (isMobile() && navigator.canShare && navigator.canShare({ files: [file] })) {
        return navigator.share({
          files: [file],
          title: SHARE_TITLE,
          text: SHARE_TEXT
        }).then(function () {
          showToast('Shared!');
        }).catch(function () {
          // User cancelled — fall through to desktop flow
          desktopShare(platform, blob);
        });
      }

      // Desktop: download + open platform share URL
      desktopShare(platform, blob);
    });
  }).catch(function (err) {
    console.error('Share failed:', err);
    showToast('Something went wrong. Please try again.');
  });
}

function desktopShare(platform, blob) {
  // 1. Download the image
  downloadBlob(blob, 'writing-analysis.png');

  // 2. Open platform share URL
  var shareUrl = getShareUrl(platform);
  if (shareUrl) {
    showToast('Image downloaded! Attach it to your post in the new window.');
    window.open(shareUrl, '_blank', 'width=600,height=400');
  } else {
    showToast('Image downloaded!');
  }
}

// ── Download button ────────────────────────────────────────────────────
function downloadChartImage() {
  var sentenceEl = document.getElementById('sentenceChart');
  if (!sentenceEl || !sentenceEl.querySelector('svg')) {
    showToast('Please run the analysis first.');
    return;
  }

  showToast('Generating image...');

  generateShareImage().then(function (canvas) {
    return canvasToBlob(canvas).then(function (blob) {
      downloadBlob(blob, 'writing-analysis.png');
      showToast('Image downloaded!');
    });
  }).catch(function (err) {
    console.error('Download failed:', err);
    showToast('Something went wrong.');
  });
}

// ── Event listeners ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var chartsSection = document.getElementById('chartsSection');
  if (!chartsSection) return;

  // Social share buttons (delegated)
  chartsSection.addEventListener('click', function (e) {
    var socialBtn = e.target.closest('.icon-btn');
    if (socialBtn) {
      var platform = socialBtn.dataset.platform;
      if (platform) shareToPlatform(platform);
      return;
    }

    var downloadBtn = e.target.closest('#downloadChartBtn');
    if (downloadBtn) {
      downloadChartImage();
    }
  });
});
