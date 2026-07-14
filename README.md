<div align="center">

# Anasthasia

**Accessible Svelte 5 components for desktop-grade applications**

Semantic design tokens, interaction utilities, and themed UI primitives for Svelte and Tauri projects.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/LuMiSxh/Anasthasia)](https://github.com/LuMiSxh/Anasthasia/tags)

[Overview](#overview) • [Features](#features) • [Installation](#installation) • [Quick Start](#quick-start) • [Development](#development)

</div>

---

## Overview

Anasthasia is the shared Svelte component system used across my desktop applications. It provides accessible controls, namespaced design tokens, light/dark theme handling, portals, transitions, notifications, and optional keyboard-hint utilities.

Version 0.2 is intentionally breaking. Existing 0.1 users should read [MIGRATION.md](MIGRATION.md).

## Features

- Controls including buttons, inputs, selects, toggles, text areas, and segmented controls
- Feedback components including alerts, badges, progress bars, spinners, toasts, and empty states
- Cards, panels, dialogs, field rows, tooltips, and path displays
- Explicit light, dark, and system theme modes
- Namespaced tokens that do not overwrite an application's global Tailwind values
- Optional keyboard shortcuts, key hints, dropdown portals, and tooltip portals
- Component, consumer-type, accessibility, and browser tests

The full component API is documented in [COMPONENTS.md](COMPONENTS.md).

## Installation

Requirements:

- Svelte 5.30+
- Tailwind CSS 4
- A modern browser or WebView with native `<dialog>` support

Install the current release from GitHub:

```sh
pnpm add github:LuMiSxh/Anasthasia#v0.2.0
```

Load the optional bundled fonts from the root layout:

```svelte
<script lang="ts">
	import 'anasthasia/bootstrap';
	import './app.css';

	const { children } = $props();
</script>

{@render children()}
```

Then load the component styles and a flavour:

```css
@import 'tailwindcss';
@import 'anasthasia/styles';
@import 'anasthasia/flavours/imperial';
```

`anasthasia/reset` adds optional global typography defaults. The component styles work without it.

## Quick Start

```svelte
<script lang="ts">
	import { Button, Input, Panel, Select } from 'anasthasia';

	let name = $state('');
	let format = $state<'avif' | 'webp'>('avif');
</script>

<Panel title="Export">
	<div class="flex flex-col gap-4">
		<Input label="Name" bind:value={name} />
		<Select
			label="Format"
			options={[
				{ value: 'avif', label: 'AVIF' },
				{ value: 'webp', label: 'WebP' }
			]}
			bind:value={format}
		/>
		<Button variant="primary">Export</Button>
	</div>
</Panel>
```

Initialize theme tracking once in the application shell:

```ts
import { theme } from 'anasthasia';

theme.init('system');
```

Applications that need shortcut handling import it separately:

```ts
import { keyboard, Kbd, KeyHintBar } from 'anasthasia/keyboard';
```

```css
@import 'anasthasia/keyboard/styles';
```

## Theming

Available flavours are:

- `imperial`: high-contrast gold and black
- `crimson`: neutral surfaces with a red accent
- `spectrum`: slate surfaces with a blue-to-violet-to-red gradient

Neutral accessible defaults are built into `anasthasia/styles`, so using a flavour is optional. All public color, radius, font, and gradient tokens use the `anasthasia` namespace; see [COMPONENTS.md](COMPONENTS.md) for the complete contract.

## Development

```sh
pnpm install
pnpm run dev
pnpm run verify
pnpm run test:e2e
pnpm run build
```

`verify` runs formatting and lint checks, Svelte diagnostics, unit/component tests, consumer type tests, package generation, and Publint. Playwright and Axe cover browser behavior and accessibility.

The development server exposes a component laboratory at `/`, with one route per public component.

## Documentation

- [Component reference](COMPONENTS.md)
- [Migration guide](MIGRATION.md)
- [Changelog](CHANGELOG.md)

Until 1.0, patch releases remain compatible within a minor line. Breaking changes require a new minor version and migration notes.

## License

Anasthasia is licensed under the [MIT License](LICENSE).
