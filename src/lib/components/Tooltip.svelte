<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { TooltipPlacement } from '../types.js';
	import { tooltipPortal } from '../actions/tooltip-portal.js';
	import { riseIn } from '../transitions.js';

	interface Props {
		content: string;
		placement?: TooltipPlacement;
		portal?: boolean;
		offset?: number;
		children: Snippet;
		class?: string;
	}

	let {
		content,
		placement = 'top',
		portal = true,
		offset = 8,
		children,
		class: className = ''
	}: Props = $props();
	const uid = $props.id();
	const id = `anasthasia-tooltip-${uid}`;
	let visible = $state(false);
	let root = $state<HTMLSpanElement>();
	const positions: Record<TooltipPlacement, string> = {
		top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
		right: 'top-1/2 left-full ml-2 -translate-y-1/2',
		bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
		left: 'top-1/2 right-full mr-2 -translate-y-1/2'
	};
</script>

<span
	bind:this={root}
	role="group"
	class="relative inline-flex {className}"
	aria-describedby={id}
	onpointerenter={() => (visible = true)}
	onpointerleave={() => (visible = false)}
	onfocusin={() => (visible = true)}
	onfocusout={(event) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) visible = false;
	}}
>
	{@render children()}
	{#if visible && root && portal}
		<span
			{id}
			role="tooltip"
			use:tooltipPortal={{ anchor: root, placement, offset }}
			class="pointer-events-none z-[10000] w-max max-w-64 rounded-anasthasia-md bg-anasthasia-text px-2 py-1 text-xs text-anasthasia-surface shadow-lg"
			in:riseIn={{ y: 3, duration: 150 }}
		>
			{content}
		</span>
	{:else if visible}
		<span
			{id}
			role="tooltip"
			class="pointer-events-none absolute z-50 w-max max-w-64 rounded-anasthasia-md bg-anasthasia-text px-2 py-1 text-xs text-anasthasia-surface shadow-lg {positions[
				placement
			]}"
			in:riseIn={{ y: 3, duration: 150 }}
		>
			{content}
		</span>
	{/if}
</span>
