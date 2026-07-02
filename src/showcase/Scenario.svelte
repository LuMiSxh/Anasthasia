<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, description, children }: { title: string; description?: string; children: Snippet } =
		$props();
</script>

<section class="rounded-anasthasia-xl border border-anasthasia-border bg-anasthasia-surface p-5">
	<header class="mb-4">
		<h2 class="text-sm font-bold text-anasthasia-text">{title}</h2>
		{#if description}<p class="mt-1 text-sm text-anasthasia-muted">{description}</p>{/if}
	</header>
	{@render children()}
</section>
