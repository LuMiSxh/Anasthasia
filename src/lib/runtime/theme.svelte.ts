import type { ThemeMode } from '../types.js';

const STORAGE_KEY = 'anasthasia:theme';

class ThemeStore {
	mode = $state<ThemeMode>('system');
	isDark = $state(false);
	private media: MediaQueryList | null = null;
	private initialized = false;

	init(defaultMode: ThemeMode = 'system') {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;
		if (!this.initialized) {
			this.media = window.matchMedia('(prefers-color-scheme: dark)');
			this.media.addEventListener('change', this.handleSystemChange);
			this.initialized = true;
		}

		let stored: string | null = null;
		try {
			stored = localStorage.getItem(STORAGE_KEY);
		} catch {
			// Storage may be unavailable in private or restricted WebViews.
		}
		this.mode =
			stored === 'light' || stored === 'dark' || stored === 'system' ? stored : defaultMode;
		this.apply();
	}

	setMode(mode: ThemeMode) {
		this.mode = mode;
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, mode);
			} catch {
				// The in-memory preference still applies.
			}
		}
		this.apply();
	}

	destroy() {
		this.media?.removeEventListener('change', this.handleSystemChange);
		this.media = null;
		this.initialized = false;
	}

	private handleSystemChange = () => {
		if (this.mode === 'system') this.apply();
	};

	private apply() {
		if (typeof document === 'undefined') return;
		this.isDark =
			this.mode === 'dark' || (this.mode === 'system' && (this.media?.matches ?? false));
		document.documentElement.classList.toggle('dark', this.isDark);
		document.documentElement.style.colorScheme = this.isDark ? 'dark' : 'light';
	}
}

export const theme = new ThemeStore();
