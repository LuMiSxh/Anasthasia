<script lang="ts" generics="T extends string = string">
	import type { SegmentedControlOption } from '../types.js';
	import { sendPill, receivePill } from '../transitions.js';

	interface Props<T extends string = string> {
		options: SegmentedControlOption<T>[];
		value: T;
		label?: string;
		ariaLabel?: string;
		disabled?: boolean;
		class?: string;
		onchange?: (value: T) => void;
	}

	let {
		options,
		value = $bindable(),
		label,
		ariaLabel,
		disabled = false,
		class: className = '',
		onchange
	}: Props<T> = $props();

	const uid = $props.id();
	const labelId = `anasthasia-segmented-${uid}-label`;
	const pillKey = `anasthasia-segmented-pill-${uid}`;
	let buttons = $state<HTMLButtonElement[]>([]);

	function select(index: number, focus = false) {
		const option = options[index];
		if (!option || option.disabled || disabled) return;
		value = option.value;
		onchange?.(option.value);
		if (focus) buttons[index]?.focus();
	}

	function move(current: number, delta: number) {
		if (!options.length) return;
		for (let offset = 1; offset <= options.length; offset += 1) {
			const next = (current + delta * offset + options.length) % options.length;
			if (!options[next]?.disabled) {
				select(next, true);
				return;
			}
		}
	}

	function handleKeydown(event: KeyboardEvent, index: number) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			move(index, 1);
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			move(index, -1);
		} else if (event.key === 'Home') {
			event.preventDefault();
			const first = options.findIndex((option) => !option.disabled);
			if (first >= 0) select(first, true);
		} else if (event.key === 'End') {
			event.preventDefault();
			const last = options.findLastIndex((option) => !option.disabled);
			if (last >= 0) select(last, true);
		}
	}
</script>

<div class="flex flex-col gap-1.5 {className}">
	{#if label}<span id={labelId} class="anasthasia-label">{label}</span>{/if}

	<div
		role="radiogroup"
		aria-labelledby={label ? labelId : undefined}
		aria-label={!label ? ariaLabel : undefined}
		aria-disabled={disabled}
		class="inline-flex gap-0 rounded-anasthasia-lg border border-anasthasia-border bg-anasthasia-bg p-0.5 transition-colors duration-150 hover:border-anasthasia-accent/40"
	>
		{#each options as opt, index (opt.value)}
			<button
				bind:this={buttons[index]}
				type="button"
				role="radio"
				aria-checked={value === opt.value}
				tabindex={value === opt.value ? 0 : -1}
				disabled={disabled || opt.disabled}
				onclick={() => select(index)}
				onkeydown={(event) => handleKeydown(event, index)}
				class="relative flex-1 rounded-anasthasia-md px-3 py-1 text-sm font-bold transition-colors duration-150 focus-visible:ring-1 focus-visible:ring-anasthasia-accent focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 {value ===
				opt.value
					? 'text-anasthasia-accent'
					: 'text-anasthasia-muted hover:text-anasthasia-text'}"
			>
				{#if value === opt.value}
					<span
						class="absolute inset-0 rounded-anasthasia-md border border-anasthasia-accent/50 bg-anasthasia-surface shadow-sm"
						in:receivePill={{ key: pillKey }}
						out:sendPill={{ key: pillKey }}
					></span>
				{/if}
				<span class="relative z-10">{opt.label}</span>
			</button>
		{/each}
	</div>
</div>
