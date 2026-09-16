# Manufacturing Insurance Academy

A free, static training site for new insurance agents and producers learning
commercial insurance for manufacturers.

## What's here

- **10 lessons** (`lessons/01-*.html` &ndash; `10-*.html`) covering property,
  general/product liability, workers' comp, equipment breakdown, business
  interruption, auto/inland marine, umbrella/excess, and cyber/environmental
  risk, ending with a capstone on building a full program.
- Each lesson ends with a **5-question knowledge check**. Scores are saved to
  `localStorage` on the visitor's device (no account, no backend) and shown
  as progress badges on the home page.
- **Market Updates** (`market-updates.html`) is a curated, sourced digest of
  current manufacturing insurance market trends (rates, litigation, cyber,
  tariffs), each entry linking to its original source. It's maintained by
  hand, not pulled live &mdash; update it periodically with fresh research.

## Structure

```
index.html                  Home page: lesson catalog + progress dashboard
market-updates.html         Curated market news digest
lessons/                    One HTML file per lesson
assets/css/style.css        Shared styles
assets/js/storage.js        localStorage helpers for quiz progress
assets/js/quiz.js           Renders and grades the quiz on each lesson page
assets/js/main.js           Renders the lesson catalog + progress bar on the home page
```

## Running locally

No build step or dependencies required. From the project root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Updating market updates

Add a new `<article class="update-card" data-tags="...">` block inside
`market-updates.html`, following the existing pattern (headline, one-line
summary, a "why it matters" callout, and a source link). Valid tags used by
the filter buttons are: `property`, `casualty`, `cyber`, `workerscomp`,
`tariffs`.

## Adding or editing a lesson

Copy the structure of an existing file in `lessons/`, keeping the shared
header/footer/nav markup intact. Each lesson defines its quiz inline via a
`<script>` block setting `window.LESSON_ID` and `window.QUIZ_DATA` before
loading `assets/js/quiz.js`. If you add a new lesson, also add it to the
`LESSONS` array in `assets/js/main.js` so it appears in the home page catalog.

## Content disclaimer

All lesson and market-update content is for educational purposes only and is
not legal, underwriting, or coverage advice.
