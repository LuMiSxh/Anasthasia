<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children: Snippet;
		class?: string;
	}
	let { children, class: className = '' }: Props = $props();
</script>

<kbd
	class="rounded border border-anasthasia-border bg-anasthasia-panel px-1.5 py-0.5 font-anasthasia-mono text-[10px] tracking-wider text-anasthasia-muted uppercase {className}"
>
	{@render children()}
</kbd>
