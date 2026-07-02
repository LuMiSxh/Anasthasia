export { default as Kbd } from './Kbd.svelte';
export { default as KeyComboDisplay } from './KeyComboDisplay.svelte';
export { default as KeyHintBar } from './KeyHintBar.svelte';
export { keyboard, normalizeCombo } from './manager.js';
export type { KeyboardRegistrationOptions } from './manager.js';
export { handleKeyHint, keyHint, mountedHint } from './keyhint.svelte.js';
export type { Platform } from '../types.js';
