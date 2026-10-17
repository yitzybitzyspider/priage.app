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

A single left-aligned column inside a 1240px container with fluid gutters (gutter token). Each story section opens with a two-column head (headline left at 6fr, reading text right at 5fr, aligned to the bottom) above a full-width seat field, then a caption grid of 5fr (figure, what, legend) against 7fr (source quote). Sections are separated by a 1px hairline and generous vertical padding (section token); the talk band runs full bleed in Molded Seat Blue with a 7fr / 5fr grid.

Seat fields draw a 24 by 30 chair cell with a 4 unit gap, rows joined by a beam with legs every fifth seat. Column counts are chosen per figure so rows read as real banks of chairs (41, 25, 34, 50 on wide screens) and drop to 10 to 25 columns on phones; a dense field on phones switches each chair to a solid silhouette so it never reads as hatching.

Breakpoints: at 1023px and below, story heads and the talk grid stack to one column; at 759px and below, the caption grid stacks, body type steps down, and the nav keeps only the talk action.

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
- **Text link action:** "See the numbers" style, Atkinson 600 with an inline SVG down arrow, underlined.

### Navigation
Wordmark left, links right. Links are Atkinson 600 at 1rem with the underline hidden until hover. The talk action is a compact blue button (padding 9px 16px 8px, 6px radius). On phones only the wordmark and the talk action remain.

### Seat Field (signature)
The unit of the system. A Fluorescent Panel plate (4px radius, Panel rest shadow) holding an SVG bank of chairs: plain seats in Molded Seat Blue, marked seats filled Exit Sign Red, lost seats as empty chairs outlined in Exit Sign Red. A single named seat gets a Red Plate behind it and an Overpass 800 label in Signage Red Ink with a 1.5px leader line, placed directly on the field. Marked seats are chosen by a deterministic scatter so they read as people spread through a room. When the field enters view, marked seats switch to red one after another in 120ms two-step frames (45ms stagger for fills, 12ms for large outlined sets, 300ms initial hold), then the label fades in; reduced motion shows the final state.

### Figure Caption
Under every field: the Figure number, a one-sentence plain-language "what" line, and a legend of 14px keys (blue for one patient, red fill or red outline for the counted state). Beside it, the Source Clip: the published sentence in curly quotes under a 2px Chart Ink rule, followed by a Soft Ink citation with a link to the paper and a bracketed source number.

### Talk Band
Full-bleed Molded Seat Blue section with a large headline, a short invitation, an audience list in Overpass 700 with 9px On Seat Mist square bullets, and the light button with the plain email address beneath.

### Source List
Numbered list in Soft Ink at 0.9375rem, max 90ch, with Overpass 800 Chart Ink markers; each entry is a full citation with a DOI or source link. The footer sits under a Hairline.

## Do's and Don'ts

### Do:
- **Do** draw every patient figure as a seat field where one chair is exactly one patient; show the full denominator.
- **Do** use a number beat (Figure type, no field) when a count is too large to draw at one chair per patient.
- **Do** place the verbatim published source sentence, in quotes, beside every number, with a linked citation and an entry in the Source List.
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
