---
target: priage.app home after staffing, cost and team chapters
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/yitzy/Documents/GitHub/priage.app/docs/index.html"
target_fingerprint: "sha256:1e0be4d0dded491424cc850a92ee4f8771696a41c03ddb7c91911ebe5822c759"
target_path: /Users/yitzy/Documents/GitHub/priage.app/docs/index.html
timestamp: 2026-10-17T19-41-34Z
slug: docs-index-html
---
DEGRADED: single-context (sub-agents run only when the user asks for them in this session)

## Design Health Score (Persuade surface; 7 and 10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Every scene has a live readout; tabs lack aria-controls |
| 2 | Match system / real world | 4 | Building with H sign, staff lockers, bills: objects from the hospital |
| 3 | User control and freedom | 3 | Autoplay stops on touch; all states reversible |
| 4 | Consistency and standards | 3 | Locker readout repeated the caption sentence word for word |
| 5 | Error prevention | 3 | Little to get wrong; copy button falls back to showing the address |
| 6 | Recognition rather than recall | 3 | Keys and legends beside each scene |
| 7 | Flexibility and efficiency | n/a | Landing page |
| 8 | Aesthetic and minimalist design | 3 | Page is long (8 headline numbers); each chapter scannable |
| 9 | Error recovery | 3 | Clipboard failure shows the address |
| 10 | Help and documentation | n/a | Landing page |
| Total | | 25/32 | Good |

## Priority issues (all fixed in v7)
- [P1] Locker readout duplicated the caption sentence. Fix: short state readout ("of those who left named inadequate staffing"); caption adds the 60.9% for nurses thinking about leaving.
- [P1] Grayscale team photos on a page about deaths read as a memorial. Fix: color photos, softened (saturate 0.8).
- [P2] "802,000 -> 674,000" at hero size broke awkwardly. Fix: big-long size step.
- [P2] Receipts used a thick top border (side-tab tell) and nested shadows. Fix: flat paper with wayfinding plates (IN THE ER / UPSTAIRS) and a live difference readout (+$863 a day, 20 fewer nursing minutes; ICU +$102, 368 fewer).
- [P2] Turn band copy was a double negative. Fix: "None of this is for lack of effort."

## Detector
19 findings: 11 cramped-padding (sections with border-top and wrap gutters; false positives), 2 low-contrast (#d9e6f1 measured against the page floor instead of the blue band; false positive), 1 side-tab (receipts; fixed), 2 nested-cards (receipts in panel; shadows removed), 1 tight-leading (headings at 1.15; intended), 2 radius advisories (8px tab track existing; 2px key fixed to 3px).
