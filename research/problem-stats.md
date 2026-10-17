# Emergency department waiting room deterioration: sourced statistics

Prepared 2026-10-17 for the priage.app public landing page.

## Method and status key

- Search: 15 standard-mode web searches, then WebFetch on each candidate source to confirm the wording.
- Several primary pages could not be read. PubMed and PMC returned a cookie wall or a CAPTCHA, DOAJ and the ACEM submission PDF returned HTTP 403, and the CIHI indicator page did not load its data. For journal articles, the abstract text was confirmed on the Europe PMC REST record for the same PubMed ID. That record carries the same abstract as PubMed, but the journal page should still be checked before publication.
- Quotes were extracted by WebFetch. Each one is printed as the source prints it, with two exceptions: source figure dashes in confidence intervals are written as plain hyphens, and thousands separators keep the source's spacing (for example "5 315 176").

Status key:

- **VERIFIED**: the number and sentence were confirmed on a page I could read.
- **VERIFIED (abstract record)**: confirmed on the Europe PMC record for the paper, not on the journal page.
- **UNVERIFIED**: reported only in a search snippet, press coverage, or a secondary source. Do not publish without a check.
- **GAP**: no usable source found.

## Corrections to the working brief

1. **The EMJ study is 2022, not 2021.** It was published online on 18 January 2022 and appears in volume 39, issue 3 (2022). The DOI in the record is 10.1136/emermed-2021-211572. The early-release PDF URL carries a different manuscript number (emermed-2021-212106), so confirm the DOI on the journal page.
2. **The "1 excess death per 72 patients delayed 8 to 12 hours" figure is not in the EMJ abstract.** The only per-patient harm statement in the abstract is: "For every 82 admitted patients whose time to inpatient bed transfer is delayed beyond 6 to 8 hours from time of arrival at the ED, there is one extra death." The 72 figure appears in press coverage of the RCEM estimate, which attributes it to the EMJ paper. Do not use 72 on the landing page until the full text confirms it.
3. **Sax et al. 2023 refers to "5 315 176 ED encounters" in the abstract sentence I retrieved, not to "adult visits".** The adult restriction may be in the methods. Confirm before describing the population as adults. The sensitivity of 65.9% matches the brief.
4. **Sax et al. has a correction notice** (JAMA Netw Open 2024;7(6):e2423536, "Clarification of Version Index Used in Study"). It clarifies that the study used ESI version 4, notes the provenance of the ESI versions, and removes Figure 1. It does not change any number listed below. The title also differs between sources: the Europe PMC record reads "Evaluation of the Emergency Severity Index in US Emergency Departments for the Rate of Mistriage," while the correction notice reads "Evaluation of Version 4 of the Emergency Severity Index in US Emergency Departments for the Rate of Mistriage." Use the title printed on the journal page.
5. **The "almost 14,000" RCEM figure is derived from a press-reported weekly figure of 268.** 268 x 52 = 13,936, not the 13,919 that one press report gives. The RCEM publication itself was not located (see section 5.1).

---

## 1. Scale

### 1.1 US emergency department visits, 2022: VERIFIED

- **Figure:** 155 million ED visits in 2022.
- **Quote:** "In 2022, 155 million emergency department (ED) visits occurred in the United States."
- **Supporting quote:** "Data are based on a sample of 16,025 emergency department visits by patients in 2022, representing about 155 million emergency department visits."
- **Population and year:** United States, calendar year 2022. National estimate from the National Hospital Ambulatory Medical Care Survey (NHAMCS). Visit rates use the July 1, 2022 civilian noninstitutionalized population.
- **Citation:** Cairns C, Ashman JJ, Kang K. Emergency Department Visit Rates by Selected Characteristics: United States, 2022. NCHS Data Brief No. 503. Hyattsville, MD: National Center for Health Statistics; August 2024.
- **URL confirmed:** https://www.cdc.gov/nchs/products/databriefs/db503.htm

### 1.2 Time to see a physician, national: VERIFIED (dated, 2005 data, mean not median)

- **Figure:** mean of 56.3 minutes waiting to see a physician.
- **Quote:** "On average, patients spent 56.3 minutes waiting to see a physician, and 3.3 hours for the full duration of their ED visit."
- **Population and year:** US emergency departments, NHAMCS, 2005 data.
- **Citation:** Nawar EW, Niska RW, Xu J. National Hospital Ambulatory Medical Care Survey: 2005 Emergency Department Summary. Advance Data from Vital and Health Statistics, no. 386. Hyattsville, MD: National Center for Health Statistics; 29 June 2007.
- **URL confirmed:** https://www.cdc.gov/nchs/data/ad/ad386.pdf
- **Caution:** This is a mean from 2005. No current NHAMCS wait-to-physician figure was found, and the 2022 brief's sentences retrieved did not report one.

### 1.3 Median time to clinician: UNVERIFIED

- Search snippets report a national median of 31 minutes (2006 NHAMCS) and medians of 24.7 minutes (1998 to 2000) and 31.3 minutes (2008 to 2010), the last via a Becker's Hospital Review summary of *Health, United States, 2012*. None was confirmed on a primary page. Do not publish these.

### 1.4 Number of patients waiting in waiting rooms at a given time: GAP

- No national count was found.

---

## 2. Patients who leave without being seen (LWBS) and outcomes

### 2.1 Ontario, Canada: LWBS rise and 7-day and 30-day death or hospitalization: VERIFIED (abstract record)

- **Citation:** McNaughton CD, Austin PC, Chu A, Santiago-Jimenez M, Li E, Holodinsky JK, Kamal N, Kumar M, Atzema CL, Vyas MV, et al. "Turbulence in the system: Higher rates of left-without-being-seen emergency department visits and associations with ..." (the title is truncated in the record; confirm the full title). Journal of the American College of Emergency Physicians Open. 2024. DOI: 10.1002/emp2.13299.
- **Setting:** Ontario, Canada. Recent period from April 1, 2020 compared with a baseline period.
- **Quotes:**
  - "LWBS ED visits after April 1, 2020 exceeded the baseline period's single-month LWBS maximum of 4.0% in 15 out of 36 months."
  - "The composite outcome of 7-day all-cause mortality or hospitalization was 3.4% in the recent period" and "versus 2.9% in the baseline period"
  - "adjusted risk ratio [aRR] 1.14, 95% confidence interval [CI] 1.11-1.18"
  - "remained elevated at 30 days (6.2% vs. 5.8%, respectively; aRR 1.05, 95% CI 1.03-1.07)"
- **Caution:** The 4.0% is the baseline-period monthly maximum, not an average rate. The abstract gives no single recent-period LWBS percentage. The study is observational. The aRR is printed in the sentence before the 7-day outcome figures; confirm which outcome it applies to on the full text.
- **URL confirmed:** Europe PMC record retrieved by query for "left without being seen" AND JACEP AND Ontario (https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22left%20without%20being%20seen%22%20AND%20JACEP%20AND%20Ontario&resultType=core&format=json&pageSize=5). DOI link not fetched: https://doi.org/10.1002/emp2.13299

### 2.2 US leave-before-treatment-complete cohort: 30-day returns and admissions: VERIFIED (abstract record)

- **Citation:** Smalley CM, Meldon SW, Simon EL, Muir MR, Delgado F, Fertel BS. Emergency Department Patients Who Leave Before Treatment Is Complete. Western Journal of Emergency Medicine. 2021. DOI: 10.5811/westjem.2020.11.48427.
- **Scope:** This is leave before treatment complete (LBTC), which combines patients who left without being seen (LWBS) and patients who left after being seen (labelled LSBS in the record). It is not an LWBS-only figure.
- **Quotes:**
  - "...20,158 (3.2%) LBTC index encounters occurred, and 6745 (33.5%) returned within 30 days." (The record's sentence opens with a clause that gives the total ED visit count; the WebFetch summary reports it as 626,548, but that clause was not quoted verbatim, so confirm it on the full text.)
  - "Median return time was 43.3 hours, and 23.2% were admitted."
  - "Patients categorized as LSBS had longer median return hours (66.0) and higher admission rates (29.8%) than the LWBS cohort."
- **Caution:** The abstract I retrieved has no mortality outcome. The study period (2019) and the number of EDs (18) come from a search snippet and are UNVERIFIED.
- **URL confirmed:** Europe PMC record for PMCID PMC7972384 (https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC7972384&resultType=core&format=json). The PMC page returned a CAPTCHA: https://pmc.ncbi.nlm.nih.gov/articles/PMC7972384/

### 2.3 US national LWBS trend, 1.1% (2017) to 2.1% (2021): UNVERIFIED, do not publish

- Snippet only: "the rate of patients who left without being seen increased from 1.1% in 2017 to 2.1% by the end of 2021," attributed to a national sample of US hospitals in JAMA Network Open. Two Europe PMC searches did not locate the article. Obtain the citation and the abstract before use.

### 2.4 Canadian LWBS national rates: EXCLUDED

- "about 1 in 13 patients nationwide left ERs before they were treated" (about 7.7% of visits; Montreal Economic Institute, 2024 provincial data). Opinion piece, not peer-reviewed. Not used.
- "3.1% (136,805)" for Ontario, 2003 to 2004. No primary source reached. Not used.

### 2.5 Other LWBS outcome leads: UNVERIFIED (source pages not opened)

- Behavioral health LWBS cohort (2026 study, per snippet): about 12,000 LWBS episodes versus about 1.29 million completed-care episodes; 7-day return visits 24.5% versus 13.2%; days 1 to 7 admission 17.1% versus 3.9%. Death outcomes were a planned secondary endpoint and were not in the excerpt.
- Single ED in Iceland (per snippet): 107,119 patients, 4,471 left without being seen; hazard ratio 4.84 for return to the ED within 30 days.
- Victoria, Australia, linked-data study of 48-hour re-presentation and 2-, 7- and 30-day mortality: results not in the excerpt.

---

## 3. Deaths and deterioration in waiting areas and crowded emergency departments

### 3.1 Deaths in ED waiting rooms specifically: GAP

- No primary study or national surveillance count of deaths in ED waiting rooms was found in the 15 searches. The results were individual-case news reports, which are excluded here.

### 3.2 Admission delay and 30-day mortality, England: VERIFIED (abstract record)

- **Citation:** Jones S, Moulton C, Swift S, Molyneux P, Black S, Mason N, Oakley R, Mann C. Association between delays to patient admission from the emergency department and all-cause 30-day mortality. Emergency Medicine Journal. 2022;39(3):168-173. DOI: 10.1136/emermed-2021-211572.
- **Setting:** England, emergency admissions, April 2016 to March 2018 (from search snippets; the country and years were not restated in the abstract text retrieved, so confirm on the full text).
- **Quotes:**
  - "26 738 514 people attended an ED, with 7 472 480 patients admitted"
  - "relating to 5 249 891 individual patients"
  - "A total of 433 962 deaths occurred within 30 days."
  - "The overall crude 30-day mortality rate was 8.71% (95% CI 8.69% to 8.74%)."
  - "The greatest change in the 30-day standardised mortality ratio was an 8% increase"
  - "Delays to hospital inpatient admission for patients in excess of 5 hours from time of arrival at the ED are associated" and "with an increase in all-cause 30-day mortality."
  - "Between 5 and 12 hours, delays cause a predictable dose-response effect."
  - "For every 82 admitted patients whose time to inpatient bed transfer is delayed beyond 6 to 8 hours from time of arrival" and "at the ED, there is one extra death."
- **Caution:** The 82 figure applies to delays beyond 6 to 8 hours. No 72 figure appears in the abstract. The analysis is observational and adjusts for age, sex, deprivation, comorbidities, and crowding. The abstract's patient count (5,249,891) is the figure used here; one news report gives 5,429,891.
- **URL confirmed:** Europe PMC record for PMID 35042695 (https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:35042695&resultType=core&format=json). PubMed page returned a cookie wall.

### 3.3 Early clinical deterioration among boarders, five US hospitals: UNVERIFIED lead

- Snippet: about 3.6% had early clinical deterioration, 45% of them in the ED, with substantially higher 28-day mortality (Annals of Emergency Medicine, 2026, per search summary). Concerns patients waiting for inpatient beds, not waiting rooms. Not opened.

### 3.4 Joint Commission: UNVERIFIED leads (primary alerts not reached)

- Secondary sources describe a 2022 Sentinel Event Alert on ED boarding safety. Not opened.
- A trade-press summary of an older alert says "over half" of death-or-permanent-injury sentinel events in a seven-year window starting in 1995 occurred in the ED. Not opened. Do not publish.

### 3.5 England coroner reports: UNVERIFIED, no statistics

- Prevention of Future Deaths reports on judiciary.uk concern delays between triage and clinician review in EDs (report numbers 2023-0052, 2023-0256, 2023-0262, and 2025-0071 appeared in search results). The report text could not be retrieved, so they are listed only as existence checks. Individual cases are excluded by design.

---

## 4. Triage accuracy and undertriage

### 4.1 Sax et al. 2023, Emergency Severity Index: VERIFIED (abstract record)

- **Citation:** Sax DR, Warton EM, Mark DG, Vinson DR, Kene MV, Ballard DW, Vitale TJ, McGaughey KR, Beardsley A, Pines JM, Reed ME, et al. Evaluation of the Emergency Severity Index in US Emergency Departments for the Rate of Mistriage. JAMA Network Open. 2023;6(3):e233404. DOI: 10.1001/jamanetworkopen.2023.3404. Correction: JAMA Network Open. 2024;7(6):e2423536.
- **Setting:** 21 emergency departments in the Kaiser Permanente Northern California health care system (2016 to 2020, per the record summary). One integrated health system, not a national sample.
- **Quotes:**
  - "A total of 5 315 176 ED encounters were included."
  - "Mistriage occurred in 1 713 260 encounters (32.2%), of which 176 131 (3.3%) were undertriaged" and "and 1 537 129 (28.9%) were overtriaged."
  - "The sensitivity of ESI to identify a patient with high-acuity illness" and "was 65.9%."
  - "a 41.0% (95% CI, 40.0%-41.9%) greater relative risk of undertriage compared with White female patients" (Black male patients versus White female patients, adjusted analysis)
- **Caution:** 32.2% is total mistriage (over- and under-triage combined). Undertriage is 3.3% of all encounters. Some secondary sources call the total "one-third." The correction notice changed ESI version provenance only; no numbers changed. See the corrections section for the adult-population and title points.
- **URLs confirmed:** Europe PMC record for PMID 36930151 (https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:36930151&resultType=core&format=json). Correction notice: https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2819968. PubMed page returned a cookie wall.

### 4.2 Undertriage outside the US: UNVERIFIED lead

- Thailand, 1,000 cases re-reviewed by three emergency physicians (per snippet): undertriage about 4.9%, overtriage about 26.0%. Journal not identified. Not used.

---

## 5. Crowding and national estimates, England

### 5.1 RCEM estimate of excess deaths, 2023: UNVERIFIED (primary RCEM publication not reached)

- Press coverage (PA syndicated copy) reports a weekly estimate for 2023 of 268, and one report gives "roughly 13,919" for the year. 268 x 52 = 13,936.
- Press describes the method as drawing on the EMJ study, counting patients awaiting admission only, and calling the estimate likely conservative because ambulance-held patients are not counted. A freedom of information audit is said to show that 65% of patients waiting 12 hours or more were awaiting a bed.
- The headline "up to 12 hours" wording does not match the measure used, per the same coverage.
- A 2022 range of 300 to 500 weekly deaths was reported and later revised after the audit (press only).
- Do not publish the figure until the RCEM publication is retrieved and the exact sentence is confirmed there.

### 5.2 NHS England 12-hour and waiting-bed counts: UNVERIFIED

- Press reports "more than 1.5 million patients waited 12 hours or more in major emergency departments in 2023." Not confirmed on NHS England data.

---

## 6. Nurse staffing and missed deterioration

### 6.1 Smith et al. 2020, nurse staffing and failure to respond: VERIFIED (abstract excerpt; wards, not EDs)

- **Citation:** Smith GB, Redfern O, Maruotti A, Recio-Saucedo A, Griffiths P; Missed Care Study Group. The association between nurse staffing levels and a failure to respond to patients with deranged physiology. Resuscitation. 2020;149:202-208. DOI: 10.1016/j.resuscitation.2020.01.001.
- **Setting:** "from 32 general wards of an acute hospital in England." Inpatient wards, not emergency departments.
- **Quote:** "RN, but not NA, staffing levels influence the rates of failure to respond"
- **URL confirmed:** https://eprints.bournemouth.ac.uk/33271/
- **Use:** Adjacent evidence only. It is the closest verified study linking nurse staffing to missed deterioration, but it is not an ED study.

### 6.2 ED nurse staffing systematic review: UNVERIFIED

- Drennan and colleagues (per snippet): 16 included studies; poorer ED staffing linked to longer waits, more patients leaving unseen, longer stays, and increased risk of cardiac arrest. The full-text link (eprints.soton.ac.uk) returned HTTP 403, so the citation and figures are not confirmed.

### 6.3 Emergency Nurses Association and ED nurse-to-patient ratios: GAP

- No ENA publication or ED ratio standard was found in the 15 searches.

---

## 7. Canada and Australia

### 7.1 CIHI: time to physician initial assessment (definition VERIFIED; national value UNVERIFIED)

- **Indicator:** Emergency Department Wait Time for Physician Initial Assessment (90% Spent Less, in Hours), Canadian Institute for Health Information.
- **Definition quote:** "The time interval between the earlier of Triage Date/Time or Registration Date/Time and Date/Time of Physician" ... "Initial Assessment in the Emergency Department (ED)."
- **Percentile quote:** "The indicator is measured in hours, usually using the 90th percentile and/or 50th percentile, which represents" ... "the maximum length of time that 90% and/or 50% of patients stay in the ED until they are initially assessed by a physician."
- **Data source:** "National Ambulatory Care Reporting System (NACRS)." The page lists fiscal years 2021 to 2025 and a "Latest Results Update Date" of September 2026.
- **National figure:** NOT LOADED. The national result was not visible on the fetched page. Secondary news reports (UNVERIFIED) give about 1.5 million patients (roughly 10%) waiting more than 14 hours in 2024 to 2025 and 16.1 million ED visits in 2024 to 2025.
- **URL confirmed:** https://www.cihi.ca/en/indicators/emergency-department-wait-time-for-physician-initial-assessment-90-spent-less-in-hours

### 7.2 Australia: access block: VERIFIED on the ACEM page (AIHW primary not opened)

- **Definition quote (ACEM):** "are delayed from leaving the emergency department for more than eight hours due to a lack of inpatient bed capacity."
- **Quote (ACEM, citing AIHW):** "AIHW data shows that more than 522,500 ED patients were suffering access block in 2018-19."
- **Quote (ACEM, not AIHW):** "an average of 67 per cent of current patients waiting for admission were suffering access block." This is a September 2020 snapshot that the page describes as covering 93 Australian EDs. It is ACEM's own figure, not an AIHW figure.
- **Citation:** Australasian College for Emergency Medicine. Access Block. Undated web page.
- **URL confirmed:** https://acem.org.au/Content-Sources/Advancing-Emergency-Medicine/Better-Outcomes-for-Patients/Access-Block
- **Do not use:** A "36% of ED patients waiting for admission were experiencing access block" figure for 2022 to 2023 appeared in search results attributed to an ACEM submission citing AIHW. The ACEM page does not support it, and the submission PDF returned HTTP 403. Treat as UNVERIFIED and do not publish.
- **Lead, UNVERIFIED:** ACEM news (June 2025) reports that 67% of patients who do not need admission leave the ED within four hours and that 36% of admitted patients have left the ED after six hours (New South Wales). Not opened.
- **Gap:** The AIHW Emergency Department Care 2024 to 2025 national four-hour figure was not found.

### 7.3 Canada and Australia waiting-room deaths: GAP

- No national statistic on deaths in waiting rooms was found for either country. Individual news reports were excluded.

---

## 8. Gaps to close before the landing page goes live

1. Any national count of deaths or serious deterioration in ED waiting rooms (none found for the US, UK, Canada, or Australia).
2. Current NHAMCS wait-to-physician figure (median, not 2005 mean).
3. RCEM primary publication for the 2023 estimate, and the EMJ full text to confirm the 72 versus 82 figure.
4. Joint Commission primary sentinel event alerts and sentinel event data.
5. ENA staffing position and any ED-specific staffing studies with outcomes.
6. CIHI national median and the count of patients waiting more than 14 hours (CIHI data tables).
7. AIHW Emergency Department Care 2024 to 2025 national figures.
8. Full text of the US national LWBS trend paper (1.1% to 2.1%).
9. Full text of the Drennan ED staffing review.
10. Journal page checks for every abstract-based quote in sections 2 to 4.

## 9. Sources used (confirmed unless marked)

- Cairns C, Ashman JJ, Kang K. NCHS Data Brief No. 503, August 2024. https://www.cdc.gov/nchs/products/databriefs/db503.htm
- Nawar EW, Niska RW, Xu J. NCHS Advance Data No. 386, 29 June 2007. https://www.cdc.gov/nchs/data/ad/ad386.pdf
- McNaughton CD et al. JACEP Open. 2024. DOI 10.1002/emp2.13299 (Europe PMC record)
- Smalley CM et al. West J Emerg Med. 2021. DOI 10.5811/westjem.2020.11.48427 (Europe PMC record)
- Jones S et al. Emerg Med J. 2022;39(3):168-173. DOI 10.1136/emermed-2021-211572 (Europe PMC record)
- Sax DR et al. JAMA Netw Open. 2023;6(3):e233404. DOI 10.1001/jamanetworkopen.2023.3404 (Europe PMC record); correction JAMA Netw Open. 2024;7(6):e2423536 (https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2819968)
- Smith GB et al. Resuscitation. 2020;149:202-208. DOI 10.1016/j.resuscitation.2020.01.001 (https://eprints.bournemouth.ac.uk/33271/)
- CIHI. Emergency Department Wait Time for Physician Initial Assessment (90% Spent Less, in Hours). https://www.cihi.ca/en/indicators/emergency-department-wait-time-for-physician-initial-assessment-90-spent-less-in-hours
- ACEM. Access Block. https://acem.org.au/Content-Sources/Advancing-Emergency-Medicine/Better-Outcomes-for-Patients/Access-Block

---

## Verified for publication on priage.app (checked 2026-10-17 by the main session)

Each line below was read on the source itself (journal record via Europe PMC REST, or the agency page). These are the only figures the page uses.

1. **Jones et al., Emerg Med J 2022;39(3):168-173, doi:10.1136/emermed-2021-211572** (Europe PMC record, PMID 35042695). "For every 82 admitted patients whose time to inpatient bed transfer is delayed beyond 6 to 8 hours from time of arrival at the ED, there is one extra death." Also: "A statistically significant linear increase in mortality was found from 5 hours after time of arrival at the ED up to 12 hours (when accurate data collection ceased)". Dataset: "5 249 891 individual patients". Population: patients admitted from English EDs, April 2016 to March 2018, waiting for a hospital bed (not pre-assessment waiting-room patients).
2. **Cairns, Ashman, Kang. NCHS Data Brief No. 503, 2024** (cdc.gov page). "In 2022, 155 million emergency department (ED) visits occurred in the United States."
3. **Sax et al., JAMA Netw Open 2023;6(3):e233404** (Europe PMC record). "The sensitivity of ESI to identify a patient with high-acuity illness (correctly assigning ESI I or II among patients who had a life-stabilizing intervention) was 65.9%." Population sentence: "All ED encounters by patients 18 years and older between January 1, 2016, and December 31, 2020, were assessed for eligibility." So "adult" is correct.
4. **Royal College of Emergency Medicine press release, 1 April 2024** (rcem.ac.uk page, read directly). The sentence reads, in its two clauses as printed: "RCEM estimates that there were almost 14,000 associated excess deaths related to waits of 12 hours or longer in 2023" ... "more than 268 a week." The same sentence attributes the method to the Standard Mortality Ratio (one additional death for every 72 patients with an 8 to 12 hour wait prior to admission). Population: all patients with 12 hour or longer A&E waits in England in 2023; "65% of those were patients awaiting admission". This supersedes the UNVERIFIED status in section 5.1.
5. **McNaughton et al., JACEP Open 2024, doi:10.1002/emp2.13299** (Europe PMC record). "The composite outcome of 7-day all-cause mortality or hospitalization was 3.4% in the recent period versus 2.9% in the baseline period". Periods are defined in the methods sentence: "April 1, 2022 to March 31, 2023 (recent period)" and "April 1, 2014 to March 31, 2020 (baseline period)" (source uses a range dash). Also: "LWBS ED visits after April 1, 2020 exceeded the baseline period's single-month LWBS maximum of 4.0% in 15 out of 36 months." Population: adults in Ontario, Canada.

### Added 2026-10-17: the wait before triage (verified on Europe PMC records)

6. **Betz M, Stempien J, Trivedi S, Bryce R. CJEM 2017, doi:10.1017/cem.2016.398** (PMID 27917744). "Of patients subsequently categorized as CTAS 1 or 2, 20.8% waited longer than the recommended time-to-physician of 15 minutes to be triaged." Population: walk-in (non-ambulance) patients at one Canadian ED; CTAS 1 or 2 n=53. The only corrigendum (doi:10.1017/cem.2017.18) fixes an author's name spelling.
7. **Houston C, Sanchez LD, Fischer C, Volz K, Wolfe R. West J Emerg Med 2015, doi:10.5811/westjem.2014.11.22824** (PMID 25671006). "For patients who waited for triage, median time from arrival to triage was 11 minutes (IQR 5-19, range 1-105)." "During times of peak volume, 8.5% of all patients arriving to the ED waited more than 10 minutes for triage." "This wait is not accounted for in the normal reporting of ED throughput times and metrics." Population: one US urban academic ED.

### Added 2026-10-17: capacity, staffing and cost (verified on the source itself)

8. **Leuchter RK et al., JAMA Netw Open 2025;8(2):e2460645, doi:10.1001/jamanetworkopen.2024.60645** (PMC11840646 full text). "The mean US hospital occupancy was 63.9% (range, 63%-66%) from 2009 to 2019 compared with 75.3% (range, 72%-79%) in the year following the end of the COVID-19 public health emergency (PHE; May 2023 to April 2024)". "The number of staffed hospital beds declined from a prepandemic steady state of 802 000 (2009-2019 mean) to a post-PHE steady state of 674 000, whereas the mean daily census steady state remained at approximately 510 000". Projection: "a critical hospital occupancy threshold of 85% may be reached by approximately 2032 for adult beds".
9. **Janke AT, Melnick ER, Venkatesh AK. JAMA Netw Open 2022;5(9):e2233964, doi:10.1001/jamanetworkopen.2022.33964** (PMC9526134 full text). "when occupancy exceeded 85%, boarding exceeded The Joint Commission 4-hour standard for 88.9% of hospital-months". "median ED boarding time was 6.58 hours compared with 2.42 hours in other hospital-months". US hospitals, January 2020 to December 2021.
10. **Shah MK et al., JAMA Netw Open 2021;4(2):e2036469, doi:10.1001/jamanetworkopen.2020.36469** (Europe PMC abstract). "Among nurses who reported leaving their job in 2017 (n = 418 769), 31.5% reported burnout as a reason". "Respondents who reported leaving or considering leaving their job owing to burnout reported a stressful work environment (68.6% and 59.5%, respectively) and inadequate staffing (63.0% and 60.9%, respectively)." National Sample Survey of Registered Nurses, N = 50 273.
11. **NSI Nursing Solutions, 2026 NSI National Health Care Retention & RN Staffing Report** (PDF read directly). "RN turnover is recorded at 17.6%". "nurses working in behavior health, emergency services and telemetry experienced the highest" turnover. "the average cost of turnover for a bedside RN is $60,090 resulting in the average hospital losing between $4.2m – $6.2m" (source punctuation).
12. **Canellas MM et al., Ann Emerg Med 2024;84(4):376-385, doi:10.1016/j.annemergmed.2024.04.012** (Europe PMC abstract). "The total daily cost per patient with acute stroke was US$1856, for med/surg boarding versus US$993 for med/surg inpatient care and US$2267, for ICU boarding versus US$2165, for ICU inpatient care." "ED nurses spent 293 min/d (mean) caring for each med/surg boarder; inpatient nurses spent 313 min/d for each med/surg inpatient. ED nurses spent 419 min/d caring for each ICU boarder; inpatient nurses spent 787 min/d for each ICU inpatient." One academic comprehensive stroke center. The page's "+$863" and "20 fewer minutes" (and ICU "+$102", "368 fewer") are subtraction from these figures.
13. **Sun BC et al., Ann Emerg Med 2013;61(6):605-611, doi:10.1016/j.annemergmed.2012.10.026** (Europe PMC abstract). "Excess outcomes attributable to periods of high ED crowding included 300 inpatient deaths (95% CI 200 to 500 inpatient deaths), 6,200 hospital days (95% CI 2,800 to 8,900 hospital days), and $17 million (95% CI $11 to $23 million) in costs." California, 2007 admissions, 187 hospitals.

Not yet found: a verified payer (insurer) side cost of waiting-room delays or boarding. Norton V et al., Health Aff Sch 2025 (emergency physicians on boarding) was read but not used, because its framing blames hospitals.
