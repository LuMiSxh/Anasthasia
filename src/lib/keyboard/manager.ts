export interface KeyboardRegistrationOptions {
	id?: string;
	allowInInput?: boolean;
}

type KeyHandler = {
	id: string;
	allowInInput: boolean;
	callback: (event: KeyboardEvent) => void | boolean;
};

const modifierOrder = ['ctrl', 'alt', 'shift', 'meta'] as const;
const modifierAliases: Record<string, (typeof modifierOrder)[number]> = {
	control: 'ctrl',
	ctrl: 'ctrl',
	option: 'alt',
	alt: 'alt',
	shift: 'shift',
	command: 'meta',
	cmd: 'meta',
	meta: 'meta',
	win: 'meta'
};

function normalizeKey(key: string): string {
	const normalized = key.trim().toLowerCase();
	if (normalized === ' ') return 'space';
	if (normalized === 'esc') return 'escape';
	if (/^key[a-z]$/.test(normalized)) return normalized.slice(3);
	if (/^digit[0-9]$/.test(normalized)) return normalized.slice(5);
	return normalized;
}

export function normalizeCombo(combo: string): string {
	const modifiers = new Set<(typeof modifierOrder)[number]>();
	let key = '';
	for (const rawPart of combo.split('+')) {
		const part = rawPart.trim().toLowerCase();
		const modifier = modifierAliases[part];
		if (modifier) modifiers.add(modifier);
		else if (part) key = normalizeKey(part);
	}
	return [...modifierOrder.filter((modifier) => modifiers.has(modifier)), key]
		.filter(Boolean)
		.join('+');
}

class KeyboardManager {
	private handlers = new Map<string, KeyHandler[]>();
	private mountCount = 0;
	private nextId = 0;

	register(
		combo: string,
		callback: (event: KeyboardEvent) => void | boolean,
		options: KeyboardRegistrationOptions = {}
	): () => void {
		const normalized = normalizeCombo(combo);
		if (!normalized) throw new Error('Keyboard shortcut cannot be empty');
		const id = options.id ?? `kb-${++this.nextId}`;
		const handlers = this.handlers.get(normalized) ?? [];
		if (handlers.some((handler) => handler.id === id))
			throw new Error(`Handler "${id}" already registered`);
		handlers.push({ id, callback, allowInInput: options.allowInInput ?? false });
		this.handlers.set(normalized, handlers);
		return () => this.unregister(id);
	}

	unregister(id: string): void {
		for (const [combo, handlers] of this.handlers) {
			const remaining = handlers.filter((handler) => handler.id !== id);
			if (remaining.length !== handlers.length) {
				if (remaining.length) this.handlers.set(combo, remaining);
				else this.handlers.delete(combo);
				return;
			}
		}
	}

	registerMany(
		registrations: Array<{
			combo: string;
			callback: (event: KeyboardEvent) => void | boolean;
			options?: KeyboardRegistrationOptions;
		}>
	): () => void {
		const cleanups = registrations.map(({ combo, callback, options }) =>
			this.register(combo, callback, options)
		);
		return () => cleanups.forEach((cleanup) => cleanup());
	}

	mount(): () => void {
		if (typeof window === 'undefined') return () => undefined;
		this.mountCount += 1;
		if (this.mountCount === 1) window.addEventListener('keydown', this.handleKeyDown);
		let active = true;
		return () => {
			if (!active) return;
			active = false;
			this.mountCount = Math.max(0, this.mountCount - 1);
			if (this.mountCount === 0) window.removeEventListener('keydown', this.handleKeyDown);
		};
	}

	private handleKeyDown = (event: KeyboardEvent): void => {
		const modifiers = [
			event.ctrlKey ? 'ctrl' : '',
			event.altKey ? 'alt' : '',
			event.shiftKey ? 'shift' : '',
			event.metaKey ? 'meta' : ''
		].filter(Boolean);
		const combo = normalizeCombo([...modifiers, normalizeKey(event.key)].join('+'));
		const handlers = this.handlers.get(combo) ?? [];
		const target = event.target;
		const editable =
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			(target instanceof HTMLElement && target.isContentEditable);

		for (let index = handlers.length - 1; index >= 0; index -= 1) {
			const handler = handlers[index];
			if (editable && !handler.allowInInput) continue;
			if (handler.callback(event) === true) break;
		}
	};
}

export const keyboard = new KeyboardManager();
