<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		icon,
		actions,
		class: className = ''
	}: {
		title: string;
		description?: string;
		icon?: Snippet;
		actions?: Snippet;
		class?: string;
	} = $props();
</script>

<div
	class="flex flex-col items-center justify-center rounded-anasthasia-xl border border-dashed border-anasthasia-border bg-anasthasia-panel px-6 py-10 text-center {className}"
>
	{#if icon}<div class="mb-3 text-anasthasia-muted">{@render icon()}</div>{/if}
	<h2 class="text-sm font-bold text-anasthasia-text">{title}</h2>
	{#if description}<p class="mt-1 max-w-sm text-sm text-anasthasia-muted">{description}</p>{/if}
	{#if actions}<div class="mt-4 flex flex-wrap justify-center gap-2">{@render actions()}</div>{/if}
</div>
