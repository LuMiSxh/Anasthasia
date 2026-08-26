<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const base =
		'bg-anasthasia-surface border border-anasthasia-divider rounded-anasthasia-xl p-[var(--padding-anasthasia-container)]';
</script>

<div class="{base} {className}">
	{@render children()}
</div>
