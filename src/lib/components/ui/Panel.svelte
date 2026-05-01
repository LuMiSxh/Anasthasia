<script lang="ts">
	import type { Snippet } from 'svelte';
	import { riseIn } from '../../transitions.js';

	interface Props {
		label?: string;
		title?: string;
		class?: string;
		children: Snippet;
		actions?: Snippet;
	}

	let { label, title, class: className = '', children, actions }: Props = $props();
</script>

<section
	class="overflow-hidden rounded-xl border border-anasthasia-border bg-anasthasia-surface {className}"
	in:riseIn
>
	{#if label || title || actions}
		<header
			class="flex items-center justify-between gap-4 border-b border-anasthasia-border bg-anasthasia-panel px-4 py-2.5"
		>
			<div class="min-w-0">
				{#if label}
					<div class="text-[10px] font-bold tracking-widest text-anasthasia-muted uppercase">
						{label}
					</div>
				{/if}
				{#if title}
					<div class="truncate text-sm font-bold text-anasthasia-text">{title}</div>
				{/if}
			</div>
			{#if actions}
				<div class="flex shrink-0 items-center gap-2">
					{@render actions()}
				</div>
			{/if}
		</header>
	{/if}

	<div class="p-4">
		{@render children()}
	</div>
</section>
