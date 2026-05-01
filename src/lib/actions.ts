export function dropdownPortal(
	node: HTMLElement,
	params: { anchor: HTMLElement; onclose: () => void }
) {
	let { anchor, onclose } = params;

	function reposition() {
		const rect = anchor.getBoundingClientRect();
		node.style.top = `${rect.bottom + 4}px`;
		node.style.left = `${rect.left}px`;
		node.style.width = `${rect.width}px`;
	}

	node.style.position = 'fixed';
	node.style.zIndex = '9999';
	document.body.appendChild(node);
	reposition();

	window.addEventListener('resize', reposition);
	window.addEventListener('scroll', onclose, { capture: true, passive: true });

	return {
		update(newParams: { anchor: HTMLElement; onclose: () => void }) {
			anchor = newParams.anchor;
			onclose = newParams.onclose;
			reposition();
		},
		destroy() {
			window.removeEventListener('resize', reposition);
			window.removeEventListener('scroll', onclose, { capture: true });
			node.remove();
		}
	};
}
