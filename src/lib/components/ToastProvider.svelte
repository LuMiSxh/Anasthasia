<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import type { ToastPosition, ToastVariant } from '../types.js';
	import { toast } from '../runtime/toast.svelte.js';
	import { glassCollapse, riseIn } from '../transitions.js';
	import Button from './Button.svelte';

	let {
		position = 'bottom-right',
		maxVisible = 4,
		ariaLabel = 'Notifications',
		class: className = ''
	}: {
		position?: ToastPosition;
		maxVisible?: number;
		ariaLabel?: string;
		class?: string;
	} = $props();

	const variants: Record<ToastVariant, string> = {
		info: 'border-anasthasia-info-border bg-anasthasia-info-surface text-anasthasia-info',
		success:
			'border-anasthasia-success-border bg-anasthasia-success-surface text-anasthasia-success',
		warning:
			'border-anasthasia-warning-border bg-anasthasia-warning-surface text-anasthasia-warning',
		danger: 'border-anasthasia-danger-border bg-anasthasia-danger-surface text-anasthasia-danger'
	};
	const positions: Record<ToastPosition, string> = {
		'top-left': 'top-4 left-4',
		'top-right': 'top-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'bottom-right': 'right-4 bottom-4'
	};
	let visibleItems = $derived(toast.items.slice(-Math.max(1, maxVisible)));
</script>

<section
	aria-label={ariaLabel}
	class="fixed z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 {positions[
		position
	]} {className}"
>
	{#each visibleItems as item (item.id)}
		<div
			role={item.variant === 'danger' ? 'alert' : 'status'}
			aria-live={item.variant === 'danger' ? 'assertive' : 'polite'}
			class="rounded-anasthasia-xl border p-3 shadow-xl {variants[item.variant]}"
			in:riseIn={{ y: position.startsWith('top') ? -8 : 8 }}
			out:glassCollapse
			onpointerenter={() => toast.pause(item.id)}
			onpointerleave={() => toast.resume(item.id)}
			onfocusin={() => toast.pause(item.id)}
			onfocusout={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node | null))
					toast.resume(item.id);
			}}
		>
			<div class="flex items-start justify-between gap-3">
				<div class="min-w-0">
					{#if item.title}<div class="text-sm font-bold text-current">{item.title}</div>{/if}
					<div class="text-xs leading-relaxed text-current/90">{item.message}</div>
				</div>
				<button
					type="button"
					aria-label="Dismiss notification"
					class="rounded-anasthasia-md p-1 text-current/70 hover:bg-current/10 hover:text-current focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none"
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
</section>
