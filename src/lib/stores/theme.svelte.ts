class ThemeStore {
	dark = $state(false);

	init() {
		const stored = localStorage.getItem('anasthasia:theme');
		if (stored) {
			this.dark = stored === 'dark';
		} else {
			this.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		this.apply();
	}

	toggle() {
		this.dark = !this.dark;
		localStorage.setItem('anasthasia:theme', this.dark ? 'dark' : 'light');
		this.apply();
	}

	apply() {
		document.documentElement.classList.toggle('dark', this.dark);
	}
}

export const theme = new ThemeStore();
