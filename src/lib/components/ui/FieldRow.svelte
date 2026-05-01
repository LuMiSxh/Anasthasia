<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		hint?: string;
		class?: string;
		children: Snippet;
		meta?: Snippet;
	}

	let { label, hint, class: className = '', children, meta }: Props = $props();
</script>

<div class="flex items-center justify-between gap-4 {className}">
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
	<div class="flex shrink-0 items-center gap-2">
		{@render children()}
	</div>
</div>
