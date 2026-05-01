import { crossfade, fade, fly, scale, slide } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

/** Durations aligned with the design system (fast desktop feel) */
export const duration = {
	fast: 150,
	base: 200,
	slow: 300
} as const;

export const easing = {
	standard: cubicOut
} as const;

/**
 * Sliding pill crossfade — use [sendPill, receivePill] for any
 * "active indicator moves between options" pattern (segmented controls,
 * tab bars, step indicators, etc.)
 *
 * Usage:
 *   {#if active}
 *     <span in:receivePill={{ key }} out:sendPill={{ key }}></span>
 *   {/if}
 */
export const [sendPill, receivePill] = crossfade({
	duration: duration.base,
	easing: easing.standard,
	fallback: (node) => scale(node, { duration: duration.fast, easing: easing.standard })
});

/** Sidebar panel slide in/out on x-axis */
export const sidebarSlide = (node: Element) =>
	slide(node, { axis: 'x', duration: duration.base, easing: easing.standard });

/** Standard page-level fade */
export const pageFade = (node: Element) =>
	fade(node, { duration: duration.base, easing: easing.standard });

/** Slide up into view — good for toasts, dropdowns, step content */
export const slideUp = (node: Element, params?: { duration?: number }) =>
	fly(node, { y: 8, duration: params?.duration ?? duration.base, easing: easing.standard });

/** Slide down — good for panels expanding downward */
export const slideDown = (node: Element, params?: { duration?: number }) =>
	fly(node, { y: -8, duration: params?.duration ?? duration.base, easing: easing.standard });

/** Anasthasia rise — default entrance for panels, alerts, popovers, and step content. */
export function riseIn(node: Element, params: { duration?: number; y?: number } = {}) {
	return fly(node, {
		y: params.y ?? 8,
		duration: params.duration ?? duration.base,
		easing: easing.standard
	});
}

/** Anasthasia rise exit — symmetric reverse of riseIn: drops down while fading. */
export function riseOut(node: Element, params: { duration?: number; y?: number } = {}) {
	return fly(node, {
		y: params.y ?? 8,
		duration: params.duration ?? duration.base,
		easing: easing.standard
	});
}

/** Anasthasia collapse — height/opacity collapse for conditional form regions. */
export function softCollapse(node: Element, params: { duration?: number } = {}) {
	const style = getComputedStyle(node);
	const height = parseFloat(style.height);
	const paddingTop = parseFloat(style.paddingTop);
	const paddingBottom = parseFloat(style.paddingBottom);
	const marginTop = parseFloat(style.marginTop);
	const marginBottom = parseFloat(style.marginBottom);

	return {
		duration: params.duration ?? duration.base,
		css: (t: number) => {
			const e = easing.standard(t);
			return `
				height:${height * e}px;
				padding-top:${paddingTop * e}px;
				padding-bottom:${paddingBottom * e}px;
				margin-top:${marginTop * e}px;
				margin-bottom:${marginBottom * e}px;
				opacity:${e};
				overflow:hidden;
			`;
		}
	};
}

/** Anasthasia glass collapse — used for dense hint/status chips entering horizontally. */
export function glassCollapse(node: Element, params: { duration?: number } = {}) {
	const style = getComputedStyle(node);
	const width = parseFloat(style.width);
	const marginRight = parseFloat(style.marginRight);

	return {
		duration: params.duration ?? duration.base,
		css: (t: number) => {
			const e = easing.standard(t);
			return `
				width:${width * e}px;
				margin-right:${marginRight * e}px;
				opacity:${e};
				transform:translateX(${(1 - e) * -16}px) scale(${0.9 + 0.1 * e});
				filter:blur(${(1 - e) * 4}px);
				overflow:hidden;
				white-space:nowrap;
			`;
		}
	};
}
