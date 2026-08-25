# Deferred / Perpetual To-Do

Items intentionally postponed during active development. Revisit as needed.

## Paused pending in-person meeting with the owner

Both items below are intentionally on hold until Prakhar meets the owner in person. No need to raise these again until then.

- [ ] **Hero panel CMS-editability decision**: should the homepage hero panels (index.njk) remain code-only or become CMS-editable via _data/site.json?
  - Making it CMS-editable is technically low-hassle (markdown `**bold**` mapped to `.panel-quote strong`, plus optional per-panel images) but has one real cost: Panel 2's hand-choreographed word-by-word stagger animation is hard-wired to the exact current wording/word count and would be lost if the text becomes freely editable. The base whole-block fade-in for Panel 2 would still work; only the extra per-word flourish goes away. Panels 1, 3, and 4 are unaffected since their animations are whole-block, not per-word.
  - If the owner is fine losing that flourish: revisit the full plan discussed on 2026-08-24 (markdown-it dependency, _data/site.json hero.panels[] with quote+image fields, index.njk template updates, admin/config.yml Site Settings additions, css/style.css additions for `.panel-quote strong` / `.panel-inner-with-image` / `.panel-image`).
  - If not: leave hero panels as code-only permanently and close this item.
- [ ] Create a dedicated GitHub account for the business owner and add it as a Write collaborator on the repo, then have the owner log in themselves at least once to confirm their account (not just Prakhar's) can save changes.

## Notes

- The current 20 products in _data/productEntries/ are placeholders (most literally named "Placeholder Item A" through "R") used to preview how the catalog looks. The owner plans to delete and replace all of them with real products and photos -- no need to treat their current content as final or worth preserving.
- Mobile rendering of the site and the CMS itself have both been manually verified and confirmed working (2026-08-25).
- Add new deferred items below as they come up.
