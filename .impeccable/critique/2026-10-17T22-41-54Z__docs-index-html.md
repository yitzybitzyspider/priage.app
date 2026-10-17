---
target: priage.app v10 home (problem, strip, ask, team)
total_score: 21
max_score: 36
na_heuristics: 10
p0_count: 3
p1_count: 5
target_identity: "file:/Users/yitzy/Documents/GitHub/priage.app/docs/index.html"
target_fingerprint: "sha256:4a7925063696a4e57f96586e336c83e1e87f36427bbdd8f559527507354469b5"
target_path: /Users/yitzy/Documents/GitHub/priage.app/docs/index.html
timestamp: 2026-10-17T22-41-54Z
slug: docs-index-html
---
Method: dual-agent (A: design review sub-agent, B: detector and browser sub-agent)

## Design Health Score (Persuade surface; 10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | No strip position on phones; triage scene never plays in landscape phones (stays at 0, answer hidden) |
| 2 | Match system / real world | 2 | "1x" and "2.6x" odds unexplained; "Follow one visit" has no single visitor; "bill" for cost of care |
| 3 | User control and freedom | 3 | Native scroll, no traps; scenes cannot replay |
| 4 | Consistency and standards | 2 | Red means six things; beds answer red while red windows mean the opposite; card 3 has no answer number |
| 5 | Error prevention | 3 | Copy fallback and privacy line good; mailto has no body prompt |
| 6 | Recognition rather than recall | 2 | Room card has three chair states and no key; [n] sends readers far down the page |
| 7 | Flexibility and efficiency | 2 | Mouse wheel does not move the strip; arrows far from cards; one card per click |
| 8 | Aesthetic and minimalist design | 2 | Six text layers per card; sources take 29% of the page |
| 9 | Error recovery | 3 | Clipboard failure shows the address |
| 10 | Help and documentation | n/a | Landing page |
| Total | | 21/36 | Acceptable |

## Design specificity
Chair glyph, Overpass voice and the 100-chair field are authored; the rest is a cause-page skeleton (text-only hero, carousel of stat cards, blue CTA band, 2x2 team, footnotes). The strip risks being the counter row turned sideways.

## Priority issues
- [P0] Evidence does not prove the thesis: the headline says nobody can see who is getting worse, the cards show crowding. Fix: end the strip on the honest gap (no national count found) and hand off to the ask; retitle the strip.
- [P0] Sources note false: 34, 2.6x, 12/49/64%, 293/313 min, +$863 are derived or rounded. Fix: print published values, add the nursing-minutes sentence, say which are computed.
- [P0, B] Triage scene never plays when its figure is taller than the viewport (landscape phones): stuck at 0 with the answer hidden.
- [P1] Triage card reads as blame and "most urgent" is imprecise (ESI I or II). Fix: put it on the five-level scale's two most urgent levels; move "None of this is for lack of effort" to the strip head.
- [P1] First viewport empty on the right; goal line quietest text. Fix: hero with two stats.
- [P1] Strip discoverability: swipe-only hint, distant arrows, no phone counter, 30px peek.
- [P1] Red semantics inconsistent; exit-sign arrow tiles look clickable.
- [P1, B] Mobile ask bar hides focused links and the footer; [n] targets 14px with 2px spacing.
- [P2] Talk h2 bigger than h1; blank mailto body; vague stage.
- [P2] Scene craft: locker barcode, step pills like carousel dots, clock ends on 12 covering the numeral, hospital illegible on phones.
- [P2] Team bio voice drifts.
- [P2, B] Next button disables while focused and drops focus; empty-chair outline 1.70:1; nav and copy targets under 44px.

## Persona red flags
Jordan: abstract h1 with no image; "1x" meaningless. Riley: 34 vs quoted 65.9%; no 293 in the quote; covered footer. Casey: thin peek, no counter, 34px copy button. ER charge nurse: card 2 feels like an accusation. Accelerator judge: goal in grey 17px, stage undated.

## Detector
CLI 11 findings: 2 low-contrast (false positive, #d9e6f1 is on the blue band and turn card), 8 cramped-padding on cards (false positive, clamp padding unresolved), 1 design-system-font (Text Digits undocumented, real drift). Overlay 13: 12 body-text-viewport-edge on off-screen strip cards and 1 text-overflow on the hidden .sep glyph, all false positives.
