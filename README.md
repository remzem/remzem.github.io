# Worldwiki starter

A small Eleventy (11ty) wiki, styled like a Fandom/Miraheze-style article
wiki (sidebar nav + infobox), built to deploy to Neocities.

## Folder structure

```
content/
  characters/   
  locations/    
_includes/
  layouts/base.njk      
  partials/infobox.njk
css/style.css  
.eleventyignore 
index.njk           
characters/index.njk    
locations/index.njk     
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
date: 2026-07-23
summary: One sentence about this page, shown on listing pages and the homepage.
infobox:
  image: /img/placeholder.png
  fields:
    - label: Role
      value: ...
    - label: Species
      value: ...
---

## Running it locally (note for self)

```
npm install
npm run serve
```
