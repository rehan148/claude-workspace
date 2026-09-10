# Instagram Reels Analysis Report

**Requested:** Fetch, scrape, and deeply analyse five Instagram reels, then produce a combined report.
**Prepared:** 2026-09-10
**Status:** ⚠️ **Content analysis could not be completed.** Instagram is blocked by this environment's outbound network policy. See [Section 2](#2-what-was-attempted) for the full attempt log and [Section 5](#5-how-to-complete-this-analysis) for how to unblock it.

Everything below is either (a) verifiable from the attempt log, or (b) derived mathematically from the URLs themselves. Nothing about the *content* of the reels (video, caption, creator, audio, engagement) has been observed, and none of it is guessed here.

---

## 1. Reels in scope

| # | Shortcode | URL (share token stripped) |
|---|-----------|----------------------------|
| 1 | `Dc4AUnCs95O` | https://www.instagram.com/reel/Dc4AUnCs95O/ |
| 2 | `DdFMzMuuTNT` | https://www.instagram.com/reel/DdFMzMuuTNT/ |
| 3 | `Dcrrb6ItPOa` | https://www.instagram.com/reel/Dcrrb6ItPOa/ |
| 4 | `Dc9EV_lp7NM` | https://www.instagram.com/reel/Dc9EV_lp7NM/ |
| 5 | `DcqnVpEpv4J` | https://www.instagram.com/reel/DcqnVpEpv4J/ |

The `?stkn=` share tokens on the original links are per-share tracking parameters. They do not change which reel is loaded and are omitted above to avoid leaking who shared the links.

---

## 2. What was attempted

Every route to the content was tried and every one was denied at the network-policy layer, not by Instagram itself.

| Method | Target | Result |
|--------|--------|--------|
| `curl` with browser User-Agent | `www.instagram.com/reel/<code>/` ×5 | `CONNECT tunnel failed, response 403` from the egress proxy (policy denial) |
| WebFetch (server-side fetch) | `www.instagram.com/reel/<code>/` ×5 | `EGRESS_BLOCKED: Access to www.instagram.com is blocked by the network egress proxy` |
| WebFetch, public embed endpoint | `www.instagram.com/p/<code>/embed/captioned/` ×5 | `EGRESS_BLOCKED` (same host) |
| Web search on each shortcode | `"<code>" instagram reel` ×5 | No indexed result for any of the five codes. Only generic Instagram Reels pages and downloader-tool sites were returned. |

The proxy status endpoint recorded each failure as `connect_rejected — gateway answered 403 to CONNECT (policy denial or upstream failure)` for `www.instagram.com:443`. The environment's own guidance is explicit that organisation policy denials must be reported, not retried or routed around, so third-party mirror/scraper sites were **not** used.

**Why search found nothing:** Instagram reel pages are rarely indexed by search engines within days of posting, and all five reels are between one and eleven days old (see Section 3). This is expected and does not indicate the reels are private or deleted.

---

## 3. Metadata derivable from the URLs alone

Instagram shortcodes are a base-64 encoding (alphabet `A–Z a–z 0–9 - _`) of the internal 64-bit media ID. The upper 41 bits of that ID are a millisecond timestamp offset from Instagram's ID epoch (`1314220021721` ms, i.e. 2011-08-24T21:07:01.721Z). Decoding therefore gives a reliable **posting time** for each reel without touching Instagram.

| # | Shortcode | Media ID | Posted (UTC) | Age at report time |
|---|-----------|----------|--------------|--------------------|
| 3 | `Dcrrb6ItPOa` | 3975462129933546394 | 2026-08-30 23:20:37 | ~11 days |
| 5 | `DcqnVpEpv4J` | 3975162632132296201 | 2026-08-30 13:25:34 | ~11 days |
| 1 | `Dc4AUnCs95O` | 3978931687092641358 | 2026-09-04 18:14:01 | ~6 days |
| 4 | `Dc9EV_lp7NM` | 3980356749237924684 | 2026-09-06 17:25:21 | ~4 days |
| 2 | `DdFMzMuuTNT` | 3982645740399309651 | 2026-09-09 21:13:10 | ~1 day |

Observations that hold regardless of content:

- **Tight time window.** All five were posted within a ten-day span (30 Aug – 9 Sep 2026). If these are candidate references for a single project or trend, they are contemporaneous.
- **Two posted the same day.** Reels 3 and 5 went up roughly ten hours apart on 30 August. Whether they are from the same creator cannot be determined from the ID alone (the low bits are a shard/sequence, not an account identifier).
- **Chronological order** for any timeline-based analysis: 5 → 3 → 1 → 4 → 2.

Nothing else (creator, caption, audio, duration, views, likes, comments, on-screen text, transcript) is recoverable offline. Any report claiming those details without having loaded the page would be fabricated.

---

## 4. Per-reel analysis template (to be filled once content is available)

The deep analysis requested will follow this structure for each reel. It is left empty deliberately rather than populated with guesses.

### Reel N — `<shortcode>`
- **Creator / handle:**
- **Posted:** *(from Section 3)*
- **Duration:**
- **Hook (first 1–3 s):** what is shown/said, on-screen text, pattern interrupt used
- **Format:** talking head / voiceover B-roll / text-on-screen / skit / tutorial / UGC / etc.
- **Narrative structure:** beat-by-beat breakdown with timestamps
- **Caption:** verbatim, plus analysis of CTA, keyword use, and hashtags
- **Audio:** original vs trending sound; role of music vs speech
- **Editing style:** cut cadence, captions/subtitle style, transitions, aspect and framing
- **Engagement signals:** views, likes, comments, shares, saves if visible; like:view ratio
- **Comment-section themes:** top recurring reactions or questions
- **Why it works / doesn't:** the specific retention and share mechanics at play
- **Transferable takeaways:** concrete, reusable tactics

### Combined section
- Cross-reel patterns (hooks, lengths, formats, sounds)
- Engagement comparison table
- Ranked list of the most replicable tactics
- Recommendations

---

## 5. How to complete this analysis

Any one of the following unblocks the work. Option A is the least effort if you control the environment.

**A. Allow Instagram in the environment's network policy.**
Add `www.instagram.com` (and `scontent*.cdninstagram.com` for media files) to the allowlist for this Claude Code environment, then re-run the request. Even with that, Instagram serves only limited public metadata (Open Graph title/description, thumbnail) to unauthenticated requests; captions and counts are usually present in the `og:description` tag, but full transcripts and comments are not.

**B. Paste the content into the repo or the chat.**
For each reel, provide any of: the caption text, a screen recording or the downloaded `.mp4`, an auto-generated transcript, or screenshots of the reel and its comments. Drop them in `reports/reels-input/<shortcode>/` and the analysis in Section 4 can be filled in fully, including frame-level breakdown if the video file is supplied.

**C. Provide the creators' handles.**
If the accounts are known, creator profile pages and cross-posted copies on other platforms (YouTube Shorts, TikTok) are often reachable and indexed, which would allow a partial analysis even with Instagram itself still blocked.

---

## 6. Summary

- **Delivered:** attempt log, precise posting timestamps for all five reels, chronological ordering, and the analysis framework.
- **Not delivered:** any content-level analysis. The environment's egress policy blocks `www.instagram.com` for all fetch methods, and no public index of these shortcodes exists yet.
- **Next step:** choose one of the three unblock options in Section 5.
