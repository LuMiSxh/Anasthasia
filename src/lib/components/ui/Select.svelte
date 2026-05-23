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
		search?: boolean;
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
		search = false,
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
	let searchInput = $state<HTMLInputElement>();
	let query = $state('');

	let hasOptions = $derived(options.length > 0);
	let normalizedQuery = $derived(query.trim().toLowerCase());
	let filteredOptions = $derived(
		normalizedQuery
			? options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
			: options
	);
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
		if (!filteredOptions.length) return;
		if (!open) open = true;
		highlighted = (highlighted + delta + filteredOptions.length) % filteredOptions.length;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'ArrowDown') {
			if (!filteredOptions.length) return;
			event.preventDefault();
			move(1);
		} else if (event.key === 'ArrowUp') {
			if (!filteredOptions.length) return;
			event.preventDefault();
			move(-1);
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (open && filteredOptions[highlighted]) commit(filteredOptions[highlighted] as Option<T>);
			else if (hasOptions) open = true;
		} else if (event.key === 'Escape') {
			open = false;
		}
	}

	$effect(() => {
		const index = filteredOptions.findIndex((option) => option.value === value);
		highlighted = index >= 0 ? index : 0;
	});

	$effect(() => {
		if (!open) query = '';
	});

	$effect(() => {
		if (!hasOptions) open = false;
	});

	$effect(() => {
		if (open && search && searchInput) {
			searchInput.focus();
			searchInput.select();
		}
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
			if (!disabled && hasOptions) open = !open;
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
			{#if search}
				<div class="sticky top-0 z-10 bg-anasthasia-surface pb-1">
					<input
						bind:this={searchInput}
						type="text"
						placeholder="Search..."
						bind:value={query}
						onkeydown={(event) => {
							if (
								event.key === 'ArrowDown' ||
								event.key === 'ArrowUp' ||
								event.key === 'Enter' ||
								event.key === 'Escape'
							) {
								handleKeydown(event);
							}
						}}
						class="w-full rounded-md border border-anasthasia-border bg-anasthasia-bg px-2.5 py-1.5 text-sm text-anasthasia-text outline-none
							focus-visible:border-anasthasia-accent focus-visible:ring-1 focus-visible:ring-anasthasia-accent"
					/>
				</div>
			{/if}

			{#if filteredOptions.length === 0}
				<span class="block px-2.5 py-2 text-sm text-anasthasia-muted">
					{query ? 'No results' : 'No options'}
				</span>
			{:else}
				{#each filteredOptions as option, i (option.value)}
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
			{/if}
		</div>
	{/if}

	{#if error}
		<span class="text-xs text-red-400">{error}</span>
	{:else if hint}
		<span class="anasthasia-caption">{hint}</span>
	{/if}
</div>
