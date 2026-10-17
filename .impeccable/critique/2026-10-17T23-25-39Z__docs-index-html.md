---
target: priage.app v12 (round 3)
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:/Users/yitzy/Documents/GitHub/priage.app/docs/index.html"
target_fingerprint: "sha256:525a1fe6a819918049fd759e6b8cea94886fdfc62fbf982f7f08993209cd4f55"
target_path: /Users/yitzy/Documents/GitHub/priage.app/docs/index.html
timestamp: 2026-10-17T23-25-39Z
slug: docs-index-html
---
Method: dual-agent (A: design review sub-agent, B: detector and browser sub-agent), round 3 on v12

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Pager count off screen above tall phone cards; 1, 3, 5, 8 at 1440 |
| 2 | Match system / real world | 3 | "triage scale's two most urgent levels", "odds" |
| 3 | User control and freedom | 3 | Sources has no return path except Back |
| 4 | Consistency and standards | 3 | Red chair means a different thing per card; Sources highlight was red |
| 5 | Error prevention | 2 | Hero ratio easy to misread; mailto body ungrammatical |
| 6 | Recognition rather than recall | 3 | |
| 7 | Flexibility and efficiency | n/a | Single page read once |
| 8 | Aesthetic and minimalist design | 2 | Empty band under short phone cards; mismatched photos |
| 9 | Error recovery | 3 | |
| 10 | Help and documentation | 3 | Sources excellent |
| Total | | 25/36 | Good |

Priority issues (addressed in v13 unless noted):
- [P1] Hero "About 1 in 3": denominator after the number, passive wording pointed at nurses. Now a sentence with the group first and the scale as subject.
- [P1] Beds card asked "enough beds?" and the drawing said yes. Now asks how full hospitals are, with published occupancy 63.9% to 75.3%.
- [P1] Empty band under short cards on phones. Cards stretch again; tallest card shortened.
- [P2] Team photos four genres (Premi cropped; matching headshots still needed from the team).
- [P2] Hero stats misaligned at 600 to 899px (subgrid); strip below the fold at tablet sizes (tighter spacing); "this fall" dated; card 1 question did not match its answer.
- [P3] Exit-sign scene thin (kept); mailto grammar; red Sources highlight; aria-live chatter; bio wording.
Evidence pass: no P0 or P1; all round-2 fixes verified; Sources measure and .ref width fixed in v13.
