<script lang="ts" generics="T extends string = string">
	import { onMount } from 'svelte';
	import { IconCheck, IconChevronDown } from '@tabler/icons-svelte';
	import type { SelectOption } from '../types.js';
	import { dropdownPortal } from '../actions/dropdown-portal.js';
	import { riseIn } from '../transitions.js';

	interface Props<T extends string = string> {
		options: SelectOption<T>[];
		value: T;
		id?: string;
		label?: string;
		ariaLabel?: string;
		hint?: string;
		error?: string;
		placeholder?: string;
		search?: boolean;
		searchPlaceholder?: string;
		disabled?: boolean;
		class?: string;
		onchange?: (value: T) => void;
	}

	let {
		options,
		value = $bindable(),
		id: suppliedId,
		label,
		ariaLabel,
		hint,
		error,
		placeholder = 'Select an option',
		search = false,
		searchPlaceholder = 'Search…',
		disabled = false,
		class: className = '',
		onchange
	}: Props<T> = $props();

	const uid = $props.id();
	const generatedId = `anasthasia-select-${uid}`;
	let id = $derived(suppliedId ?? generatedId);
	let listId = $derived(`${id}-listbox`);
	let messageId = $derived(`${id}-message`);
	let open = $state(false);
	let highlighted = $state(0);
	let root = $state<HTMLDivElement>();
	let control = $state<HTMLElement>();
	let dropdown = $state<HTMLDivElement>();
	let query = $state('');

	let normalizedQuery = $derived(query.trim().toLocaleLowerCase());
	let filteredOptions = $derived(
		normalizedQuery
			? options.filter((option) => option.label.toLocaleLowerCase().includes(normalizedQuery))
			: options
	);
	let selected = $derived(options.find((option) => option.value === value));
	let activeOption = $derived(filteredOptions[highlighted]);
	let activeId = $derived(
		activeOption ? `${id}-option-${options.indexOf(activeOption)}` : undefined
	);

	onMount(() => {
		const handlePointerDown = (event: PointerEvent) => {
			if (!root?.contains(event.target as Node) && !dropdown?.contains(event.target as Node))
				close();
		};
		document.addEventListener('pointerdown', handlePointerDown);
		return () => document.removeEventListener('pointerdown', handlePointerDown);
	});

	function firstEnabledIndex(items = filteredOptions) {
		return Math.max(
			0,
			items.findIndex((option) => !option.disabled)
		);
	}

	function openDropdown() {
		if (disabled || !options.length) return;
		open = true;
		query = '';
		const selectedIndex = options.findIndex((option) => option.value === value && !option.disabled);
		highlighted = selectedIndex >= 0 ? selectedIndex : firstEnabledIndex(options);
	}

	function close() {
		open = false;
		query = '';
	}

	function commit(option: SelectOption<T>) {
		if (option.disabled) return;
		value = option.value;
		onchange?.(option.value);
		close();
		control?.focus();
	}

	function move(delta: number) {
		if (!open) openDropdown();
		if (!filteredOptions.length) return;
		for (let offset = 1; offset <= filteredOptions.length; offset += 1) {
			const next = (highlighted + delta * offset + filteredOptions.length) % filteredOptions.length;
			if (!filteredOptions[next]?.disabled) {
				highlighted = next;
				return;
			}
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			move(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1);
		} else if (event.key === 'Home' && open) {
			event.preventDefault();
			highlighted = firstEnabledIndex();
		} else if (event.key === 'End' && open) {
			event.preventDefault();
			for (let index = filteredOptions.length - 1; index >= 0; index -= 1) {
				if (!filteredOptions[index]?.disabled) {
					highlighted = index;
					break;
				}
			}
		} else if (event.key === 'Enter' || (!search && event.key === ' ')) {
			event.preventDefault();
			if (open && activeOption) commit(activeOption);
			else openDropdown();
		} else if (event.key === 'Escape' && open) {
			event.preventDefault();
			close();
		} else if (event.key === 'Tab') {
			close();
		}
	}

	$effect(() => {
		const available = filteredOptions;
		highlighted = firstEnabledIndex(available);
	});
</script>

<div bind:this={root} class="relative flex flex-col gap-1.5 {className}">
	{#if label}
		<label for={id} class="anasthasia-label">{label}</label>
	{/if}

	{#if search}
		<input
			bind:this={control}
			{id}
			type="text"
			role="combobox"
			aria-label={!label ? ariaLabel : undefined}
			aria-autocomplete="list"
			aria-controls={listId}
			aria-expanded={open}
			aria-activedescendant={open ? activeId : undefined}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error || hint ? messageId : undefined}
			placeholder={selected?.label ?? searchPlaceholder}
			value={open ? query : (selected?.label ?? '')}
			{disabled}
			onfocus={openDropdown}
			oninput={(event) => {
				if (!open) openDropdown();
				query = event.currentTarget.value;
			}}
			onkeydown={handleKeydown}
			class="w-full rounded-anasthasia-lg border border-anasthasia-border bg-anasthasia-bg px-3 py-1.5 font-anasthasia-sans text-sm text-anasthasia-text outline-none placeholder:text-anasthasia-muted hover:border-anasthasia-accent/40 focus:border-anasthasia-accent focus:ring-1 focus:ring-anasthasia-accent disabled:opacity-40 {error
				? 'border-anasthasia-danger-border bg-anasthasia-danger-surface'
				: ''}"
		/>
	{:else}
		<button
			bind:this={control}
			{id}
			type="button"
			role="combobox"
			aria-label={label ?? ariaLabel ?? selected?.label ?? placeholder}
			aria-controls={listId}
			aria-expanded={open}
			aria-activedescendant={open ? activeId : undefined}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error || hint ? messageId : undefined}
			{disabled}
			onclick={() => (open ? close() : openDropdown())}
			onkeydown={handleKeydown}
			class="flex w-full cursor-pointer items-center justify-between gap-3 rounded-anasthasia-lg border border-anasthasia-border bg-anasthasia-bg px-3 py-1.5 text-left font-anasthasia-sans text-sm text-anasthasia-text outline-none hover:border-anasthasia-accent/40 focus-visible:border-anasthasia-accent focus-visible:ring-1 focus-visible:ring-anasthasia-accent disabled:pointer-events-none disabled:opacity-40 {error
				? 'border-anasthasia-danger-border bg-anasthasia-danger-surface'
				: ''}"
		>
			<span class={selected ? 'truncate' : 'truncate text-anasthasia-muted'}
				>{selected?.label ?? placeholder}</span
			>
			<IconChevronDown
				size={16}
				stroke={2}
				aria-hidden="true"
				class="shrink-0 text-anasthasia-muted transition-transform duration-150 {open
					? 'rotate-180'
					: ''}"
			/>
		</button>
	{/if}

	{#if open && control}
		<div
			bind:this={dropdown}
			id={listId}
			role="listbox"
			aria-label={label ?? ariaLabel ?? 'Options'}
			use:dropdownPortal={{ anchor: control, onclose: close }}
			class="max-h-56 overflow-auto rounded-anasthasia-lg border border-anasthasia-border bg-anasthasia-surface p-1 shadow-xl"
			in:riseIn={{ y: 4 }}
		>
			{#if filteredOptions.length === 0}
				<div class="px-2.5 py-2 text-sm text-anasthasia-muted">No results</div>
			{:else}
				{#each filteredOptions as option, index (option.value)}
					<div
						id={`${id}-option-${options.indexOf(option)}`}
						role="option"
						tabindex="-1"
						aria-selected={option.value === value}
						aria-disabled={option.disabled || undefined}
						onpointerenter={() => {
							if (!option.disabled) highlighted = index;
						}}
						onpointerdown={(event) => event.preventDefault()}
						onclick={() => commit(option)}
						onkeydown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') commit(option);
						}}
						class="relative flex items-center rounded-anasthasia-md px-2.5 py-1.5 text-sm {option.disabled
							? 'cursor-not-allowed opacity-40'
							: 'cursor-pointer'} {option.value === value
							? 'bg-anasthasia-accent/10 text-anasthasia-accent'
							: index === highlighted
								? 'bg-anasthasia-panel text-anasthasia-text'
								: 'text-anasthasia-muted hover:bg-anasthasia-panel hover:text-anasthasia-text'}"
					>
						<span class="truncate">{option.label}</span>
						{#if option.value === value}<IconCheck
								size={14}
								stroke={2.5}
								class="ml-auto shrink-0"
							/>{/if}
					</div>
				{/each}
			{/if}
		</div>
	{/if}

	{#if error}
		<span id={messageId} class="text-xs text-anasthasia-danger">{error}</span>
	{:else if hint}
		<span id={messageId} class="anasthasia-caption">{hint}</span>
	{/if}
</div>
