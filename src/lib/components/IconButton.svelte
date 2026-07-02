<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { ButtonVariant, ControlSize } from '../types.js';

	interface Props extends HTMLButtonAttributes {
		label: string;
		variant?: ButtonVariant;
		size?: ControlSize;
		children: Snippet;
	}

	let {
		label,
		variant = 'ghost',
		size = 'md',
		type = 'button',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const sizes: Record<ControlSize, string> = { sm: 'h-7 w-7', md: 'h-8 w-8', lg: 'h-10 w-10' };
	const variants: Record<ButtonVariant, string> = {
		primary: 'anasthasia-primary-action text-anasthasia-on-accent hover:brightness-105',
		secondary:
			'border-anasthasia-border bg-anasthasia-bg text-anasthasia-text hover:border-anasthasia-accent/50',
		ghost:
			'border-transparent bg-transparent text-anasthasia-muted hover:bg-anasthasia-panel hover:text-anasthasia-text',
		danger: 'border-anasthasia-danger-border bg-anasthasia-danger-surface text-anasthasia-danger'
	};
</script>

<button
	{type}
	aria-label={label}
	class="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-anasthasia-lg border transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 {sizes[
		size
	]} {variants[variant]} {className}"
	{...rest}
>
	{@render children()}
</button>
