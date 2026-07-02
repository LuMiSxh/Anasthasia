# Anasthasia

Accessible Svelte 5 components, semantic design tokens, and interaction utilities for desktop-grade applications.

Anasthasia 0.2 is intentionally breaking. See [MIGRATION.md](MIGRATION.md) before updating from 0.1.x.

## Requirements

- Svelte 5.30 or newer
- Tailwind CSS 4
- A modern browser or WebView with native `<dialog>` support

## Installation

```sh
pnpm add github:LuMiSxh/Anasthasia#v0.2.0
```

## Setup

Load the optional bundled fonts from your root layout:

```svelte
<script lang="ts">
	import 'anasthasia/bootstrap';
	import './app.css';

	const { children } = $props();
</script>

{@render children()}
```

Load Tailwind, Anasthasia's component tokens, and one flavour:

```css
@import 'tailwindcss';
@import 'anasthasia/styles';
@import 'anasthasia/flavours/imperial';
```

`anasthasia/styles` contains tokens and component utilities but does not style global HTML elements. Applications that want Anasthasia's typography defaults can opt in:

```css
@import 'anasthasia/reset';
```

## Usage

```svelte
<script lang="ts">
	import { Button, Input, Select, Panel } from 'anasthasia';

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

## Theme

The store supports explicit light/dark modes and live system preference tracking:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { theme, type ThemeMode } from 'anasthasia';

	onMount(() => {
		theme.init('system');
		return () => theme.destroy();
	});

	function setTheme(mode: ThemeMode) {
		theme.setMode(mode);
	}
</script>
```

Read `theme.mode` for the selected mode and `theme.isDark` for the resolved palette.

## Public surface

- Controls: `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Toggle`, `SegmentedControl`
- Feedback: `Alert`, `Badge`, `ProgressBar`, `Spinner`, `ToastProvider`, `EmptyState`
- Layout: `Card`, `InteractiveCard`, `LinkCard`, `Panel`, `FieldRow`, `Dialog`
- Supporting UI: `PathDisplay`, `SectionLabel`, and `Tooltip`
- Runtime utilities: `theme`, `toast`, transitions, `dropdownPortal`, and `tooltipPortal`
- Optional `anasthasia/keyboard` entrypoint: `keyboard`, `Kbd`, `KeyComboDisplay`, `KeyHintBar`, and key-hint actions/store
- Public TypeScript types for options, variants, theme modes, toast options, and actions

Full component and API documentation is in [COMPONENTS.md](COMPONENTS.md).

Keyboard shortcuts and hint UI are intentionally excluded from the main entrypoint. Applications that need them opt in explicitly:

```ts
import { keyboard, KeyHintBar } from 'anasthasia/keyboard';
```

When using the optional keyboard components, also expose their Tailwind sources:

```css
@import 'anasthasia/keyboard/styles';
```

Finished applications do not need to mount `KeyHintBar`; it is only a presentation helper for products that deliberately expose shortcut hints.

## CSS contract

All public tokens are namespaced. Flavours may override them without changing global Tailwind radius or font tokens:

```css
--color-anasthasia-bg
--color-anasthasia-surface
--color-anasthasia-panel
--color-anasthasia-border
--color-anasthasia-text
--color-anasthasia-muted
--color-anasthasia-accent
--color-anasthasia-accent-strong
--color-anasthasia-on-accent
--color-anasthasia-{info|success|warning|danger}
--color-anasthasia-{info|success|warning|danger}-surface
--color-anasthasia-{info|success|warning|danger}-border
--radius-anasthasia-{sm|md|lg|xl|2xl}
--font-anasthasia-{sans|mono}
--background-image-anasthasia-accent-gradient
```

Available flavours are:

- `imperial`: the existing high-contrast gold and black identity.
- `crimson`: neutral application surfaces with a direct red accent.
- `spectrum`: neutral slate surfaces with a blue-to-violet-to-red primary gradient.

Neutral accessible values are built into `anasthasia/styles`, so a flavour is optional.

## Development

```sh
pnpm install
pnpm run dev
pnpm run verify
pnpm run test:e2e
pnpm run build
```

`verify` runs formatting/lint checks, Svelte diagnostics, unit/component tests, consumer type tests, package generation, and Publint. Browser tests use Playwright and Axe.

The development server exposes a component laboratory at `/`. Every public component has its own `/components/<name>` route: combinable APIs use generated prop matrices, while overlays, timers, portals, and composition primitives use focused scenario pages.

## Versioning

Until 1.0, patch releases remain API-compatible within a minor line. Breaking changes require a new minor version and a migration section in [CHANGELOG.md](CHANGELOG.md).

## License

MIT. See [LICENSE](LICENSE).
