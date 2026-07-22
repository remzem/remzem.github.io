# Worldwiki starter

A small Eleventy (11ty) wiki, styled like a Fandom/Miraheze-style article
wiki (sidebar nav + infobox), built to deploy to Neocities.

## Folder structure

```
content/
  characters/   <- one .md file per character
  locations/    <- one .md file per location
_includes/
  layouts/base.njk       <- the page shell (topbar, sidebar, infobox slot)
  partials/infobox.njk   <- the infobox panel
css/style.css   <- all styling
index.njk               <- homepage
characters/index.njk     <- auto-generated list of all characters
locations/index.njk      <- auto-generated list of all locations
```

## Adding a new page

Copy an existing file in `content/characters/` or `content/locations/`,
rename it, and edit the frontmatter (the part between `---`) and the body
text below it. Example:

```md
---
layout: layouts/base.njk
title: Your Character Name
category: character
infobox:
  image: /img/placeholder.png
  fields:
    - label: Role
      value: ...
    - label: Species
      value: ...
---

Write the article body here in normal Markdown.
```

The homepage and category list pages (`/characters/`, `/locations/`) update
automatically — you don't need to add links anywhere else.

To add a brand new category (e.g. "factions"), just make a new folder under
`content/`, and copy the pattern from `characters/index.njk` into a new
`factions/index.njk`, swapping the category name.

## Running it locally

```
npm install
npm run serve
```

This starts a local preview server so you can see changes before pushing.

## How publishing works

1. Edit/add `.md` files, commit, push to `main` (either via `git` locally,
   or directly through GitHub's web editor — no local setup required).
2. A GitHub Action (`.github/workflows/deploy.yml`) automatically builds the
   site and uploads it to Neocities.
3. Live in a minute or two, no manual upload needed.

### One-time setup for step 2

1. Get a Neocities API key from your site's Settings page.
2. In the GitHub repo: Settings → Secrets and variables → Actions → New
   repository secret, name it `NEOCITIES_API_KEY`, paste the key.
3. Push to `main` — the Action will run automatically from then on.
