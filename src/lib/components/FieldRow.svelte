<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		hint?: string;
		class?: string;
		orientation?: 'responsive' | 'horizontal' | 'vertical';
		children: Snippet;
		meta?: Snippet;
	}

	let {
		label,
		hint,
		class: className = '',
		orientation = 'responsive',
		children,
		meta
	}: Props = $props();

	const layouts = {
		responsive: 'flex-col items-stretch sm:flex-row sm:items-center sm:justify-between',
		horizontal: 'flex-row items-center justify-between',
		vertical: 'flex-col items-stretch'
	};
</script>

<div class="flex gap-4 {layouts[orientation]} {className}">
	<div class="min-w-0">
		<div class="text-sm font-medium text-anasthasia-text">{label}</div>
		{#if hint}
			<div class="mt-0.5 text-xs leading-relaxed text-anasthasia-muted">{hint}</div>
		{/if}
		{#if meta}
			<div class="mt-1">
				{@render meta()}
			</div>
		{/if}
	</div>
	<div class="flex items-center gap-2 {orientation === 'horizontal' ? 'shrink-0' : ''}">
		{@render children()}
	</div>
</div>
