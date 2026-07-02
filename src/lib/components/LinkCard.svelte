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
	class="block rounded-anasthasia-xl border border-anasthasia-border bg-anasthasia-surface p-4 text-left text-anasthasia-text no-underline transition-colors duration-150 hover:border-anasthasia-accent/40 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:outline-none active:translate-y-px {className}"
	{...rest}
>
	{@render children()}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
