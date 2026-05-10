/**
 * Lemmatizer — reduces English word forms to base lemmas.
 *
 * Covers:
 *   - All common irregular verb inflections (~600 forms → base)
 *   - Irregular noun plurals (~200 forms → singular)
 *   - Irregular adjective/adverb comparisons (~80 forms → base)
 *   - Archaic / literary forms (thou, hath, dost, 'tis, etc.)
 *   - Be / modal / auxiliary verbs (full conjugation)
 *   - Common contractions (don't → do not, etc.)
 *   - Rule-based regular suffix stripping: -ing, -ed, -s, -es, -ies,
 *     -ly, -er, -est, -ier, -iest, -ied, -ves
 *
 * Pure JS, zero dependencies.  Designed for literary English text analysis.
 */

var IRREGULAR_LEMMA = {};

// — Helper: map many inflected forms to one base form —
function LM(base, forms) {
  for (var i = 0; i < forms.length; i++) {
    IRREGULAR_LEMMA[forms[i]] = base;
  }
}

// ============================================================================
// 1.  BE  VERB  —  all forms including archaic & contractions
// ============================================================================
LM("be", [
  "am", "is", "are", "was", "were", "been", "being", "be",
  // archaic / poetic
  "art", "wast", "wert", "beest",
  // contractions
  "'m", "'s", "'re", "ain't", "ain'tt", "aren't", "isn't", "wasn't", "weren't",
  // gonna / wanna (colloquial reduction)
  "gonna", "wanna", "gotta", "oughta",
]);

// ============================================================================
// 2.  MODAL & AUXILIARY  —  full conjugation + archaic
// ============================================================================
LM("have", [
  "has", "had", "having", "hath", "hast", "hadst",
  "haven't", "hasn't", "hadn't", "ha'n't",
]);
LM("do", [
  "does", "did", "doing", "done",
  "doth", "dost", "didst", "doest", "doeth",
  "don't", "doesn't", "didn't",
]);
LM("shall", ["should", "shalt", "shouldst", "shan't", "shouldn't"]);
LM("will", ["would", "wilt", "wouldst", "won't", "wouldn't", "'ll"]);
LM("can", ["could", "canst", "couldst", "can't", "cannot", "couldn't"]);
LM("may", ["might", "mayst", "mightst", "mayn't", "mightn't"]);
LM("must", ["mustn't", "must've"]);
LM("ought", ["oughtn't", "oughta"]);
LM("need", ["needn't"]);
LM("dare", ["dares", "dared", "daring", "daren't", "durst"]);
LM("used", ["useta"]);   // "used to" colloquial

// ============================================================================
// 3.  MAJOR IRREGULAR VERBS  —  V2 (past) + V3 (past participle)
//     Also irregular -ing & -s forms where applicable
// ============================================================================

// — A —
LM("abide", ["abode", "abided", "abiding"]);
LM("arise", ["arose", "arisen", "arising"]);
LM("awake", ["awoke", "awaked", "awoken", "awaking"]);

// — B —
LM("bear", ["bore", "bare", "born", "borne", "bearing"]);
LM("beat", ["beaten", "beating"]);
LM("become", ["became", "becoming"]);
LM("befall", ["befell", "befallen", "befalling"]);
LM("beget", ["begot", "begat", "begotten", "begetting"]);
LM("begin", ["began", "begun", "beginning"]);
LM("behold", ["beheld", "beholding"]);
LM("bend", ["bent", "bended", "bending"]);
LM("bereave", ["bereft", "bereaved", "bereaving"]);
LM("beseech", ["besought", "beseeched", "beseeching"]);
LM("beset", ["besetting"]);
LM("bet", ["betted", "betting"]);
LM("betake", ["betook", "betaken", "betaking"]);
LM("bethink", ["bethought", "bethinking"]);
LM("bid", ["bade", "bidden", "bidding"]);
LM("bind", ["bound", "binding"]);
LM("bite", ["bit", "bitten", "biting"]);
LM("bleed", ["bled", "bleeding"]);
LM("blend", ["blent", "blended", "blending"]);
LM("bless", ["blest", "blessed", "blessing"]);
LM("blow", ["blew", "blown", "blowing"]);
LM("break", ["broke", "brake", "broken", "breaking"]);
LM("breed", ["bred", "breeding"]);
LM("bring", ["brought", "bringing"]);
LM("broadcast", ["broadcasted"]);
LM("browbeat", ["browbeaten", "browbeating"]);
LM("build", ["built", "building"]);
LM("burn", ["burnt", "burned", "burning"]);
LM("burst", ["bursting"]);
LM("bust", ["busted", "busting"]);
LM("buy", ["bought", "buying"]);

// — C —
LM("cast", ["casting"]);
LM("catch", ["caught", "catching"]);
LM("chide", ["chid", "chidden", "chided", "chiding"]);
LM("choose", ["chose", "chosen", "choosing"]);
LM("cleave", ["clove", "cleft", "cloven", "cleaving"]);
LM("cling", ["clung", "clinging"]);
LM("clothe", ["clad", "clothed", "clothing"]);
LM("come", ["came", "coming"]);
LM("cost", ["costing"]);
LM("creep", ["crept", "creeping"]);
LM("crow", ["crew", "crowed", "crowing"]);
LM("cut", ["cutting"]);

// — D —
LM("deal", ["dealt", "dealing"]);
LM("dig", ["dug", "digging"]);
LM("dive", ["dove", "dived", "diving"]);
LM("draw", ["drew", "drawn", "drawing"]);
LM("dream", ["dreamt", "dreamed", "dreaming"]);
LM("drink", ["drank", "drunk", "drunken", "drinking"]);
LM("drive", ["drove", "driven", "driving"]);
LM("dwell", ["dwelt", "dwelled", "dwelling"]);

// — E —
LM("eat", ["ate", "eaten", "eating"]);
LM("engrave", ["engraved", "engraven", "engraving"]);

// — F —
LM("fall", ["fell", "fallen", "falling"]);
LM("feed", ["fed", "feeding"]);
LM("feel", ["felt", "feeling"]);
LM("fight", ["fought", "fighting"]);
LM("find", ["found", "finding"]);
LM("flee", ["fled", "fleeing"]);
LM("fling", ["flung", "flinging"]);
LM("fly", ["flew", "flown", "flying"]);
LM("forbear", ["forbore", "forborne", "forbearing"]);
LM("forbid", ["forbade", "forbidden", "forbidding"]);
LM("fordo", ["fordid", "fordone", "fordoing"]);
LM("forecast", ["forecasted"]);
LM("forego", ["forewent", "foregone", "foregoing"]);
LM("foreknow", ["foreknew", "foreknown", "foreknowing"]);
LM("forerun", ["foreran", "forerun", "forerunning"]);
LM("foresee", ["foresaw", "foreseen", "foreseeing"]);
LM("foreshow", ["foreshowed", "foreshown", "foreshowing"]);
LM("forespeak", ["forespoke", "forespoken", "forespeaking"]);
LM("foretell", ["foretold", "foretelling"]);
LM("forget", ["forgot", "forgotten", "forgetting"]);
LM("forgive", ["forgave", "forgiven", "forgiving"]);
LM("forsake", ["forsook", "forsaken", "forsaking"]);
LM("forswear", ["forswore", "forsworn", "forswearing"]);
LM("fraught", ["fraughted", "fraughting"]);
LM("freeze", ["froze", "frozen", "freezing"]);

// — G —
LM("gainsay", ["gainsaid", "gainsaying"]);
LM("geld", ["gelt", "gelded", "gelding"]);
LM("get", ["got", "gotten", "getting"]);
LM("gild", ["gilt", "gilded", "gilding"]);
LM("gird", ["girt", "girded", "girding"]);
LM("give", ["gave", "given", "giving"]);
LM("go", ["goes", "went", "gone", "going"]);
LM("grave", ["graved", "graven", "graving"]);
LM("grind", ["ground", "grinding"]);
LM("grip", ["gript", "gripped", "gripping"]);
LM("grow", ["grew", "grown", "growing"]);

// — H —
LM("hamstring", ["hamstrung", "hamstringing"]);
LM("hang", ["hung", "hanged", "hanging"]);
LM("hear", ["heard", "hearing"]);
LM("heave", ["hove", "heaved", "heaving"]);
LM("hew", ["hewed", "hewn", "hewing"]);
LM("hide", ["hid", "hidden", "hiding"]);
LM("hit", ["hitting"]);
LM("hold", ["held", "holding"]);
LM("hurt", ["hurting"]);

// — I —
LM("inlay", ["inlaid", "inlaying"]);
LM("input", ["inputted", "inputting"]);
LM("inset", ["insetting"]);

// — K —
LM("keep", ["kept", "keeping"]);
LM("ken", ["kent", "kenned", "kenning"]);
LM("kneel", ["knelt", "kneeled", "kneeling"]);
LM("knit", ["knitted", "knitting"]);
LM("know", ["knew", "known", "knowing"]);

// — L —
LM("lade", ["laded", "laden", "lading"]);
LM("lay", ["laid", "laying"]);
LM("lead", ["led", "leading"]);
LM("lean", ["leant", "leaned", "leaning"]);
LM("leap", ["leapt", "leaped", "leaping"]);
LM("learn", ["learnt", "learned", "learning"]);
LM("leave", ["left", "leaving"]);
LM("lend", ["lent", "lending"]);
LM("let", ["letting"]);
LM("lie", ["lay", "lain", "lying"]);
LM("light", ["lit", "lighted", "lighting"]);
LM("lose", ["lost", "losing"]);

// — M —
LM("make", ["made", "making"]);
LM("mean", ["meant", "meaning"]);
LM("meet", ["met", "meeting"]);
LM("melt", ["molten", "melted", "melting"]);
LM("misdeal", ["misdealt", "misdealing"]);
LM("misgive", ["misgave", "misgiven", "misgiving"]);
LM("mislay", ["mislaid", "mislaying"]);
LM("mislead", ["misled", "misleading"]);
LM("misread", ["misreading"]);
LM("misspell", ["misspelt", "misspelled", "misspelling"]);
LM("mistake", ["mistook", "mistaken", "mistaking"]);
LM("misunderstand", ["misunderstood", "misunderstanding"]);
LM("mow", ["mowed", "mown", "mowing"]);

// — O —
LM("offset", ["offsetting"]);
LM("outbid", ["outbade", "outbidden", "outbidding"]);
LM("outdo", ["outdid", "outdone", "outdoing"]);
LM("outgo", ["outwent", "outgone", "outgoing"]);
LM("outgrow", ["outgrew", "outgrown", "outgrowing"]);
LM("outride", ["outrode", "outridden", "outriding"]);
LM("outrun", ["outran", "outrunning"]);
LM("outsell", ["outsold", "outselling"]);
LM("outshine", ["outshone", "outshined", "outshining"]);
LM("outshoot", ["outshot", "outshooting"]);
LM("outsing", ["outsang", "outsung", "outsinging"]);
LM("outsit", ["outsat", "outsitting"]);
LM("outsleep", ["outslept", "outsleeping"]);
LM("outsmell", ["outsmelt", "outsmelled", "outsmelling"]);
LM("outspeak", ["outspoke", "outspoken", "outspeaking"]);
LM("outspend", ["outspent", "outspending"]);
LM("outspin", ["outspun", "outspinning"]);
LM("outspring", ["outsprang", "outsprung", "outspringing"]);
LM("outstand", ["outstood", "outstanding"]);
LM("outswear", ["outswore", "outsworn", "outswearing"]);
LM("outswim", ["outswam", "outswum", "outswimming"]);
LM("outtell", ["outtold", "outtelling"]);
LM("outthink", ["outthought", "outthinking"]);
LM("outthrow", ["outthrew", "outthrown", "outthrowing"]);
LM("outwear", ["outwore", "outworn", "outwearing"]);
LM("outwork", ["outworked", "outwrought", "outworking"]);
LM("outwrite", ["outwrote", "outwritten", "outwriting"]);
LM("overbear", ["overbore", "overborne", "overbearing"]);
LM("overbid", ["overbade", "overbidden", "overbidding"]);
LM("overblow", ["overblew", "overblown", "overblowing"]);
LM("overbuild", ["overbuilt", "overbuilding"]);
LM("overbuy", ["overbought", "overbuying"]);
LM("overcast", ["overcasting"]);
LM("overcome", ["overcame", "overcoming"]);
LM("overdo", ["overdid", "overdone", "overdoing"]);
LM("overdraw", ["overdrew", "overdrawn", "overdrawing"]);
LM("overdrink", ["overdrank", "overdrunk", "overdrinking"]);
LM("overdrive", ["overdrove", "overdriven", "overdriving"]);
LM("overeat", ["overate", "overeaten", "overeating"]);
LM("overfeed", ["overfed", "overfeeding"]);
LM("overfly", ["overflew", "overflown", "overflying"]);
LM("overgrow", ["overgrew", "overgrown", "overgrowing"]);
LM("overhang", ["overhung", "overhanging"]);
LM("overhear", ["overheard", "overhearing"]);
LM("overlay", ["overlaid", "overlaying"]);
LM("overleap", ["overleapt", "overleaped", "overleaping"]);
LM("overlie", ["overlay", "overlain", "overlying"]);
LM("overpass", ["overpast", "overpassed", "overpassing"]);
LM("overpay", ["overpaid", "overpaying"]);
LM("override", ["overrode", "overridden", "overriding"]);
LM("overrun", ["overran", "overrunning"]);
LM("oversee", ["oversaw", "overseen", "overseeing"]);
LM("oversell", ["oversold", "overselling"]);
LM("overset", ["oversetting"]);
LM("oversew", ["oversewed", "oversewn", "oversewing"]);
LM("overshoot", ["overshot", "overshooting"]);
LM("oversleep", ["overslept", "oversleeping"]);
LM("oversow", ["oversowed", "oversown", "oversowing"]);
LM("overspeak", ["overspoke", "overspoken", "overspeaking"]);
LM("overspend", ["overspent", "overspending"]);
LM("overspin", ["overspun", "overspinning"]);
LM("overspread", ["overspreading"]);
LM("overspring", ["oversprang", "oversprung", "overspringing"]);
LM("oversteal", ["overstole", "overstolen", "overstealing"]);
LM("overtake", ["overtook", "overtaken", "overtaking"]);
LM("overthink", ["overthought", "overthinking"]);
LM("overthrow", ["overthrew", "overthrown", "overthrowing"]);
LM("overwear", ["overwore", "overworn", "overwearing"]);
LM("overwind", ["overwound", "overwinding"]);
LM("overwrite", ["overwrote", "overwritten", "overwriting"]);

// — P —
LM("partake", ["partook", "partaken", "partaking"]);
LM("pay", ["paid", "payed", "paying"]);
LM("pen", ["pent", "penned", "penning"]);
LM("plead", ["pled", "pleaded", "pleading"]);
LM("prepay", ["prepaid", "prepaying"]);
LM("preset", ["presetting"]);
LM("proofread", ["proofreading"]);
LM("prove", ["proved", "proven", "proving"]);
LM("put", ["putting"]);

// — Q —
LM("quit", ["quitted", "quitting"]);

// — R —
LM("read", ["reading"]);
LM("reave", ["reft", "reaved", "reaving"]);
LM("rebind", ["rebound", "rebinding"]);
LM("rebuild", ["rebuilt", "rebuilding"]);
LM("recast", ["recasting"]);
LM("redo", ["redid", "redone", "redoing"]);
LM("relay", ["relaid", "relaying"]);
LM("remake", ["remade", "remaking"]);
LM("rend", ["rent", "rended", "rending"]);
LM("repay", ["repaid", "repaying"]);
LM("reread", ["rereading"]);
LM("rerun", ["reran", "rerunning"]);
LM("resell", ["resold", "reselling"]);
LM("reset", ["resetting"]);
LM("resew", ["resewed", "resewn", "resewing"]);
LM("retake", ["retook", "retaken", "retaking"]);
LM("reteach", ["retaught", "reteaching"]);
LM("rethink", ["rethought", "rethinking"]);
LM("retread", ["retrod", "retrodden", "retreading"]);
LM("rewind", ["rewound", "rewinding"]);
LM("rewrite", ["rewrote", "rewritten", "rewriting"]);
LM("rid", ["ridded", "ridding"]);
LM("ride", ["rode", "ridden", "riding"]);
LM("ring", ["rang", "rung", "ringing"]);
LM("rise", ["rose", "risen", "rising"]);
LM("rive", ["rived", "riven", "riving"]);
LM("run", ["ran", "running"]);

// — S —
LM("saw", ["sawed", "sawn", "sawing"]);
LM("say", ["said", "says", "saying", "saith"]);
LM("see", ["saw", "seen", "seeing"]);
LM("seek", ["sought", "seeking"]);
LM("seethe", ["sod", "sodden", "seethed", "seething"]);
LM("sell", ["sold", "selling"]);
LM("send", ["sent", "sending"]);
LM("set", ["setting"]);
LM("sew", ["sewed", "sewn", "sewing"]);
LM("shake", ["shook", "shaken", "shaking"]);
LM("shave", ["shaved", "shaven", "shaving"]);
LM("shear", ["shore", "shorn", "sheared", "shearing"]);
LM("shed", ["shedding"]);
LM("shine", ["shone", "shined", "shining"]);
LM("shit", ["shat", "shitted", "shitting"]);
LM("shoe", ["shod", "shoed", "shoeing"]);
LM("shoot", ["shot", "shooting"]);
LM("show", ["shew", "shewn", "showed", "shown", "showing"]);
LM("shred", ["shredded", "shredding"]);
LM("shrink", ["shrank", "shrunk", "shrunken", "shrinking"]);
LM("shrive", ["shrove", "shrived", "shriven", "shriving"]);
LM("shut", ["shutting"]);
LM("sing", ["sang", "sung", "singing"]);
LM("sink", ["sank", "sunk", "sunken", "sinking"]);
LM("sit", ["sat", "sitting"]);
LM("slay", ["slew", "slain", "slaying"]);
LM("sleep", ["slept", "sleeping"]);
LM("slide", ["slid", "slidden", "sliding"]);
LM("sling", ["slung", "slinging"]);
LM("slink", ["slunk", "slinked", "slinking"]);
LM("slit", ["slitting"]);
LM("smell", ["smelt", "smelled", "smelling"]);
LM("smite", ["smote", "smitten", "smited", "smiting"]);
LM("sneak", ["snuck", "sneaked", "sneaking"]);
LM("sow", ["sowed", "sown", "sowing"]);
LM("speak", ["spoke", "spake", "spoken", "speaking"]);
LM("speed", ["sped", "speeded", "speeding"]);
LM("spell", ["spelt", "spelled", "spelling"]);
LM("spend", ["spent", "spending"]);
LM("spill", ["spilt", "spilled", "spilling"]);
LM("spin", ["spun", "spinning"]);
LM("spit", ["spat", "spitted", "spitting"]);
LM("split", ["splitting"]);
LM("spoil", ["spoilt", "spoiled", "spoiling"]);
LM("spoon-feed", ["spoon-fed", "spoon-feeding"]);
LM("spread", ["spreading"]);
LM("spring", ["sprang", "sprung", "springing"]);
LM("stand", ["stood", "standing"]);
LM("stave", ["stove", "staved", "staving"]);
LM("steal", ["stole", "stolen", "stealing"]);
LM("stick", ["stuck", "sticking"]);
LM("sting", ["stung", "stinging"]);
LM("stink", ["stank", "stunk", "stinking"]);
LM("strew", ["strewed", "strewn", "strewing"]);
LM("stride", ["strode", "stridden", "striding"]);
LM("strike", ["struck", "stricken", "striking"]);
LM("string", ["strung", "stringing"]);
LM("strive", ["strove", "strived", "striven", "striving"]);
LM("sublet", ["subletting"]);
LM("sunburn", ["sunburnt", "sunburned", "sunburning"]);
LM("swear", ["swore", "sware", "sworn", "swearing"]);
LM("sweat", ["sweated", "sweating"]);
LM("sweep", ["swept", "sweeping"]);
LM("swell", ["swelled", "swollen", "swelling"]);
LM("swim", ["swam", "swum", "swimming"]);
LM("swing", ["swung", "swinging"]);
LM("swink", ["swank", "swunk", "swinking"]);
LM("swivel", ["swivelled", "swiveling"]);

// — T —
LM("take", ["took", "taken", "taking"]);
LM("teach", ["taught", "teaching"]);
LM("tear", ["tore", "torn", "tearing"]);
LM("tell", ["told", "telling"]);
LM("think", ["thought", "thinking"]);
LM("thrive", ["throve", "thrived", "thriven", "thriving"]);
LM("throw", ["threw", "thrown", "throwing"]);
LM("thrust", ["thrusting"]);
LM("toss", ["tost", "tossed", "tossing"]);
LM("tread", ["trod", "trodden", "treading"]);

// — U —
LM("unbend", ["unbent", "unbending"]);
LM("unbind", ["unbound", "unbinding"]);
LM("unbuild", ["unbuilt", "unbuilding"]);
LM("underbid", ["underbade", "underbidden", "underbidding"]);
LM("underbuy", ["underbought", "underbuying"]);
LM("undergo", ["underwent", "undergone", "undergoing"]);
LM("underlay", ["underlaid", "underlaying"]);
LM("underlet", ["underletting"]);
LM("underlie", ["underlay", "underlain", "underlying"]);
LM("underpay", ["underpaid", "underpaying"]);
LM("underrun", ["underran", "underrunning"]);
LM("undersell", ["undersold", "underselling"]);
LM("undershoot", ["undershot", "undershooting"]);
LM("understand", ["understood", "understanding"]);
LM("undertake", ["undertook", "undertaken", "undertaking"]);
LM("underwrite", ["underwrote", "underwritten", "underwriting"]);
LM("undo", ["undid", "undone", "undoing"]);
LM("undraw", ["undrew", "undrawn", "undrawing"]);
LM("unfreeze", ["unfroze", "unfrozen", "unfreezing"]);
LM("unhang", ["unhung", "unhanging"]);
LM("unhold", ["unheld", "unholding"]);
LM("unknit", ["unknitted", "unknitting"]);
LM("unlay", ["unlaid", "unlaying"]);
LM("unlearn", ["unlearnt", "unlearned", "unlearning"]);
LM("unmake", ["unmade", "unmaking"]);
LM("unreeve", ["unrove", "unreeved", "unreeving"]);
LM("unsay", ["unsaid", "unsaying"]);
LM("unsell", ["unsold", "unselling"]);
LM("unsew", ["unsewed", "unsewn", "unsewing"]);
LM("unsling", ["unslung", "unslinging"]);
LM("unspeak", ["unspoke", "unspoken", "unspeaking"]);
LM("unstick", ["unstuck", "unsticking"]);
LM("unstring", ["unstrung", "unstringing"]);
LM("unswear", ["unswore", "unsworn", "unswearing"]);
LM("unteach", ["untaught", "unteaching"]);
LM("unthink", ["unthought", "unthinking"]);
LM("untread", ["untrod", "untrodden", "untreading"]);
LM("unweave", ["unwove", "unwoven", "unweaving"]);
LM("unwind", ["unwound", "unwinding"]);
LM("unwrite", ["unwrote", "unwritten", "unwriting"]);
LM("uphold", ["upheld", "upholding"]);
LM("uppercut", ["uppercutting"]);
LM("upset", ["upsetting"]);
LM("upspring", ["upsprang", "upsprung", "upspringing"]);
LM("upsweep", ["upswept", "upsweeping"]);

// — W —
LM("wake", ["woke", "waked", "woken", "waking"]);
LM("waylay", ["waylaid", "waylaying"]);
LM("wear", ["wore", "worn", "wearing"]);
LM("weave", ["wove", "weaved", "woven", "weaving"]);
LM("wed", ["wedded", "wedding"]);
LM("weep", ["wept", "weeping"]);
LM("wend", ["wended", "wending"]);  // "went" maps to "go" above
LM("wet", ["wetted", "wetting"]);
LM("whipsaw", ["whipsawed", "whipsawn", "whipsawing"]);
LM("win", ["won", "winning"]);
LM("wind", ["wound", "winding"]);
LM("withdraw", ["withdrew", "withdrawn", "withdrawing"]);
LM("withhold", ["withheld", "withholding"]);
LM("withstand", ["withstood", "withstanding"]);
LM("wont", ["wonted", "wonting"]);
LM("work", ["wrought", "worked", "working"]);
LM("wrap", ["wrapt", "wrapped", "wrapping"]);
LM("wreak", ["wreaked", "wrought", "wreaking"]);
LM("wring", ["wrung", "wringing"]);
LM("write", ["wrote", "writ", "written", "writing"]);

// — Z —
LM("zinc", ["zinced", "zincking", "zincing"]);

// ============================================================================
// 4.  IRREGULAR NOUN PLURALS  —  plural → singular
// ============================================================================

// Latin/Greek plurals
LM("alga",      ["algae"]);
LM("alumnus",   ["alumni"]);
LM("amoeba",    ["amoebae", "amoebas"]);
LM("analysis",  ["analyses"]);
LM("antenna",   ["antennae", "antennas"]);
LM("apex",      ["apices", "apexes"]);
LM("appendix",  ["appendices", "appendixes"]);
LM("axis",      ["axes"]);
LM("bacillus",  ["bacilli"]);
LM("bacterium", ["bacteria"]);
LM("basis",     ["bases"]);
LM("beau",      ["beaux", "beaus"]);
LM("cactus",    ["cacti", "cactuses"]);
LM("calf",      ["calves"]);
LM("census",    ["censuses"]);
LM("cherub",    ["cherubim", "cherubs"]);
LM("child",     ["children"]);
LM("corpus",    ["corpora", "corpuses"]);
LM("crisis",    ["crises"]);
LM("criterion", ["criteria"]);
LM("curriculum",["curricula", "curriculums"]);
LM("datum",     ["data"]);
LM("deer",      ["deers"]);
LM("diagnosis", ["diagnoses"]);
LM("die",       ["dice"]);
LM("dwarf",     ["dwarves", "dwarfs"]);
LM("echo",      ["echoes"]);
LM("elf",       ["elves"]);
LM("ellipsis",  ["ellipses"]);
LM("embargo",   ["embargoes"]);
LM("emphasis",  ["emphases"]);
LM("erratum",   ["errata"]);
LM("fish",      ["fishes"]);
LM("focus",     ["foci", "focuses"]);
LM("foot",      ["feet"]);
LM("formula",   ["formulae", "formulas"]);
LM("fungus",    ["fungi", "funguses"]);
LM("genus",     ["genera", "genuses"]);
LM("goose",     ["geese"]);
LM("half",      ["halves"]);
LM("hero",      ["heroes"]);
LM("hoof",      ["hooves", "hoofs"]);
LM("hypothesis",["hypotheses"]);
LM("index",     ["indices", "indexes"]);
LM("knife",     ["knives"]);
LM("larva",     ["larvae"]);
LM("leaf",      ["leaves"]);
LM("life",      ["lives"]);
LM("loaf",      ["loaves"]);
LM("louse",     ["lice"]);
LM("man",       ["men"]);
LM("matrix",    ["matrices", "matrixes"]);
LM("means",     ["meanses"]);       // "means" as plural stays "means" — handled below
LM("medium",    ["media", "mediums"]);
LM("memorandum",["memoranda", "memorandums"]);
LM("millennium",["millennia", "millenniums"]);
LM("moose",     ["mooses"]);
LM("mouse",     ["mice"]);
LM("nebula",    ["nebulae", "nebulas"]);
LM("neurosis",  ["neuroses"]);
LM("nucleus",   ["nuclei", "nucleuses"]);
LM("oasis",     ["oases"]);
LM("octopus",   ["octopi", "octopuses"]);
LM("opus",      ["opera", "opuses"]);
LM("ovum",      ["ova"]);
LM("ox",        ["oxen"]);
LM("parenthesis",["parentheses"]);
LM("person",    ["people", "persons"]);
LM("phenomenon",["phenomena"]);
LM("photo",     ["photoes"]);
LM("piano",     ["pianoes"]);
LM("potato",    ["potatoes"]);
LM("radius",    ["radii", "radiuses"]);
LM("scarf",     ["scarves", "scarfs"]);
LM("self",      ["selves"]);
LM("series",    ["serieses"]);
LM("sheaf",     ["sheaves"]);
LM("sheep",     ["sheeps"]);
LM("shelf",     ["shelves"]);
LM("species",   ["specieses"]);
LM("stimulus",  ["stimuli"]);
LM("stratum",   ["strata", "stratums"]);
LM("syllabus",  ["syllabi", "syllabuses"]);
LM("symposium", ["symposia", "symposiums"]);
LM("synopsis",  ["synopses"]);
LM("synthesis", ["syntheses"]);
LM("tableau",   ["tableaux", "tableaus"]);
LM("thesis",    ["theses"]);
LM("thief",     ["thieves"]);
LM("tomato",    ["tomatoes"]);
LM("tooth",     ["teeth"]);
LM("torpedo",   ["torpedoes"]);
LM("vertebra",  ["vertebrae", "vertebras"]);
LM("veto",      ["vetoes"]);
LM("vita",      ["vitae"]);
LM("volcano",   ["volcanoes", "volcanos"]);
LM("wharf",     ["wharves", "wharfs"]);
LM("wife",      ["wives"]);
LM("wolf",      ["wolves"]);
LM("woman",     ["women"]);

// Nouns identical in singular/plural — these shouldn't be "reduced" to anything
// else, so we DON'T add them to the map.  The suffix stripper will handle
// or skip them.  (sheep, deer, fish, species, series, aircraft, moose, etc.)

// ============================================================================
// 5.  IRREGULAR COMPARATIVE / SUPERLATIVE  —  adjective / adverb → base
// ============================================================================
LM("good",  ["better", "best"]);
LM("bad",   ["worse", "worst"]);
LM("little",["less", "littler", "littlest", "least"]);
LM("much",  ["more", "most"]);
LM("far",   ["farther", "further", "farthest", "furthest"]);
LM("late",  ["later", "latter", "latest", "last"]);
LM("old",   ["older", "elder", "oldest", "eldest"]);
LM("nigh",  ["nigher", "nighest", "nearer", "nearest"]);
LM("near",  ["nearer", "nearest"]);

// (well→better handled above under "good" — intentional override for
//  frequency-based analysis where "better" should count as "good")

// ============================================================================
// 6.  ARCHAIC / POETIC / LITERARY FORMS
// ============================================================================
// Pronouns
LM("you",    ["thou", "thee", "thy", "thine", "ye", "ya", "y'all", "youse"]);
LM("he",     ["hes"]);
LM("she",    ["shes"]);
LM("it",     ["itself"]);  // -self handled generally below
LM("myself", ["ourself", "theeself", "thyself"]);
LM("yourself",["yourselves"]);

// Common archaic verb forms not covered above
LM("hark",   ["harken", "hearken", "hearkened", "hearkening"]);
LM("quoth",  ["quo", "quod"]);  // quoth is its own lemma
LM("wend",   ["wended", "wending"]);  // went already maps to go
LM("wit",    ["wot", "wist", "witting"]);
LM("wot",    ["wottest", "wotteth"]);
LM("trow",   ["trowed", "trowing"]);
LM("ween",   ["weened", "weening"]);
LM("wont",   ["wonted", "wonting"]);   // "accustomed"
LM("fain",   ["fainer", "fainest"]);
LM("liefer", ["liefer", "liefest"]);   // "gladly" → lemma "lief"
LM("lief",   ["liefer", "liefest"]);

// Poetic contractions
LM("over",   ["o'er"]);
LM("ever",   ["e'er"]);
LM("never",  ["ne'er"]);
LM("even",   ["e'en"]);
LM("heaven", ["heav'n"]);
LM("given",  ["giv'n"]);
LM("taken",  ["ta'en"]);
LM("open",   ["ope"]);
LM("often",  ["oft", "ofttimes"]);
LM("it",     ["'t"]);         // 'twas → it was (handled as compound)
LM("it was", ["'twas"]);
LM("it is",  ["'tis"]);
LM("it will",["'twill"]);
LM("it would",["'twould"]);
LM("upon",   ["'pon"]);
LM("between",["'twixt", "betwixt"]);
LM("among",  ["amongst"]);
LM("while",  ["whilst"]);
LM("amid",   ["amidst"]);
LM("again",  ["against"]);  // often interchangeable in archaic use

// Archaic possessives / enclitics
LM("the",    ["th'"]);

// ============================================================================
// 7.  COMMON CONTRACTIONS  →  single-word lemma for frequency lookup
//     Negative contractions already covered by earlier verb mappings.
//     These pronoun+verb contractions map to the pronoun.
// ============================================================================
LM("let",    ["let's"]);
LM("i",      ["I'll", "I'd", "I've"]);
LM("you",    ["you'll", "you'd", "you've"]);
LM("he",     ["he'll", "he'd"]);
LM("she",    ["she'll", "she'd"]);
LM("it",     ["it'll"]);
LM("we",     ["we'll", "we'd", "we've"]);
LM("they",   ["they'll", "they'd", "they've"]);
LM("what",   ["what's", "what'll"]);
LM("who",    ["who's", "who'll"]);
LM("where",  ["where's"]);
LM("when",   ["when's"]);
LM("why",    ["why's"]);
LM("how",    ["how's"]);
LM("there",  ["there's"]);
LM("here",   ["here's"]);
LM("that",   ["that's"]);

// ============================================================================
// 8.  FREQUENCY OVERRIDES  —  ensure high-usage lemmas are correct
//     (Fix ambiguous mappings: "lay" could be V2 of "lie" or base of "lay")
// ============================================================================
// "lay" as base verb wins over "lay" as past of "lie" (frequency heuristic)
// "lied" (told untruth) vs "lay" (reclined) — both map correctly now

// The forms "lied" (past of lie="tell untruth") should map to "lie"
// But "lay" (past of lie="recline") already mapped to "lie" above
// This is the fundamental ambiguity. We resolve by frequency:
// "lay" as base verb is more common → override
LM("lay", ["laying"]);  // keep lay as its own lemma for the base-verb sense

// ============================================================================
// 9.  POSITIVE / NEGATIVE PAIRS  —  collapse negated forms to base
// ============================================================================
LM("able",    ["unable"]);
LM("happy",   ["unhappy"]);
LM("certain", ["uncertain"]);
LM("clear",   ["unclear"]);
LM("common",  ["uncommon"]);
LM("fair",    ["unfair"]);
LM("fit",     ["unfit"]);
LM("kind",    ["unkind"]);
LM("known",   ["unknown"]);
LM("lucky",   ["unlucky"]);
LM("natural", ["unnatural"]);
LM("pleasant",["unpleasant"]);
LM("real",    ["unreal"]);
LM("safe",    ["unsafe"]);
LM("seen",    ["unseen"]);
LM("sure",    ["unsure"]);
LM("true",    ["untrue"]);
LM("usual",   ["unusual"]);
LM("well",    ["unwell"]);
LM("wise",    ["unwise"]);
LM("worthy",  ["unworthy"]);
LM("necessary",["unnecessary"]);
LM("important",["unimportant"]);
LM("possible", ["impossible"]);
LM("polite",   ["impolite"]);
LM("proper",   ["improper"]);
LM("pure",     ["impure"]);
LM("regular",  ["irregular"]);
LM("relevant", ["irrelevant"]);
LM("responsible",["irresponsible"]);
LM("legal",    ["illegal"]);
LM("legible",  ["illegible"]);
LM("logical",  ["illogical"]);
LM("moral",    ["immoral"]);
LM("mortal",   ["immortal"]);
LM("patient",  ["impatient"]);
LM("perfect",  ["imperfect"]);
LM("complete", ["incomplete"]);
LM("correct",  ["incorrect"]);
LM("visible",  ["invisible"]);
LM("accurate", ["inaccurate"]);
LM("capable",  ["incapable"]);

// ============================================================================
// 10.  RULE-BASED REGULAR SUFFIX STRIPPING
//      Applied only if the word is NOT in IRREGULAR_LEMMA.
// ============================================================================

// Set of words that are already base forms despite matching suffix patterns
// (to prevent over-stripping: e.g. "king" should NOT become "k")
var NO_STRIP = {
  // Short base words ending in -ing / -ed / -s etc.
  "king":1, "ring":1, "sing":1, "wing":1, "thing":1, "bring":1,
  "sting":1, "cling":1, "fling":1, "sling":1, "string":1,
  "spring":1, "swing":1, "during":1, "nothing":1, "something":1,
  "everything":1, "anything":1, "evening":1, "morning":1,
  "ceiling":1, "darling":1, "sibling":1, "filling":1, "killing":1,
  "willing":1, "dwelling":1, "sterling":1, "inkling":1,
  // Short base words ending in -s/-es
  "bus":1, "plus":1, "minus":1, "us":1, "thus":1, "gas":1,
  "yes":1, "this":1, "his":1, "is":1, "was":1, "has":1,
  "lens":1, "atlas":1, "canvas":1, "chaos":1, "surplus":1,
  "virus":1, "campus":1, "focus":1, "genus":1, "versus":1,
  "series":1, "species":1, "means":1, "news":1, "corps":1,
  // Short base words ending in -ed
  "bed":1, "red":1, "shed":1, "bled":1, "bred":1, "fled":1,
  "pled":1, "sped":1, "wed":1, "shred":1, "fred":1,
  "need":1, "seed":1, "weed":1, "feed":1, "deed":1, "reed":1,
  "greed":1, "indeed":1, "proceed":1, "succeed":1, "exceed":1,
  // Short base words ending in -er/-est
  "her":1, "ever":1, "never":1, "over":1, "under":1, "water":1,
  "after":1, "other":1, "rather":1, "either":1, "neither":1,
  "whether":1, "together":1, "father":1, "mother":1, "brother":1,
  "sister":1, "daughter":1, "letter":1, "matter":1, "better":1,
  "winter":1, "summer":1, "master":1, "paper":1, "number":1,
  "river":1, "flower":1, "power":1, "corner":1, "order":1,
  // Words ending in -ly that are base forms
  "only":1, "early":1, "family":1, "friendly":1, "lovely":1,
  "likely":1, "lonely":1, "daily":1, "weekly":1, "monthly":1,
  "yearly":1, "heavenly":1, "orderly":1, "manly":1, "womanly":1,
  "kindly":1, "scholarly":1, "costly":1, "deadly":1, "lively":1,
  "elderly":1, "ghastly":1, "leisurely":1, "timely":1, "reply":1,
  "apply":1, "supply":1, "imply":1, "comply":1, "multiply":1,
  "monopoly":1, "monarch":1, "butterfly":1, "dragonfly":1,
  "firefly":1, "barely":1, "butterfly":1, "holly":1, "jelly":1,
  "belly":1, "folly":1, "golly":1, "rally":1, "silly":1,
  "ally":1, "melancholy":1, "anomaly":1,
  // Plural-looking base nouns
  "chess":1, "class":1, "glass":1, "grass":1, "pass":1, "mass":1,
  "kiss":1, "miss":1, "dress":1, "press":1, "stress":1, "less":1,
  "loss":1, "boss":1, "cross":1, "guess":1, "access":1, "success":1,
  "process":1, "address":1, "business":1, "witness":1, "illness":1,
  "darkness":1, "kindness":1, "happiness":1, "sadness":1,
  "goodness":1, "greatness":1, "consciousness":1, "awareness":1,
  // Words ending in -d/-ed that are base forms (NOT past tense)
  "abroad":1, "ahead":1, "bead":1, "bread":1, "dread":1, "thread":1,
  "spread":1, "tread":1, "lead":1, "dead":1, "head":1, "instead":1,
  "mead":1, "knead":1, "stead":1, "wad":1, "pad":1, "glad":1,
  "mad":1, "sad":1, "lad":1, "fad":1, "grad":1, "trad":1,
  "bid":1, "kid":1, "lid":1, "rid":1, "mid":1, "grid":1,
  "bud":1, "mud":1, "stud":1, "thud":1, "spud":1,
  "rod":1, "pod":1, "nod":1, "cod":1, "god":1, "sod":1,
  // Base words where stripping -ed produces a false silent-e stem
  "email":1, "visit":1, "profit":1, "limit":1, "edit":1, "credit":1,
  "exit":1, "orbit":1, "audit":1, "merit":1, "deposit":1, "habit":1,
  "inhabit":1, "inherit":1, "vomit":1, "solicit":1, "elicit":1,
  "spirit":1, "transit":1, "benefit":1,
  // -s words that are base forms (not plurals)
  "robotics":1, "physics":1, "mathematics":1, "economics":1,
  "linguistics":1, "ethics":1, "athletics":1, "genetics":1,
  "classics":1, "gymnastics":1, "logistics":1, "statistics":1,
  "politics":1, "tactics":1, "diagnostics":1, "prognostics":1,
  // Internet/tech
  "https":1, "http":1,
};

function isNoStrip(w) {
  return NO_STRIP.hasOwnProperty(w);
}

// — Core lemmatization function —
function lemmatize(word) {
  if (!word) return word;
  var w = word.toLowerCase().replace(/[‘’“”]/g, "'");

  // 0. Skip very short words (already base) but check irregular map first
  if (w.length <= 2) {
    if (IRREGULAR_LEMMA.hasOwnProperty(w)) return IRREGULAR_LEMMA[w];
    return w;
  }

  // 1. Irregular map lookup (fast path)
  if (IRREGULAR_LEMMA.hasOwnProperty(w)) return IRREGULAR_LEMMA[w];

  // 2. Skip words on the no-strip list
  if (isNoStrip(w)) return w;

  // 3. Possessive suffix: -'s, -s'
  if (w.length > 3) {
    if (w.slice(-2) === "'s") { var s = w.slice(0, -2); if (s.length >= 2) return s; }
    if (w.slice(-2) === "s'") { var s = w.slice(0, -1); if (s.length >= 2) return s; }
  }

  // 4. Suffix-based stripping (ordered: most-specific first)

  // 4a. -ies → -y  (cities → city, carries → carry)
  if (w.length > 4 && w.slice(-3) === "ies" && w.slice(-4, -3) !== "e") {
    // Exceptions: words where -ies is not a suffix
    if (w === "series" || w === "species") return w;
    var stem = w.slice(0, -3) + "y";
    return stem;
  }

  // 4b. -ied → -y  (studied → study)
  if (w.length > 4 && w.slice(-3) === "ied") {
    return w.slice(0, -3) + "y";
  }

  // 4c. -ves → -f  (wolves → wolf, lives → life) — but careful with "lives"
  if (w.length > 4 && w.slice(-4) === "ves") {
    var stemF = w.slice(0, -4) + "f";
    // Many -ves words have irregular mappings above; this catches the rest
    // Only apply if the resulting word is a plausible English word
    if (stemF.length >= 3) return stemF;
  }

  // 4d. -ier → -y  (happier → happy)
  if (w.length > 4 && w.slice(-3) === "ier") {
    return w.slice(0, -3) + "y";
  }

  // 4e. -iest → -y  (happiest → happy)
  if (w.length > 5 && w.slice(-4) === "iest") {
    return w.slice(0, -4) + "y";
  }

  // 4f. Double-consonant + -ing → base  (running → run, sitting → sit)
  if (w.length > 5 && w.slice(-4) === "ning" && w.slice(-5, -4) === "n") {
    return w.slice(0, -4);  // planning → plann → hmm, not right
  }
  // Broad -ing: doubled consonant only for short CVC stems (run→running)
  // Long words like "thrill" → "thrilling" keep the double letter.
  if (w.length > 5 && w.slice(-3) === "ing") {
    var stem = w.slice(0, -3);
    var sl = stem.length;
    if (sl >= 3 && sl <= 5 && stem[sl-1] === stem[sl-2] && !"aeiou".includes(stem[sl-1])) {
      var unDoubled = stem.slice(0, -1);
      if (unDoubled.length >= 2 && unDoubled.length <= 4) return unDoubled;
    }
  }

  // 4g. -ing → base  (walking → walk, loving → love)
  if (w.length > 4 && w.slice(-3) === "ing") {
    var stem = w.slice(0, -3);
    if (stem.length >= 3) {
      // Don't attempt silent-e recovery on known base words
      if (isNoStrip(stem)) return stem;
      // Recover dropped silent-e (loving → lov + e → love)
      var lastChar = stem[stem.length - 1];
      var secondLast = stem[stem.length - 2];
      if ("aeiou".includes(secondLast) && !"aeiou".includes(lastChar) &&
          stem[stem.length - 3] !== lastChar && lastChar !== "y" && lastChar !== "w") {
        var withE = stem + "e";
        if (stem.slice(-2) !== "ee" && stem.slice(-2) !== "ie" &&
            stem.slice(-2) !== "oe" && stem.slice(-2) !== "ue" &&
            stem.slice(-2) !== "ye" && stem.slice(-2) !== "we") {
          return withE;
        }
      }
      return stem;
    }
    if (stem.length >= 2 && stem === "go") return stem;  // going → go
    return w; // too short, keep
  }

  // 4h. Double-consonant + -ed → base  (stopped → stop)
  // Only for short CVC stems; long words keep double letters.
  if (w.length > 5 && (w.slice(-3) === "ted" || w.slice(-3) === "ded" || w.slice(-3) === "led" ||
      w.slice(-3) === "ned" || w.slice(-3) === "ped" || w.slice(-3) === "ged" || w.slice(-3) === "med")) {
    var stem2 = w.slice(0, -2);
    var sl2 = stem2.length;
    if (sl2 >= 3 && sl2 <= 5 && stem2[sl2-1] === stem2[sl2-2]) {
      var unDoub = stem2.slice(0, -1);
      if (unDoub.length >= 2 && unDoub.length <= 4) return unDoub;
    }
  }

  // 4i. -ed → base  (walked → walk, loved → love)
  if (w.length > 4 && (w.slice(-2) === "ed" || w.slice(-1) === "d")) {
    if (w.slice(-2) === "ed") {
      var stem = w.slice(0, -2);
      if (stem.length >= 3) {
        // Don't attempt silent-e recovery on known base words
        if (isNoStrip(stem)) return stem;
        // Words like "loved": the silent-e was dropped before -ed.
        // Pattern: stem ends with single vowel + single consonant → add 'e' back.
        var lastChar = stem[stem.length - 1];
        var secondLast = stem[stem.length - 2];
        if ("aeiou".includes(secondLast) && !"aeiou".includes(lastChar) &&
            stem[stem.length - 3] !== lastChar && lastChar !== "y" && lastChar !== "w") {
          var withE = stem + "e";
          if (stem.slice(-2) !== "ee" && stem.slice(-2) !== "ie" &&
              stem.slice(-2) !== "oe" && stem.slice(-2) !== "ue" &&
              stem.slice(-2) !== "ye" && stem.slice(-2) !== "we") {
            return withE;
          }
        }
        return stem;
      }
    }
    // -d only: (loved → love) — but careful with "red", "bed" etc.
    if (w.slice(-1) === "d" && w.slice(-2, -1) !== "e" && w.slice(-2, -1) !== "i") {
      var stem = w.slice(0, -1);
      if (stem.length >= 3 && !isNoStrip(w)) return stem;
    }
  }

  // 4j. -es after s/sh/ch/x/z  (watches → watch, kisses → kiss)
  if (w.length > 4 && w.slice(-2) === "es" && /[sxzhc]/.test(w.slice(-3, -2))) {
    return w.slice(0, -2);
  }

  // 4k. -s (plural / 3rd-person) — NOT -ss, -us, -is, -ous
  if (w.length > 3 && w.slice(-1) === "s" &&
      w.slice(-2) !== "ss" && w.slice(-2) !== "us" && w.slice(-2) !== "is" &&
      w.slice(-3) !== "ous") {
    return w.slice(0, -1);
  }

  // 4l. -er / -est (comparative / superlative) — careful with common words
  if (w.length > 4 && w.slice(-2) === "er") {
    var stem = w.slice(0, -2);
    // Only strip if stem is plausibly an adjective (ends with vowel+consonant)
    if (stem.length >= 3 && !isNoStrip(w)) return stem;
  }

  // 4m. -ly (adverb) — careful with words like "only", "family", etc.
  if (w.length > 4 && w.slice(-2) === "ly" && w !== "only" && w !== "early") {
    var stem = w.slice(0, -2);
    if (stem.length >= 3 && !isNoStrip(w)) return stem;
  }

  // 5. No rule matched — return original lowercased word
  return w;
}

// ── Convenience: lemmatize every word in a string ──────────────────────
function lemmatizeText(text) {
  var words = text.toLowerCase().match(/[a-z'’]+/g) || [];
  return words.map(lemmatize);
}

// ── Export ─────────────────────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { lemmatize, lemmatizeText, IRREGULAR_LEMMA };
}
