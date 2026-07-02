import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => undefined,
		removeListener: () => undefined,
		addEventListener: () => undefined,
		removeEventListener: () => undefined,
		dispatchEvent: () => false
	})
});

class ResizeObserverStub {
	observe() {}
	unobserve() {}
	disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', { value: ResizeObserverStub });

Object.defineProperty(Element.prototype, 'animate', {
	writable: true,
	value: () => {
		const animation = {
			cancel: () => undefined,
			finish: () => undefined,
			play: () => undefined,
			pause: () => undefined,
			finished: Promise.resolve()
		};
		Object.defineProperty(animation, 'onfinish', {
			set(callback: (() => void) | null) {
				if (callback) queueMicrotask(callback);
			}
		});
		return animation;
	}
});
