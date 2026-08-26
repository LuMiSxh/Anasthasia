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
	class="w-full cursor-pointer rounded-anasthasia-xl border border-anasthasia-divider bg-anasthasia-surface p-[var(--padding-anasthasia-container)] text-left transition-colors duration-[var(--duration-anasthasia-interaction)] hover:border-anasthasia-accent/40 focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:outline-none active:translate-y-[var(--translate-anasthasia-active)] {className}"
	{...rest}
>
	{@render children()}
</button>
