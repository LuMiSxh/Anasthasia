const KEY = 'anasthasia:settings';

class UiPrefs {
	showKeyHints = $state(true);

	init() {
		try {
			const d = JSON.parse(localStorage.getItem(KEY) ?? '{}');
			if (d.showKeyHints !== undefined) this.showKeyHints = d.showKeyHints;
		} catch {
			this.showKeyHints = true;
		}
	}
}

export const uiPrefs = new UiPrefs();
