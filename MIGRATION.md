# Migrating from 0.1.x to 0.2.0

0.2.0 deliberately removes the 0.1 compatibility surface.

## Styles

`anasthasia/styles` no longer styles `body`, headings, paragraphs, links, code, horizontal rules, or scrollbars. Import the optional reset if the application wants those defaults:

```css
@import 'anasthasia/styles';
@import 'anasthasia/reset';
```

Replace flavour token overrides:

| 0.1                                  | 0.2                                             |
| ------------------------------------ | ----------------------------------------------- |
| `--radius-md`                        | `--radius-anasthasia-md`                        |
| `--font-sans`                        | `--font-anasthasia-sans`                        |
| `--font-mono`                        | `--font-anasthasia-mono`                        |
| `--background-image-accent-gradient` | `--background-image-anasthasia-accent-gradient` |
| `.text-accent-gradient`              | `.anasthasia-text-accent-gradient`              |
| `.bevel-accent`                      | `.anasthasia-bevel-accent`                      |

Add semantic info/success/warning/danger foreground, surface, and border tokens to custom flavours when overriding the neutral defaults.

The multicolor flavour was renamed without a compatibility alias:

```css
/* 0.1 */
@import 'anasthasia/flavours/dusk';

/* 0.2 */
@import 'anasthasia/flavours/spectrum';
```

## Theme

```ts
// 0.1
theme.dark;
theme.toggle();

// 0.2
theme.mode;
theme.isDark;
theme.setMode('light'); // light | dark | system
```

Call `theme.destroy()` when the root owner is destroyed.

## Removed APIs

- Remove `uiPrefs`. Own key-hint visibility in the application and pass it to `<KeyHintBar visible={...} />`.
- Remove `Button.success` and `successLabel`. Display completion state beside the action or through Alert/Toast.
- Replace `<Card onclick={...}>` with `<InteractiveCard onclick={...}>`.
- `Select.icon` was removed. Compose icons outside the control.
- `keyboard.smartRegister` was replaced by `keyboard.registerMany`.
- `keyboard.register` now returns an unregister function and accepts an options object instead of an ID string.
- Keyboard components, manager, and key-hint APIs moved from `anasthasia` to the optional `anasthasia/keyboard` entrypoint.
- Internal `dist/components/ui/*`, `dist/stores/*`, and other deep paths no longer exist. Import public components and runtime APIs from `anasthasia`; import keyboard APIs from `anasthasia/keyboard`.

## Required changes

- Add a meaningful `label` to every `ProgressBar`.
- Add `ariaLabel` to unlabeled `Select` and `SegmentedControl` instances.
- Use either `title` or `ariaLabel` on every `Dialog`.
- Update peer versions to Svelte 5.30+ and Tailwind CSS 4.

## Component API changes

| Component          | 0.1                                           | 0.2                                                                     |
| ------------------ | --------------------------------------------- | ----------------------------------------------------------------------- |
| `Button`           | `success`, `successLabel`                     | Removed; use Alert or Toast for completion feedback                     |
| `Card`             | Optional `onclick` changed semantics          | Static only; use `InteractiveCard` or `LinkCard`                        |
| `Dialog`           | Custom overlay                                | Native modal dialog; adds `ariaLabel` and `closeOnEscape`               |
| `ProgressBar`      | Required numeric `value`, no accessible label | `label` required; omit `value` for indeterminate progress               |
| `Select`           | Optional `icon`                               | `icon` removed; adds `ariaLabel`, `searchPlaceholder`, disabled options |
| `SegmentedControl` | Basic button group                            | Radio-group semantics; add `ariaLabel` when no visible label exists     |
| `KeyHintBar`       | Visibility read from `uiPrefs`                | Application passes `visible` explicitly                                 |

Callbacks consistently use lower-case DOM-style names (`onclick`, `onchange`, `onclose`). Composite controls use `ariaLabel`; wrappers that forward native element attributes accept the native `aria-label` attribute.

Keyboard registration now returns its own cleanup function:

```ts
// 0.1
const id = keyboard.register('meta+k', handler, 'open-command-menu');
keyboard.unregister(id);

// 0.2
const unregister = keyboard.register('meta+k', handler, {
	id: 'open-command-menu',
	allowInInput: false
});
unregister();
```

Move keyboard imports and opt into their styles only in applications that use them:

```ts
// 0.1
import { keyboard, Kbd, KeyHintBar } from 'anasthasia';

// 0.2
import { keyboard, Kbd, KeyHintBar } from 'anasthasia/keyboard';
```

```css
@import 'anasthasia/keyboard/styles';
```

## Behavior changes

- Dialog uses the browser top layer, makes the background inert, locks scrolling, and restores focus.
- Select keeps focus on the combobox, uses active-descendant navigation, and flips its portal near viewport edges.
- Tooltip portals to `document.body` by default, flips away from constrained edges, and stays inside the visual viewport.
- SegmentedControl uses radio semantics and standard Arrow/Home/End navigation.
- Keyboard shortcuts are ignored in editable controls unless `allowInInput` is true.
- Toast timers pause on hover/focus and are always cleaned up.
- Crimson and Spectrum use neutral application surfaces. Spectrum replaces Dusk and uses the blue-to-violet-to-red primary gradient; Imperial is unchanged.
