// Writing Style Analyzer - Main JavaScript

// Embedded word frequency data (top 10000 common English words, sorted by frequency)
// First word has index 0
const WORD_FREQ_MAP = [
  "the", "be", "to", "and", "a", "of", "in", "i", "that", "you", "it", "have", "for", "do", "on", "he", "with",
  "this", "as", "n't", "we", "not", "but", "they", "say", "at", "what", "his", "from", "go", "by", "or", "get",
  "she", "can", "my", "all", "there", "so", "her", "about", "one", "know", "if", "me", "your", "who", "like", "out",
  "will", "their", "would", "just", "when", "up", "make", "more", "no", "think", "time", "see", "come", "people",
  "take", "year", "him", "other", "them", "some", "want", "how", "now", "which", "right", "could", "look", "than",
  "our", "into", "here", "well", "because", "then", "use", "work", "back", "way", "only", "these", "over", "thing",
  "good", "also", "two", "first", "even", "need", "tell", "where", "man", "after", "day", "find", "give", "very",
  "new", "any", "most", "us", "much", "those", "down", "should", "call", "many", "really", "mean", "life", "may",
  "through", "why", "before", "try", "still", "let", "something", "too", "state", "show", "last", "woman", "little",
  "long", "never", "feel", "off", "talk", "world", "help", "such", "yeah", "great", "child", "oh", "ask", "own",
  "while", "school", "start", "around", "leave", "place", "point", "keep", "love", "home", "put", "change", "big",
  "another", "same", "high", "both", "play", "american", "three", "every", "house", "become", "part", "between",
  "happen", "turn", "each", "family", "run", "end", "president", "old", "yes", "lot", "again", "student", "seem",
  "might", "hand", "hear", "its", "problem", "question", "believe", "country", "live", "move", "since", "always",
  "better", "next", "far", "week", "away", "case", "few", "name", "group", "against", "guy", "kind", "study", "sure",
  "night", "best", "game", "number", "head", "bad", "write", "bring", "hold", "without", "money", "book", "system",
  "government", "city", "company", "story", "today", "job", "must", "okay", "friend", "during", "face", "begin",
  "under", "different", "issue", "open", "stop", "ever", "word", "though", "report", "set", "fact", "enough", "pay",
  "early", "program", "second", "care", "course", "read", "anything", "nothing", "small", "until", "month", "kid",
  "once", "public", "maybe", "business", "close", "plan", "million", "hard", "idea", "room", "percent", "law", "watch",
  "actually", "large", "provide", "lose", "power", "support", "war", "understand", "mother", "real", "team", "line",
  "eye", "lead", "side", "stand", "water", "young", "wait", "yet", "less", "meet", "service", "area", "important",
  "person", "hey", "result", "thank", "someone", "however", "black", "hour", "everything", "win", "national", "four",
  "girl", "father", "hope", "force", "sit", "experience", "create", "information", "car", "learn", "least", "already",
  "fall", "kill", "minute", "cause", "party", "include", "human", "together", "follow", "health", "control", "remember",
  "often", "reason", "speak", "ago", "past", "break", "level", "member", "walk", "community", "late", "social",
  "stay", "news", "allow", "body", "base", "mind", "continue", "whether", "deal", "spend", "top", "able", "political",
  "almost", "boy", "university", "light", "offer", "research", "white", "add", "later", "whole", "five", "probably",
  "free", "center", "among", "form", "cut", "die", "process", "post", "matter", "food", "else", "history", "buy",
  "morning", "parent", "office", "figure", "sound", "act", "send", "along", "drive", "please", "note", "door", "several",
  "court", "return", "grow", "across", "answer", "moment", "sense", "including", "cost", "age", "consider", "pass",
  "within", "step", "view", "behind", "street", "everyone", "test", "policy", "table", "record", "sorry", "low",
  "general", "rather", "market", "share", "true", "teacher", "data", "vote", "death", "hit", "easy", "education",
  "build", "wrong", "expect", "tax", "himself", "either", "pretty", "future", "college", "music", "fight", "republican",
  "appear", "rate", "sign", "bit", "class", "police", "effect", "season", "fire", "clear", "heart", "son", "art",
  "local", "individual", "present", "miss", "possible", "serve", "cover", "although", "value", "reach", "air", "require",
  "foot", "pick", "design", "increase", "half", "listen", "agree", "according", "anyone", "baby", "order", "focus",
  "check", "decide", "model", "full", "comment", "interest", "sometimes", "security", "eat", "suggest", "nation",
  "major", "front", "sell", "action", "official", "wife", "instead", "decision", "receive", "phone", "attack", "thanks",
  "project", "soon", "event", "rule", "practice", "strong", "remain", "outside", "explain", "site", "claim", "rest",
  "pull", "church", "perhaps", "relationship", "six", "fine", "movie", "field", "raise", "position", "list", "likely",
  "player", "couple", "themselves", "especially", "difference", "development", "federal", "former", "role", "myself",
  "picture", "star", "price", "effort", "nice", "quite", "military", "voice", "finally", "department", "toward",
  "leader", "inside", "land", "photo", "wear", "space", "special", "lie", "patient", "film", "catch", "guess", "type",
  "arm", "town", "article", "approach", "charge", "road", "chance", "drug", "economic", "press", "situation", "choose",
  "happy", "science", "join", "risk", "campaign", "teach", "develop", "yourself", "carry", "brother", "dead", "above",
  "image", "simply", "middle", "society", "piece", "paper", "energy", "personal", "stuff", "building", "drop", "doctor",
  "wonder", "activity", "exactly", "short", "media", "evidence", "product", "realize", "save", "race", "technology",
  "term", "color", "describe", "choice", "source", "mom", "director", "international", "ground", "election", "uh",
  "measure", "park", "standard", "page", "itself", "response", "produce", "certain", "whatever", "benefit", "visit",
  "video", "store", "alone", "throw", "third", "near", "recent", "key", "available", "ready", "opportunity", "rise",
  "oil", "release", "organization", "character", "single", "current", "address", "county", "dad", "whose", "challenge",
  "shoot", "industry", "attention", "forget", "deep", "plant", "dog", "red", "hair", "condition", "sleep", "subject",
  "wall", "daughter", "review", "account", "author", "truth", "average", "upon", "husband", "period", "series",
  "officer", "feature", "wish", "dark", "computer", "thought", "economy", "goal", "bank", "behavior", "certainly",
  "nearly", "fear", "complete", "dream", "north", "blood", "culture", "interview", "medical", "ok", "everybody",
  "drink", "difficult", "language", "window", "population", "tree", "judge", "worker", "date", "draw", "worry",
  "push", "earth", "per", "private", "hundred", "tonight", "thousand", "letter", "gun", "mention", "simple", "involve",
  "hell", "fast", "poor", "score", "concern", "laugh", "nature", "administration", "common", "message", "sort",
  "song", "enjoy", "similar", "smile", "congress", "fund", "fun", "finish", "hot", "left", "seek", "travel", "amount",
  "analysis", "defense", "bill", "final", "cell", "performance", "hospital", "bed", "board", "trade", "green", "attempt",
  "protect", "century", "summer", "material", "recently", "example", "represent", "fill", "blue", "total", "animal",
  "fail", "particular", "factor", "range", "search", "natural", "sir", "agency", "usually", "significant", "ability",
  "mile", "statement", "access", "notice", "entire", "democrat", "floor", "serious", "coach", "career", "billion",
  "ahead", "dollar", "hurt", "sex", "compare", "south", "forward", "file", "financial", "identify", "beautiful",
  "touch", "decade", "reduce", "sister", "lack", "quality", "quickly", "fan", "promise", "beat", "accept", "enter",
  "thus", "demand", "movement", "scene", "stick", "chief", "section", "hate", "treatment", "interesting", "west",
  "rock", "candidate", "link", "determine", "resource", "prove", "trust", "cool", "potential", "size", "somebody",
  "knowledge", "hang", "limit", "sport", "tv", "loss", "argue", "meeting", "skill", "cold", "card", "feeling", "despite",
  "degree", "crime", "occur", "imagine", "due", "king", "box", "photograph", "seven", "credit", "foreign", "debate",
  "disease", "lady", "ride", "beyond", "discuss", "track", "ball", "east", "professional", "recognize", "apply",
  "prepare", "network", "huge", "fly", "success", "district", "cup", "clean", "direct", "physical", "growth", "worth",
  "hi", "block", "theory", "staff", "respect", "legal", "september", "count", "target", "et", "strategy", "clearly",
  "property", "lay", "authority", "perfect", "method", "strike", "region", "impact", "indicate", "safe", "committee",
  "supposed", "dress", "train", "influence", "wind", "march", "training", "shit", "central", "option", "gain", "eight",
  "particularly", "completely", "opinion", "main", "ten", "exist", "remove", "online", "content", "living", "union",
  "professor", "pressure", "purpose", "stage", "christian", "herself", "sun", "pain", "artist", "employee", "avoid",
  "environment", "treat", "male", "specific", "fuck", "version", "shot", "female", "reality", "club", "justice",
  "river", "brain", "memory", "below", "contact", "favorite", "camera", "global", "various", "arrive", "detail",
  "argument", "murder", "nobody", "roll", "weapon", "station", "island", "absolutely", "discussion", "associate",
  "affect", "firm", "anyway", "spot", "respond", "ship", "trouble", "conversation", "manage", "except", "army",
  "seat", "assume", "writer", "perform", "marriage", "operation", "indeed", "spring", "necessary", "heat", "secret",
  "reveal", "agent", "bar", "leg", "contain", "democratic", "glass", "improve", "adult", "religious", "welcome",
  "association", "stock", "gas", "lawyer", "production", "handle", "relate", "bear", "management", "original", "victim",
  "cancer", "speech", "trial", "none", "cross", "item", "weight", "tomorrow", "struggle", "dance", "feed", "positive",
  "citizen", "fit", "trip", "establish", "executive", "english", "politics", "customer", "manager", "tie", "publish",
  "popular", "sing", "conference", "senior", "discover", "direction", "sunday", "maintain", "straight", "majority",
  "peace", "dinner", "mine", "partner", "user", "blow", "bag", "conduct", "therefore", "rich", "tough", "owner",
  "shall", "voter", "tool", "june", "slow", "mountain", "friday", "attorney", "unless", "nor", "expert", "document",
  "structure", "budget", "function", "shape", "insurance", "text", "freedom", "crazy", "reader", "cry", "style",
  "machine", "battle", "november", "generation", "income", "born", "admit", "hello", "object", "onto", "sea", "mouth",
  "throughout", "conservative", "web", "shake", "threat", "solution", "shut", "scientist", "hide", "obviously",
  "refer", "damage", "mark", "investigation", "jump", "senator", "unit", "july", "television", "sexual", "radio",
  "prevent", "modern", "senate", "violence", "wave", "audience", "evening", "whom", "ring", "hall", "task", "bottom",
  "wake", "skin", "suffer", "wide", "civil", "safety", "weekend", "supply", "title", "host", "normal", "survey",
  "yard", "finger", "fat", "tend", "shop", "surprise", "mission", "eventually", "participant", "hotel", "pattern",
  "shift", "speed", "institution", "faith", "reflect", "folk", "surface", "exercise", "separate", "client", "edge",
  "traditional", "council", "device", "environmental", "responsibility", "fucking", "chair", "guard", "internet",
  "october", "excuse", "warm", "funny", "immediately", "investment", "effective", "previous", "consumer", "honor",
  "element", "nuclear", "daily", "correct", "spirit", "directly", "afraid", "define", "announce", "journal", "tear",
  "heavy", "ice", "primary", "collection", "soldier", "governor", "fish", "shoulder", "cultural", "successful",
  "fair", "suddenly", "match", "interested", "deliver", "saturday", "editor", "fresh", "anybody", "destroy", "suit",
  "critical", "mass", "agreement", "powerful", "researcher", "concept", "willing", "band", "marry", "easily", "restaurant",
  "league", "capital", "anymore", "april", "etc", "quick", "magazine", "status", "attend", "replace", "european",
  "hill", "doubt", "kitchen", "favor", "achieve", "request", "screen", "generally", "mistake", "estimate", "arrest",
  "basic", "display", "neither", "corner", "driver", "beginning", "spread", "religion", "crisis", "museum", "engage",
  "communication", "express", "huh", "encourage", "french", "blog", "kick", "belief", "debt", "labor", "abuse",
  "understanding", "balance", "neighborhood", "contract", "species", "additional", "sample", "desire", "involved",
  "mostly", "path", "concerned", "indian", "apple", "complex", "plus", "god", "wonderful", "library", "prison",
  "hole", "code", "sales", "award", "gift", "refuse", "garden", "introduce", "blame", "definitely", "lake", "earn",
  "cook", "plane", "vehicle", "examine", "waste", "application", "witness", "coffee", "criminal", "reform", "ignore",
  "gold", "planet", "location", "bird", "amazing", "exchange", "principle", "promote", "nine", "launch", "alive",
  "possibility", "sky", "otherwise", "grant", "mix", "remind", "healthy", "stress", "horse", "advantage", "novel",
  "commercial", "steal", "basis", "context", "highly", "christmas", "strength", "monday", "beach", "purchase", "writing",
  "master", "scale", "resident", "football", "sweet", "failure", "paint", "reporter", "catholic", "commit", "suspect",
  "vision", "truly", "sick", "stupid", "chinese", "connection", "camp", "stone", "truck", "afternoon", "responsible",
  "secretary", "apparently", "smart", "southern", "totally", "tip", "western", "collect", "conflict", "burn", "learning",
  "contribute", "british", "following", "copy", "newspaper", "foundation", "variety", "perspective", "presence",
  "stare", "guide", "taste", "lesson", "appreciate", "observe", "schedule", "print", "currently", "crowd", "apartment",
  "quote", "survive", "guest", "soul", "protection", "intelligence", "yesterday", "dry", "somewhere", "smell", "border",
  "reading", "terms", "leadership", "attitude", "decline", "um", "deny", "website", "seriously", "actual", "recall",
  "fix", "dozen", "regard", "negative", "alternative", "pack", "connect", "distance", "regular", "climate", "relation",
  "flight", "graduate", "dangerous", "boat", "aspect", "grab", "january", "liberal", "independent", "volume", "joke",
  "am", "lots", "theater", "aware", "identity", "extra", "demonstrate", "fully", "appeal", "tuesday", "facility",
  "flow", "rain", "farm", "august", "hire", "russian", "shoe", "institute", "overall", "smoke", "quarter", "basically",
  "forest", "multiple", "poll", "advance", "wild", "twice", "background", "settle", "giant", "winter", "presidential",
  "operate", "muslim", "division", "slowly", "advice", "reaction", "injury", "ticket", "grade", "wow", "birth",
  "lock", "painting", "outcome", "enemy", "kiss", "being", "storm", "bowl", "commission", "captain", "bet", "double",
  "ear", "troop", "wood", "root", "minister", "neighbor", "tiny", "mental", "software", "glad", "load", "finding",
  "lord", "damn", "transfer", "temperature", "quiet", "bright", "annual", "procedure", "tradition", "threaten",
  "round", "strange", "actor", "active", "cat", "depend", "bus", "german", "clothes", "aim", "affair", "category",
  "topic", "victory", "evil", "towards", "map", "egg", "ensure", "expression", "session", "competition", "possibly",
  "technique", "intend", "impossible", "escape", "moral", "academic", "wine", "somehow", "addition", "gather", "scientific",
  "square", "african", "participate", "gay", "appropriate", "youth", "signal", "weather", "recommend", "fellow",
  "medicine", "obvious", "thursday", "explore", "extend", "bay", "invite", "frame", "ah", "belong", "obtain", "broad",
  "conclusion", "progress", "pop", "assessment", "cash", "defend", "trail", "representative", "aid", "pound", "married",
  "pair", "slightly", "cast", "loan", "village", "historical", "meaning", "lift", "ourselves", "apart", "honey",
  "bone", "consequence", "unique", "regulation", "familiar", "classroom", "stretch", "reference", "emerge", "lunch",
  "ad", "instruction", "emergency", "thinking", "tour", "combine", "moon", "sad", "december", "anywhere", "chicken",
  "rush", "fuel", "construction", "wednesday", "deserve", "famous", "intervention", "grand", "confirm", "lucky",
  "insist", "coast", "proud", "fourth", "cop", "angry", "native", "supreme", "baseball", "email", "accident", "duty",
  "growing", "revenue", "expand", "trend", "repeat", "breath", "inch", "neck", "core", "terrible", "relatively",
  "soft", "generate", "extremely", "monitor", "forever", "corporate", "prefer", "cheap", "literature", "mayor",
  "importance", "danger", "emotional", "knee", "ass", "capture", "update", "traffic", "plate", "equipment", "select",
  "command", "studio", "expensive", "engine", "adopt", "luck", "via", "pm", "panel", "hero", "circle", "critic",
  "terrorist", "solve", "busy", "episode", "requirement", "politician", "israeli", "reply", "colleague", "disappear",
  "beer", "predict", "tired", "democracy", "ultimately", "setting", "works", "unfortunately", "theme", "united",
  "pool", "volunteer", "educational", "empty", "comfortable", "swing", "investigate", "useful", "pocket", "digital",
  "plenty", "entirely", "afford", "japanese", "sugar", "teaching", "chairman", "error", "bridge", "tall", "specifically",
  "flower", "mess", "universe", "acknowledge", "crash", "coverage", "crew", "assistant", "locate", "equal", "lip",
  "lean", "zone", "wedding", "used", "protest", "prior", "relative", "meal", "minority", "switch", "sight", "soviet",
  "profit", "careful", "gender", "tape", "ocean", "unidentified", "circumstance", "boss", "declare", "chemical",
  "domestic", "secure", "tea", "organize", "rank", "rape", "surround", "manner", "surprised", "percentage", "massive",
  "cloud", "winner", "honest", "propose", "rely", "vice", "sentence", "label", "appearance", "regarding", "excellent",
  "salt", "beauty", "bottle", "component", "fee", "jewish", "yours", "shirt", "plastic", "tooth", "meat", "illegal",
  "significantly", "february", "constitution", "definition", "uncle", "metal", "album", "self", "suppose", "investor",
  "fruit", "holy", "palestinian", "desk", "eastern", "tight", "valley", "largely", "abortion", "classic", "chapter",
  "commitment", "celebrate", "peer", "prime", "urban", "shock", "unlike", "internal", "bother", "proposal", "capacity",
  "guilty", "warn", "weak", "advocate", "nose", "variable", "convention", "jury", "incident", "climb", "hearing",
  "everywhere", "magic", "payment", "conclude", "scream", "surgery", "shadow", "increasingly", "chest", "slide",
  "amendment", "besides", "complain", "extent", "pleasure", "nod", "holiday", "draft", "super", "talent", "necessarily",
  "net", "expectation", "accuse", "knock", "previously", "arab", "wing", "corporation", "sector", "experiment",
  "finance", "thin", "farmer", "rare", "confidence", "bunch", "bite", "cite", "northern", "speaker", "breast", "contribution",
  "leaf", "creative", "interaction", "hat", "pursue", "nurse", "long-term", "gene", "package", "weird", "difficulty",
  "hardly", "daddy", "era", "encounter", "vs", "invest", "personally", "notion", "explanation", "airport", "chain",
  "expose", "convince", "channel", "carefully", "estate", "initial", "forth", "crack", "bond", "birthday", "pray",
  "improvement", "ancient", "loud", "ought", "pitch", "brown", "dear", "fashion", "length", "sheet", "funding",
  "meanwhile", "fault", "barely", "eliminate", "motion", "essential", "combination", "limited", "description", "snow",
  "implement", "chase", "proper", "marketing", "approve", "bomb", "slip", "regional", "muscle", "orange", "false",
  "creation", "typically", "spending", "instrument", "thick", "increased", "inspire", "noise", "yellow", "e-mail",
  "cycle", "app", "golden", "reject", "inform", "perception", "flat", "visitor", "given", "contrast", "judgment",
  "glance", "regime", "merely", "producer", "whoa", "route", "typical", "analyst", "elect", "objective", "disability",
  "upset", "comparison", "rating", "campus", "assess", "delay", "solid", "branch", "mad", "somewhat", "gentleman",
  "opposition", "reserve", "aside", "athlete", "opening", "prayer", "frequently", "employ", "basketball", "existing",
  "revolution", "click", "emotion", "ban", "platform", "marine", "brand", "enable", "legislation", "lab", "oppose",
  "row", "collapse", "immigration", "asset", "observation", "attract", "ha", "household", "harm", "breathe", "existence",
  "mirror", "pilot", "relief", "milk", "warning", "heaven", "literally", "quit", "calorie", "seed", "vast", "bike",
  "employer", "drag", "technical", "strip", "disaster", "nearby", "sale", "bathroom", "succeed", "consistent", "agenda",
  "enforcement", "diet", "silence", "journalist", "bible", "queen", "divide", "expense", "defeat", "cream", "exposure",
  "priority", "soil", "angel", "principal", "journey", "relevant", "tank", "cheese", "sink", "bedroom", "tone",
  "selection", "perfectly", "wheel", "gap", "veteran", "disagree", "characteristic", "protein", "fool", "resolution",
  "till", "fewer", "mount", "engineer", "dish", "depression", "dude", "running", "upper", "wrap", "ceo", "visual",
  "initiative", "gate", "whenever", "entry", "gray", "assistance", "height", "compete", "essentially", "phase",
  "recover", "criticism", "faculty", "pause", "achievement", "alcohol", "therapy", "ideal", "offense", "killer",
  "personality", "landscape", "deeply", "reasonable", "trap", "suck", "transition", "fairly", "column", "wash",
  "button", "opponent", "pour", "immigrant", "distribution", "golf", "pregnant", "unable", "violent", "portion",
  "divorce", "acquire", "suicide", "deficit", "symptom", "solar", "complaint", "capable", "analyze", "plain", "counter",
  "scared", "supporter", "dig", "twenty", "pretend", "philosophy", "childhood", "lower", "wealth", "welfare", "poverty",
  "prosecutor", "yield", "spiritual", "evaluate", "reward", "buck", "knife", "tech", "detective", "disorder", "creature",
  "rescue", "rent", "closely", "industrial", "housing", "chip", "regardless", "numerous", "trace", "medium", "civilian",
  "shooting", "layer", "bread", "exception", "passion", "highway", "pure", "commander", "alien", "extreme", "publication",
  "mystery", "championship", "install", "tale", "liberty", "beneath", "passenger", "physician", "sharp", "substance",
  "atmosphere", "stir", "sudden", "passage", "pepper", "emphasize", "cable", "recipe", "hook", "beside", "roof",
  "vegetable", "accomplish", "attribute", "silent", "habit", "discovery", "minimum", "recovery", "dna", "territory",
  "girlfriend", "consist", "surely", "proof", "nervous", "immediate", "parking", "sin", "unusual", "rice", "engineering",
  "bury", "cake", "anonymous", "flag", "brush", "pro", "contemporary", "jail", "sacrifice", "rural", "interpretation",
  "wage", "breakfast", "severe", "profile", "saving", "brief", "adjust", "reduction", "constantly", "assist", "bitch",
  "constant", "permit", "primarily", "entertainment", "exhibit", "shout", "academy", "teaspoon", "usual", "ally",
  "clinical", "flash", "swear", "avenue", "priest", "employment", "relax", "owe", "transform", "grass", "narrow",
  "downtown", "ethnic", "scholar", "edition", "abandon", "practical", "infection", "musical", "suggestion", "resistance",
  "prince", "illness", "embrace", "republic", "evaluation", "tune", "opposite", "awesome", "iraqi", "iron", "perceive",
  "fundamental", "phrase", "assumption", "sand", "designer", "planning", "leading", "mode", "widely", "occasion",
  "pose", "approximately", "retire", "elsewhere", "festival", "cap", "attach", "mechanism", "intention", "scenario",
  "yell", "incredible", "spanish", "strongly", "racial", "transportation", "stem", "pot", "boyfriend", "consideration",
  "retirement", "rarely", "joint", "trigger", "preserve", "enormous", "cigarette", "factory", "valuable", "clip",
  "electric", "slave", "submit", "effectively", "resolve", "remaining", "participation", "stream", "rid", "origin",
  "teen", "slice", "pump", "congressional", "bind", "coat", "tower", "license", "twitter", "flood", "impose", "innocent",
  "curriculum", "mail", "insight", "investigator", "virus", "hurricane", "accurate", "provision", "communicate",
  "vary", "jacket", "increasing", "equally", "implication", "fiction", "mama", "imply", "twin", "pant", "bend",
  "criteria", "ease", "dirty", "toy", "potentially", "seal", "assault", "peak", "anger", "boot", "dramatic", "repair",
  "enhance", "math", "compromise", "pink", "dust", "aunt", "lost", "prospect", "mood", "mm-hmm", "settlement", "justify",
  "depth", "juice", "formal", "virtually", "gallery", "tension", "throat", "reputation", "index", "normally", "joy",
  "steel", "motor", "enterprise", "salary", "moreover", "cousin", "ordinary", "evolution", "so-called", "helpful",
  "competitive", "lovely", "fishing", "anxiety", "carbon", "essay", "islamic", "drama", "odd", "stranger", "belt",
  "urge", "toss", "fifth", "formula", "potato", "monster", "telephone", "palm", "jet", "navy", "excited", "plot",
  "angle", "criticize", "prisoner", "discipline", "negotiation", "butter", "desert", "complicated", "prize", "blind",
  "assign", "bullet", "awareness", "sequence", "illustrate", "provider", "minor", "activist", "poem", "vacation",
  "weigh", "gang", "privacy", "clock", "arrange", "penalty", "stomach", "concert", "originally", "statistics", "electronic",
  "properly", "bureau", "wolf", "and/or", "recommendation", "exciting", "maker", "impression", "broken", "battery",
  "narrative", "arise", "sake", "delivery", "forgive", "visible", "heavily", "junior", "rep", "diversity", "string",
  "lawsuit", "latter", "cute", "deputy", "restore", "buddy", "psychological", "intense", "friendly", "lane", "hungry",
  "bean", "sauce", "dominate", "testing", "twist", "trick", "fantasy", "absence", "offensive", "symbol", "recognition",
  "detect", "tablespoon", "construct", "hmm", "approval", "aids", "whereas", "defensive", "independence", "apologize",
  "asian", "rose", "ghost", "involvement", "permanent", "punch", "wire", "whisper", "mouse", "airline", "founder",
  "nowhere", "spell", "sponsor", "phenomenon", "evolve", "exact", "silver", "cent", "universal", "teenager", "crucial",
  "viewer", "ridiculous", "chocolate", "sensitive", "grandmother", "missile", "roughly", "constitutional", "adventure",
  "genetic", "related", "ultimate", "manufacturer", "unknown", "wipe", "crop", "survival", "dimension", "resist",
  "darkness", "guarantee", "historic", "educator", "rough", "personnel", "confront", "royal", "elite", "occupy",
  "emphasis", "wet", "destruction", "raw", "inner", "proceed", "violate", "chart", "pace", "champion", "snap", "advise",
  "initially", "advanced", "unlikely", "barrier", "horrible", "burden", "violation", "idiot", "lifetime", "working",
  "ongoing", "react", "routine", "presentation", "gear", "mexican", "stadium", "translate", "mortgage", "sheriff",
  "clinic", "spin", "coalition", "naturally", "hopefully", "menu", "smooth", "advertising", "interpret", "dismiss",
  "apparent", "arrangement", "incorporate", "split", "brilliant", "storage", "framework", "honestly", "sigh", "assure",
  "utility", "aggressive", "cookie", "terror", "wealthy", "forum", "alliance", "possess", "empire", "curious", "interior",
  "corn", "calculate", "hurry", "testimony", "elementary", "stake", "precisely", "substantial", "depending", "tissue",
  "concentration", "developer", "found", "ballot", "consume", "overcome", "biological", "chamber", "similarly",
  "dare", "developing", "tiger", "ratio", "transport", "lover", "expansion", "cure", "occasionally", "unemployment",
  "pet", "awful", "laboratory", "administrator", "quarterback", "rocket", "preparation", "confident", "strategic",
  "publisher", "innovation", "highlight", "nut", "fighter", "electricity", "instance", "fortune", "freeze", "variation",
  "armed", "negotiate", "laughter", "wisdom", "correspondent", "mixture", "retain", "tomato", "testify", "ingredient",
  "galaxy", "qualify", "scheme", "gop", "shame", "concentrate", "contest", "introduction", "comic", "boundary",
  "tube", "versus", "chef", "regularly", "ugly", "screw", "tongue", "fiscal", "creek", "hip", "accompany", "terrorism",
  "respondent", "narrator", "voting", "refugee", "assembly", "fraud", "limitation", "partnership", "representation",
  "ministry", "wise", "register", "comedy", "tap", "infrastructure", "organic", "islam", "diverse", "intellectual",
  "port", "fate", "absolute", "dialogue", "frequency", "tribe", "external", "appointment", "convert", "surprising",
  "mobile", "establishment", "worried", "bye", "shopping", "celebrity", "congressman", "impress", "taxpayer", "adapt",
  "publicly", "pride", "clothing", "rapidly", "domain", "mainly", "ceiling", "alter", "shelter", "random", "obligation",
  "shower", "beg", "asleep", "musician", "extraordinary", "dirt", "pc", "bell", "ceremony", "clue", "guideline",
  "comfort", "pregnancy", "borrow", "conventional", "tourist", "incentive", "custom", "cheek", "tournament", "satellite",
  "comprehensive", "stable", "medication", "script", "educate", "efficient", "scare", "psychology", "logic", "economics",
  "nevertheless", "devil", "thirty", "charity", "fiber", "friendship", "motivation", "differently", "observer",
  "humanity", "survivor", "fence", "quietly", "humor", "funeral", "spokesman", "extension", "loose", "historian",
  "ruin", "singer", "drunk", "swim", "onion", "specialist", "missing", "pan", "distribute", "silly", "deck", "reflection",
  "shortly", "database", "remote", "permission", "remarkable", "everyday", "lifestyle", "sweep", "naked", "sufficient",
  "lion", "consumption", "capability", "emission", "sidebar", "crap", "dealer", "measurement", "vital", "impressive",
  "bake", "fantastic", "adviser", "mere", "imagination", "radical", "tragedy", "scary", "consultant", "lieutenant",
  "attractive", "acre", "drawing", "newly", "scandal", "ambassador", "ooh", "bench", "odds", "rat", "horror", "vulnerable",
  "prevention", "segment", "tail", "constitute", "badly", "bless", "literary", "implementation", "legitimate", "slight",
  "desperate", "distant", "preference", "politically", "feedback", "health-care", "italian", "detailed", "buyer",
  "cooperation", "profession", "incredibly", "killing", "sue", "photographer", "engagement", "differ", "extensive",
  "salad", "stair", "grace", "vessel", "pig", "assignment", "distinction", "circuit", "acid", "canadian", "flee",
  "efficiency", "memorial", "proposed", "entity", "iphone", "punishment", "pill", "rub", "romantic", "myth", "economist",
  "latin", "decent", "craft", "poetry", "thread", "wooden", "confuse", "privilege", "coal", "cow", "characterize",
  "pie", "decrease", "resort", "legacy", "re", "frankly", "cancel", "derive", "dumb", "scope", "formation", "grandfather",
  "hence", "margin", "wound", "exhibition", "legislature", "furthermore", "portrait", "sustain", "uniform", "painful",
  "miracle", "zero", "tactic", "mask", "calm", "inflation", "hunting", "physically", "flesh", "temporary", "nerve",
  "lung", "steady", "headline", "successfully", "defendant", "pole", "satisfy", "entrance", "aircraft", "withdraw",
  "cabinet", "repeatedly", "happiness", "admission", "correlation", "proportion", "dispute", "candy", "counselor",
  "recording", "pile", "explosion", "appoint", "couch", "cognitive", "furniture", "significance", "grateful", "commissioner",
  "shelf", "tremendous", "warrior", "physics", "garage", "flavor", "squeeze", "prominent", "fifty", "fade", "oven",
  "satisfaction", "discrimination", "recession", "allegation", "boom", "weekly", "lately", "restriction", "diamond",
  "conviction", "heel", "fake", "fame", "shine", "playoff", "actress", "cheat", "format", "controversy", "auto",
  "grocery", "headquarters", "rip", "shade", "regulate", "meter", "olympic", "pipe", "celebration", "handful", "copyright",
  "dependent", "signature", "bishop", "strengthen", "soup", "entitle", "whoever", "carrier", "anniversary", "pizza",
  "ethics", "legend", "eagle", "scholarship", "membership", "standing", "possession", "treaty", "partly", "consciousness",
  "manufacturing", "announcement", "tire", "makeup", "prediction", "stability", "norm", "irish", "genius", "gently",
  "operator", "mall", "rumor", "poet", "tendency", "subsequent", "explode", "controversial", "maintenance", "courage",
  "exceed", "vaccine", "identification", "sandwich", "bull", "lens", "twelve", "mainstream", "presidency", "integrity",
  "distinct", "intelligent", "secondary", "bias", "hypothesis", "fifteen", "nomination", "adjustment", "sanction",
  "render", "acceptable", "mutual", "examination", "meaningful", "communist", "superior", "currency", "collective",
  "flame", "guitar", "doctrine", "float", "commerce", "invent", "robot", "rapid", "respectively", "particle", "glove",
  "edit", "moderate", "jazz", "infant", "summary", "server", "leather", "radiation", "prompt", "composition", "operating",
  "assert", "discourse", "dump", "wildlife", "soccer", "mandate", "nightmare", "barrel", "homeless", "globe", "uncomfortable",
  "execute", "gesture", "pale", "tent", "receiver", "horizon", "diagnosis", "considerable", "gospel", "automatically",
  "fighting", "stroke", "wander", "duck", "grain", "beast", "remark", "fabric", "civilization", "corruption", "ma'am",
  "greatly", "workshop", "inquiry", "cd", "admire", "exclude", "rifle", "closet", "reporting", "curve", "patch",
  "touchdown", "experimental", "earnings", "hunter", "tunnel", "corps", "behave", "motivate", "elderly", "virtual",
  "weakness", "progressive", "doc", "virtue", "ounce", "athletic", "confusion", "legislative", "facilitate", "midnight",
  "deer", "undergo", "heritage", "summit", "sword", "telescope", "donate", "blade", "toe", "agriculture", "enforce",
  "recruit", "dose", "concerning", "integrate", "prescription", "retail", "adoption", "monthly", "deadly", "grave",
  "rope", "reliable", "transaction", "lawn", "consistently", "bubble", "briefly", "absorb", "princess", "log", "blanket",
  "kingdom", "anticipate", "bug", "dedicate", "nominee", "transformation", "temple", "arrival", "frustration", "changing",
  "demonstration", "pollution", "poster", "nail", "nonprofit", "guidance", "pen", "interrupt", "lemon", "bankruptcy",
  "resign", "dominant", "invasion", "sacred", "replacement", "portray", "hunt", "distinguish", "melt", "consensus",
  "hardware", "rail", "mate", "korean", "cabin", "dining", "snake", "tobacco", "orientation", "wherever", "seize",
  "punish", "sexy", "depict", "input", "seemingly", "widespread", "competitor", "flip", "freshman", "donation",
  "administrative", "donor", "gradually", "overlook", "toilet", "pleased", "resemble", "ideology", "glory", "maximum",
  "organ", "skip", "starting", "brick", "gut", "reservation", "rebel", "disappointed", "oak", "valid", "instructor",
  "racism", "pension", "diabetes", "cluster", "eager", "marijuana", "combat", "praise", "costume", "sixth", "frequent",
  "inspiration", "concrete", "cooking", "conspiracy", "trait", "van", "institutional", "garlic", "drinking", "crystal",
  "helicopter", "counsel", "equation", "roman", "sophisticated", "timing", "pope", "opera", "ethical", "indication",
  "motive", "porch", "reinforce", "gaze", "ours", "lap", "written", "reverse", "starter", "injure", "chronic", "continued",
  "exclusive", "colonel", "beef", "abroad", "thanksgiving", "intensity", "cave", "basement", "associated", "fascinating",
  "interact", "illustration", "essence", "container", "driving", "dynamic", "gym", "bat", "plead", "promotion",
  "uncertainty", "ownership", "officially", "tag", "documentary", "guilt", "alarm", "turkey", "diagnose", "precious",
  "swallow", "initiate", "fitness", "restrict", "gulf", "mommy", "unexpected", "shrug", "agricultural", "spectrum",
  "dragon", "bacteria", "shore", "pastor", "cliff", "adequate", "tackle", "occupation", "compose", "brave", "stimulus",
  "patent", "powder", "harsh", "chaos", "kit", "piano", "surprisingly", "lend", "correctly", "govern", "modest",
  "shared", "psychologist", "servant", "overwhelming", "elevator", "hispanic", "divine", "transmission", "butt",
  "commonly", "cowboy", "intent", "counseling", "gentle", "rhythm", "complexity", "nonetheless", "effectiveness",
  "lonely", "statistical", "longtime", "strain", "garbage", "devote", "venture", "aide", "subtle", "rod", "t-shirt",
  "endure", "basket", "strict", "loser", "franchise", "saint", "prosecution", "lyrics", "compound", "architecture",
  "destination", "cope", "province", "sum", "lecture", "spill", "genuine", "upstairs", "trading", "acceptance",
  "revelation", "indicator", "collaboration", "rhetoric", "slam", "inevitable", "monkey", "protocol", "productive",
  "jeans", "companion", "convict", "boost", "recipient", "practically", "array", "persuade", "undermine", "yep",
  "ranch", "scout", "medal", "endless", "translation", "ski", "conservation", "habitat", "contractor", "trailer",
  "pitcher", "towel", "goodbye", "bonus", "dramatically", "genre", "caller", "exit", "behavioral", "omit", "pit",
  "boring", "suspend", "cholesterol", "closed", "advertisement", "bombing", "consult", "expertise", "creator", "peaceful",
  "provided", "tablet", "ruling", "warming", "equity", "rational", "utilize", "pine", "bitter", "surgeon", "affordable",
  "tennis", "artistic", "download", "suffering", "accuracy", "literacy", "treasury", "talented", "crown", "importantly",
  "bare", "invisible", "sergeant", "regulatory", "thumb", "colony", "walking", "accessible", "integration", "spouse",
  "excitement", "residence", "bold", "adolescent", "greek", "doll", "oxygen", "gravity", "functional", "palace",
  "echo", "cotton", "estimated", "endorse", "lawmaker", "determination", "simultaneously", "dynamics", "shell",
  "hint", "administer", "christianity", "distract", "alleged", "statute", "biology", "follower", "nasty", "evident",
  "confess", "eligible", "consent", "bloody", "occasional", "trunk", "prohibit", "sustainable", "belly", "banking",
  "asshole", "journalism", "obstacle", "ridge", "heal", "bastard", "cheer", "apology", "tumor", "architect", "wrist",
  "harbor", "handsome", "bullshit", "realm", "inspector", "surveillance", "trauma", "rebuild", "romance", "gross",
  "deadline", "classical", "convey", "compensation", "insect", "output", "parliament", "suite", "opposed", "fold",
  "separation", "demon", "eating", "structural", "equality", "logical", "probability", "await", "generous", "acquisition",
  "custody", "greet", "trash", "judicial", "earthquake", "insane", "realistic", "assemble", "necessity", "horn",
  "parameter", "grip", "modify", "mathematics", "hallway", "african-american", "liability", "crawl", "theoretical",
  "condemn", "fluid", "homeland", "technological", "exam", "anchor", "considering", "conscious", "vitamin", "known",
  "hostage", "actively", "mill", "teenage", "retrieve", "processing", "sentiment", "offering", "oral", "convinced",
  "photography", "coin", "laptop", "bounce", "goodness", "affiliation", "burst", "bee", "blessing", "continuous",
  "landing", "ritual", "bath", "sneak", "historically", "mud", "scan", "reminder", "hers", "slavery", "supervisor",
  "quantity", "olympics", "pleasant", "slope", "skirt", "outlet", "curtain", "declaration", "immune", "calendar",
  "paragraph", "identical", "regret", "quest", "entrepreneur", "specify", "stumble", "clay", "noon", "elbow", "outstanding",
  "uh-huh", "unity", "manipulate", "airplane", "portfolio", "mysterious", "delicious", "northwest", "sweat", "profound",
  "treasure", "flour", "lightly", "rally", "default", "alongside", "hug", "isolate", "exploration", "limb", "enroll",
  "outer", "charter", "southwest", "arena", "witch", "upcoming", "forty", "someday", "unite", "courtesy", "statue",
  "fist", "castle", "precise", "squad", "cruise", "legally", "embassy", "patience", "thereby", "bush", "purple",
  "electrical", "outfit", "cage", "retired", "shark", "lobby", "sidewalk", "runner", "ankle", "attraction", "artificial",
  "mercy", "indigenous", "slap", "dancer", "candle", "sexually", "needle", "hidden", "chronicle", "suburb", "toxic",
  "underlying", "sensor", "deploy", "debut", "magnitude", "suspicion", "colonial", "icon", "grandma", "info", "jurisdiction",
  "iranian", "parade", "archive", "gifted", "rage", "outdoor", "ending", "loop", "altogether", "burning", "reception",
  "crush", "premise", "deem", "automatic", "whale", "mechanical", "credibility", "drain", "drift", "loyalty", "promising",
  "tide", "traveler", "grief", "metaphor", "skull", "pursuit", "therapist", "backup", "workplace", "instinct", "export",
  "bleed", "seventh", "fixed", "broadcast", "disclose", "execution", "pal", "chuckle", "density", "correction",
  "kinda", "relieve", "teammate", "corridor", "enthusiasm", "extended", "alright", "panic", "pad", "bid", "mild",
  "productivity", "tuck", "railroad", "frozen", "minimize", "amid", "inspection", "cab", "expected", "nonsense",
  "leap", "rider", "theology", "terrific", "accent", "invitation", "liar", "oversee", "awkward", "registration",
  "suburban", "momentum", "instantly", "clerk", "chin", "hockey", "laser", "proposition", "rob", "beam", "ancestor",
  "creativity", "verse", "casual", "objection", "clever", "shove", "revolutionary", "carbohydrate", "steam", "reportedly",
  "forehead", "resume", "sheep", "carpet", "cloth", "full-time", "questionnaire", "departure", "behalf", "graph",
  "diplomatic", "thief", "herb", "subsidy", "fossil", "patrol", "pulse", "mechanic", "cattle", "screening", "continuing",
  "electoral", "supposedly", "dignity", "prophet", "commentary", "serving", "safely", "homework", "allegedly", "android",
  "alpha", "insert", "mortality", "contend", "elephant", "solely", "continent", "ecosystem", "olive", "syndrome",
  "abstract", "accusation", "coming", "sock", "pickup", "shuttle", "improved", "calculation", "innovative", "demographic",
  "accommodate", "jaw", "unfair", "tragic", "comprise", "faster", "nutrition", "mentor", "stance", "rabbit", "dot",
  "contributor", "cooperate", "disk", "hesitate", "offend", "exploit", "compel", "likelihood", "sibling", "southeast",
  "gorgeous", "undertake", "painter", "residential", "counterpart", "believer", "lamp", "inmate", "thoroughly",
  "freak", "filter", "pillow", "orbit", "purse", "likewise", "cease", "passing", "vanish", "instructional", "clause",
  "mentally", "pond", "neutral", "shield", "popularity", "cartoon", "authorize", "combined", "graphic", "darling",
  "traditionally", "vendor", "poorly", "conceive", "opt", "descend", "firmly", "beloved", "openly", "gathering",
  "fever", "preach", "interfere", "arrow", "required", "capitalism", "fork", "meantime", "presumably", "racist",
  "illusion", "removal", "anxious", "organism", "awake", "sculpture", "spare", "harassment", "drum", "diminish",
  "helmet", "certificate", "tribal", "mmm", "sadly", "cart", "spy", "sunlight", "delete", "rookie", "clarify", "hunger",
  "practitioner", "performer", "protective", "jar", "programming", "dawn", "salmon", "census", "accomplishment",
  "conscience", "fortunately", "minimal", "molecule", "supportive", "sole", "threshold", "inventory", "comply",
  "monetary", "shy", "drill", "influential", "verbal", "ranking", "gram", "grasp", "puzzle", "envelope", "classify",
  "enact", "unfortunate", "scatter", "readily", "discount", "addiction", "emerging", "worthy", "marker", "juror",
  "blend", "businessman", "premium", "retailer", "liver", "pirate", "protester", "outlook", "elder", "gallon", "additionally",
  "ignorance", "chemistry", "sometime", "weed", "babe", "fraction", "conversion", "tolerate", "drown", "merit",
  "citizenship", "coordinator", "validity", "lightning", "turtle", "ambition", "worldwide", "sail", "added", "delicate",
  "soap", "hostile", "instruct", "shortage", "useless", "booth", "diary", "gasp", "suspicious", "transit", "excite",
  "publishing", "curiosity", "grid", "rolling", "bow", "cruel", "disclosure", "rival", "denial", "secular", "speculation",
  "sympathy", "tender", "inappropriate", "o'clock", "sodium", "bang", "challenging", "ipad", "sack", "barn", "reliability",
  "hormone", "footage", "carve", "alley", "coastal", "cafe", "partial", "flexible", "experienced", "mixed", "vampire",
  "optimistic", "dessert", "well-being", "northeast", "specialize", "fleet", "availability", "compliance", "pin",
  "pork", "astronomer", "forbid", "installation", "boil", "nest", "exclusively", "goat", "shallow", "equip", "equivalent",
  "betray", "willingness", "banker", "interval", "gasoline", "encouraging", "bucket", "theft", "laundry", "constraint",
  "dying", "hatred", "jewelry", "migration", "invention", "loving", "revenge", "unprecedented", "outline", "sheer",
  "halloween", "sweetheart", "spit", "lazy", "intimate", "defender", "technically", "peanut", "unclear", "piss",
  "workout", "wilderness", "compelling", "eleven", "backyard", "alike", "partially", "guardian", "passionate", "scripture",
  "midst", "ideological", "thrive", "sensitivity", "emotionally", "ignorant", "explicitly", "unfold", "headache",
  "eternal", "chop", "ego", "spectacular", "deposit", "verdict", "accountability", "nominate", "civic", "uncover",
  "critique", "aisle", "tropical", "annually", "eighth", "blast", "corrupt", "compassion", "scratch", "verify",
  "offender", "inherit", "strive", "chunk", "appreciation", "canvas", "short-term", "proceedings", "magical", "loyal",
  "aah", "desperately", "throne", "brutal", "spite", "propaganda", "irony", "soda", "projection", "dutch", "parental",
  "disabled", "collector", "re-election", "disappointment", "happily", "steep", "fancy", "listener", "whip", "drawer",
  "heck", "developmental", "ash", "socially", "courtroom", "stamp", "solo", "trainer", "induce", "anytime", "morality",
  "syrian", "pipeline", "bride", "instant", "spark", "doorway", "interface", "learner", "casino", "placement", "cord",
  "conception", "flexibility", "thou", "elegant", "flaw", "locker", "peel", "plea", "goddamn", "import", "stack",
  "gosh", "philosophical", "junk", "bicycle", "vocal", "chew", "destiny", "ambitious", "unbelievable", "halfway",
  "jealous", "sphere", "invade", "excessive", "countless", "sunset", "accounting", "faithful", "freely", "extract",
  "adaptation", "ray", "depressed", "emperor", "wagon", "columnist", "jungle", "embarrassed", "trillion", "breeze",
  "foster", "venue", "discourage", "disturbing", "riot", "isolation", "explicit", "commodity", "attendance", "tab",
  "consequently", "dough", "streak", "silk", "similarity", "steak", "dancing", "petition", "viable", "breathing",
  "mm", "balloon", "monument", "cue", "sleeve", "toll", "reluctant", "warrant", "stiff", "tattoo", "softly", "graduation",
  "deliberately", "consecutive", "upgrade", "accurately", "strictly", "leak", "casualty", "risky", "banana", "blank",
  "beneficial", "shrink", "chat", "rack", "rude", "usage", "testament", "browser", "processor", "thigh", "perceived",
  "talking", "merchant", "quantum", "eyebrow", "surrounding", "vocabulary", "ashamed", "eh", "radar", "stunning",
  "murderer", "burger", "collar", "align", "textbook", "sensation", "afterward", "charm", "sunny", "hammer", "keyboard",
  "persist", "wheat", "predator", "bizarre"
];

// Build word → index lookup
const WORD_TO_INDEX = {};
WORD_FREQ_MAP.forEach((word, i) => { WORD_TO_INDEX[word] = i; });

// Stored articles: array of { title, text }
let storedArticles = [];

// Color palette for multiple articles
const TRACE_COLORS = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];

// DOM Elements
const textInput = document.getElementById('textInput');
const fileInput = document.getElementById('fileInput');
const submitTextBtn = document.getElementById('submitTextBtn');
const uploadBtn = document.getElementById('uploadBtn');
const submittedList = document.getElementById('submittedList');
const analyzeBtn = document.getElementById('analyzeBtn');
const chartsSection = document.getElementById('chartsSection');
const sentenceChart = document.getElementById('sentenceChart');
const wordFreqChart = document.getElementById('wordFreqChart');

// Get first N words of text as title
function getTitleFromText(text, n = 6) {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return 'Untitled';
    const preview = words.slice(0, n).join(' ');
    return words.length > n ? preview + '…' : preview;
}

// Add article to list
function addArticle(title, text) {
    storedArticles.push({ title, text });
    renderArticleList();
}

// Render the submitted articles list
function renderArticleList() {
    submittedList.innerHTML = '';
    storedArticles.forEach((article, index) => {
        const item = document.createElement('div');
        item.className = 'article-item';
        item.innerHTML = `
            <span class="article-title">${article.title}</span>
            <button class="article-remove" data-index="${index}" title="Remove">✕</button>
        `;
        submittedList.appendChild(item);
    });
}

// Remove article
submittedList.addEventListener('click', function(e) {
    const btn = e.target.closest('.article-remove');
    if (!btn) return;
    const idx = parseInt(btn.dataset.index);
    storedArticles.splice(idx, 1);
    renderArticleList();
});

// Submit text button - stores text and clears textarea
if (submitTextBtn) {
    submitTextBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        if (!text) return;
        const title = getTitleFromText(text);
        addArticle(title, text);
        textInput.value = '';
    });
}

// Upload TXT - supports multiple files
if (uploadBtn) {
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
}

if (fileInput) {
    fileInput.addEventListener('change', function() {
        const files = Array.from(fileInput.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const text = e.target.result;
                const title = file.name.replace(/\.txt$/i, '');
                addArticle(title, text);
            };
            reader.readAsText(file);
        });
        fileInput.value = '';
    });
}

// ============================================================
// ANALYSIS ENGINE
// Each article is analyzed independently, producing its own data arrays.
// Both charts then overlay all articles for comparison.
// ============================================================

// Sentence length analysis — returns array of cumulative probabilities for lengths 1..50
function analyzeSentenceLengths(text) {
    // Use proper sentence splitter (handles Mr. Dr. U.S. e.g. i.e. URLs emails quotes)
    var sentences = splitSentences(text);

    // Step 3 & 4: count sentences of each length (1..50, 50+ -> 50)
    var MAX = 50;
    var counts = new Array(MAX + 1).fill(0);  // counts[1]..counts[50], counts[0] unused
    sentences.forEach(function(sentence) {
        var words = sentence.trim().split(/\s+/).filter(function(w) { return w.length > 0; });
        var len = words.length;
        if (len === 0) return;
        if (len >= MAX) {
            counts[MAX]++;
        } else {
            counts[len]++;
        }
    });

    var total = sentences.length;
    if (total === 0) return new Array(MAX).fill(0);

    // Step 5 & 6: cumulative frequency
    // cum[n] = (count(1) + count(2) + ... + count(n)) / total
    // cum[0] corresponds to length=1, cum[49] to length=50
    var cum = [];
    var running = 0;
    for (var len = 1; len <= MAX; len++) {
        running += counts[len];
        cum.push(running / total);
    }

    return cum;  // array of 50 values, index 0 = length 1, index 49 = length 50
}

// Word frequency analysis — lemmatizes, then returns sparse map of { wordIndex: count }
function analyzeWordFrequencies(text) {
    const lemmas = typeof lemmatizeText === 'function' ? lemmatizeText(text) : (text.toLowerCase().match(/[a-z]+/g) || []);
    const freqMap = {};
    lemmas.forEach(function(lemma) {
        if (WORD_TO_INDEX.hasOwnProperty(lemma)) {
            var idx = WORD_TO_INDEX[lemma];
            freqMap[idx] = (freqMap[idx] || 0) + 1;
        }
    });
    return freqMap;  // { index: count }
}

// ============================================================
// CHART RENDERING
// ============================================================

function runAnalysis() {
    if (storedArticles.length === 0) {
        alert('Please submit or upload at least one article first.');
        return;
    }

    // --- Draw Sentence Length Chart ---
    const sentenceTraces = [];
    storedArticles.forEach((article, i) => {
        const data = analyzeSentenceLengths(article.text);
        // Start from origin (0,0), then CDF for lengths 1..50
        const x = [0].concat(Array.from({ length: 50 }, (_, idx) => idx + 1));
        const y = [0].concat(data);
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

    const sentenceLayout = {
        xaxis: {
            title: 'Sentence Length (words)',
            range: [0, 50],
            dtick: 5
        },
        yaxis: {
            title: 'Cumulative Probability',
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

    const config = {
        responsive: true,
        displayModeBar: true
    };

    Plotly.newPlot(sentenceChart, sentenceTraces, sentenceLayout, config);

    // --- Draw Word Frequency Chart ---
    const wordFreqTraces = [];
    storedArticles.forEach((article, i) => {
        const freqMap = analyzeWordFrequencies(article.text);
        const indices = Object.keys(freqMap).map(Number).sort((a, b) => a - b);

        if (indices.length === 0) return;

        const color = TRACE_COLORS[i % TRACE_COLORS.length];
        // Build cumulative data (normalized to probability 0–1), start from origin
        const x = [0];
        const y = [0];
        let cumulative = 0;
        const total = indices.reduce(function (sum, idx) { return sum + freqMap[idx]; }, 0);

        indices.forEach(function (idx) {
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

    if (wordFreqTraces.length === 0) {
        wordFreqChart.innerHTML = '<p style="text-align:center;color:#999;padding:2rem;">No recognizable words found.</p>';
    } else {
        const wordFreqLayout = {
            xaxis: {
                title: 'Word Rank (by global English frequency, 0 = most common)'
            },
            yaxis: {
                title: 'Cumulative Probability',
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

if (analyzeBtn) {
    analyzeBtn.addEventListener('click', runAnalysis);
}
