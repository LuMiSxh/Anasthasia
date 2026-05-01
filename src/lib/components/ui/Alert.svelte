<script lang="ts">
	import type { Snippet } from 'svelte';
	import { riseIn } from '../../transitions.js';

	type Variant = 'info' | 'success' | 'warning' | 'danger';

	interface Props {
		variant?: Variant;
		title?: string;
		class?: string;
		children: Snippet;
	}

	let { variant = 'info', title, class: className = '', children }: Props = $props();

	const variants: Record<Variant, string> = {
		info: 'border-anasthasia-accent/30 bg-anasthasia-accent/10 text-anasthasia-accent',
		success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
		warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
		danger: 'border-red-500/30 bg-red-500/10 text-red-400'
	};
</script>

<div class="rounded-xl border px-4 py-3 text-sm {variants[variant]} {className}" in:riseIn>
	{#if title}
		<div class="mb-1 font-bold">{title}</div>
	{/if}
	<div class="text-xs leading-relaxed text-current/90">
		{@render children()}
	</div>
</div>
