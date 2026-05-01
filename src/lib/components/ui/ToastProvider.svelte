<script lang="ts">
	import { toast } from '../../stores/toast.svelte.js';
	import { glassCollapse, riseIn } from '../../transitions.js';
	import { IconX } from '@tabler/icons-svelte';
	import Button from './Button.svelte';

	const variants = {
		info: 'border-anasthasia-accent/30 bg-anasthasia-surface text-anasthasia-text',
		success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
		warning: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
		danger: 'border-red-500/30 bg-red-500/10 text-red-300'
	};
</script>

<div class="fixed right-4 bottom-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
	{#each toast.items as item (item.id)}
		<div
			class="rounded-xl border p-3 backdrop-blur {variants[item.variant]}"
			in:riseIn={{ y: 8 }}
			out:glassCollapse
		>
			<div class="flex items-start justify-between gap-3">
				<div class="min-w-0">
					{#if item.title}
						<div class="text-sm font-bold text-current">{item.title}</div>
					{/if}
					<div class="text-xs leading-relaxed text-current/80">{item.message}</div>
				</div>
				<button
					type="button"
					aria-label="Dismiss toast"
					class="rounded-md p-1 text-current/60 transition-colors duration-150 hover:bg-current/10 hover:text-current"
					onclick={() => toast.dismiss(item.id)}
				>
					<IconX size={14} stroke={2.5} />
				</button>
			</div>

			{#if item.actionLabel && item.action}
				<div class="mt-2">
					<Button
						size="sm"
						variant="ghost"
						onclick={() => {
							item.action?.();
							toast.dismiss(item.id);
						}}>{item.actionLabel}</Button
					>
				</div>
			{/if}
		</div>
	{/each}
</div>
