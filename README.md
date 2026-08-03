# MetroNet — project structure

```
index.html                     MetroOS desktop + Gateway window (the shell — never edit site content here)

assets/
  css/
    desktop.css                Desktop background, icons, taskbar. Loaded on every page.
    browser.css                Browser window chrome (title bar, menus, address bar, status bar). Loaded on every page.
    character.css              Shared look for ALL social/character profile pages. Loaded on every page.
  js/
    browser.js                 Navigation logic: the SITES registry, back/forward, loading messages, dragging.
  img/                         Put images here, reference with a relative path like ../../assets/img/whatever.png
  fonts/

sites/
  gridex/index.html       The homepage
  personal/vex.html            GeoCities-style personal pages
  corporations/aegis.html      Corporate sites
  forums/board.html            Forum threads
  social/_TEMPLATE.html        Copy this to make a new character profile page
  social/nova.html             A filled-in example of the template
  government/                  Empty for now — same pattern as above once you build one
  news/                        Empty for now
  maps/                        Empty for now
```

## How a page gets on screen

`index.html` never changes what's inside the browser window directly. Instead, `assets/js/browser.js`
`fetch()`es a page's html file and drops it into the `#browser-content` div. That's what makes the
browser feel like it "never closes" — you're just swapping content inside the same window.

Every file inside `sites/` is a **fragment**, not a full page: no `<html>`, `<head>`, or `<body>` tags,
just a `<style>` block (if that page needs its own look) followed by the markup. That's the "each page
holds its own CSS" approach — open any file in `sites/personal/`, `sites/corporations/`, `sites/forums/`,
or `sites/gridex/` and everything about how it looks is right there at the top of that same file.

The one exception is `sites/social/` (character profile pages) — those all share
`assets/css/character.css` instead, so every character's profile has a consistent MySpace/Facebook-y
feel. See `sites/social/_TEMPLATE.html` for how to add a new one; it has "EDIT:" comments marking every
spot you'd actually touch, and `sites/social/nova.html` shows a filled-in example.

## Adding any new page (not just character pages)

1. Create the `.html` file in the right `sites/` subfolder.
2. Give it its own `<style>` block at the top (skip this for character pages — they use character.css).
3. Open `assets/js/browser.js` and add one entry to the `SITES` object at the top:
   ```js
   myKey: {
     title: "Page Title",
     url:   "http://fake-in-universe-url.metro/",
     path:  "sites/whatever-folder/my-file.html"
   },
   ```
4. Link to it from anywhere with `<a onclick="loadSite('myKey')">link text</a>`.

## Testing locally

Because pages load via `fetch()`, opening `index.html` by double-clicking it will fail in most browsers
(the `file://` protocol blocks fetch requests). Run a tiny local server from the project's root folder
instead, then visit `http://localhost:8000`:

```
python3 -m http.server 8000
```

Neocities itself serves everything over `https://`, so this only matters for testing on your own
computer — it'll work fine once uploaded.
