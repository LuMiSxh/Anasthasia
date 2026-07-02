<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { AlertVariant } from '../types.js';
	import { riseIn } from '../transitions.js';

	interface Props {
		variant?: AlertVariant;
		title?: string;
		class?: string;
		live?: 'off' | 'polite' | 'assertive';
		animate?: boolean;
		children: Snippet;
	}

	let {
		variant = 'info',
		title,
		class: className = '',
		live = 'off',
		animate = true,
		children
	}: Props = $props();

	const variants: Record<AlertVariant, string> = {
		info: 'border-anasthasia-info-border bg-anasthasia-info-surface text-anasthasia-info',
		success:
			'border-anasthasia-success-border bg-anasthasia-success-surface text-anasthasia-success',
		warning:
			'border-anasthasia-warning-border bg-anasthasia-warning-surface text-anasthasia-warning',
		danger: 'border-anasthasia-danger-border bg-anasthasia-danger-surface text-anasthasia-danger'
	};
</script>

<div
	role={live === 'assertive' ? 'alert' : live === 'polite' ? 'status' : undefined}
	aria-live={live === 'off' ? undefined : live}
	class="rounded-anasthasia-xl border px-4 py-3 text-sm {variants[variant]} {className}"
	in:riseIn={{ duration: animate ? undefined : 0 }}
>
	{#if title}
		<div class="mb-1 font-bold">{title}</div>
	{/if}
	<div class="text-xs leading-relaxed text-current/90">
		{@render children()}
	</div>
</div>
