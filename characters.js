// swap these placeholders for real thumb/image paths + copy whenever they're ready.
// "page" is where clicking the thumbnail takes you - point it at that
// character's dossier page (see template.html).
// "color" retints the page (header, ticker border, name outline, etc.)
// while that character is being previewed - same palette as the
// --charcolor system in template.html, so reuse a name from there if
// you want a character's dossier and gallery tag to match.
const characters = [
  { name: "MEDINA",  desc: "shes like a bugggg",    thumb: "im/thumbs/temp.png",  image: "im/full/medina.png",  page: "medina.html",  color: "#2b4e86" },
  { name: "JUN",  desc: "???",   thumb: "im/thumbs/jun.png",  image: "im/full/jun.png",  page: "template.html",  color: "#e0972c" },
  { name: "MARTY",   desc: "???",               thumb: "im/thumbs/marty.png",  image: "im/full/marty.png",   page: "marty.html",   color: "#e0c92c" },
];

document.addEventListener('DOMContentLoaded', function () {
  const gallery  = document.getElementById('charGallery');
  const hero     = document.querySelector('.char-hero');
  const heroImg  = document.getElementById('charImg');
  const heroName = document.getElementById('charName');
  const heroDesc = document.getElementById('charDesc');
  const root     = document.documentElement;

  // --accent / --accent2 live in style.css and drive the ticker border,
  // header link hover, the name outline, etc. site-wide - overriding
  // them here retints all of that to match whoever's being previewed.
  function applyColor(character) {
    if (!character.color) return;
    root.style.setProperty('--accent', character.color);
    root.style.setProperty('--accent2', character.color);
  }

  let switching = false;

  function show(character) {
    if (switching) return;
    switching = true;
    hero.classList.add('is-switching');
    applyColor(character);

    setTimeout(function () {
      heroImg.src = character.image;
      heroImg.alt = character.name;
      heroName.textContent = character.name;
      heroDesc.textContent = character.desc;
      hero.classList.remove('is-switching');
      switching = false;
    }, 180);
  }

  characters.forEach(function (character) {
    // an <a> instead of a <button> - hover/focus still preview in the
    // hero panel, but a click (or middle-click / ctrl-click) navigates
    // to the character's page like a normal link, no JS needed for that part
    const thumb = document.createElement('a');
    thumb.className = 'char-thumb';
    thumb.href = character.page;
    thumb.style.backgroundImage = `url('${character.thumb}')`;
    thumb.setAttribute('aria-label', character.name);

    // hover for mouse, focus so keyboard nav works too
    thumb.addEventListener('mouseenter', () => show(character));
    thumb.addEventListener('focus', () => show(character));

    gallery.appendChild(thumb);
  });

  if (characters.length) show(characters[0]);
});
