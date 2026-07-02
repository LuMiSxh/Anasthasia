<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { ButtonVariant, ControlSize } from '../types.js';

	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariant;
		size?: ControlSize;
		loading?: boolean;
		loadingLabel?: string;
		children: Snippet;
	}

	let {
		variant = 'secondary',
		size = 'md',
		loading = false,
		loadingLabel = 'Working',
		disabled = false,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 font-bold rounded-anasthasia-lg border transition-all duration-150 select-none cursor-pointer ' +
		'active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-anasthasia-surface ' +
		'disabled:opacity-40 disabled:pointer-events-none';

	const sizes: Record<ControlSize, string> = {
		sm: 'px-3 py-1 text-xs',
		md: 'px-4 py-1.5 text-sm',
		lg: 'px-6 py-2 text-sm'
	};

	const variants: Record<ButtonVariant, string> = {
		primary:
			'anasthasia-primary-action text-anasthasia-on-accent hover:brightness-105 active:shadow-none',
		secondary:
			'bg-anasthasia-bg border-anasthasia-border text-anasthasia-text ' +
			'hover:border-anasthasia-accent/50 hover:text-anasthasia-text active:shadow-none',
		ghost:
			'border-transparent bg-transparent text-anasthasia-muted ' +
			'hover:text-anasthasia-text hover:bg-anasthasia-panel active:shadow-none',
		danger:
			'border-anasthasia-danger-border bg-anasthasia-danger-surface text-anasthasia-danger ' +
			'hover:brightness-95 active:shadow-none'
	};
</script>

<button
	disabled={disabled || loading}
	aria-busy={loading || undefined}
	class="{base} {sizes[size]} {variants[variant]} {className}"
	{...rest}
>
	{#if loading}
		<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-current motion-reduce:animate-none"
		></span>
		{loadingLabel}
	{:else}
		{@render children()}
	{/if}
</button>
