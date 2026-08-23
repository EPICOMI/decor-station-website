# Deferred / Perpetual To-Do

Items intentionally postponed during active development of the non-technical-automation branch. Revisit after all phases are complete and tested.

## Styling

- [ ] Add `.badge-featured` CSS rule to the stylesheet (referenced in `catalog.njk` and `products/products.njk` but not yet styled -- currently renders as unstyled text).
- [ ] Decide on visual treatment for the "Featured" badge (color, placement, icon vs text) consistent with the Indian-decor color scheme and fonts already defined for the site.
- [ ] Verify featured-badge placement doesn't overlap the image cycler or product title on small screens.

## CMS scope

- [ ] Make homepage hero panel quotes (index.njk) CMS-editable via _data/site.json. Deferred because the quotes use custom `<span class="accent">`/`.material`/`.highlight` markup for colored emphasis; doing this safely requires reviewing css/style.css to replicate the exact accent colors (e.g. via markdown `**bold**` mapped to `.panel-quote strong`) without a visual regression on the live homepage.

## Production auth setup (Phase 2)

- [ ] Deploy the sveltia-cms-auth Cloudflare Worker and update admin/config.yml `base_url` with the real Worker URL.
- [ ] Register a GitHub OAuth App and connect its client ID/secret to the Worker.
- [ ] Create a dedicated GitHub account for the business owner and add it as a Write collaborator on the repo.
- [ ] Once merged to main, change admin/config.yml `backend.branch` from `non-technical-automation` to `main`.

## Notes

Add new deferred items below as they come up during Phase 2 onward.
