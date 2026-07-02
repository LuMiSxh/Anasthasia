import type { ToastOptions, ToastVariant } from '../types.js';

export interface ToastItem extends Required<Pick<ToastOptions, 'variant' | 'timeout'>> {
	id: number;
	message: string;
	title?: string;
	actionLabel?: string;
	action?: () => void;
}

interface TimerState {
	handle?: number;
	remaining: number;
	startedAt: number;
}

class ToastStore {
	items = $state<ToastItem[]>([]);
	private nextId = 0;
	private timers = new Map<number, TimerState>();

	show(message: string, options: ToastOptions = {}) {
		const item: ToastItem = {
			id: ++this.nextId,
			variant: options.variant ?? 'info',
			title: options.title,
			message,
			timeout: options.timeout ?? 4000,
			actionLabel: options.actionLabel,
			action: options.action
		};
		this.items = [...this.items, item];
		if (item.timeout > 0) {
			this.timers.set(item.id, { remaining: item.timeout, startedAt: 0 });
			this.resume(item.id);
		}
		return item.id;
	}

	info(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
		return this.show(message, { ...options, variant: 'info' });
	}
	success(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
		return this.show(message, { ...options, variant: 'success' });
	}
	warning(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
		return this.show(message, { ...options, variant: 'warning' });
	}
	danger(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
		return this.show(message, { ...options, variant: 'danger' });
	}

	pause(id: number) {
		const timer = this.timers.get(id);
		if (!timer?.handle) return;
		clearTimeout(timer.handle);
		timer.handle = undefined;
		timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.startedAt));
	}

	resume(id: number) {
		if (typeof window === 'undefined') return;
		const timer = this.timers.get(id);
		if (!timer || timer.handle || timer.remaining <= 0) return;
		timer.startedAt = Date.now();
		timer.handle = window.setTimeout(() => this.dismiss(id), timer.remaining);
	}

	dismiss(id: number) {
		const timer = this.timers.get(id);
		if (timer?.handle) clearTimeout(timer.handle);
		this.timers.delete(id);
		this.items = this.items.filter((item) => item.id !== id);
	}

	clear() {
		for (const timer of this.timers.values()) if (timer.handle) clearTimeout(timer.handle);
		this.timers.clear();
		this.items = [];
	}
}

export const toast = new ToastStore();
export type { ToastOptions, ToastVariant };
