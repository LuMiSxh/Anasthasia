# Anasthasia component reference

All components use Svelte 5 runes and accept `class` on their root element. Native element attributes are forwarded where the component represents one native control. Composite controls use `ariaLabel`; native wrappers accept the real `aria-label` attribute. Value callbacks consistently use lower-case DOM-style names such as `onchange` and `onclose`.

## Controls

### Button

Extends `HTMLButtonAttributes`.

| Prop           | Type                                      | Default     |
| -------------- | ----------------------------------------- | ----------- |
| `variant`      | `primary \| secondary \| ghost \| danger` | `secondary` |
| `size`         | `sm \| md \| lg`                          | `md`        |
| `loading`      | `boolean`                                 | `false`     |
| `loadingLabel` | `string`                                  | `Working`   |

Loading sets `aria-busy`, disables interaction, and replaces the child label.

### IconButton

Extends `HTMLButtonAttributes`. Requires the accessible `label` prop and an icon snippet. Supports the same variants and sizes as `Button`.

### Input / Textarea

Extend their native HTML attributes and support `bind:value`.

| Prop    | Type     |
| ------- | -------- |
| `label` | `string` |
| `hint`  | `string` |
| `error` | `string` |

Hints and errors are connected with `aria-describedby`; errors also set `aria-invalid`.

### Select

Anasthasia intentionally provides a custom select so popup, typography, spacing, and keyboard behavior match the rest of the design system. It supports optional filtering without changing components.

| Prop                  | Type                 | Default            |
| --------------------- | -------------------- | ------------------ |
| `options`             | `SelectOption<T>[]`  | required           |
| `value`               | `T`                  | bindable           |
| `label` / `ariaLabel` | `string`             | —                  |
| `search`              | `boolean`            | `false`            |
| `searchPlaceholder`   | `string`             | `Search…`          |
| `placeholder`         | `string`             | `Select an option` |
| `hint` / `error`      | `string`             | —                  |
| `onchange`            | `(value: T) => void` | —                  |

The popup portals to `document.body`, flips at viewport edges, and keeps DOM focus on the combobox while exposing the active option through `aria-activedescendant`.

### Toggle

Extends button attributes, uses `role="switch"`, and supports `bind:checked`, `onchange`, `label`, and `hint`. Supply `aria-label` when no visible label exists.

### SegmentedControl

Accepts `SegmentedControlOption<T>[]`, `bind:value`, `label`/`ariaLabel`, and `onchange`. It uses radio-group semantics, roving tab focus, Arrow keys, Home, and End.

## Feedback

### Alert / Badge

Variants are `info`, `success`, `warning`, and `danger`; Badge additionally supports `default`, `accent`, and `mono`. Alert's `live` prop can be `off`, `polite`, or `assertive`.

### ProgressBar

`label` is required. `value` is a number from 0 to 1; omit it for indeterminate progress. Optional props are `valueText`, `variant`, `color`, and `class`.

### Spinner

Supports `label`, `size`, `variant`, and `class`. Variants are `accent`, `success`, `warning`, and `danger`. It exposes `role="status"`.

### ToastProvider and toast

Mount one provider near the application root:

```svelte
<ToastProvider position="bottom-right" maxVisible={4} />
```

Call `toast.info`, `toast.success`, `toast.warning`, `toast.danger`, or `toast.show`. Toasts pause while hovered or focused, clear their timers when dismissed, and are SSR-safe. `class` customizes the provider root like it does on the other components.

### EmptyState

Requires `title`; accepts `description`, `icon`, `actions`, and `class`.

## Layout and overlays

- `Card` is a static container.
- `InteractiveCard` extends button attributes.
- `LinkCard` extends anchor attributes and requires `href`.
- `FieldRow` supports `responsive`, `horizontal`, and `vertical` orientation.
- `Panel` supports `label`, semantic `title`, `headingLevel`, `actions`, and optional entrance animation.
- `Dialog` uses native modal `<dialog>` behavior, restores focus, locks background scrolling, and supports `title`, `description`, `ariaLabel`, `closeOnBackdrop`, and `closeOnEscape`.

Every dialog must have either `title` or `ariaLabel`.

## Supporting UI

- `Tooltip`: `content`, `placement`, `portal`, `offset`, and a trigger snippet. Tooltips portal to `document.body` by default, flip away from constrained viewport edges, and remain viewport-clamped. Set `portal={false}` only for deliberately local positioning.
- `PathDisplay`: compact path or empty-state text.
- `SectionLabel`: compact uppercase section label.

## Optional keyboard entrypoint

Keyboard utilities are not part of the main bundle. Import them only when an application needs shortcuts or visible shortcut hints:

```ts
import {
	keyboard,
	Kbd,
	KeyComboDisplay,
	KeyHintBar,
	keyHint,
	handleKeyHint,
	mountedHint
} from 'anasthasia/keyboard';
```

```css
@import 'anasthasia/keyboard/styles';
```

- `Kbd`: semantic keyboard-key display.
- `KeyComboDisplay`: formats a normalized combo for macOS, Windows, or Linux. Use `platform` for deterministic SSR output.
- `KeyHintBar`: optional presentation helper. Finished applications do not need to mount it unless shortcut discovery is part of their UI.

All three keyboard presentation components accept `class` on their root element.

## Theme store

```ts
theme.init('system');
theme.setMode('light'); // light | dark | system
theme.mode;
theme.isDark;
theme.destroy();
```

`init` and `destroy` are safe to call from a root component's mount lifecycle. System mode reacts to OS changes.

## Keyboard manager

```ts
import { keyboard } from 'anasthasia/keyboard';

const unmount = keyboard.mount();
const unregister = keyboard.register('meta+shift+k', handleShortcut, {
	allowInInput: false
});

// cleanup
unregister();
unmount();
```

Combos are canonicalized, so `Command+Shift+KeyK` and `shift+meta+k` are equivalent. `registerMany` is available for groups. Mounting is reference-counted.

## Key hints

`keyHint.register()` returns a cleanup callback. `mountedHint` and `handleKeyHint` are Svelte actions. Focused scopes use `focusin`/`focusout`, so hints also work for composite controls.

## Motion

Exports: `riseIn`, `riseOut`, `pageFade`, `slideUp`, `slideDown`, `sidebarSlide`, `softCollapse`, `glassCollapse`, `sendPill`, and `receivePill`. JavaScript transitions reduce their duration to zero when `prefers-reduced-motion` is active.

## Styles

- `anasthasia/styles`: tokens and component utilities
- `anasthasia/reset`: optional global typography defaults
- `anasthasia/flavours/{imperial|crimson|spectrum}`: complete light and dark flavour tokens

See [README.md](README.md) for the full token contract and [MIGRATION.md](MIGRATION.md) for 0.1.x migration.
