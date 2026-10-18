---
name: PrIAge
description: "The Waiting Room: sourced statistics on emergency waits, told one chair per patient."
colors:
  seat: "#2b5d87"
  seat-deep: "#1f4566"
  mark: "#c4372b"
  mark-ink: "#a5291f"
  mark-plate: "#f4dcd8"
  floor: "#e1e5e4"
  panel: "#f7f8f7"
  ink: "#1a1d1f"
  ink-soft: "#485056"
  beam: "#8b969d"
  rule: "#c5cccd"
  on-seat: "#ffffff"
  on-seat-soft: "#d9e6f1"
typography:
  display:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 3.375rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  figure:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 1.8rem + 4vw, 5.25rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  wordmark:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.45vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 800
    lineHeight: 1
rounded:
  key: "3px"
  field: "4px"
  control: "6px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  container: "1240px"
  section: "clamp(72px, 9vw, 128px)"
  band: "clamp(80px, 10vw, 136px)"
  field-gap: "clamp(32px, 4vw, 56px)"
  caption-gap: "26px"
components:
  button-primary:
    backgroundColor: "{colors.seat}"
    textColor: "{colors.on-seat}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 24px 14px"
  button-primary-hover:
    backgroundColor: "{colors.seat-deep}"
    textColor: "{colors.on-seat}"
  button-light:
    backgroundColor: "{colors.on-seat}"
    textColor: "{colors.seat-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 24px 14px"
  button-light-hover:
    backgroundColor: "#e8f0f7"
    textColor: "{colors.seat-deep}"
  nav-talk:
    backgroundColor: "{colors.seat}"
    textColor: "{colors.on-seat}"
    rounded: "{rounded.control}"
    padding: "9px 16px 8px"
  seat-field:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.field}"
    padding: "clamp(18px, 2.4vw, 32px) clamp(16px, 2.4vw, 32px) clamp(14px, 2vw, 26px)"
  figure-number:
    textColor: "{colors.mark-ink}"
    typography: "{typography.figure}"
  source-clip:
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    padding: "16px 0 0"
  talk-band:
    backgroundColor: "{colors.seat}"
    textColor: "{colors.on-seat}"
    padding: "clamp(80px, 10vw, 136px) 0"
---

# Design System: PrIAge

## Overview

**Creative North Star: "The Waiting Room"**

Every figure is told in seats. The emergency department waiting room, with its joined rows of molded chairs bolted to a steel beam, is the unit of measure for the whole system: one chair is one patient, always. The page is the room itself: a cool linoleum grey floor, fluorescent white panels that hold the seat fields, hospital-blue chairs, near-black ink, and a single emergency-signage red that touches only the seats a figure is about.

The mood is sober, plain and institutional, the way good hospital wayfinding is plain. Headings and numbers speak in Overpass, a face from the highway-sign lineage; reading text is Atkinson Hyperlegible Next, built for legibility. Density is calm: generous section rhythm, wide seat fields, and a short caption block under each field that pairs the large number with its verbatim source sentence. Nothing decorates; every mark on the page either counts a person or cites where the count came from.

The system rejects playful devices around a life-and-death topic (an earlier ticket-dispenser concept was rejected for exactly that), the cause-page counter row, and the health-tech split hero.

**Key Characteristics:**
- One chair equals one patient on every seat field; scale numbers too large for chairs are a type beat, never a field.
- Red appears only on the seats a figure is about, on the figure number that counts them, and on the label that names them.
- Every number stands next to its source sentence, quoted as published, with a citation.
- Two faces with fixed jobs: Overpass signs and counts, Atkinson reads.
- Stark geometric chair glyphs on steel beams, never soft, cute or illustrated.
- Motion is held frames: marked seats switch to red one after another in hard two-frame steps; reduced motion shows the final state.

## Colors

An institutional, low-chroma room (grey floor, white panels, blue chairs) with one alarm color held in reserve.

### Primary
- **Molded Seat Blue** (seat): the chairs themselves, the primary action, the nav action, selection, focus rings, the favicon tile, and the full-bleed "talk with us" band. It is the color of the room's furniture, so it carries the page's quiet structure.
- **Deep Seat Blue** (seat-deep): hover state for blue controls, text on the light button, and the tint of the button's lift shadow.

### Secondary
- **Exit Sign Red** (mark): fill for marked seats ("missed" kind), outline for empty seats ("lost" kind, an extra death), and the matching legend key. Never used for text at body size.
- **Signage Red Ink** (mark-ink): the darker red that is legible as text: figure numbers about marked seats, the on-field seat label and its leader line.
- **Red Plate** (mark-plate): the pale plate drawn behind a single named seat so it registers at a glance.

### Neutral
- **Linoleum Grey** (floor): page ground and scrollbar track.
- **Fluorescent Panel** (panel): the white plate every seat field sits on.
- **Chart Ink** (ink): headings, reading text, the 2px rule above each source quote, list markers.
- **Soft Ink** (ink-soft): citations, legends, source list, footer.
- **Steel Beam** (beam): the beam and legs that join a bank of chairs.
- **Hairline** (rule): section dividers, footer rule, the 1px base line under seat panels.
- **On Seat White** (on-seat) and **On Seat Mist** (on-seat-soft): text and secondary text on the blue band and blue buttons.

### Named Rules
**The Signage Red Rule.** Red is reserved for the seats a figure is about, the number that counts them, and the label that names them. It never decorates a heading, a button, a link or a section.

**The Room Palette Rule.** Every other surface takes its color from the room: floor, panel, seat, beam, ink. A new color must be something you would find in an ER waiting room.

## Typography

**Display Font:** Overpass (with Helvetica Neue, Arial)
**Body Font:** Atkinson Hyperlegible Next (with system-ui)

**Character:** A wayfinding-sign face for everything that announces or counts, paired with a legibility-first reading face. Heavy weights (800 to 900) and slightly tight tracking give headings the weight of a posted sign; reading text stays open and generous.

### Hierarchy
- **Display** (800, clamp 2.5rem to 4.5rem, 1.02): the single page headline, max 19ch.
- **Headline** (800, clamp 2rem to 3.375rem, 1.06): one per story section, max 18ch, balanced wrap. The talk band uses a larger cut (clamp 2.5rem to 4.75rem, max 14ch); the Sources heading a smaller one (clamp 1.5rem to 2rem).
- **Figure** (900, clamp 3rem to 5.25rem, 0.95, tabular numerals): the large number under each seat field, written as a ratio or count in words ("1 in 82", "About 34 in 100"). Signage Red Ink when it counts marked seats, Chart Ink when it is a scale beat.
- **Wordmark** (900, 1.75rem, 1.5rem on phones): the PrIAge name, set in Overpass, never as an image.
- **Lede** (400, clamp 1.1875rem to 1.375rem, 1.5): hero sub, max 54ch.
- **Body** (400, 1.125rem, 1.6; 1.0625rem on phones): reading text, max 50ch in story heads.
- **Caption** (400, 1.0625rem, 1.55): the plain-language "what" line under a figure (max 40ch) and the source quote.
- **Label** (400, 0.9375rem): citations, legends, source list, footer. Field labels on the seats are Overpass 800 at 17px.

### Named Rules
**The Two-Face Rule.** Overpass is for signs and numbers (headings, figures, buttons, seat labels, list markers); Atkinson Hyperlegible Next is for anything a person reads as a sentence. Do not swap them.

**The Plain Number Rule.** Figures use tabular numerals and words a person would say aloud ("268 a week"), never abbreviations or decorative digit styles.

## Layout

Since v10 the page is four beats, top to bottom: the problem (headline, lede, the PrIAge line, one "Talk with us" button), the story strip (eight scene cards that scroll sideways), the talk band, and the team, with the Sources list as the footer. Everything aligns to one left edge inside a 1240px container with fluid gutters; the story strip starts on that edge and bleeds off the right side of the screen so the next card always peeks in. The talk band runs full bleed in Molded Seat Blue with a 7fr / 5fr grid.

Seat fields draw a 24 by 30 chair cell with a 4 unit gap, rows joined by a beam with legs every fifth seat. Column counts are chosen per figure so rows read as real banks of chairs (41, 25, 34, 50 on wide screens) and drop to 10 to 25 columns on phones; a dense field on phones switches each chair to a solid silhouette so it never reads as hatching.

Breakpoints: at 1023px and below, the talk grid and team head stack; at 759px and below, body type steps down, the nav keeps only the talk action, the strip's arrows hide (swipe is the control), each card keeps its own height, and a "Talk with us" bar rises from the bottom once the hero is gone.

## Elevation & Depth

Mostly flat, with two soft, low lifts that come from the room's light rather than from cards. Seat panels sit on the floor like a fluorescent-lit plate (a 1px Hairline base line plus a long, faint drop); buttons carry a short tinted lift and rise 1px on hover. There are no hard offset shadows, no glows and no layered cards.

### Shadow Vocabulary
- **Panel rest** (`box-shadow: 0 1px 0 #c5cccd, 0 24px 40px -30px rgb(26 29 31 / 0.35)`): seat field panels only.
- **Button lift** (`box-shadow: 0 10px 20px -12px rgb(31 69 102 / 0.7)`): primary blue button.
- **Light button lift** (`box-shadow: 0 14px 26px -14px rgb(0 0 0 / 0.5)`): white button on the blue band.

## Shapes

Small, firm radii taken from molded plastic and sign plates: 3px on legend keys and focus rings, 4px on seat panels, 6px on buttons. Chair glyphs are built from rectangles (back 18 by 14 at radius 2, seat pan 21 by 5 at radius 1) on a 2.5 unit steel beam with 2 by 6 legs. A 2px Chart Ink rule tops each source quote; 1px Hairlines divide sections. No pills, no circles, no blobs.

## Components

### Buttons
Solid, sign-like and direct.
- **Shape:** gently squared (6px).
- **Primary:** Molded Seat Blue with white Overpass 800 text, padding 15px 24px 14px, a trailing inline SVG arrow (18px, 2.2 stroke, round caps).
- **Hover / Focus:** background shifts to Deep Seat Blue and the button rises 1px (160ms color, 200ms transform on cubic-bezier(0.16, 1, 0.3, 1)); pressed drops 1px; focus is a 3px Molded Seat Blue outline at 3px offset. Transitions are removed under reduced motion.
- **Light:** on the blue band, white with Deep Seat Blue text, hover to a pale blue (#e8f0f7), focus outline in white.
- **Strip arrows:** 46px squared Seat Blue buttons either side of a "1 / 8" count in Overpass; disabled at the ends at 32% opacity. Desktop only.

### Navigation
Wordmark left, links right. Links are Atkinson 600 at 1rem with the underline hidden until hover. The talk action is a compact blue button (padding 9px 16px 8px, 6px radius). On phones only the wordmark and the talk action remain.

### Seat Field (signature)
The unit of the system. A Fluorescent Panel plate (4px radius, Panel rest shadow) holding an SVG bank of chairs: plain seats in Molded Seat Blue, marked seats filled Exit Sign Red, lost seats as empty chairs outlined in Exit Sign Red. A single named seat gets a Red Plate behind it and an Overpass 800 label in Signage Red Ink with a 1.5px leader line, placed directly on the field. Marked seats are chosen by a deterministic scatter so they read as people spread through a room. When the field enters view, marked seats switch to red one after another in 120ms two-step frames (45ms stagger for fills, 12ms for large outlined sets, 300ms initial hold), then the label fades in; reduced motion shows the final state.

### Scene Card (v10)
A Fluorescent Panel card (6px radius, Panel rest lift), 560px wide on desktop and the screen width less 28px on phones, snapping to its left edge. Top to bottom: the point as an Overpass 800 headline, the question the scene answers in Soft Ink, the scene centered in the card's spare height, the answer (one Figure number in Signage Red Ink beside a short label, under a Hairline), and one Soft Ink source line (place and size, authors, journal, [n]). The red number is the legend: it names the red seats, so scenes carry no separate key unless they have more than one state to explain (the hospital). The turn card is the one exception: Seat Deep, no scene, one sentence.

### Talk Band
Full-bleed Molded Seat Blue section with a large headline, a short invitation, an audience list in Overpass 700 with 9px On Seat Mist square bullets, and the light button with the plain email address beneath.

### Source List
Numbered list in Soft Ink at 0.875rem, max 86ch, with Overpass 800 Chart Ink markers; each entry is a full citation with a DOI or source link, followed by the verbatim source sentence in italic Chart Ink. This is where every number's published sentence lives since v10; the cards carry only the citation. The footer sits under a Hairline.

## Do's and Don'ts

### Do:
- **Do** draw every patient figure as a seat field where one chair is exactly one patient; show the full denominator.
- **Do** use a number beat (Figure type, no field) when a count is too large to draw at one chair per patient.
- **Do** give every number a linked citation on its card and its verbatim published sentence in the Source List.
- **Do** keep red to the seats a figure is about, the number that counts them, and the label that names them.
- **Do** set headings, figures, buttons and seat labels in Overpass, and every reading sentence in Atkinson Hyperlegible Next.
- **Do** write in a sober, plain, factual tone: name the problem, never a villain; the system is overloaded.
- **Do** honor reduced motion by showing every field in its final state.
- **Do** meet WCAG 2.2 AA: red text uses Signage Red Ink, never Exit Sign Red.

### Don't:
- **Don't** publish a statistic without a journal or health-agency source, and don't round, restate or strengthen a published figure beyond what the source sentence says.
- **Don't** let a chair stand for anything other than one patient (no "each chair is 1,000 people").
- **Don't** use red for headings, buttons, links, section backgrounds or emphasis.
- **Don't** add playful devices: no mascots, tickets, counters, confetti, cute or rounded-blob chair glyphs, or jokey copy.
- **Don't** build the cause-page counter row or the health-tech split hero.
- **Don't** use em dashes or en dashes anywhere in copy; use commas, colons, "to" for ranges, or a new sentence.
- **Don't** add hard offset shadows, glows or stacked cards; depth stays at the two soft lifts.

## Additions from the critique pass (2026-10-17)

- **Seat glyph v2:** taller back (16 x 15), seat pan, and two legs per chair down to the beam, so an empty outlined seat reads as a chair, never a laptop. Phones use a solid chair silhouette in dense fields.
- **Marked-seat plate:** every red "missed" seat sits on a pale red plate (#f4dcd8), a cue that survives grayscale and low vision. Scatter uses a seeded mulberry32 shuffle, so marked seats spread like people in a room.
- **Place label:** a sentence-case Overpass line above each figure (place, group, years) so a reader always knows which country and population a number describes.
- **Figure layout:** field across the top, number and legend left, verbatim source right; on phones the number and legend come first, then the field, then the source.
- **Sticky signage strip:** the header stays at the top with a hairline once the page moves; on phones a "Talk with us" bar rises from the bottom after the hero and hides at the ask.
- **The ask:** headline addressed to the visitor, a checked list of promises, four white role buttons (one-tap emails with the role and a time-zone prompt pre-filled), the address with a Copy button, and a privacy line.
- **Citations:** superscript [n] markers link to the numbered sources, and a targeted source is highlighted on the pale red plate color.

## Story scenes (2026-10-17)

Each number is told with an object from the waiting room, not a generic chart, and each can be explored:

- **Triage (opening):** the seat field under a TRIAGE sign, with a toggle between "At the triage desk" (every seat looks the same) and "What was really there" (the missed patients turn red). The blind spot, made literal.
- **The wait to be triaged:** one waiting room that fills as a "How busy is the ER?" slider moves from a quiet hour to the busiest; earlier arrivals still waiting after 10 minutes turn red. Plays once on its own when scrolled into view.
- **Leaving unseen:** two hospital wayfinding signs for the two ways out, with tabs for the study's three outcomes (died within 30 days, came back within 72 hours, needed intensive care).
- **Waiting for a bed:** a wall clock whose red band thickens as an hours slider moves the hand; it states only the two published points and says "Rising" in between, so no value is invented.
- **Signage language:** seat-deep plates with white Overpass caps and a squared arrow; the alarm plate is signage red.

## System chapters and team (2026-10-17, v7)

- **The turn.** A full-width Seat Deep band between the patient chapters and the system chapters carries one sentence in Overpass 700 that takes blame off people: "None of this is for lack of effort." It is the only band that is not an ask.
- **The hospital (capacity).** A white building with an ink outline, a blue H sign on a pole, an EMERGENCY plate over the doors, and 80 windows (one per 10,000 staffed US beds). Window states: a patient in a bed (Seat fill, white patient and blanket), an open bed (Floor fill, Beam bed), a bed with no staff (Plate fill, Mark outline and diagonal). Tabs step through 2009 to 2019, 2023 to 2024, and the 2032 projection; the same 51 patients stay put while 13 windows lose their staff.
- **Staff lockers (nurses).** 100 lockers in banks of five on a steel bench rail, Seat doors with vents, a white name card and a handle. A nurse who left: door ajar, interior showing, no name card. Red doors are the nurses who named the selected reason. Two controls: a tablist for who (left, thinking about leaving) and a pressed-button group for why (staffing, stressful workplace).
- **Two bills (cost).** Flat white receipts with a zigzag torn edge (CSS mask), a wayfinding plate (IN THE ER in Mark, UPSTAIRS in Seat Deep), cost and nursing minutes as Overpass 900 numbers, and a 24-hour strip showing nursing time. A third column carries the live difference (+$863 a day, 20 fewer minutes; ICU +$102, 368 fewer). No thick top borders; no shadows inside panels.
- **Big numbers that run long** ("802,000 → 674,000") use `.big-long`, one step smaller than `.big`.
- **Team.** Two-column list, 2px Ink rule above each person, a square photo (4px radius; black and white since v10 at the owner's request, superseding the earlier soft-color rule), name in Overpass 800, a one-word background tag in Seat Deep caps, a short bio, and one link.

## Scroll-driven scenes (2026-10-17, v8)

- **No controls.** No buttons, tabs, toggles or sliders anywhere. The scroll is the only input.
- **Question first.** Every scene panel opens with `.scene-q`, one plain question in Overpass 800 that the scene answers. Running answers sit below the scene (`.scene-read`, `.room-num`, `.clock-read`, `.ward-read`).
- **Held scenes.** A scene that shows change (triage seats, the filling room, the clock, the hospital, the lockers) sits in a `.track` taller than the panel; the panel is `position: sticky` under the header and the scene plays from 0 to 1 across the track (`span` in viewport heights, a short hold at each end). If the panel is taller than the screen minus the header and the phone ask bar, it does not stick and plays as it passes mid-screen instead.
- **Static scenes.** The exit signs and the two bills have no steps; the bills' nursing-time strips fill once on view.
- **One point per scene.** Exit signs show death within 30 days only; the hospital shows before and after the pandemic only; the lockers show one reason; the bills show a regular bed only.
- **Separators.** The dot between source details is a drawn circle (`.sep`), because Overpass's middle dot sits off-center.

## v10: problem, strip, ask, team (2026-10-17)

Supersedes the v7 chapter layout and the v8 scroll-driven scenes.

- **Structure.** "It's just the main problem, then call to action, then team." Details live one swipe away in the strip, never as more vertical sections. Page height dropped from about 17,300px to 4,200px on desktop and from 19,900px to 6,300px on phones.
- **The strip.** Eight cards in visit order: the wait to be triaged, triage as a snapshot, leaving unseen, waiting for a bed, the turn card ("None of this is for lack of effort."), staffed beds, nurses, the bill. Native horizontal scroll with mandatory start snapping, `scroll-padding` set to the page edge, a thin Seat Blue scrollbar, arrows and a count on desktop, swipe on phones and trackpads. The list is focusable so arrow keys scroll it.
- **Play once, in view.** No pinned tracks. Each scene rests on its final state; with motion allowed it rewinds to its start and plays forward on a timer the first time 60% of it is on screen. Room: four busyness steps about a second apart. Triage seats and lockers: count up over 1.7s with an ease-out. Clock: hand sweeps 12 hours in 3.2s. Hospital: holds "before" for 1.1s, then 13 windows lose their staff one by one. Exit signs and bills are static. A count that would read "0 of 100" stays hidden until it starts counting. Reduced motion and print show final states.
- **One number per card, said once.** The secondary numbers (1 in 5 pre-triage in Canada, almost 14,000 excess deaths in England, 88.9% of hospital-months, 17.6% turnover, $60,090 per nurse, $17 million in California) were cut. Eight sources remain.
- **Text digits.** Reading text takes its digits from Overpass through a `unicode-range` face ("Text Digits") because Atkinson's slashed zero read as "1Ø minutes".
- **No crawlers, US only.** `noindex` meta, a robots.txt that admits only link-preview bots, and Cloudflare (proxied DNS, a WAF rule blocking every country but US, PR, GU, VI, AS and MP, and its AI-bot block). See PRODUCT.md.

## v11: critique round 1 (2026-10-17)

A dual-agent critique scored v10 at 21 of 36. Fixes:

- **Hero.** Two columns from 900px up: headline, one-sentence lede, the PrIAge line in ink with the stage ("We're early: this fall..."), one button; beside it two stats under a 2px ink rule, "155 million" in ink and "About 1 in 3" in Signage Red Ink under a three-chair bench with the first chair red. Below 900px the stats sit between the lede and the PrIAge line.
- **Plain words.** "High-acuity" is gone; the triage card and hero say "not placed in the two most urgent triage levels" (ESI I or II of five), which puts the miss on the scale, not on nurses.
- **Strip.** Titled "What happens while people wait.", with "None of this is for lack of effort." as its subhead (the turn card is gone). It ends on a Seat Deep card, "The number that matters most is missing.", stating that we found no national count of patients who get worse while waiting, with a "Talk with us" button. Arrows and an "N of 8" count sit under the strip at every width; one press moves by the cards that fit; at an end the arrow is aria-disabled (outlined, still focusable) instead of disabled. The hint reads "Use the arrows, or scroll sideways." for fine pointers and "Swipe for more." for touch.
- **One red meaning.** A red number always counts the red marks in its scene: the hospital answer is 128,000 fewer staffed beds (the red windows), and it stays hidden until they turn red. Exit signs lost their numbers and arrow tiles; the 2.59x answer sits in the answer row like every other card.
- **Published values.** The room shows 12.4%, 48.8%, 64.4% and 68% with seat counts that match (1 of 8, 6 of 12, 11 of 17, 15 of 22) and a three-state key. Odds are 2.59x as published. "About the same 510,000". Worked-out numbers carry their arithmetic under the quote in Sources.
- **Sources.** One folded `details` block in the footer with a drawn plus; citation links open it. Card citations are one link each ("Houston et al., 2015 [2]") to the list.
- **Scene craft.** Lockers are plain closed doors; the clock has no numerals and counts hours in its lower face; the room lost its step pills; empty-seat outlines and window frames darkened to #7f8a91 and #79848b for 3:1.
- **Targets and phones.** Every link and button is at least 44px tall or padded to a 24px hit area; phones reserve 88px under the page and scroll-padding so the fixed ask bar never hides a focused link; the bar hides at the footer and on landscape phones. Scenes play once 85% of their width and 60% of the smaller of their height or the screen are visible, so tall scenes play on short screens.
- **Ask.** Band headline "Have you worked in an ER, or waited in one?" capped at 3.5rem (below the h1); the email opens with a two-line template (who you are, good times to talk).
- **Share card.** og.png rebuilt from brand/build/og.html with the hero's two stats.

## v12: critique round 2 (2026-10-17)

Round 2 scored v11 at 24 of 36 (design) with no P0 defects in the evidence pass. Fixes:

- **Hero.** One flat grid whose DOM order is the phone reading order (headline, lede, stats, PrIAge line, button), placed by grid areas on desktop so keyboard order matches what is seen. The red stat now reads "patients who went on to need life-stabilizing treatment were not placed in the triage scale's two most urgent levels", sourced to "21 emergency departments in one California health system, 2016 to 2020". From 600 to 899px the two stats sit side by side. The PrIAge line is the owner's vague AI sentence.
- **Strip head.** The title takes its own row; under it, "We found no national count of patients who get worse while they wait. These numbers come closest." plus the no-blame sentence, with the arrows and hint on the same row (desktop) or their own row (phones), next to the cards rather than below them. The end card asks "Have you seen someone get worse while they waited?"
- **Red is people, never money.** The ER bill's tag and amount are ink; the answer reads "$863 more" in ink (`.n-ink`). "2.59 times" in words.
- **No phone ask bar.** The sticky header's button is always in reach; the bar duplicated it, covered content and fought the landscape layout.
- **Keyboard.** Focusing a link inside a card lines that card up, so snapping can't strand it off screen.
- **Hierarchy.** Story h2 up to 3.25rem, team h2 down to 2.5rem.
- **Team.** Head line ties each person to the problem; plain numbers ("more than 140"); one photo zoomed 1.45x inside a clipped square to even out head sizes; LinkedIn links carry each name.
- **Copy.** "While they wait"; the call promise no longer says "won't ask about your hospital"; footer says "call 911" and links the address; the mailto and footer address sit inside Cloudflare `email_off` so the ask works without its decoder.
- **Sources.** Note says numbers are quoted or worked out, with sizes, places and years from the same papers; seat-count and study-years glosses; 74ch measure.

## v13: critique round 3 (2026-10-17)

Round 3 scored v12 at 25 of 36 (design); the evidence pass found no P0 or P1 defects and confirmed every round-2 fix. Fixes:

- **Hero stats as sentences.** Each stat is a lead-in, the number, then the rest: "US emergency departments handled / 155 million / visits in 2022." and "Of patients who went on to need life-stabilizing treatment, the five-level triage scale left / about 1 in 3 / out of its two most urgent levels." The group comes before the number and the scale, not a nurse, is the subject. The three-chair bench is gone. From 600 to 899px the two stats use subgrid so both numbers sit on one row.
- **Beds card answers its own question.** "How full are US hospitals now?" with the paper's published occupancy, in ink: 63.9% before the pandemic animating to 75.3% after, as the 13 unstaffed windows turn red (the drawing matches: 51 of 80, then 51 of 67). The occupancy sentence is quoted in Sources.
- **Phones.** Cards stretch to one height again (no bare band under short cards); the triage field packs its banks closer (row height 34 instead of 40); the room's subtitle reserves two lines so the card does not jump; team bios run full width under a photo-and-name row.
- **Copy.** "In fall 2026" instead of "this fall"; card 1 asks "As the ER gets busier, how many people wait more than 10 minutes just to be triaged?"; "compared with 2.5%"; "per stroke patient"; the mailto body opens "About me (...)"; nav label "The numbers"; team head says "systems engineer" to match the tag; PMDD spelled out.
- **Craft.** Red lockers get light vents so they differ by more than hue; Premi's photo is cropped toward the face; the cited-source highlight is a pale seat blue, not the red plate; the pager count is no longer announced on every snap; disabled-arrow outline darkened; Sources and the strip paragraph measure about 34em (roughly 75 characters).
- **Share card.** Rebuilt with the stat sentences and a source line under each number.

## v14: a more dramatic headline, the AI line featured (2026-10-17)

Owner's notes after round 3: make the blind spot more dramatic, feature the AI line, say what the strip is about, drop the "no national count" line.

- **Headline.** "Every ER has a blind spot. It's the waiting room." A setup in Soft Ink and a punchline in Chart Ink, each its own balanced block, set full width up to 5.75rem with -0.025em tracking. Still no red in a heading.
- **Hero layout.** Headline across the top; the lede (34ch) beside the two stats, which sit side by side from 600px up on a subgrid so both numbers share a row; then the AI plate.
- **AI plate.** A Seat Deep panel at the bottom of the hero: "PrIAge plans to use AI to help improve outcomes for people waiting in the ER." in Overpass 800 white, the dated stage line in On Seat Mist under it, and the light "Talk with us" button on the right (stacked on phones). It replaces the small PrIAge line and the separate hero button.
- **Strip.** Titled "What happens while patients wait in the ER."; the subhead is only the no-blame line; the end card no longer refers to a missing count.

## v15: no "blind spot" (2026-10-17)

The owner dropped "blind spot": it implies nobody sees the problem or is trying to solve it. The headline now names why it is hard to see, not who fails to see it: "In a full ER waiting room," (setup, Soft Ink) / "getting worse can look just like waiting." (punchline, Chart Ink), up to 4.75rem so the hero still ends inside a 900px-tall screen. The AI plate reads "PrIAge plans to use AI to help improve outcomes for patients waiting in the ER and for the people who care for them." so the goal serves patients and providers alike.

## v16: the plate invites, it does not report stage (2026-10-17)

Under the AI line the plate now says "We'd love to hear your perspective. Share your stories and thoughts with us." in On Seat Mist, beside the light "Talk with us" button. The dated stage line ("We're early: in fall 2026...") was dropped at the owner's request: it read oddly and didn't explain being early. Hero stat numbers never wrap (`white-space: nowrap`, size from 2.25rem to 3.625rem), so "about 1 in 3" stays one line at laptop widths.

## v17: the full logo (2026-10-17)

The logo SVGs (docs/logo.svg and brand/priage-logo, -black, -white, -reversed) had a viewBox fitted to the letter fills, which cut the heartbeat's mitered spike below the baseline (the stroke's miter tip reaches y 302.5) and the right edge of the "e" (x 700). The viewBox is now `12 10 710.6 298.5`, matching the logo sheet. The header logo is 48px tall (40px on phones) so the letters keep their size. The AI line reads "PrIAge plans to use AI to help improve outcomes for patients and the professionals who care for them."

## v18: the pulse runs out of "waiting." (2026-10-17)

The headline ends in a live heartbeat: a bedside-monitor trace in Seat Blue starts a quarter em after "waiting." on the text's baseline and runs to the right edge. The trace holds still while a floor-colored gap sweeps across it; a dot rides the leading edge and a ring pulses from it on every R wave. 72 beats a minute, calm and regular, so it echoes the headline: the pulse looks normal. The sweep is always a whole number of beats, so the dot and the blink never drift apart. Sizes scale with the headline (height 0.95em, beat 1.5em, stroke 0.07em). When the last line leaves less than 1.6 beats of room, the pulse takes its own line under "waiting.". app.js measures and places it on load, on font load and on resize; it is aria-hidden. Reduced motion shows the trace still, with no gap or dot. Motion runs on the compositor (transform keyframes generated once per size).


## v19: one number, and the period keeps the pulse (2026-10-18)

The hero says one number, plainly: "1 in 3 patients who needed the most urgent care were under-triaged." It sits beside the lede as a Signage Red Ink figure with one Atkinson sentence, under a 2px ink rule. The owner asked for "1 in 3 people get under-triaged". We did not use that wording because it overstates the study about tenfold: across all ER visits, under-triage was 3.3%, and the 1 in 3 is only among patients who went on to need life-stabilizing treatment. The nuance lives on the strip's triage card, which now opens its answer with the same word ("were under-triaged: not placed in the two most urgent levels"). The 155 million visits figure left the page, so its source went with it and the list renumbers to seven. The share card (og.png) carries the single number with its setting line.

The headline's heartbeat trace (v18) is gone at the owner's request. The period of "waiting." is now the page's pulse: 72 times a minute it flushes Seat Blue and swells to 1.25x, then settles back to ink over about 400ms. It is pure CSS on an inline-block span, so the headline's text is unchanged for screen readers. Under reduced motion the period holds still.

Open: this number shows that triage misses some of the sickest patients, which supports "hard to see who is getting worse". It does not show that people get worse or die in the waiting room itself. Twenty searches found no study counting deaths or deterioration inside ER waiting rooms. The closest verified US figure is the left-without-being-seen card (2.59 times the odds of dying within 30 days).
