---
target: priage.app v11 (round 2)
total_score: 24
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 4
target_identity: "file:/Users/yitzy/Documents/GitHub/priage.app/docs/index.html"
target_fingerprint: "sha256:d22ea22dbb07a9d56564492170f95ab72d2944ef728936da00f57d6643ff8f2f"
target_path: /Users/yitzy/Documents/GitHub/priage.app/docs/index.html
timestamp: 2026-10-17T23-08-40Z
slug: docs-index-html
---
Method: dual-agent (A: design review sub-agent, B: detector and browser sub-agent), round 2 on v11

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Room states flash by with no replay |
| 2 | Match system / real world | 3 | "life-saving", "odds", "2.59x", "+$863" not lay language |
| 3 | User control and freedom | 2 | Citation jump strands the reader in the footer |
| 4 | Consistency and standards | 2 | Red still meant money; three CTAs on phones; ER vs emergency department vs emergency room |
| 5 | Error prevention | 3 | |
| 6 | Recognition rather than recall | 3 | |
| 7 | Flexibility and efficiency | 2 | No way to scan all numbers at once |
| 8 | Aesthetic and minimalist design | 3 | |
| 9 | Error recovery | 3 | Copy falls back to the address |
| 10 | Help and documentation | n/a | Landing page |
| Total | | 24/36 | Good |

Priority issues (all addressed in v12 except the AI line, kept as the owner wrote it):
- [P0] Hero red stat said "life-saving" (paper: life-stabilizing) and gave the publication year and "21 US hospitals" instead of one California system, 2016 to 2020.
- [P1] AI sentence lost the nurse (owner's explicit choice; kept).
- [P1] Thesis gap admitted only at card 8; moved to the strip head.
- [P1] Team credibility: degree line, mixed photo framing, plain numbers.
- [P1, B] Landscape ask bar shown because a later media block overrode the hide rule; bar removed.
- [P2] Strip controls below the first screen; red for money; heading hierarchy inverted; contradictory call promise; keyboard focus stranded in snapped strip; hero tab order differed from layout; Cloudflare email obfuscation rewrote the mailto.

Detector: 11 CLI findings, all known false positives except the undocumented Text Digits token; overlay 8 real line-length findings in Sources (now 74ch).
