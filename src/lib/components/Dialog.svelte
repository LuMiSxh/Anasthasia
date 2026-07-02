<script lang="ts">
	import type { Snippet } from 'svelte';
	import { IconX } from '@tabler/icons-svelte';

	interface Props {
		open: boolean;
		title?: string;
		description?: string;
		ariaLabel?: string;
		class?: string;
		closeOnBackdrop?: boolean;
		closeOnEscape?: boolean;
		onclose?: () => void;
		children: Snippet;
		footer?: Snippet;
		closeIcon?: Snippet;
	}

	let {
		open = $bindable(),
		title,
		description,
		ariaLabel,
		class: className = '',
		closeOnBackdrop = true,
		closeOnEscape = true,
		onclose,
		children,
		footer,
		closeIcon
	}: Props = $props();

	const uid = $props.id();
	const id = `anasthasia-dialog-${uid}`;
	const titleId = `${id}-title`;
	const descriptionId = `${id}-description`;
	let element = $state<HTMLDialogElement>();
	let previousFocus: HTMLElement | null = null;
	let previousOverflow = '';
	let wasShown = false;

	function focusInitial() {
		const target = element?.querySelector<HTMLElement>(
			'[autofocus], button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);
		(target ?? element)?.focus();
	}

	function requestClose() {
		if (element?.open) element.close();
		else open = false;
	}

	function handleClose() {
		open = false;
		document.body.style.overflow = previousOverflow;
		previousFocus?.focus();
		previousFocus = null;
		if (wasShown) onclose?.();
		wasShown = false;
	}

	function handleCancel(event: Event) {
		if (!closeOnEscape) event.preventDefault();
	}

	$effect(() => {
		if (!element) return;
		if (open && !element.open) {
			previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			previousOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			element.showModal();
			wasShown = true;
			queueMicrotask(focusInitial);
		} else if (!open && element.open) {
			element.close();
		}
	});
</script>

<dialog
	bind:this={element}
	onclose={handleClose}
	oncancel={handleCancel}
	onclick={(event) => {
		if (event.target === element && closeOnBackdrop) requestClose();
	}}
	aria-labelledby={title ? titleId : undefined}
	aria-describedby={description ? descriptionId : undefined}
	aria-label={!title ? ariaLabel : undefined}
	class="anasthasia-dialog m-auto max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-anasthasia-xl border border-anasthasia-border bg-anasthasia-surface p-0 text-anasthasia-text shadow-2xl {className}"
>
	<div class="flex max-h-[calc(100dvh-2rem)] flex-col">
		{#if title || description}
			<header
				class="flex items-start justify-between gap-4 border-b border-anasthasia-border bg-anasthasia-panel px-4 py-3"
			>
				<div class="min-w-0">
					{#if title}
						<h2 id={titleId} class="text-base font-bold text-anasthasia-text">{title}</h2>
					{/if}
					{#if description}
						<p id={descriptionId} class="mt-1 text-sm text-anasthasia-muted">{description}</p>
					{/if}
				</div>
				<button
					type="button"
					aria-label="Close dialog"
					class="rounded-anasthasia-md p-1 text-anasthasia-muted transition-colors duration-150 hover:bg-anasthasia-bg hover:text-anasthasia-text focus-visible:ring-2 focus-visible:ring-anasthasia-accent focus-visible:outline-none"
					onclick={requestClose}
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
</dialog>

<style>
	.anasthasia-dialog {
		opacity: 0;
		transform: translateY(8px) scale(0.985);
		transition:
			opacity 180ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
			display 180ms allow-discrete,
			overlay 180ms allow-discrete;
	}

	.anasthasia-dialog[open] {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.anasthasia-dialog::backdrop {
		background: transparent;
		transition:
			background 150ms ease-out,
			display 150ms allow-discrete,
			overlay 150ms allow-discrete;
	}

	.anasthasia-dialog[open]::backdrop {
		background: var(--color-anasthasia-overlay);
	}

	@starting-style {
		.anasthasia-dialog[open] {
			opacity: 0;
			transform: translateY(8px) scale(0.985);
		}

		.anasthasia-dialog[open]::backdrop {
			background: transparent;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.anasthasia-dialog,
		.anasthasia-dialog::backdrop {
			transition-duration: 0.01ms;
		}
	}
</style>
