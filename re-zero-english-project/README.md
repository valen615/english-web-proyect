# Re:Zero — English Class Project

A small animated website retelling the opening of *Re:Zero − Starting Life in a
Different World*, built for an English class assignment.

## Folder structure

```
re-zero-project/
├── index.html              ← home page
├── templates/
│   ├── story.html           ← the opening we wrote, plus a soundboard
│   ├── characters.html      ← flip cards for the main cast
│   ├── gallery.html         ← character art
│   └── about.html           ← project info & sources
├── static/
│   ├── css/style.css        ← all styling and animations
│   ├── js/script.js         ← starfield, nav menu, scroll reveal, soundboard, gallery logic
│   ├── images/              ← character pictures used on the Gallery page
│   └── audio/                ← sound clips used on the Story page's soundboard
└── README.md
```

## How to open it

1. Unzip the folder and open it in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (optional but recommended), then
   right-click `index.html` → **Open with Live Server**.
   - You can also just double-click `index.html` to open it straight in a
     browser — everything still works, since the site uses only relative
     file paths.

## Images and audio

`static/images/` already has pictures for Subaru, Reinhard, Lye Batenkaitos,
Shaula, and the cover art. `static/audio/` already has the three clips used
by the soundboard on the Story page. If you want to swap any of them out,
just replace the file — the filename it looks for is set in each page's
`<img>` or `data-audio` attribute.

The Gallery page is also built to fail gracefully: if any image file is ever
missing, that tile shows a clean placeholder instead of a broken image icon.

## What's inside, technically

- **HTML** — five pages, sharing one nav bar and footer.
- **CSS** (`static/css/style.css`) — a dark, violet/gold "night sky over
  Lugnica" theme, custom Google Fonts (Cinzel + Manrope), flip cards, a
  soundboard, and full mobile responsiveness.
- **JavaScript** (`static/js/script.js`) — a canvas starfield animation,
  scroll-triggered fade-ins, a mobile menu toggle, active-link highlighting,
  a playful "loops survived" counter using `localStorage`, a soundboard
  player (one clip plays at a time), and the image-fallback logic for the
  gallery.

## A note for grading

The story and character summaries on this site are original rewrites made
for this assignment, not copied text from the anime or novels. See the
About page for links to official sources used for research.
