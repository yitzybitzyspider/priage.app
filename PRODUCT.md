# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS with a little vanilla JS, served by GitHub Pages from `main` (`/docs`) at the custom domain priage.app (registered at Cloudflare). No build step. Chosen to match the request ("landing page ... GitHub Pages"); framework choice was not raised separately.

## Users

PrIAge is very early. The problem it targets lives in hospital emergency department waiting rooms: patients who get worse, and sometimes die, while waiting their turn.

The landing page's visitor is someone being shown the project: classmates, judges, instructors, or people seeing it as a portfolio piece (confirmed 2026-10-17: "Showcase the project").

## Product Purpose

Prevent unnecessary deaths and unnoticed deterioration in emergency waiting rooms, using AI. How is undecided (confirmed 2026-10-17: "We haven't decided what or how it works yet").

## Positioning

After a one-time triage snapshot, patients can wait for hours while nobody sees how they are doing. PrIAge exists to give nurses more information so they can make their own calls; nurses decide, always. No mechanism is claimed.

## Public Story (confirmed 2026-10-17)

- Tell the problem's story without presenting a solution yet: how big, how severe, how important.
- Proof is sourced statistics only (journals, health agencies). Research notes: `research/problem-stats.md`.
- Never imply reordering, ranking or skipping patients ("the changes ... and skipping people over has tons of implications").
- Never blame nurses or hospitals; the system is overloaded.
- Validate the people in the system (confirmed 2026-10-17): nurse fatigue and staffing, hospital capacity, and dollar costs are part of the story, told so that nurses and administrators feel seen, never blamed.
- No sensational or scary tone, and no playful devices around a life-and-death topic.
- Focus on the US (confirmed 2026-10-17): lead with US data; strong non-US studies can appear as supporting numbers without highlighting the country, and the number always carries the emphasis over the study.
- The ask (confirmed 2026-10-17): one simple invitation, no role picking; say what we're looking for (conversations, advice, introductions) and welcome general contact.
- The page's jobs (confirmed 2026-10-17): land interviews; be the link in applications (accelerators, grants, programs); get into competitions; and tell people what PrIAge is working on. So readers include application reviewers and competition judges who skim for the problem, who is behind it, what the team is working toward, and how far along it is.
- The big ask (confirmed 2026-10-17): talk to people and schedule time to learn about their problems. Audiences: ER nurses, ER doctors, hospital leaders (ED directors, nurse managers, quality and safety), and patients and families who have waited in an ER. For now booking is an email to hello@priage.app with a pre-filled note; a booking link may replace it later.
- The first ticket-dispenser concept (v1) told the idea "almost too playfully"; the rebuild starts fresh visually. Only name, domain and contact carry over.
- Page shape (confirmed 2026-10-17, v10): "it's just the main problem, then call to action, and then team." The supporting numbers sit in a strip readers scroll left and right through ("scroll left and right to learn more"), not in more sections.

## Capabilities and Constraints

- No product exists yet. Do not describe features, models, data sources, or how it works.
- Do not publish the approaches being explored (confirmed 2026-10-17: "I don't know if we should share what we're exploring yet, just what the problem we're looking to solve").
- Earlier internal prototypes were throwaway tests, not the product; never describe them publicly.
- Contact: hello@priage.app, forwarded to the owner's Gmail via Cloudflare Email Routing.
- Audience access (confirmed 2026-10-17): US visitors only and no scraping. Cloudflare proxies priage.app and blocks every country except the US and its territories (US, PR, GU, VI, AS, MP); its AI-bot block is on for search, agent and training bots; the page carries `noindex`; robots.txt admits only link-preview bots (LinkedIn, Slack, X, Facebook, WhatsApp, Telegram, Discord) so shared links still show a card. Trade-off accepted: reviewers, judges and teammates outside the US cannot open the site, and the GitHub repo stays public, so its source is readable from anywhere.

## Brand Commitments

- Name is spelled **PrIAge** (capital P, lowercase r, capital I, capital A, lowercase g, lowercase e). Never "PreAge" or "PRIAGE". The domain is lowercase priage.app.
- The team is public (changed 2026-10-17 at the user's request): Shion Kiguchi, MD; Premi Mohanavelu; José Tomás Fernández; Yitzy Rosenberg, all MBA students at UC Berkeley Haas. Bios describe backgrounds, not PrIAge titles (roles are still being set). Team photos are shown in black and white (owner's request, 2026-10-17).

## Evidence on Hand

Verified public facts about the problem (checked 2026-10-17):

- Sax DR et al. "Evaluation of Version 4 of the Emergency Severity Index in US Emergency Departments for the Rate of Mistriage." JAMA Netw Open. 2023;6(3):e233404. doi:10.1001/jamanetworkopen.2023.3404. In 5,315,176 adult ED encounters: mistriage 32.2%; undertriage 3.3% (176,131); sensitivity of ESI to identify high-acuity illness 65.9%.
- Royal College of Emergency Medicine press release, 1 April 2024: "almost 14,000 associated excess deaths related to waits of 12 hours or longer in 2023", "more than 268 a week"; 65% of 12-hour waiters were awaiting admission. https://rcem.ac.uk/press-release/almost-300-deaths-a-week-in-2023-associated-with-long-ae-waits-despite-uec-recovery-plan/

Absent, never fabricate: product results, accuracy numbers, pilots, hospital partners, testimonials, clearances, PrIAge job titles. Any patient shown on a public surface is synthetic and labeled.

## Product Principles

1. Lead with the problem: deterioration in the waiting room goes unseen.
2. Honest about stage: early, working on it, nothing more.
3. Facts, not claims: every number is public, sourced, and quoted as published.

## Accessibility & Inclusion

Read on laptops and phones; meet WCAG 2.2 AA contrast and respect reduced motion.
