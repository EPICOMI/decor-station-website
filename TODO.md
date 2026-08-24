# Deferred / Perpetual To-Do

Items intentionally postponed during active development. Revisit as needed.

## CMS scope

- [ ] **Pending decision from owner**: should the homepage hero panels (index.njk) remain code-only (edited by Prakhar, not via CMS) or become CMS-editable via _data/site.json?
  - Making it CMS-editable is technically low-hassle (markdown `**bold**` mapped to `.panel-quote strong`, plus optional per-panel images) but has one real cost: Panel 2's hand-choreographed word-by-word stagger animation is hard-wired to the exact current wording/word count and would be lost if the text becomes freely editable. The base whole-block fade-in for Panel 2 would still work; only the extra per-word flourish goes away. Panels 1, 3, and 4 are unaffected since their animations are whole-block, not per-word.
  - If the owner is fine losing that flourish in exchange for being able to edit hero text and add optional images per panel: revisit the full plan discussed on 2026-08-24 (markdown-it dependency, _data/site.json hero.panels[] with quote+image fields, index.njk template updates, admin/config.yml Site Settings additions, css/style.css additions for `.panel-quote strong` / `.panel-inner-with-image` / `.panel-image`).
  - If the owner wants to keep the current artistic flourish intact: leave hero panels as code-only permanently and close this item.

## Production auth setup (Phase 3)

- [x] ~~Deploy the sveltia-cms-auth Cloudflare Worker and update admin/config.yml base_url with the real Worker URL.~~ Done -- deployed to sveltia-cms-auth.prakharverma2006.workers.dev.
- [x] ~~Register a GitHub OAuth App and connect its client ID/secret to the Worker.~~ Done -- verified working end-to-end with a real login and a real saved commit on main.
- [x] ~~Once merged to main, change admin/config.yml backend.branch from non-technical-automation to main.~~ Done.
- [ ] Create a dedicated GitHub account for the business owner and add it as a Write collaborator on the repo, then have the owner log in themselves at least once to confirm their account (not just Prakhar's) can save changes.

## Notes

Add new deferred items below as they come up.
