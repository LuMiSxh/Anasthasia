import { afterEach, describe, expect, it, vi } from 'vitest';
import { keyboard, normalizeCombo } from './manager.js';

describe('normalizeCombo', () => {
	it('canonicalizes modifier order and aliases', () => {
		expect(normalizeCombo('Command+Shift+KeyK')).toBe('shift+meta+k');
		expect(normalizeCombo('META + SHIFT + k')).toBe('shift+meta+k');
		expect(normalizeCombo('Ctrl+Digit1')).toBe('ctrl+1');
	});
});

describe('keyboard manager', () => {
	const cleanups: Array<() => void> = [];
	afterEach(() => cleanups.splice(0).forEach((cleanup) => cleanup()));

	it('dispatches canonical shortcuts and returns cleanup functions', () => {
		const callback = vi.fn();
		cleanups.push(keyboard.register('meta+shift+k', callback));
		cleanups.push(keyboard.mount());
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, shiftKey: true }));
		expect(callback).toHaveBeenCalledOnce();
	});

	it('does not dispatch in editable controls unless explicitly allowed', () => {
		const blocked = vi.fn();
		const allowed = vi.fn();
		cleanups.push(keyboard.register('meta+k', blocked));
		cleanups.push(keyboard.register('meta+k', allowed, { allowInInput: true }));
		cleanups.push(keyboard.mount());
		const input = document.body.appendChild(document.createElement('input'));
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
		expect(blocked).not.toHaveBeenCalled();
		expect(allowed).toHaveBeenCalledOnce();
		input.remove();
	});
});
