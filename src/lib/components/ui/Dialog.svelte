<script lang="ts">
	import type { Snippet } from 'svelte';
	import { IconX } from '@tabler/icons-svelte';
	import { fade } from 'svelte/transition';
	import { duration, riseIn, riseOut } from '../../transitions.js';

	interface Props {
		open: boolean;
		title?: string;
		description?: string;
		class?: string;
		closeOnBackdrop?: boolean;
		onclose?: () => void;
		children: Snippet;
		footer?: Snippet;
		closeIcon?: Snippet;
	}

	let {
		open = $bindable(),
		title,
		description,
		class: className = '',
		closeOnBackdrop = true,
		onclose,
		children,
		footer,
		closeIcon
	}: Props = $props();

	let panel = $state<HTMLDivElement>();

	function close() {
		open = false;
		onclose?.();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!open) return;
		if (event.key === 'Escape') {
			event.preventDefault();
			close();
		}
		if (event.key !== 'Tab' || !panel) return;

		const focusable = Array.from(
			panel.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
			)
		);
		const first = focusable[0];
		const last = focusable.at(-1);
		if (!first || !last) return;

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		if (!open || !panel) return;
		const focusable = panel.querySelector<HTMLElement>(
			'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);
		focusable?.focus();
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<button
			type="button"
			aria-label="Close dialog"
			class="absolute inset-0 cursor-default bg-black/45"
			onclick={() => {
				if (closeOnBackdrop) close();
			}}
			transition:fade={{ duration: duration.fast }}
		></button>

		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-label={title}
			class="relative flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-anasthasia-border bg-anasthasia-surface {className}"
			in:riseIn={{ y: 10 }}
			out:riseOut={{ y: 10 }}
			tabindex="-1"
		>
			{#if title || description}
				<header
					class="flex items-start justify-between gap-4 border-b border-anasthasia-border bg-anasthasia-panel px-4 py-3"
				>
					<div class="min-w-0">
						{#if title}
							<h3>{title}</h3>
						{/if}
						{#if description}
							<p class="mt-1">{description}</p>
						{/if}
					</div>
					<button
						type="button"
						aria-label="Close dialog"
						class="rounded-md p-1 text-anasthasia-muted transition-colors duration-150 hover:bg-anasthasia-bg hover:text-anasthasia-text"
						onclick={close}
					>
						{#if closeIcon}
							{@render closeIcon()}
						{:else}
							<IconX size={16} stroke={2.5} />
						{/if}
					</button>
				</header>
			{/if}

			<div class="min-h-0 overflow-auto p-4">
				{@render children()}
			</div>

			{#if footer}
				<footer
					class="flex justify-end gap-2 border-t border-anasthasia-border bg-anasthasia-panel px-4 py-3"
				>
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/if}
