<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { BadgeVariant } from '../types.js';

	interface Props {
		variant?: BadgeVariant;
		class?: string;
		children: Snippet;
	}

	let { variant = 'default', class: className = '', children }: Props = $props();

	const variants: Record<BadgeVariant, string> = {
		default: 'bg-anasthasia-panel border-anasthasia-border text-anasthasia-muted',
		accent: 'bg-anasthasia-accent/10 border-anasthasia-accent/30 text-anasthasia-accent',
		success:
			'bg-anasthasia-success-surface border-anasthasia-success-border text-anasthasia-success',
		warning:
			'bg-anasthasia-warning-surface border-anasthasia-warning-border text-anasthasia-warning',
		danger: 'bg-anasthasia-danger-surface border-anasthasia-danger-border text-anasthasia-danger',
		mono: 'bg-anasthasia-panel border-anasthasia-border text-anasthasia-text font-anasthasia-mono'
	};
</script>

<span
	class="inline-flex items-center gap-1 rounded-anasthasia-md border px-1.5 py-0.5 text-xs font-bold {variants[
		variant
	]} {className}"
>
	{@render children()}
</span>
