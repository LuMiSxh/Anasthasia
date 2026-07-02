import type { TooltipPlacement } from '../types.js';

export interface TooltipPortalOptions {
	anchor: HTMLElement;
	placement?: TooltipPlacement;
	offset?: number;
}

export function tooltipPortal(node: HTMLElement, params: TooltipPortalOptions) {
	let { anchor, placement = 'top', offset = 8 } = params;
	let frame = 0;

	node.style.position = 'fixed';
	node.style.zIndex = '10000';
	node.style.visibility = 'hidden';
	document.body.appendChild(node);

	function reposition() {
		cancelAnimationFrame(frame);
		frame = 0;
		if (!anchor.isConnected) return;

		const viewport = window.visualViewport;
		const viewportLeft = viewport?.offsetLeft ?? 0;
		const viewportTop = viewport?.offsetTop ?? 0;
		const viewportWidth = viewport?.width ?? window.innerWidth;
		const viewportHeight = viewport?.height ?? window.innerHeight;
		const viewportRight = viewportLeft + viewportWidth;
		const viewportBottom = viewportTop + viewportHeight;
		const margin = 8;
		const anchorRect = anchor.getBoundingClientRect();
		const tooltipRect = node.getBoundingClientRect();
		let resolved = placement;

		if (
			placement === 'top' &&
			anchorRect.top - tooltipRect.height - offset < viewportTop + margin &&
			viewportBottom - anchorRect.bottom > anchorRect.top - viewportTop
		) {
			resolved = 'bottom';
		} else if (
			placement === 'bottom' &&
			anchorRect.bottom + tooltipRect.height + offset > viewportBottom - margin &&
			anchorRect.top - viewportTop > viewportBottom - anchorRect.bottom
		) {
			resolved = 'top';
		} else if (
			placement === 'left' &&
			anchorRect.left - tooltipRect.width - offset < viewportLeft + margin &&
			viewportRight - anchorRect.right > anchorRect.left - viewportLeft
		) {
			resolved = 'right';
		} else if (
			placement === 'right' &&
			anchorRect.right + tooltipRect.width + offset > viewportRight - margin &&
			anchorRect.left - viewportLeft > viewportRight - anchorRect.right
		) {
			resolved = 'left';
		}

		let left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
		let top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
		if (resolved === 'top') top = anchorRect.top - tooltipRect.height - offset;
		if (resolved === 'right') left = anchorRect.right + offset;
		if (resolved === 'bottom') top = anchorRect.bottom + offset;
		if (resolved === 'left') left = anchorRect.left - tooltipRect.width - offset;

		left = Math.min(
			Math.max(left, viewportLeft + margin),
			viewportRight - tooltipRect.width - margin
		);
		top = Math.min(
			Math.max(top, viewportTop + margin),
			viewportBottom - tooltipRect.height - margin
		);

		node.style.left = `${left}px`;
		node.style.top = `${top}px`;
		node.style.visibility = 'visible';
		node.dataset.placement = resolved;
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
		update(newParams: TooltipPortalOptions) {
			anchor = newParams.anchor;
			placement = newParams.placement ?? 'top';
			offset = newParams.offset ?? 8;
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
			node.remove();
		}
	};
}
