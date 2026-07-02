export type DropdownPlacement = 'auto' | 'top' | 'bottom';

export interface DropdownPortalOptions {
	anchor: HTMLElement;
	onclose: () => void;
	placement?: DropdownPlacement;
	offset?: number;
}

export function dropdownPortal(node: HTMLElement, params: DropdownPortalOptions) {
	let { anchor, onclose, placement = 'auto', offset = 4 } = params;
	let frame = 0;
	node.style.position = 'fixed';
	node.style.zIndex = '9999';
	node.style.visibility = 'hidden';
	document.body.appendChild(node);

	function reposition() {
		cancelAnimationFrame(frame);
		frame = 0;
		if (!anchor.isConnected) {
			onclose();
			return;
		}

		const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
		const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
		const viewportLeft = window.visualViewport?.offsetLeft ?? 0;
		const viewportTop = window.visualViewport?.offsetTop ?? 0;
		const rect = anchor.getBoundingClientRect();
		const margin = 8;
		const width = Math.min(rect.width, viewportWidth - margin * 2);
		const left = Math.min(
			Math.max(rect.left, viewportLeft + margin),
			viewportLeft + viewportWidth - width - margin
		);
		const below = viewportTop + viewportHeight - rect.bottom - offset - margin;
		const above = rect.top - viewportTop - offset - margin;
		const useTop = placement === 'top' || (placement === 'auto' && below < 160 && above > below);
		const available = Math.max(80, useTop ? above : below);

		node.style.width = `${width}px`;
		node.style.left = `${left}px`;
		node.style.maxHeight = `${available}px`;
		node.style.top = useTop ? 'auto' : `${rect.bottom + offset}px`;
		node.style.bottom = useTop ? `${viewportHeight - rect.top + offset - viewportTop}px` : 'auto';
		node.style.visibility = 'visible';
	}

	function schedule() {
		if (!frame) frame = requestAnimationFrame(reposition);
	}

	const resizeObserver = new ResizeObserver(schedule);
	resizeObserver.observe(anchor);
	resizeObserver.observe(node);
	window.addEventListener('resize', schedule);
	window.addEventListener('scroll', schedule, true);
	window.visualViewport?.addEventListener('resize', schedule);
	window.visualViewport?.addEventListener('scroll', schedule);
	reposition();

	return {
		update(newParams: DropdownPortalOptions) {
			anchor = newParams.anchor;
			onclose = newParams.onclose;
			placement = newParams.placement ?? 'auto';
			offset = newParams.offset ?? 4;
			resizeObserver.disconnect();
			resizeObserver.observe(anchor);
			resizeObserver.observe(node);
			schedule();
		},
		destroy() {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			window.removeEventListener('resize', schedule);
			window.removeEventListener('scroll', schedule, true);
			window.visualViewport?.removeEventListener('resize', schedule);
			window.visualViewport?.removeEventListener('scroll', schedule);
			node.style.display = 'none';
			node.remove();
		}
	};
}
