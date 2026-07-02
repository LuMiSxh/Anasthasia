# Changelog

Notable changes are documented here. Before 1.0, patch releases are compatible within their minor line; breaking changes increment the minor version.

## [0.2.0] - 2026-07-02

### Added

- `Textarea`, `IconButton`, `Spinner`, `Tooltip`, `EmptyState`, `InteractiveCard`, and `LinkCard`.
- Public component option, variant, theme, toast, platform, keyboard, and portal types.
- Semantic info/success/warning/danger tokens with accessible foreground, surface, and border roles.
- Explicit `light`, `dark`, and `system` theme modes with live OS preference tracking.
- Unit, component, consumer-type, Playwright focus, and Axe accessibility tests.
- A route-based component laboratory with generated prop matrices, focused interaction scenarios, and flavour visual baselines.
- Optional global reset at `anasthasia/reset`.
- An optional `anasthasia/keyboard` entrypoint; finished applications no longer pull shortcut or hint UI through the main import.

### Changed

- Rebuilt Dialog on native modal `<dialog>` behavior with top-layer rendering, focus restoration, background inertness, and scroll locking.
- Rebuilt Select and SegmentedControl keyboard/focus behavior around standard combobox and radio-group semantics.
- Namespaced radius, font, gradient, and utility tokens so flavours no longer mutate global Tailwind tokens.
- Made application preferences the consumer's responsibility; KeyHintBar now accepts `visible`.
- Keyboard registration returns cleanup functions, canonicalizes combo order/aliases, and uses reference-counted mounting.
- Toast timers are SSR-safe, pausable, and cleaned up deterministically.
- Split package and demo builds and hardened CI/release verification.
- Raised the supported peer floor to Svelte 5.30 and declared Tailwind CSS 4 as a peer.
- Reworked Crimson around neutral application surfaces and replaced Dusk with Spectrum, a neutral slate flavour with a blue-to-violet-to-red primary gradient. Imperial remains unchanged.
- Made `class` available on ToastProvider and all optional keyboard presentation components.

### Removed

- `uiPrefs`.
- `Button.success` and `successLabel`.
- Interactive behavior from `Card`; use `InteractiveCard` or `LinkCard`.
- `Select.icon`.
- `keyboard.smartRegister` and string IDs in `keyboard.register`.
- Implicit global typography and scrollbar styling from `anasthasia/styles`.
- Unnamespaced radius, font, gradient, and utility contracts.
- Unused `ComponentIcon` and `EmptyStateAction` type placeholders.
- The `anasthasia/flavours/dusk` export; use `anasthasia/flavours/spectrum`.

### Fixed

- Missing accessible names/descriptions, progress semantics, toast live regions, reduced-motion handling, and deterministic SSR platform rendering.
- Duplicate Select IDs, incomplete popup positioning, stale toast timers, shortcut modifier ordering, and unsafe browser-global access.
- Imperial light-mode text contrast.
- Dark flavour precedence and primary-button seams caused by blending translucent borders over multicolor gradients.
- Segmented-control pill animation collisions, PathDisplay vertical alignment, and Spinner intent styling.
- Tooltip stacking in clipped or transformed containers by portalling tooltips to `document.body` by default.

See [MIGRATION.md](MIGRATION.md) for required consumer changes.

## [0.1.2] - 2026-05-23

### Added

- Searchable Select and improved dropdown scrolling.

## [0.1.1] - 2026-05-06

### Fixed

- Release workflow corrections.

## [0.1.0] - 2026-05-03

### Added

- Initial Svelte 5 component library, flavour system, stores, keyboard utilities, and transitions.
