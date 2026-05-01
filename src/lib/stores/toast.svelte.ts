export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export type ToastItem = {
	id: number;
	variant: ToastVariant;
	title?: string;
	message: string;
	timeout: number;
	actionLabel?: string;
	action?: () => void;
};

class ToastStore {
	items = $state<ToastItem[]>([]);
	private nextId = 0;

	show(message: string, options: Partial<Omit<ToastItem, 'id' | 'message'>> = {}) {
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
		if (item.timeout > 0) window.setTimeout(() => this.dismiss(item.id), item.timeout);
		return item.id;
	}

	info(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>> = {}) {
		return this.show(message, { ...options, variant: 'info' });
	}

	success(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>> = {}) {
		return this.show(message, { ...options, variant: 'success' });
	}

	warning(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>> = {}) {
		return this.show(message, { ...options, variant: 'warning' });
	}

	danger(message: string, options: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>> = {}) {
		return this.show(message, { ...options, variant: 'danger' });
	}

	dismiss(id: number) {
		this.items = this.items.filter((item) => item.id !== id);
	}

	clear() {
		this.items = [];
	}
}

export const toast = new ToastStore();
