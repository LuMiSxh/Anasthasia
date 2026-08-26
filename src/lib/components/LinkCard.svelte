<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		children: Snippet;
	}

	let { href, class: className = '', children, ...rest }: Props = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	class="block rounded-anasthasia-xl border border-anasthasia-divider bg-anasthasia-surface p-[var(--padding-anasthasia-container)] text-left text-anasthasia-text no-underline transition-colors duration-[var(--duration-anasthasia-interaction)] hover:border-anasthasia-accent/40 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:outline-none active:translate-y-[var(--translate-anasthasia-active)] {className}"
	{...rest}
>
	{@render children()}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
