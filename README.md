<div align="center">

# Anasthasia

**A Svelte 5 component library and design system for desktop applications**

A collection of reusable UI primitives, design tokens, theme configurations, and utilities — extracted from Thasia and designed to scale.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/LuMiSxh/Anasthasia)](https://github.com/LuMiSxh/Anasthasia/tags)
[![Svelte](https://img.shields.io/badge/svelte-5-orange.svg)](https://svelte.dev)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Development](#development) • [Component Reference](COMPONENTS.md)

</div>

---

## Features

### Design Tokens

A set of semantic CSS variables (`--bg`, `--surface`, `--panel`, `--border`, `--text`, `--muted`, `--accent`, `--accent-strong`) mapped to Tailwind v4 utility classes via `@theme`. Every component is built using these tokens, avoiding hardcoded colors.

### Component Library

18 Svelte 5 components covering common UI elements:

| Primitives         | Feedback        | Layout         | Keyboard          |
| ------------------ | --------------- | -------------- | ----------------- |
| `Button`           | `Alert`         | `Card`         | `Kbd`             |
| `Input`            | `Badge`         | `Panel`        | `KeyComboDisplay` |
| `Select`           | `ToastProvider` | `FieldRow`     | `KeyHintBar`      |
| `Toggle`           | `ProgressBar`   | `SectionLabel` | —                 |
| `SegmentedControl` | `Dialog`        | `PathDisplay`  | —                 |

### Theming

Light and dark mode support using a `.dark` class on `<html>`. The `theme` store manages toggles and saves preferences to localStorage, falling back to OS settings. Color transitions are handled via CSS (300ms).

### Flavour System

A flavour is a CSS file defining light (`:root`) and dark (`.dark`) color tokens. The base `styles.css` does not include colors, so importing a flavour is required.

**Available flavours:**

| Flavour    | Light                                       | Dark                                     |
| ---------- | ------------------------------------------- | ---------------------------------------- |
| `imperial` | Light: Warm whites and gold                 | Dark: Deep blacks and gold               |
| `crimson`  | Light: Warm off-whites and deep red         | Dark: Near-black with vivid red          |

Import your chosen flavour in your stylesheet after `anasthasia/styles`. You can add custom flavours by creating a new CSS file with `:root` and `.dark` blocks.

### Transitions

11 transition utilities designed for desktop layouts, including `riseIn`, `riseOut`, `pageFade`, `slideUp`, `slideDown`, `sidebarSlide`, `softCollapse`, `glassCollapse`, `sendPill`, and `receivePill`.

---

## Installation

```sh
pnpm add github:LuMiSxh/Anasthasia#v0.1.1
```

### Prerequisites

- [Svelte](https://svelte.dev) 5+
- [Tailwind CSS](https://tailwindcss.com) v4

---

## Usage

### 1. Load fonts

Import once in your root layout to load Geist Sans and JetBrains Mono from `@fontsource`:

```svelte
<script lang="ts">
	import 'anasthasia/bootstrap';
	import './app.css';

	const { children } = $props();
</script>

{@render children()}
```

### 2. Import base styles and a flavour

In your root stylesheet:

```css
@import 'tailwindcss';
@import 'anasthasia/styles';
@import 'anasthasia/flavours/imperial';
```

`anasthasia/styles` sets up the Tailwind theme tokens, typography, and utility classes, while the flavour provides the colors. Both imports are required.

### 3. Use components

```svelte
<script lang="ts">
	import { Button, Card, Input, Select, Dialog } from 'anasthasia';
</script>

<Card>
	<Input label="Name" placeholder="Enter your name" />
	<Select
		label="Role"
		options={[
			{ value: 'admin', label: 'Admin' },
			{ value: 'user', label: 'User' }
		]}
		bind:value={role}
	/>
	<Button variant="primary">Save</Button>
</Card>
```

### 4. Theme toggle

```svelte
<script lang="ts">
	import { theme } from 'anasthasia';
</script>

<button onclick={() => theme.toggle()}>
	{theme.current === 'dark' ? 'Light mode' : 'Dark mode'}
</button>
```

### Available exports

| Export                         | Contents                                                                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `anasthasia`                   | All 18 components, stores (`theme`, `toast`, `uiPrefs`, `keyHint`), `keyboard` manager, all transitions, `dropdownPortal` action |
| `anasthasia/bootstrap`         | Font imports (Geist Sans, JetBrains Mono)                                                                                        |
| `anasthasia/styles`            | Tailwind v4 theme tokens, typography, utilities — no colors                                                                      |
| `anasthasia/flavours/imperial` | Imperial flavour (light + dark color tokens)                                                                                     |

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org) 22+
- [pnpm](https://pnpm.io)

### Setup

```sh
# Clone the repository
git clone https://github.com/LuMiSxh/Anasthasia.git
cd Anasthasia

# Install dependencies
pnpm install

# Run dev server
pnpm run dev

# Type check
pnpm run check

# Build package
pnpm run build
```

### Adding a flavour

Create `src/lib/flavours/<name>.css` with `:root` and `.dark` blocks using the eight token variables, then add an export entry to `package.json`:

```json
"./flavours/<name>": "./dist/flavours/<name>.css"
```

### Versioning

The `Version Tag` workflow runs lint, type-check, and build, then commits the bumped version and creates a `vX.Y.Z` git tag. Trigger it manually via GitHub Actions with a semver input.

---

## Component Reference

Detailed API documentation, guidelines, and usage examples for all components, stores, and transitions can be found in [COMPONENTS.md](COMPONENTS.md).

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

**An open-source project by LuMiSxh**

[GitHub](https://github.com/LuMiSxh/Anasthasia) • [Issues](https://github.com/LuMiSxh/Anasthasia/issues) • [Releases](https://github.com/LuMiSxh/Anasthasia/tags)

</div>
