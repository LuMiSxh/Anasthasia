<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		loading?: boolean;
		success?: boolean;
		loadingLabel?: string;
		successLabel?: string;
		children: Snippet;
	}

	let {
		variant = 'secondary',
		size = 'md',
		loading = false,
		success = false,
		loadingLabel = 'Working',
		successLabel = 'Done',
		disabled = false,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 font-bold rounded-lg border transition-all duration-150 select-none cursor-pointer ' +
		'active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-anasthasia-surface ' +
		'disabled:opacity-40 disabled:pointer-events-none';

	const sizes: Record<Size, string> = {
		sm: 'px-3 py-1 text-xs',
		md: 'px-4 py-1.5 text-sm',
		lg: 'px-6 py-2 text-sm'
	};

	const variants: Record<Variant, string> = {
		primary:
			'border-transparent shadow-md active:shadow-none ' +
			'bg-black hover:brightness-110 ' +
			'dark:bg-accent-gradient dark:hover:brightness-110 dark:bevel-accent',
		secondary:
			'bg-anasthasia-bg border-anasthasia-border text-anasthasia-text ' +
			'hover:border-anasthasia-accent/50 hover:text-anasthasia-text active:shadow-none',
		ghost:
			'border-transparent bg-transparent text-anasthasia-muted ' +
			'hover:text-anasthasia-text hover:bg-anasthasia-panel active:shadow-none',
		danger:
			'border-transparent bg-red-600/10 text-red-400 border border-red-500/30 ' +
			'hover:bg-red-600/20 hover:border-red-500/50 active:shadow-none'
	};
</script>

<button
	disabled={disabled || loading || success}
	class="{base} {sizes[size]} {variants[variant]} {className}"
	{...rest}
>
	{#if variant === 'primary'}
		<span class="btn-primary-label inline-flex items-center gap-2">
			{#if loading}
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-current"></span>
				{loadingLabel}
			{:else if success}
				{successLabel}
			{:else}
				{@render children()}
			{/if}
		</span>
	{:else if loading}
		<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-current"></span>
		{loadingLabel}
	{:else if success}
		{successLabel}
	{:else}
		{@render children()}
	{/if}
</button>

<style>
	/* Light mode: gradient text. -webkit-text-fill-color leaves SVG stroke/fill
     reading `color` (the flat accent), so icons stay visible. */
	.btn-primary-label {
		background-image: var(--accent-gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: var(--accent);
	}

	/* Dark mode: full reset. Black text, no gradient clip. */
	:global(.dark) .btn-primary-label {
		background-image: none;
		-webkit-text-fill-color: black;
		color: black;
	}
</style>
