# Break it Down — Component Library

## Integration Guide for Astro + CosmicThemes

This is a reusable component library for all Break it Down articles. Every article gets the same design system — consistent callouts, stat treatments, evidence tables, and editorial formatting — by importing from a shared set of Astro components.

---

## Installation

### 1. Copy components into your project

Place the `bid/` folder inside your existing components directory:

```
src/
├── components/
│   ├── bid/                        ← NEW: Break it Down components
│   │   ├── StatCallout.astro
│   │   ├── Callout.astro
│   │   ├── ComparisonBox.astro
│   │   ├── CaseConclusion.astro
│   │   ├── PulledQuote.astro
│   │   ├── StatRow.astro
│   │   ├── FigureEmbed.astro
│   │   ├── EvidenceTable.astro
│   │   ├── SectionDivider.astro
│   │   ├── ActionCards.astro
│   │   └── BidBlockquote.astro     ← auto-applied blockquote override
│   └── ... (existing CosmicThemes components)
├── config/
│   └── bid-tokens.ts               ← design token definitions
├── data/
│   └── blog/
│       └── ai-primer/
│           └── index.mdx           ← articles written in MDX
```

### 2. Register design tokens in Tailwind

In your `tailwind.config.mjs`, import and extend with the BID tokens:

```js
// tailwind.config.mjs
import { bidColors } from './src/config/bid-tokens'

export default {
  theme: {
    extend: {
      colors: bidColors,
      fontFamily: {
        'bid-serif': ['Georgia', "'Times New Roman'", 'serif'],
        'bid-sans': ["'Helvetica Neue'", 'Arial', 'sans-serif'],
      },
    },
  },
  // ... rest of your config
}
```

### 3. Apply global blockquote override in your blog layout

In your blog post layout (likely something like `src/layouts/BlogPost.astro` or wherever CosmicThemes renders `<Content />`), pass the blockquote override:

```astro
---
// src/layouts/BlogPost.astro (or similar)
import BidBlockquote from '@components/bid/BidBlockquote.astro'

const { post } = Astro.props;
const { Content } = await post.render();
---

<!-- Pass custom components to override default HTML elements -->
<Content components={{ blockquote: BidBlockquote }} />
```

This automatically styles every `>` blockquote in your MDX with the BID treatment. No imports needed in individual articles for basic blockquotes.

### 4. Ensure MDX is installed

CosmicThemes' Kitchen Sink starter supports both `.md` and `.mdx` in content collections. Verify `@astrojs/mdx` is in your `astro.config.mjs`:

```js
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx(), /* ... other integrations */],
});
```

### 5. Ensure React is installed (for interactive figures)

The interactive figures (Jagged Frontier, Failure Cascade, etc.) are React components. Verify `@astrojs/react` is configured:

```js
import react from '@astrojs/react';

export default defineConfig({
  integrations: [mdx(), react(), /* ... */],
});
```

---

## The Component Library

### Quick Reference

| Component | Purpose | Use when... |
|-----------|---------|-------------|
| `StatCallout` | Big pulled statistic | A number should stop a scanner |
| `StatRow` | 2-4 stats side by side | Numbers should be compared at a glance |
| `Callout` | Typed editorial box | Insight, myth debunking, warning, definition, or evidence finding |
| `ComparisonBox` | Side-by-side comparison | Two concepts should be contrasted (RAG vs. fine-tuning, etc.) |
| `CaseConclusion` | "What it reveals" box | After a case study, delivering the analytical takeaway |
| `PulledQuote` | Isolated impact statement | A sentence should land like a hammer (2-3 per article max) |
| `EvidenceTable` | Research summary table | Multiple studies should be compared |
| `ActionCards` | Numbered action items | "What to do" recommendations |
| `FigureEmbed` | Interactive figure wrapper | Embedding a React figure with consistent captioning |
| `SectionDivider` | Visual transition | Between sections or at a narrative pivot point |
| `BidBlockquote` | Styled blockquote | Applied automatically (no import needed) |

---

## Usage Examples

### StatCallout

Big, visually prominent number. Use for any statistic that should be visible to someone scanning the page.

```mdx
import StatCallout from '@components/bid/StatCallout.astro'

<StatCallout
  value="42%"
  label="of companies abandoned most AI initiatives in 2025 — up from 17% the year before"
  source="S&P Global 2025"
  accent="coral"
/>
```

**Accent options:** `coral` (failure/emphasis), `teal` (positive/insight), `slate` (neutral/authority), `gold` (highlight)

### StatRow

Horizontal comparison of 2-4 stats. Use when the juxtaposition tells the story.

```mdx
import StatRow from '@components/bid/StatRow.astro'

<StatRow stats={[
  { value: "70–80%", label: "AI failure range", accent: "coral" },
  { value: "40–50%", label: "traditional IT failure", accent: "muted" },
  { value: "~2×", label: "higher than baseline", accent: "slate" },
]} />
```

### Callout

Multi-variant editorial box. Five types for five purposes:

```mdx
import Callout from '@components/bid/Callout.astro'

{/* Insight — key analytical finding */}
<Callout type="insight" title="The Solow paradox, 2026 edition">
  Task-level AI gains have not yet materialised in aggregate economic data.
  The gap is real, and the explanation is structural.
</Callout>

{/* Myth — debunking a misconception */}
<Callout type="myth" title="Myth vs. evidence">
  **"85% of AI projects fail"** — traces to a 2017 Gartner analyst's social media posts.
  No published methodology. No sample frame. No definition of failure.
</Callout>

{/* Warning — risk or caution */}
<Callout type="warning" title="The compounding error problem">
  If each step has 95% reliability, a 20-step workflow succeeds only **36%** of the time.
</Callout>

{/* Definition — term explanation */}
<Callout type="definition" title="Retrieval-Augmented Generation (RAG)">
  Retrieves relevant documents from your data at query time and includes them
  alongside the user's question. The most widely deployed enterprise AI pattern.
</Callout>

{/* Evidence — research finding */}
<Callout type="evidence" title="Skill compression">
  AI disproportionately helps less experienced workers. Brynjolfsson's least
  experienced agents saw roughly double the improvement of the most experienced.
</Callout>
```

### ComparisonBox

Side-by-side comparison table. Use when two approaches need to be contrasted.

```mdx
import ComparisonBox from '@components/bid/ComparisonBox.astro'

<ComparisonBox
  leftTitle="RAG"
  rightTitle="Fine-Tuning"
  rows={[
    { label: "How it works", left: "Retrieves documents at query time", right: "Retrains model on organisation-specific data" },
    { label: "Requires", left: "Document pipeline, vector database", right: "Curated datasets, ML engineering, periodic retraining" },
    { label: "Best for", left: "Grounding in current organisational data", right: "Domain-specific language, proprietary processes" },
    { label: "Cost", left: "Moderate (infra + pipeline)", right: "High ($10K–$100K+ per training run)" },
    { label: "Adoption", left: "Most common enterprise pattern", right: "Use when RAG isn't sufficient" },
  ]}
  caption="For most enterprise use cases, start with RAG and fine-tune only if RAG cannot deliver sufficient performance."
/>
```

Use `accent="contrast"` for red/green treatments (e.g., success vs. failure patterns).

### CaseConclusion

Visually distinct takeaway after a case study. Signals "this is the lesson."

```mdx
import CaseConclusion from '@components/bid/CaseConclusion.astro'

<CaseConclusion>
  Readiness is not additive. World-class talent combined with synthetic data
  produced biased training. A massive budget combined with an unrealistic
  timeline produced premature deployment. Strong individual dimensions
  interacted to produce weak outcomes.
</CaseConclusion>
```

### PulledQuote

Visually isolated statement for maximum impact. **Use sparingly — 2-3 per article maximum.** These are the sentences that should stop someone mid-scroll.

```mdx
import PulledQuote from '@components/bid/PulledQuote.astro'

<PulledQuote>Motors depreciate. Wiring compounds.</PulledQuote>

<PulledQuote attribution="Deborah Lovich, BCG">
  The technology was deployed. It was culturally refused.
</PulledQuote>
```

### EvidenceTable

Formatted research table. Use when multiple studies need to be compared at a glance.

```mdx
import EvidenceTable from '@components/bid/EvidenceTable.astro'

<EvidenceTable
  title="The evidence base: six controlled studies, 11,000+ workers"
  studies={[
    { author: "Brynjolfsson et al.", year: 2025, n: "5,172", journal: "QJE", domain: "Customer support", finding: "Largest real-world AI study. Least experienced gained most.", effect: "+15–30%", positive: true },
    { author: "Noy & Zhang", year: 2023, n: "453", journal: "Science", domain: "Writing", finding: "Time fell 40%. Quality rose 18%. Skill distribution compressed.", effect: "+18%", positive: true },
    { author: "Dell'Acqua et al.", year: 2023, n: "758", journal: "HBS", domain: "Consulting", finding: "Inside frontier: +40% quality. Outside: −19pp accuracy.", effect: "+40%/−19pp", positive: true },
    { author: "METR", year: 2025, n: "16", journal: "RCT", domain: "Software dev", finding: "Experienced devs 19% slower — while perceiving 24% faster.", effect: "−19%", positive: false },
  ]}
  source="Effect sizes approximate where studies report ranges."
/>
```

### ActionCards

Numbered recommendations for "what to do" sections.

```mdx
import ActionCards from '@components/bid/ActionCards.astro'

<ActionCards actions={[
  {
    title: "Audit the data estate",
    body: "96% of organisations that attempted AI found their training data insufficient. Data readiness appears in 100% of validated readiness frameworks.",
    source: "Gartner 2025"
  },
  {
    title: "Scope to one problem",
    body: "The impulse to pursue multiple AI initiatives in parallel correlates with failure, not ambition. Leaders pursue 3.5 use cases vs. 6.1 for struggling companies.",
    source: "BCG / MIT NANDA"
  },
  {
    title: "Budget for the full system, not the model",
    body: "Apply BCG's 10-20-70 rule. If more than 30% of the budget goes to models, compare against documented failure patterns.",
    source: "BCG 2017–2025"
  },
]} />
```

### FigureEmbed

Wrapper for interactive React figures. Provides consistent title, description, and source treatment.

```mdx
import FigureEmbed from '@components/bid/FigureEmbed.astro'
import JaggedFrontier from '@components/bid/figures/JaggedFrontier'

<FigureEmbed
  number={2}
  title="The Jagged Frontier"
  description="AI performance across 26 tasks from six controlled studies. Above the line, AI improved outcomes. Below it, AI made things worse."
  source="Brynjolfsson et al. (QJE 2025, N=5,172); Noy & Zhang (Science 2023, N=453); Dell'Acqua et al. (HBS 2023, N=758); Peng et al. (arXiv 2023, N=95); Cui et al. (SSRN 2025, N=4,867); METR (2025, N=16)"
>
  <JaggedFrontier client:load />
</FigureEmbed>
```

**Note:** The React figure should be "headless" — no background, no title, no source line. The `FigureEmbed` wrapper provides all of that. This is important for the existing figures: they'll need their outer chrome stripped so the wrapper handles consistency.

### SectionDivider

Visual break between sections or at a narrative pivot.

```mdx
import SectionDivider from '@components/bid/SectionDivider.astro'

{/* Simple decorative break */}
<SectionDivider />

{/* Pivoting statement */}
<SectionDivider statement="Then it got more complicated." />
```

---

## Architecture Decisions

### Why Astro components (not React)?

Most of these components have **zero interactivity**. They're purely presentational — styled containers for text. Astro components render to static HTML with zero JavaScript. This keeps page weight minimal and load times fast.

Only the interactive figures (Jagged Frontier, Failure Cascade, Investment Allocation, etc.) need React — and those use `client:load` or `client:visible` directives to hydrate only when needed.

### Why not just Tailwind Typography overrides?

Tailwind Typography (`@tailwindcss/typography`) handles base prose styling well, but Break it Down needs **semantic formatting** — a "myth debunking" box is visually different from an "evidence finding" box, which is different from a "key statistic." These semantic distinctions can't be expressed in markdown alone. MDX components let the author say *what kind of content this is*, and the component handles *how it looks*.

### How does `<Content components={...} />` work?

When Astro renders MDX via content collections, the `<Content />` component accepts a `components` prop that maps HTML elements to custom components:

```astro
<Content components={{
  blockquote: BidBlockquote,  // all > blockquotes get BID styling
  table: BidTable,            // (if you add one later)
  h2: BidH2,                  // (if you want custom section headers)
}} />
```

This is applied once in the layout and affects every MDX article rendered through that layout. No per-article imports needed for basic elements.

### What about articles that aren't part of Break it Down?

The BID components use `bid-*` prefixed Tailwind classes that won't conflict with your CosmicThemes styling. Standard blog posts that don't import BID components are completely unaffected. The `BidBlockquote` override is applied at the layout level — if you want it only for BID articles, use a separate layout or conditional:

```astro
---
const isBidArticle = post.data.category === 'break-it-down';
const components = isBidArticle ? { blockquote: BidBlockquote } : {};
---
<Content components={components} />
```

---

## Design Tokens

The full palette is defined in `src/config/bid-tokens.ts`. Every component references these tokens via Tailwind classes like `text-bid-coral`, `bg-bid-teal/5`, `border-bid-border`.

| Token | Hex | Usage |
|-------|-----|-------|
| `bid-bg` | #FAFAF8 | Page background |
| `bid-surface` | #FFFFFF | Card/panel background |
| `bid-border` | #E8E6E1 | Borders, rules, dividers |
| `bid-text` | #1A1A1A | Primary text |
| `bid-text-secondary` | #6B6560 | Body text, descriptions |
| `bid-text-tertiary` | #9C9690 | Captions, labels, sources |
| `bid-slate` | #264653 | Primary accent, authority |
| `bid-teal` | #2A9D8F | Positive, success, insight |
| `bid-gold` | #E9C46A | Highlight, model layer |
| `bid-warm` | #F4A261 | Warning, caution |
| `bid-coral` | #E76F51 | Negative, failure, emphasis |
| `bid-positive` | #2D6A4F | Inside frontier, healthy |
| `bid-negative` | #9B2226 | Outside frontier, failing |

---

## File Checklist

```
src/
├── components/
│   └── bid/
│       ├── StatCallout.astro       ✓
│       ├── Callout.astro           ✓
│       ├── ComparisonBox.astro     ✓
│       ├── CaseConclusion.astro    ✓
│       ├── PulledQuote.astro       ✓
│       ├── StatRow.astro           ✓
│       ├── FigureEmbed.astro       ✓
│       ├── EvidenceTable.astro     ✓
│       ├── SectionDivider.astro    ✓
│       ├── ActionCards.astro       ✓
│       ├── BidBlockquote.astro     ✓
│       └── figures/                (existing React interactives)
│           ├── JaggedFrontier.jsx
│           ├── EnterpriseAIStack.jsx
│           ├── FailureCascade.jsx
│           └── ...
├── config/
│   └── bid-tokens.ts              ✓
└── data/
    └── blog/
        └── ai-primer/
            └── index.mdx           (next step: rewrite with components)
```
