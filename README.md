# lifted. — V1

A deliberately small state-of-mind reset built around real quotations.

## Product promise

**Choose how you feel → receive one real, well-matched quotation → get lifted.**

No generated wisdom. No feed. No account. No backend.

## V1 interaction

1. Visitor lands on `lifted.`
2. They answer **How are you feeling?**
3. Lifted selects a verified quote tagged to that state.
4. They can choose **lift me again** or **different feeling**.
5. `source` exposes provenance.
6. `why this quote?` exposes only the state transition used by the matcher.

## V1 states

- lost
- confused
- afraid
- discouraged
- stuck
- restless
- overwhelmed
- angry
- doubtful
- inspired
- curious
- grateful

## Architecture

Static only:

```text
/
├── index.html
├── style.css
├── app.js
├── quotes.js
└── README.md
```

There are no dependencies, no framework, no build step and no API.

Open `index.html` locally or deploy the directory directly to GitHub Pages / any static host.

## Quote selection

`app.js`:

- filters by the selected state
- randomly selects from eligible quotes
- suppresses the last 3 quotes shown for that state during the browser session
- falls back to the full pool when the state pool is exhausted

Nothing is sent anywhere.

## Content gate

The included `quotes.js` is a **verified seed set**, not the final public library.

Before public launch, expand toward roughly **50–75 quotations** and apply this rule to every entry:

1. Attribution must be identifiable.
2. Quote wording must match a traceable source or named translation.
3. Prefer primary sources, authoritative transcripts, archival scans, or scholarly editions.
4. If the quote is commonly misattributed, either correct it with evidence or exclude it.
5. Exclude Anonymous / Unknown / vague “proverb” entries from V1.
6. Store the source and source URL internally.
7. For modern copyrighted works, keep excerpts short and review reuse rights before commercial publication.

### Data shape

```js
{
  id: "Q001",
  quote: "...",
  author: "...",
  source: "...",
  sourceUrl: "https://...",
  states: ["lost", "confused"],
  toward: ["direction", "perspective"],
  tone: "reflective",
  intensity: 2
}
```

## Design constraints

The design is intentionally constrained:

- approximately 90% negative space
- warm off-white background
- near-black typography
- one type family
- no imagery
- no navigation
- no dashboard
- no social features
- no AI-generated copy
- subtle upward transition only
- respects `prefers-reduced-motion`

Do not add features because there is empty space. The empty space is part of the product.

## Public-launch threshold

V1 is ready for public release when:

- 50–75 quotes have passed the provenance gate
- every state has a deep enough pool to avoid repetitive results
- mobile and desktop interactions have been tested
- every source link has been checked
- no unverified attribution remains
