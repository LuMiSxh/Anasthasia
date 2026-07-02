<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const base = 'bg-anasthasia-surface border border-anasthasia-border rounded-anasthasia-xl p-4';
</script>

<div class="{base} {className}">
	{@render children()}
</div>
