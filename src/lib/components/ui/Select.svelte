<script lang="ts" generics="T extends string = string">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { IconCheck, IconChevronDown } from '@tabler/icons-svelte';
	import { riseIn } from '../../transitions.js';
	import { dropdownPortal } from '../../actions.js';

	interface Option<T extends string = string> {
		value: T;
		label: string;
	}

	interface Props<T extends string = string> {
		options: Option<T>[];
		value: T;
		label?: string;
		hint?: string;
		error?: string;
		placeholder?: string;
		disabled?: boolean;
		class?: string;
		onchange?: (value: T) => void;
		icon?: Snippet;
	}

	let {
		options,
		value = $bindable(),
		label,
		hint,
		error,
		placeholder = 'Select an option',
		disabled = false,
		class: className = '',
		onchange,
		icon
	}: Props = $props();

	let open = $state(false);
	let highlighted = $state(0);
	let root: HTMLDivElement;
	let button = $state<HTMLButtonElement>();
	let dropdown = $state<HTMLDivElement>();

	let selected = $derived(options.find((option) => option.value === value));
	let listId = $derived(`select-${label?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? 'options'}`);

	onMount(() => {
		const handlePointerDown = (event: PointerEvent) => {
			if (!root?.contains(event.target as Node) && !dropdown?.contains(event.target as Node)) {
				open = false;
			}
		};
		document.addEventListener('pointerdown', handlePointerDown);
		return () => document.removeEventListener('pointerdown', handlePointerDown);
	});

	function commit(option: Option<T>) {
		value = option.value;
		onchange?.(option.value);
		open = false;
	}

	function move(delta: number) {
		if (!open) open = true;
		highlighted = (highlighted + delta + options.length) % options.length;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			move(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1);
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (open && options[highlighted]) commit(options[highlighted] as Option<T>);
			else open = true;
		} else if (event.key === 'Escape') {
			open = false;
		}
	}

	$effect(() => {
		const index = options.findIndex((option) => option.value === value);
		highlighted = Math.max(0, index);
	});
</script>

<div bind:this={root} class="relative flex flex-col gap-1.5 {className}">
	{#if label}
		<span class="anasthasia-label">{label}</span>
	{/if}

	<button
		bind:this={button}
		type="button"
		role="combobox"
		aria-controls={listId}
		aria-expanded={open}
		aria-invalid={!!error}
		{disabled}
		onclick={() => {
			if (!disabled) open = !open;
		}}
		onkeydown={handleKeydown}
		class="
			flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-anasthasia-border
			bg-anasthasia-bg px-3 py-1.5 text-left font-sans text-sm text-anasthasia-text
			transition-colors duration-150 outline-none hover:border-anasthasia-accent/40
			focus-visible:border-anasthasia-accent focus-visible:ring-1 focus-visible:ring-anasthasia-accent
			disabled:pointer-events-none disabled:opacity-40
			{error ? 'border-red-500/40 bg-red-500/5' : ''}
		"
	>
		<span class={selected ? 'truncate' : 'truncate text-anasthasia-muted'}>
			{selected?.label ?? placeholder}
		</span>
		<span
			class="flex h-4 w-4 shrink-0 items-center justify-center text-anasthasia-muted transition-transform duration-150 {open
				? 'rotate-180'
				: ''}"
			aria-hidden="true"
		>
			{#if icon}
				{@render icon()}
			{:else}
				<IconChevronDown size={16} stroke={2} />
			{/if}
		</span>
	</button>

	{#if open && button}
		<div
			bind:this={dropdown}
			id={listId}
			role="listbox"
			use:dropdownPortal={{ anchor: button, onclose: () => (open = false) }}
			class="max-h-56 overflow-auto rounded-lg border border-anasthasia-border bg-anasthasia-surface p-1"
			in:riseIn={{ y: 4 }}
		>
			{#each options as option, i (option.value)}
				<button
					type="button"
					role="option"
					aria-selected={option.value === value}
					onmouseenter={() => (highlighted = i)}
					onclick={() => commit(option as Option<T>)}
					class="relative flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-sm transition-colors duration-150
						{option.value === value
						? 'bg-anasthasia-accent/10 text-anasthasia-accent'
						: i === highlighted
							? 'bg-anasthasia-panel text-anasthasia-text'
							: 'text-anasthasia-muted hover:bg-anasthasia-panel hover:text-anasthasia-text'}"
				>
					<span class="truncate">{option.label}</span>
					{#if option.value === value}
						<IconCheck size={14} stroke={2.5} class="ml-auto shrink-0" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}

	{#if error}
		<span class="text-xs text-red-400">{error}</span>
	{:else if hint}
		<span class="anasthasia-caption">{hint}</span>
	{/if}
</div>
