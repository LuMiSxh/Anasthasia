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
		'inline-flex items-center justify-center gap-2 font-anasthasia-control font-bold rounded-anasthasia-lg border transition-all duration-[var(--duration-anasthasia-interaction)] select-none cursor-pointer ' +
		'active:translate-y-[var(--translate-anasthasia-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-anasthasia-surface ' +
		'disabled:opacity-40 disabled:pointer-events-none';

	const sizes: Record<ControlSize, string> = {
		sm: 'h-[var(--height-anasthasia-control-sm)] px-[var(--padding-inline-anasthasia-control-sm)] text-[length:var(--font-size-anasthasia-control-sm)]',
		md: 'h-[var(--height-anasthasia-control-md)] px-[var(--padding-inline-anasthasia-control-md)] text-[length:var(--font-size-anasthasia-control)]',
		lg: 'h-[var(--height-anasthasia-control-lg)] px-[var(--padding-inline-anasthasia-control-lg)] text-[length:var(--font-size-anasthasia-control)]'
	};

	const variants: Record<ButtonVariant, string> = {
		primary: 'anasthasia-primary-action text-anasthasia-on-accent active:shadow-none',
		secondary:
			'bg-anasthasia-bg border-anasthasia-action-secondary-border text-anasthasia-action-secondary ' +
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
