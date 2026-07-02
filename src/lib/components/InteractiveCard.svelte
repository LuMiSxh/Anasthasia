<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { class: className = '', children, type = 'button', ...rest }: Props = $props();
</script>

<button
	{type}
	class="w-full cursor-pointer rounded-anasthasia-xl border border-anasthasia-border bg-anasthasia-surface p-4 text-left transition-colors duration-150 hover:border-anasthasia-accent/40 focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:outline-none active:translate-y-px {className}"
	{...rest}
>
	{@render children()}
</button>
