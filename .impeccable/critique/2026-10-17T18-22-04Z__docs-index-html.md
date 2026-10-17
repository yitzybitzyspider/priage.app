---
target: priage.app landing page, full critique idea to execution
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/yitzy/Documents/GitHub/priage.app/docs/index.html"
target_fingerprint: "sha256:0c7fdd4e5301ea15aed78c2708392bbb3f41c637bdd303c4d5256a9ba449f4d9"
target_path: /Users/yitzy/Documents/GitHub/priage.app/docs/index.html
timestamp: 2026-10-17T18-22-04Z
slug: docs-index-html
---
Method: dual-agent (A: isolated design review agent, B: isolated detector and browser agent) plus main-session strategy and tech audit.

## Strategy (four jobs: interviews, applications, competitions, telling people what PrIAge works on)
Interviews partial; applications weak; competitions weak; telling people missing. Problem framing strong but aimed off: hero (1 in 82) and 268 field are admitted patients boarding, not waiting-room patients; the core gap (nobody sees who worsens after triage) is never stated. Identity gap (no who, no goal, no stage). No value exchange for interviewees.

## Design specificity
Seat fields are product-owned (one chair one patient, empty seat death vs red seat missed, red only for subject seats). Surrounding structure is a repeated template; sections could follow the visit (arrive, triage, wait, leave or admitted). Detector: only cramped-padding false positives; browser found source list line length ~148ch.

## Heuristics
1 Visibility 2; 2 Real world 3; 3 Control 3; 4 Consistency 3; 5 Error prevention 2; 6 Recognition 3; 7 n/a; 8 Minimalism 3; 9 Recovery 2; 10 n/a. Total 21/32 (66%), Acceptable.

## Priority issues
- P1 Page fails three of four jobs: no who, goal, or stage (needs owner decisions).
- P1 Story aimed off: reorder as patient journey, state the blind spot, fix hero group.
- P1 The ask: headline about "us", button off to the side, no reassurance, mailto dead without mail client; add role links, copy address, reassurance.
- P2 Glyph integrity: scatter bias bug (LCG low bits, every 4th seat), empty seat reads as laptop, red vs blue hue-only.
- P2 Number load and fidelity: 268 not in quote, section 4 uncited, section 5 holds 7 numbers, 34 in 100 vs 34 in 1,000.
- P2 Mobile pacing: number below tall fields, no persistent ask.

## Personas
Nurse: triage copy reads as second-guessing, boarders drawn as chairs, her pain unnamed, never reaches ask. First-timer: Prlage misread, what PrIAge is unclear, country hops. Stress tester: 268 not in quote, email is not a call, 911 under UK/Canada data, modelled deaths as counted seats. Mobile: 8,400px to the ask, chips look tappable.

## Execution and tech
Good: static, under 200 KB, HTTPS, OG, versioned assets, AA contrast, focus visible. Missing: robots/sitemap, branded 404, no-JS and print fallback, talk-mail CSS cascade bug, source measure, slashed zeros, 911. Owner decisions: replies from personal Gmail, no analytics, no DMARC.

## Questions
Smallest identity that earns 30 minutes from an ED director? What does an interviewee get back? Should field size track importance rather than denominator?
